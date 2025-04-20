// app/api/send-timesheet/route.ts

import { NextResponse } from "next/server"
import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  console.error("🚨 Missing RESEND_API_KEY")
}

const resend = new Resend(process.env.RESEND_API_KEY || "")

export const runtime = "edge"

export async function POST(request: Request) {
  let data: any
  try {
    data = await request.json()
  } catch (err) {
    console.error("🚨 Invalid JSON:", err)
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
      <h1 style="color:#20bfa0;">
        Timesheet for week ending ${data.weekEnd || "N/A"}
      </h1>
      <p><strong>Client:</strong> ${data.clientName}</p>
      <p><strong>Site:</strong> ${data.site}</p>
      <table style="width:100%; border-collapse:collapse; margin-top:15px;">
        <thead>
          <tr style="background:#20bfa0; color:#fff;">
            <th style="padding:8px; border:1px solid #ddd;">Day</th>
            <th style="padding:8px; border:1px solid #ddd;">Date</th>
            <th style="padding:8px; border:1px solid #ddd;">In</th>
            <th style="padding:8px; border:1px solid #ddd;">Out</th>
            <th style="padding:8px; border:1px solid #ddd;">Break</th>
          </tr>
        </thead>
        <tbody>
          ${data.timesheet
            .map((r: any) => `
              <tr>
                <td style="padding:8px; border:1px solid #ddd;">${r.day}</td>
                <td style="padding:8px; border:1px solid #ddd;">${r.date || "-"}</td>
                <td style="padding:8px; border:1px solid #ddd;">${r.timeIn || "-"}</td>
                <td style="padding:8px; border:1px solid #ddd;">${r.timeOut || "-"}</td>
                <td style="padding:8px; border:1px solid #ddd;">${r.breakMins || 0}m</td>
              </tr>
            `)
            .join("")}
        </tbody>
      </table>
      <div style="margin-top:20px;">
        <img src="${data.signature}" alt="signature" style="max-width:100%;height:auto;"/>
      </div>
    </div>
  `

  // build recipients array: always finance, plus the user if they gave an email
  const recipients = ["finance@1noblehealthcare.com"]
  if (data.email) recipients.push(data.email)

  console.log("✉️  Sending to:", recipients.join(", "))

  try {
    await resend.emails.send({
      from: "Noble Healthcare <info@1noblehealthcare.com>",
      to: recipients,
      subject: `Timesheet – ${data.clientName || "Unknown client"}`,
      html,
    })
    console.log("✅ Email sent successfully")
    return NextResponse.json({ message: "Sent to finance and user" })
  } catch (err: any) {
    console.error("🚨 Failed to send email:", err)
    return NextResponse.json(
      { message: "Failed to send email: " + err.message },
      { status: 500 }
    )
  }
}
