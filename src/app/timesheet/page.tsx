// src/app/timesheet/page.tsx
"use client"

import dynamic from "next/dynamic"
import React, { useState, useRef, useEffect } from "react"
import { format, addDays } from "date-fns"

// Load SignaturePad only in the browser
const SignaturePad = dynamic(() => import("react-signature-canvas"), {
  ssr: false,
}) as any

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

type Row = {
  day: string
  date: string
  timeIn: string
  timeOut: string
  breakMins: string
  notes: string
}

export default function TimesheetPage() {
  const [form, setForm] = useState<{
    clientName: string
    site: string
    companyAddress: string
    contactNumber: string
    email: string
    weekStart: string
    weekEnd: string
    timesheet: Row[]
  }>({
    clientName: "",
    site: "",
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
  })

  const [message, setMessage] = useState<string | null>(null)
  const sigPadRef = useRef<any>(null)
  const [sigError, setSigError] = useState(false)
  const [isSigned, setIsSigned] = useState(false)

  // Auto‑fill dates & weekEnd
  useEffect(() => {
    if (!form.weekStart) return
    const start = new Date(form.weekStart)
    setForm((f) => ({
      ...f,
      weekEnd: format(addDays(start, 6), "yyyy-MM-dd"),
      timesheet: f.timesheet.map((r, i) => ({
        ...r,
        date: format(addDays(start, i), "yyyy-MM-dd"),
      })),
    }))
  }, [form.weekStart])

  // Calculate minutes per row
  const computeRowMins = (r: Row) => {
    if (!r.timeIn || !r.timeOut) return 0
    const [h1, m1] = r.timeIn.split(":").map(Number)
    const [h2, m2] = r.timeOut.split(":").map(Number)
    const worked = h2 * 60 + m2 - (h1 * 60 + m1)
    const brk = Number(r.breakMins) || 0
    return Math.max(worked - brk, 0)
  }

  // Grand totals
  const totalMins = form.timesheet.reduce(
    (sum, r) => sum + computeRowMins(r),
    0
  )
  const totalH = Math.floor(totalMins / 60)
  const totalR = totalMins % 60

  // Handle input change
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    idx?: number
  ) {
    const { name, value } = e.target
    if (typeof idx === "number") {
      setForm((f) => {
        const ts = [...f.timesheet]
        ts[idx] = { ...ts[idx], [name]: value }
        return { ...f, timesheet: ts }
      })
    } else {
      setForm((f) => ({ ...f, [name]: value }))
    }
  }

  // Clear signature
  function clearSig() {
    sigPadRef.current?.clear()
    setSigError(false)
    setIsSigned(false)
  }

  // Submit handler
  async function submit() {
    if (!isSigned || sigPadRef.current?.isEmpty()) {
      setSigError(true)
      setMessage("Please sign before sending")
      return
    }
    setSigError(false)
    setMessage("Sending…")

    if (
      !sigPadRef.current ||
      typeof sigPadRef.current.getTrimmedCanvas !== "function"
    ) {
      setMessage("Signature pad not ready")
      return
    }

    const canvas = sigPadRef.current.getTrimmedCanvas()
    if (!canvas) {
      setMessage("Unexpected signature error")
      return
    }

    const payload = {
      ...form,
      signature: canvas.toDataURL("image/png"),
    }

    try {
      const res = await fetch("/api/timesheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || res.statusText)

      setMessage("Sent successfully")
      // Reset form
      setForm({
        clientName: "",
        site: "",
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
      })
      clearSig()
    } catch (err: any) {
      setMessage("Send failed: " + err.message)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weekly Timesheet</h1>

      {message && (
        <div
          className={`p-2 mb-4 rounded ${
            message.includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Client & Week */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Client Details</h2>
          {[
            { name: "clientName", label: "Client Name", type: "text" },
            { name: "site", label: "Site", type: "text" },
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
                onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
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

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr>
              {["Day", "Date", "In", "Out", "Break", "Total", "Notes"].map(
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
                    id={`date-${i}`}
                    name="date"
                    type="date"
                    value={r.date}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    id={`timeIn-${i}`}
                    name="timeIn"
                    type="time"
                    value={r.timeIn}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    id={`timeOut-${i}`}
                    name="timeOut"
                    type="time"
                    value={r.timeOut}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    id={`breakMins-${i}`}
                    name="breakMins"
                    type="number"
                    placeholder="mins"
                    value={r.breakMins}
                    onChange={(e) => handleChange(e, i)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2 text-center">
                  {Math.floor(computeRowMins(r) / 60)}h{" "}
                  {computeRowMins(r) % 60}m
                </td>
                <td className="border p-2">
                  <input
                    id={`notes-${i}`}
                    name="notes"
                    type="text"
                    placeholder="Notes"
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

      {/* Totals */}
      <div className="text-right font-semibold mb-6">
        Total {totalH}h {totalR}m
      </div>

      {/* Signature */}
      <div className="mb-6">
        <label htmlFor="sigpad" className="block mb-2">
          Signature
        </label>
        <SignaturePad
          ref={(c: any) => {
            sigPadRef.current = c
          }}
          canvasProps={{ id: "sigpad", className: "w-full h-36 border rounded" }}
          onEnd={() => setIsSigned(true)}
        />
        {sigError && <p className="text-red-600 mt-1">Signature required</p>}
        <button
          onClick={clearSig}
          type="button"
          className="mt-2 px-4 py-2 bg-[#20bfa0] text-white rounded"
        >
          Clear Signature
        </button>
      </div>

      {/* Actions */}  
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => window.print()}
          disabled={!isSigned}
          className="px-5 py-2 bg-[#20bfa0] text-white rounded disabled:opacity-50"
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
    </div>
  )
}
