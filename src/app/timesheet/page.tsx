// src/app/timesheet/page.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import SignaturePad from "react-signature-canvas";
import { format, addDays } from "date-fns";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Row = {
  day: string;
  date: string;
  timeIn: string;
  timeOut: string;
  break: string;
  notes: string;
};

type FormValues = {
  clientName: string;
  site: string;
  weekStart: string;
  weekEnd: string;
  companyAddress: string;
  contactNumber: string;
  email: string;
  timesheet: Row[];
};

export default function TimesheetPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const sigPadRef = useRef<SignaturePad>(null);
  const [sigError, setSigError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      clientName: "",
      site: "",
      weekStart: "",
      weekEnd: "",
      companyAddress: "",
      contactNumber: "",
      email: "",
      timesheet: daysOfWeek.map((day) => ({
        day,
        date: "",
        timeIn: "",
        timeOut: "",
        break: "",
        notes: "",
      })),
    },
  });

  const { fields } = useFieldArray({ control, name: "timesheet" });
  const data = watch();

  // Draft autosave
  useEffect(() => {
    const draft = localStorage.getItem("tsDraft");
    if (draft) reset(JSON.parse(draft));
  }, [reset]);

  useEffect(() => {
    localStorage.setItem("tsDraft", JSON.stringify(data));
  }, [data]);

  // Helpers
  const toMins = (t: string) => {
    const [h = "0", m = "0"] = t.split(":");
    return parseInt(h) * 60 + parseInt(m);
  };
  const rowMins = (r: Row) =>
    r.timeIn && r.timeOut
      ? Math.max(0, toMins(r.timeOut) - toMins(r.timeIn) - (parseInt(r.break) || 0))
      : 0;

  const totalMins = fields.reduce((sum, _, i) => sum + rowMins(data.timesheet[i]), 0);
  const totalH = Math.floor(totalMins / 60);
  const totalR = totalMins % 60;

  // Auto‑fill dates from weekStart
  const onStartChange = (val: string) => {
    setValue("weekStart", val);
    if (val) {
      const d0 = new Date(val);
      fields.forEach((_, i) =>
        setValue(`timesheet.${i}.date`, format(addDays(d0, i), "yyyy-MM-dd"))
      );
    }
  };

  // Clear signature
  const clearSig = () => {
    sigPadRef.current?.clear();
    setSigError(false);
  };

  // Final send (called by modal “OK”)
  const finalizeSend = async () => {
    const payload = {
      ...data,
      signature: sigPadRef.current!.getTrimmedCanvas().toDataURL("image/png"),
    };
    try {
      const res = await fetch("/api/send-timesheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setMessage(json.message);
      // now clear everything
      reset();
      clearSig();
      localStorage.removeItem("tsDraft");
    } catch {
      setMessage("Submission failed");
    } finally {
      setShowModal(false);
    }
  };

  // onSubmit: validate signature then open confirmation modal
  const onSubmit = () => {
    if (!sigPadRef.current || sigPadRef.current.isEmpty()) {
      setSigError(true);
      return;
    }
    setShowModal(true);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8 space-y-6">
          <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#20bfa0]">
  Weekly Timesheet
</h2>
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="dark-mode-toggle px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Toggle {darkMode ? "Light" : "Dark"}
            </button>
          </div>

          {message && (
            <div className="text-green-600 dark:text-green-400">{message}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 3. FIELD GROUPING */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <h3 className="font-semibold mb-2">Client Details</h3>
                <div className="grid gap-4">
                  {[
                    { label: "Client Name", name: "clientName", type: "text" },
                    { label: "Site", name: "site", type: "text" },
                    { label: "Company Address", name: "companyAddress", type: "text" },
                    { label: "Contact #", name: "contactNumber", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                  ].map(({ label, name, type }) => (
                    <div key={name}>
                      <label className="block text-gray-700 dark:text-gray-200 mb-1">
                        {label}
                      </label>
                      <input
                        {...register(name as any, { required: true })}
                        type={type}
                        className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brandGreen"
                      />
                      {errors[name as keyof FormValues] && (
                        <p className="text-red-600 text-xs mt-1">Required</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <h3 className="font-semibold mb-2">Week Details</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-1">Week Start</label>
                    <input
                      {...register("weekStart", { required: true })}
                      type="date"
                      onChange={(e) => onStartChange(e.target.value)}
                      className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brandGreen"
                    />
                    {errors.weekStart && (
                      <p className="text-red-600 text-xs mt-1">Required</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-1">Week End</label>
                    <input
                      {...register("weekEnd", { required: true })}
                      type="date"
                      className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brandGreen"
                    />
                    {errors.weekEnd && (
                      <p className="text-red-600 text-xs mt-1">Required</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. RESPONSIVE TABLE */}
            <div className="overflow-x-auto">
              <table className="timesheet-table min-w-full table-auto text-sm text-gray-800 dark:text-gray-200">
                <thead>
                  <tr>
                    <th className="p-2 border">Day</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Time In</th>
                    <th className="p-2 border">Time Out</th>
                    <th className="p-2 border">Break</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((f, i) => (
                    <tr key={i}>
                      <td data-label="Day" className="p-2 border">{f.day}</td>
                      <td data-label="Date" className="p-2 border">
                        <input
                          type="date"
                          {...register(`timesheet.${i}.date` as any, { required: true })}
                          className="w-full px-1 py-1 border rounded bg-white dark:bg-gray-800"
                        />
                      </td>
                      <td data-label="Time In" className="p-2 border">
                        <input
                         {...register(`timesheet.${i}.timeIn` as any)}
                          placeholder="HH:MM"
                          className="w-full px-1 py-1 border rounded bg-white dark:bg-gray-800"
                        />
                      </td>
                      <td data-label="Time Out" className="p-2 border">
                        <input
                          {...register(`timesheet.${i}.timeOut` as any, { required: true })}
                          placeholder="HH:MM"
                          className="w-full px-1 py-1 border rounded bg-white dark:bg-gray-800"
                        />
                      </td>
                      <td data-label="Break" className="p-2 border">
                        <input
                          type="number"
                          {...register(`timesheet.${i}.break` as any, { required: true })}
                          placeholder="min"
                          className="w-full px-1 py-1 border rounded bg-white dark:bg-gray-800"
                        />
                      </td>
                      <td data-label="Total" className="p-2 border text-center">
                        {Math.floor(rowMins(data.timesheet[i]) / 60)}h{" "}
                        {rowMins(data.timesheet[i]) % 60}m
                      </td>
                      <td data-label="Notes" className="p-2 border">
                        <input
                          {...register(`timesheet.${i}.notes` as any, { required: true })}
                          placeholder="Notes"
                          className="w-full px-1 py-1 border rounded bg-white dark:bg-gray-800"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Weekly Total */}
            <div className="text-right font-semibold text-gray-700 dark:text-gray-200">
              Total: {totalH}h {totalR}m
            </div>

            {/* Signature */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Carer Signature *
              </label>
              <SignaturePad
                ref={sigPadRef}
                canvasProps={{
                  className: "w-full h-32 border rounded bg-white dark:bg-gray-800",
                }}
              />
              {sigError && (
                <p className="text-red-600 text-xs mt-1">Required</p>
              )}
              <button
                type="button"
                onClick={clearSig}
                className="mt-2 px-4 py-2 bg-[#20bfa0] border border-[#20bfa0] text-white rounded hover:bg-[#1aa78f] transition"
              >
                Clear Signature
              </button>
            </div>

            {/* Actions */}
            <div className="timesheet-actions flex justify-between items-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#20bfa0] border border-[#20bfa0] text-white rounded hover:bg-[#1aa78f] transition"
              >
                Print
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#20bfa0] border border-[#20bfa0] text-white rounded hover:bg-[#1aa78f] transition"
              >
                Submit Timesheet
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 5. Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm text-center space-y-4">
            <h3 className="text-lg font-semibold">Send Timesheet?</h3>
            <p>Are you sure you want to submit your timesheet now?</p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={finalizeSend}
                className="px-4 py-2 bg-[#20bfa0] border border-[#20bfa0] text-white rounded hover:bg-[#1aa78f] transition"
              >
                Yes, Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// outside helper
function rowMins(r: Row) {
  if (!r.timeIn || !r.timeOut) return 0;
  const toMins = (t: string) => {
    const [h = "0", m = "0"] = t.split(":");
    return parseInt(h) * 60 + parseInt(m);
  };
  return Math.max(0, toMins(r.timeOut) - toMins(r.timeIn) - (parseInt(r.break) || 0));
}
