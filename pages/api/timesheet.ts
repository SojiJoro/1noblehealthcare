// pages/api/timesheet.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

type Data = { message: string; status?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Health check for GET
  if (req.method === "GET") {
    return res
      .status(200)
      .json({ message: "Timesheet API healthy", status: "healthy" });
  }

  // Only POST is allowed for submission
  if (req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("🚨 Missing RESEND_API_KEY");
    return res.status(500).json({ message: "Missing RESEND_API_KEY" });
  }
  const resend = new Resend(apiKey);

  let data: any;
  try {
    data = req.body;
    console.log("📥 Received payload:", {
      clientName: data.clientName,
      weekEnd: data.weekEnd,
      email: data.email,
    });
  } catch (e) {
    console.error("🚨 JSON parse error:", e);
    return res.status(400).json({ message: "Invalid JSON" });
  }

  if (!data.clientName || !data.weekEnd) {
    console.error("🚨 Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Build signature HTML: image if data URL, otherwise text
  const signatureHtml = data.signature.startsWith("data:")
    ? `<img src="${data.signature}" alt="signature" style="margin-top:20px; max-width:300px;"/>`
    : `<p style="font-style:italic; margin-top:20px;">${data.signature}</p>`;

  // Build your full email HTML
  const html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
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
          ${data.timesheet
            .map(
              (r: any) => `
            <tr>
              <td style="border:1px solid #ddd; padding:8px;">
                ${r.day} (${r.date})
              </td>
              <td style="border:1px solid #ddd; padding:8px;">
                ${r.timeIn}–${r.timeOut}
                ${r.breakMins ? `(${r.breakMins}m break)` : ""}
              </td>
              <td style="border:1px solid #ddd; padding:8px;">
                ${r.notes || ""}
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>

      ${signatureHtml}
    </div>
  `;

  // Send to finance
  try {
    await resend.emails.send({
      from: "Noble Healthcare <info@1noblehealthcare.com>",
      to: ["finance@1noblehealthcare.com"],
      subject: `Timesheet – ${data.clientName} – ${data.weekEnd}`,
      html,
    });
    console.log("✅ Finance email sent");
  } catch (err: any) {
    console.error("🚨 Finance send failed", err);
    return res.status(500).json({ message: "Finance send failed" });
  }

  // Send confirmation to user
  if (data.email) {
    try {
      await resend.emails.send({
        from: "Noble Healthcare <info@1noblehealthcare.com>",
        to: [data.email],
        subject: `Timesheet Confirmation – Week Ending ${data.weekEnd}`,
        html,
      });
      console.log("✅ User confirmation sent");
    } catch (err: any) {
      console.error("⚠️ User send failed", err);
    }
  }

  return res.status(200).json({ message: "Sent" });
}
