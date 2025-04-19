import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  const data = await request.json();
  const { email, weekEnd, ...rest } = data;

  const html = `
    <h1>Timesheet Confirmation</h1>
    <p>Your timesheet for week ending <strong>${weekEnd}</strong> has been received.</p>
    <pre>${JSON.stringify(rest, null, 2)}</pre>
  `;

  // send to finance + to the carer
  await Promise.all([
    resend.emails.send({
      from: "info@1noblehealthcare.com",
      to: ["finance@1noblehealthcare.com"],
      subject: "New Timesheet Submission",
      html,
    }),
    resend.emails.send({
      from: "info@1noblehealthcare.com",
      to: [email],
      subject: "Your Timesheet Confirmation",
      html,
    }),
  ]);

  return NextResponse.json({
    message: "Timesheet submitted and confirmation email sent.",
  });
}
