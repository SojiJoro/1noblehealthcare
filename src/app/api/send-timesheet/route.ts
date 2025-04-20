// src/app/api/send-timesheet/route.ts

import { NextResponse } from "next/server"
import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  console.error("🚨 Missing RESEND_API_KEY in environment")
}

const resend = new Resend(process.env.RESEND_API_KEY!)

export const runtime = "edge"

export async function POST(request: Request) {
  let data: any
  try {
    data = await request.json()
    console.log("📥 Received payload:", {
      clientName: data.clientName,
      weekEnd: data.weekEnd,
      email: data.email
    })
  } catch (e) {
    console.error("🚨 JSON parse error:", e)
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 })
  }

  // Validate
  if (!data.clientName || !data.weekEnd) {
    console.error("🚨 Missing fields")
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
  }

  // Build HTML
  const html = `
    <h1>Timesheet – ${data.clientName}</h1>
    <p>Week ending ${data.weekEnd}</p>
    <table style="width:100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border:1px solid #ddd; padding:8px;">Day</th>
          <th style="border:1px solid #ddd; padding:8px;">Time</th>
          <th style="border:1px solid #ddd; padding:8px;">Notes</th>
        </tr>
      </thead>
      <tbody>
        ${data.timesheet.map((r: any) => `
          <tr>
            <td style="border:1px solid #ddd; padding:8px;">${r.day} (${r.date})</td>
            <td style="border:1px solid #ddd; padding:8px;">
              ${r.timeIn}–${r.timeOut} ${r.breakMins ? `(${r.breakMins}m break)` : ""}
            </td>
            <td style="border:1px solid #ddd; padding:8px;">${r.notes || ""}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <img src="${data.signature}" alt="signature" style="margin-top:20px; max-width:300px;"/>
  `

  // Send to finance
  try {
    await resend.emails.send({
      from: "Noble Healthcare <info@1noblehealthcare.com>",
      to: ["finance@1noblehealthcare.com"],
      subject: `Timesheet – ${data.clientName} – ${data.weekEnd}`,
      html,
    })
    console.log("✅ Finance email sent")
  } catch (err: any) {
    console.error("🚨 Finance send failed", err)
    return NextResponse.json({ message: "Finance send failed" }, { status: 500 })
  }

  // User confirmation
  if (data.email) {
    try {
      await resend.emails.send({
        from: "Noble Healthcare <info@1noblehealthcare.com>",
        to: [data.email],
        subject: `Timesheet Confirmation – Week Ending ${data.weekEnd}`,
        html,
      })
      console.log("✅ User confirmation sent")
    } catch (err: any) {
      console.error("⚠️ User send failed", err)
    }
  }

  return NextResponse.json({ message: "Sent" })
}
