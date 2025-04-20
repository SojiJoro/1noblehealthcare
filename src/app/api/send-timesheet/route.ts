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

  console.log("📬 Received timesheet for", data.clientName)

  const html = `
    <h1>Timesheet – ${data.clientName}</h1>
    <p>Week ending ${data.weekEnd}</p>
    <img src="${data.signature}" alt="signature"/>
  `

  // 1) Finance
  try {
    await resend.emails.send({
      from: "Noble Healthcare <info@1noblehealthcare.com>",
      to: ["finance@1noblehealthcare.com"],
      subject: `Timesheet – ${data.clientName}`,
      html,
    })
    console.log("✅ Finance email sent")
  } catch (err: any) {
    console.error("🚨 Finance send failed", err)
    return NextResponse.json({ message: "Failed to send to finance" }, { status: 500 })
  }

  // 2) User
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
      console.error("⚠️ User send failed", err)
    }
  }

  return NextResponse.json({ message: "Timesheet sent" })
}
