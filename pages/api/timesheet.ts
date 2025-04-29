// pages/api/timesheet.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import PDFDocument from "pdfkit";

type Data = { message: string; status?: string };

// Helper: build a PDF Buffer from the submitted data
async function buildPdf(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    const bufs: Buffer[] = [];
    doc.on("data", (b) => bufs.push(b));
    doc.on("end", () => resolve(Buffer.concat(bufs)));
    doc.on("error", reject);

    // Title and header
    doc
      .fontSize(18)
      .text(`Timesheet – ${data.staffName}`, { align: "center" })
      .moveDown(0.5)
      .fontSize(12)
      .text(`Week ending ${data.weekEnd}`, { align: "center" })
      .moveDown(0.5)
      .text(`Shift Location: ${data.shiftLocation}`, { align: "center" })
      .moveDown(0.5)
      .text(`Total Hours: ${data.totalHours}`, { align: "center" })
      .moveDown(1);

    // Table header
    const startX = 50;
    const col1 = 150, col2 = 100;
    doc.fontSize(10)
      .text("Day (Date)", startX, doc.y)
      .text("In–Out", startX + col1, doc.y)
      .text("Client Initials", startX + col1 + col2, doc.y);
    doc.moveDown(0.5);

    // Rows
    data.timesheet.forEach((r: any) => {
      doc.text(`${r.day} (${r.date})`, startX, doc.y)
         .text(`${r.timeIn}–${r.timeOut}`, startX + col1, doc.y)
         .text(r.notes || "", startX + col1 + col2, doc.y);
      doc.moveDown(0.5);
    });

    // Signature
    doc.moveDown(1).fontSize(12).text("Signature:", startX, doc.y);
    if (data.signature.startsWith("data:")) {
      const imgBuf = Buffer.from(data.signature.split(",")[1], "base64");
      doc.image(imgBuf, startX + 80, doc.y, { width: 200 });
    } else {
      doc.font("Helvetica-Oblique").text(data.signature, startX + 80, doc.y);
    }

    doc.end();
  });
}

// Helper: recalculate total hours safely
function calculateTotalHours(timesheet: any[]): string {
  let totalMinutes = 0;

  for (const entry of timesheet) {
    const { timeIn, timeOut, breakMins } = entry;
    if (!timeIn || !timeOut) continue;

    const [h1, m1] = timeIn.split(":").map(Number);
    const [h2, m2] = timeOut.split(":").map(Number);

    let start = h1 * 60 + m1;
    let end = h2 * 60 + m2;
    if (end < start) end += 24 * 60; // overnight shift

    const worked = Math.max(end - start - (Number(breakMins) || 0), 0);
    totalMinutes += worked;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Healthy", status: "ok" });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("🚨 Missing RESEND_API_KEY");
    return res.status(500).json({ message: "Missing RESEND_API_KEY" });
  }
  const resend = new Resend(apiKey);

  const body = req.body;

  // Ensure timesheet is present before recalculation
  if (!Array.isArray(body.timesheet)) {
    return res.status(400).json({ message: "Missing timesheet array" });
  }

  const data = {
    ...body,
    totalHours: calculateTotalHours(body.timesheet),
  };

  // Validate other required fields
  if (
    !data.staffName ||
    !data.weekEnd ||
    !data.shiftLocation ||
    typeof data.signature !== "string"
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Build HTML for finance email
  const signatureHtml = data.signature.startsWith("data:")
    ? `<img src="${data.signature}" alt="signature" style="max-width:300px;"/>`
    : `<p style="font-style:italic;">${data.signature}</p>`;

  const financeHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
      <h1>Timesheet – ${data.staffName}</h1>
      <p>Week ending ${data.weekEnd}</p>
      <p><strong>Shift Location:</strong> ${data.shiftLocation}</p>
      <p><strong>Total Hours:</strong> ${data.totalHours}</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="border:1px solid #ddd;padding:8px">Day</th>
            <th style="border:1px solid #ddd;padding:8px">Time</th>
            <th style="border:1px solid #ddd;padding:8px">Client Initials</th>
          </tr>
        </thead>
        <tbody>
          ${data.timesheet.map((r: any) => `
            <tr>
              <td style="border:1px solid #ddd;padding:8px">${r.day} (${r.date})</td>
              <td style="border:1px solid #ddd;padding:8px">${r.timeIn}–${r.timeOut}</td>
              <td style="border:1px solid #ddd;padding:8px">${r.notes || ""}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      ${signatureHtml}
    </div>
  `;

  // Build HTML for user confirmation email
  const userHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
      <h1>Your Submitted Timesheet</h1>
      <p><strong>Staff Name:</strong> ${data.staffName}</p>
      <p><strong>Week Ending:</strong> ${data.weekEnd}</p>
      <p><strong>Shift Location:</strong> ${data.shiftLocation}</p>
      <p><strong>Total Hours:</strong> ${data.totalHours}</p>
      <hr/>
      <p>Thank you for submitting your timesheet.</p>
    </div>
  `;

  // Generate PDF
  let pdfBuf: Buffer;
  try {
    pdfBuf = await buildPdf(data);
  } catch (err: any) {
    console.error("🚨 PDF generation error:", err);
    return res.status(500).json({ message: "PDF generation failed" });
  }

  // Send finance email with PDF
  try {
    await resend.emails.send({
      from: "Noble Healthcare <info@1noblehealthcare.com>",
      to: ["finance@1noblehealthcare.com"],
      subject: `Timesheet – ${data.staffName} – ${data.weekEnd}`,
      html: financeHtml,
      attachments: [
        {
          filename: `Timesheet_${data.staffName}_${data.weekEnd}.pdf`,
          content: pdfBuf.toString("base64"),
        },
      ],
    });
  } catch (err: any) {
    console.error("🚨 Finance email failed:", err);
    return res.status(500).json({ message: "Finance send failed" });
  }

  // Send user confirmation email
  if (data.email) {
    try {
      await resend.emails.send({
        from: "Noble Healthcare <info@1noblehealthcare.com>",
        to: [data.email],
        subject: `Your Timesheet – Week Ending ${data.weekEnd}`,
        html: userHtml,
      });
    } catch (userErr: any) {
      console.error("⚠️ User confirmation failed:", userErr);
    }
  }

  return res.status(200).json({ message: "Sent" });
}
