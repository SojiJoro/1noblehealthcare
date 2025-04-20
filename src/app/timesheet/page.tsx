"use client"

import React, { useState, useRef, useEffect } from "react"
import SignaturePad from "react-signature-canvas"
import { format, addDays } from "date-fns"

const daysOfWeek = [
  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
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
    timesheet: daysOfWeek.map(day => ({
      day, date: "", timeIn: "", timeOut: "", breakMins: "", notes: ""
    })),
  })

  const [message, setMessage] = useState<string | null>(null)
  const sigPad = useRef<SignaturePad>(null)
  const [sigError, setSigError] = useState(false)
  const [isSigned, setIsSigned] = useState(false)

  // Fill dates & weekEnd
  useEffect(() => {
    if (!form.weekStart) return
    const start = new Date(form.weekStart)
    setForm(f => ({
      ...f,
      weekEnd: format(addDays(start, 6), "yyyy-MM-dd"),
      timesheet: f.timesheet.map((r, i) => ({
        ...r,
        date: format(addDays(start, i), "yyyy-MM-dd"),
      })),
    }))
  }, [form.weekStart])

  // Compute minutes for one row
  const computeRowMins = (r: Row) => {
    if (!r.timeIn || !r.timeOut) return 0
    const [h1, m1] = r.timeIn.split(":").map(Number)
    const [h2, m2] = r.timeOut.split(":").map(Number)
    const worked = h2*60 + m2 - (h1*60 + m1)
    const brk = Number(r.breakMins) || 0
    return Math.max(worked - brk, 0)
  }

  // Grand totals
  const totalMins = form.timesheet.reduce((s,r) => s + computeRowMins(r), 0)
  const totalH = Math.floor(totalMins/60)
  const totalR = totalMins%60

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i?: number
  ) => {
    const { name, value } = e.target
    if (typeof i === "number") {
      setForm(f => {
        const ts = [...f.timesheet]
        // @ts-ignore
        ts[i][name] = value
        return { ...f, timesheet: ts }
      })
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const clearSig = () => {
    sigPad.current?.clear()
    setSigError(false)
    setIsSigned(false)
  }

  const submit = async () => {
    console.log("↗️ submit()", { isSigned })
    if (!isSigned) {
      setSigError(true)
      setMessage("Please sign before sending")
      return
    }
    setSigError(false)
    setMessage("Sending…")

    const payload = {
      ...form,
      signature: sigPad.current?.getTrimmedCanvas().toDataURL("image/png"),
    }
    console.log("📨 payload:", payload)

    try {
      const endpoint = `${window.location.origin}/api/send-timesheet`
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      console.log("⬅️ status", res.status)
      const json = await res.json()
      console.log("⬅️ json", json)

      if (!res.ok) {
        throw new Error(json.message || res.statusText)
      }
      setMessage("Sent successfully")
      // reset
      setForm({
        clientName: "", site: "", companyAddress: "",
        contactNumber: "", email: "",
        weekStart: "", weekEnd: "",
        timesheet: daysOfWeek.map(day => ({
          day, date: "", timeIn: "", timeOut: "", breakMins: "", notes: ""
        })),
      })
      clearSig()
    } catch (err: any) {
      console.error("❌ submit error", err)
      setMessage("Send failed: " + err.message)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Weekly Timesheet</h1>
      {message && <p className="mb-4 text-center">{message}</p>}

      {/* Client & Week */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Client Details</h2>
          {[
            { name:"clientName",type:"text" },
            { name:"site",type:"text" },
            { name:"companyAddress",type:"text" },
            { name:"contactNumber",type:"text" },
            { name:"email",type:"email" },
          ].map(fld=>(
            <div key={fld.name} className="mb-2">
              <label className="block mb-1 capitalize">{fld.name}</label>
              <input
                name={fld.name}
                type={fld.type}
                value={(form as any)[fld.name]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold mb-2">Week Details</h2>
          <div className="mb-2">
            <label className="block mb-1">Start</label>
            <input
              type="date"
              name="weekStart"
              value={form.weekStart}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">End</label>
            <input
              type="date"
              name="weekEnd"
              readOnly
              value={form.weekEnd}
              className="w-full bg-gray-100 border p-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Timesheet */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            {["Day","Date","In","Out","Break","Total","Notes"].map(h=>(
              <th key={h} className="border p-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {form.timesheet.map((r,i)=>(
            <tr key={i}>
              <td className="border p-2">{r.day}</td>
              <td className="border p-2">
                <input
                  type="date" name="date"
                  value={r.date}
                  onChange={e=>handleChange(e,i)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="time" name="timeIn"
                  value={r.timeIn}
                  onChange={e=>handleChange(e,i)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="time" name="timeOut"
                  value={r.timeOut}
                  onChange={e=>handleChange(e,i)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number" name="breakMins"
                  placeholder="mins"
                  value={r.breakMins}
                  onChange={e=>handleChange(e,i)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-2 text-center">
                {Math.floor(computeRowMins(r)/60)}h {computeRowMins(r)%60}m
              </td>
              <td className="border p-2">
                <input
                  name="notes" value={r.notes}
                  onChange={e=>handleChange(e,i)}
                  className="w-full p-1 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right font-semibold mb-6">
        Total {totalH}h {totalR}m
      </div>

      {/* Signature */}
      <div className="mb-6">
        <label className="block mb-2">Signature</label>
        <SignaturePad
          ref={sigPad}
          canvasProps={{ className:"w-full h-36 border rounded" }}
          onEnd={()=>setIsSigned(true)}
        />
        {sigError && <p className="text-red-600 mt-1">Signature required</p>}
        <button
          onClick={clearSig}
          type="button"
          className="mt-3 px-4 py-2 bg-[#20bfa0] border border-[#20bfa0] text-white rounded hover:bg-[#1aa78f] transition"
        >
          Clear Signature
        </button>
      </div>

      {/* Print & Submit */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={()=>window.print()}
          disabled={!isSigned}
          className="px-5 py-2 bg-[#20bfa0] border border-[#20bfa0] text-white rounded hover:bg-[#1aa78f] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Print
        </button>
        <button
          onClick={submit}
          className="px-6 py-3 bg-[#20bfa0] border border-[#20bfa0] text-white rounded hover:bg-[#1aa78f] transition"
        >
          Submit Timesheet
        </button>
      </div>
    </div>
  )
}
