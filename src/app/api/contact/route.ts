import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "info@1noblehealthcare.com",
      to: "info@1noblehealthcare.com",
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
        <h3>New Enquiry from Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
  }
}
