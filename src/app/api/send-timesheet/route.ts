// app/api/send‑timesheet/route.ts

import { NextResponse } from "next/server"
import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  console.error("🚨 Missing RESEND_API_KEY")
}

const resend = new Resend(process.env.RESEND_API_KEY)

export const runtime = "edge"

export async function POST(request: Request) {
  let data: any
  try {
    data = await request.json()
  } catch (e) {
    console.error("🚨 Invalid JSON", e)
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
  }

  console.log("📬 Received timesheet for", data.clientName, "– sending to finance first")

  // Build your HTML once
  const html = `
    <h1>Timesheet – ${data.clientName}</h1>
    <p>Week ending ${data.weekEnd}</p>
    <table>…</table>
    <img src="${data.signature}" alt="signature"/>
  `

  // 1) Send to finance
  try {
    await resend.emails.send({
      from: "Noble Healthcare <info@1noblehealthcare.com>",
      to: ["finance@1noblehealthcare.com"],
      subject: `Timesheet – ${data.clientName}`,
      html,
    })
    console.log("✅ Finance email sent")
  } catch (err: any) {
    console.error("🚨 Failed to send to finance", err)
    return NextResponse.json(
      { message: "Failed to send to finance: " + err.message },
      { status: 500 }
    )
  }

  // 2) Send confirmation to user, but don’t block on failure
  if (data.email) {
    try {
      await resend.emails.send({
        from: "Noble Healthcare <info@1noblehealthcare.com>",
        to: [data.email],
        subject: "Your Timesheet Confirmation",
        html,
      })
      console.log("✅ User confirmation sent to", data.email)
    } catch (err: any) {
      console.error("⚠️ Failed to send confirmation to user:", err)
      // we intentionally don’t return an error here
    }
  } else {
    console.log("⚠️ No user email provided, skipped user send")
  }

  // Always return success if finance send succeeded
  return NextResponse.json({ message: "Timesheet sent to finance and user" })
}
