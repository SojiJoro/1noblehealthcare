"use client";

import React, { useState, useEffect } from "react";
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
  breakMins: string;
  notes: string;
};

export default function TimesheetPage() {
  const [form, setForm] = useState<{
    staffName: string;
    shiftLocation: string;
    companyAddress: string;
    contactNumber: string;
    email: string;
    weekStart: string;
    weekEnd: string;
    timesheet: Row[];
  }>({
    staffName: "",
    shiftLocation: "",
    companyAddress: "",
    contactNumber: "",
    email: "",
    weekStart: "",
    weekEnd: "",
    timesheet: daysOfWeek.map((day) => ({
      day,
      date: "",
      timeIn: "",
      timeOut: "",
      breakMins: "",
      notes: "",
    })),
  });

  const [sigMode, setSigMode] = useState<"upload" | "type">("upload");
  const [signatureData, setSignatureData] = useState<string>("");
  const [typedName, setTypedName] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [sigError, setSigError] = useState(false);

  // Update weekEnd & dates whenever weekStart changes
  useEffect(() => {
    if (!form.weekStart) return;
    const start = new Date(form.weekStart);
    setForm((f) => ({
      ...f,
      weekEnd: format(addDays(start, 6), "yyyy-MM-dd"),
      timesheet: f.timesheet.map((r, i) => ({
        ...r,
        date: format(addDays(start, i), "yyyy-MM-dd"),
      })),
    }));
  }, [form.weekStart]);

  // Compute minutes worked per row, handling overnight
  const computeRowMins = (r: Row) => {
    if (!r.timeIn || !r.timeOut) return 0;
    const [h1, m1] = r.timeIn.split(":").map(Number);
    const [h2, m2] = r.timeOut.split(":").map(Number);
    let start = h1 * 60 + m1;
    let end = h2 * 60 + m2;
    if (end < start) end += 24 * 60; // overnight
    const worked = end - start - (Number(r.breakMins) || 0);
    return Math.max(worked, 0);
  };

  // Totals for display
  const totalMins = form.timesheet.reduce((sum, r) => sum + computeRowMins(r), 0);
  const totalH = Math.floor(totalMins / 60);
  const totalR = totalMins % 60;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    idx?: number
  ) {
    const { name, value } = e.target;
    if (typeof idx === "number") {
      setForm((f) => {
        const ts = [...f.timesheet];
        ts[idx] = { ...ts[idx], [name]: value };
        return { ...f, timesheet: ts };
      });
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setSigError(false);
    const file = e.target.files?.[0];
    if (!file) {
      setSignatureData("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setSignatureData(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function submit() {
    if (
      (sigMode === "upload" && !signatureData) ||
      (sigMode === "type" && !typedName.trim())
    ) {
      setSigError(true);
      setMessage("Please provide a signature");
      return;
    }

    setSigError(false);
    setMessage("Sending…");

    const totalHours = `${totalH}h ${totalR}m`;

    const payload = {
      ...form,
      signature:
        sigMode === "upload"
          ? signatureData
          : `Signed: ${typedName.trim()}`,
      totalHours,
    };

    try {
      const res = await fetch("/api/timesheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || res.statusText);

      setMessage("Sent successfully");
      // reset form
      setForm({
        staffName: "",
        shiftLocation: "",
        companyAddress: "",
        contactNumber: "",
        email: "",
        weekStart: "",
        weekEnd: "",
        timesheet: daysOfWeek.map((day) => ({
          day,
          date: "",
          timeIn: "",
          timeOut: "",
          breakMins: "",
          notes: "",
        })),
      });
      setSignatureData("");
      setTypedName("");
    } catch (err: any) {
      console.error(err);
      setMessage("Send failed: " + err.message);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weekly Timesheet</h1>

      {/* Details Section */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Details</h2>
          {[
            { name: "staffName", label: "Staff Name", type: "text" },
            { name: "shiftLocation", label: "Shift Location", type: "text" },
            { name: "companyAddress", label: "Address", type: "text" },
            { name: "contactNumber", label: "Contact #", type: "tel" },
            { name: "email", label: "Email", type: "email" },
          ].map(({ name, label, type }) => (
            <div key={name} className="mb-2">
              <label htmlFor={name} className="block mb-1">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                autoComplete="off"
                value={(form as any)[name]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-semibold mb-2">Week Details</h2>
          <div className="mb-2">
            <label htmlFor="weekStart" className="block mb-1">
              Week Start
            </label>
            <input
              id="weekStart"
              name="weekStart"
              type="date"
              value={form.weekStart}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="weekEnd" className="block mb-1">
              Week End
            </label>
            <input
              id="weekEnd"
              name="weekEnd"
              type="date"
              readOnly
              value={form.weekEnd}
              className="w-full bg-gray-100 border p-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Timesheet Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr>
              {["Day", "Date", "In", "Out", "Break", "Total", "Client Initials"].map(
                (h) => (
                  <th key={h} className="border p-2 bg-gray-50">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {form.timesheet.map((r, i) => (
              <tr key={i}>
                <td className="border p-2">{r.day}</td>
                <td className="border p-2">
                  <input
                    name="date"
                    type="date"
                    value={r.date}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    name="timeIn"
                    type="time"
                    value={r.timeIn}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    name="timeOut"
                    type="time"
                    value={r.timeOut}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    name="breakMins"
                    type="number"
                    placeholder="mins"
                    value={r.breakMins}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2 text-center">
                  {Math.floor(computeRowMins(r) / 60)}h {computeRowMins(r) % 60}m
                </td>
                <td className="border p-2">
                  <input
                    name="notes"
                    type="text"
                    placeholder="Client Initials"
                    value={r.notes}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Display */}
      <div className="text-right font-semibold mb-6">
        Total {totalH}h {totalR}m
      </div>

      {/* Signature Section */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Signature</h2>
        <div className="flex items-center mb-2 space-x-4">
          <label>
            <input
              type="radio"
              name="sigMode"
              value="upload"
              checked={sigMode === "upload"}
              onChange={() => setSigMode("upload")}
            />{" "}
            Upload Image
          </label>
          <label>
            <input
              type="radio"
              name="sigMode"
              value="type"
              checked={sigMode === "type"}
              onChange={() => setSigMode("type")}
            />{" "}
            Type Name
          </label>
        </div>
        {sigMode === "upload" ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="block mb-2"
            />
            {signatureData && (
              <img
                src={signatureData}
                alt="signature"
                className="mt-2 border rounded max-h-32"
              />
            )}
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Type your name"
              value={typedName}
              onChange={(e) => {
                setTypedName(e.target.value);
                setSigError(false);
              }}
              className="w-full border p-2 rounded mb-2"
            />
            {typedName && (
              <p className="italic text-lg border-b pb-1">{typedName}</p>
            )}
          </>
        )}
        {sigError && <p className="text-red-600 mt-1">Signature is required</p>}
      </div>

      {/* Actions + Message */}
      <div className="flex flex-col items-end space-y-2">
        <div className="flex space-x-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2 bg-[#20bfa0] text-white rounded"
          >
            Print
          </button>
          <button
            onClick={submit}
            className="px-6 py-3 bg-[#20bfa0] text-white rounded"
          >
            Submit Timesheet
          </button>
        </div>
        {message && (
          <div
            className={`p-2 text-sm rounded w-full max-w-sm text-center ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
