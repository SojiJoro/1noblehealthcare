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

    // Title
    doc.fontSize(18).text(`Timesheet – ${data.clientName}`, { align: "center" });
    doc.moveDown(0.5).fontSize(12).text(`Week ending ${data.weekEnd}`, { align: "center" });
    doc.moveDown(1);

    // Table header
    const startX = 50;
    const col1 = 150, col2 = 100;
    doc.fontSize(10)
      .text("Day (Date)", startX, doc.y)
      .text("In–Out", startX + col1, doc.y)
      .text("Notes", startX + col1 + col2, doc.y);
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
    if (typeof data.signature === "string" && data.signature.startsWith("data:")) {
      const imgBuf = Buffer.from(data.signature.split(",")[1], "base64");
      doc.image(imgBuf, startX + 80, doc.y, { width: 200 });
    } else {
      doc.font("Helvetica-Oblique").text(data.signature, startX + 80, doc.y);
    }

    doc.end();
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // GET health check
  if (req.method === "GET") {
    return res.status(200).json({ message: "Healthy", status: "ok" });
  }

  // Only POST for submissions
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

  const data = req.body;
  // Validate
  if (
    !data.clientName ||
    !data.weekEnd ||
    !Array.isArray(data.timesheet) ||
    typeof data.signature !== "string"
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Build HTML for the email body
  const signatureHtml = data.signature.startsWith("data:")
    ? `<img src="${data.signature}" alt="signature" style="max-width:300px;"/>`
    : `<p style="font-style:italic;">${data.signature}</p>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
      <h1>Timesheet – ${data.clientName}</h1>
      <p>Week ending ${data.weekEnd}</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="border:1px solid #ddd;padding:8px">Day</th>
            <th style="border:1px solid #ddd;padding:8px">Time</th>
            <th style="border:1px solid #ddd;padding:8px">Notes</th>
          </tr>
        </thead>
        <tbody>
          ${data.timesheet.map((r: any) => `
            <tr>
              <td style="border:1px solid #ddd;padding:8px">${r.day} (${r.date})</td>
              <td style="border:1px solid #ddd;padding:8px">${r.timeIn}–${r.timeOut}</td>
              <td style="border:1px solid #ddd;padding:8px">${r.notes||""}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      ${signatureHtml}
    </div>
  `;

  // Generate the PDF server‑side
  let pdfBuf: Buffer;
  try {
    pdfBuf = await buildPdf(data);
  } catch (err: any) {
    console.error("🚨 PDF generation error:", err);
    return res.status(500).json({ message: "PDF generation failed" });
  }

  // Send email to finance with PDF attached
  try {
    await resend.emails.send({
      from: "Noble Healthcare <info@1noblehealthcare.com>",
      to: ["finance@1noblehealthcare.com"],
      subject: `Timesheet – ${data.clientName} – ${data.weekEnd}`,
      html,
      attachments: [
        {
          filename: `Timesheet_${data.clientName}_${data.weekEnd}.pdf`,
          content: pdfBuf.toString("base64"),
        },
      ],
    });
  } catch (err: any) {
    console.error("🚨 Finance email failed:", err);
    return res.status(500).json({ message: "Finance send failed" });
  }

  // Confirmation to user (no attachment)
  if (data.email) {
    try {
      await resend.emails.send({
        from: "Noble Healthcare <info@1noblehealthcare.com>",
        to: [data.email],
        subject: `Your Timesheet – Week Ending ${data.weekEnd}`,
        html,
      });
    } catch (userErr: any) {
      console.error("⚠️ User confirmation failed:", userErr);
    }
  }

  return res.status(200).json({ message: "Sent" });
}
