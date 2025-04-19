// app/api/apply/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const file = formData.get('cv') as File;

  if (!file || !email || !name) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  // Convert file to base64
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer).toString('base64');

  const fileName = file.name;
  const mimeType = file.type;

  try {
    await resend.emails.send({
      from: 'info@1noblehealthcare.com',
      to: 'info@1noblehealthcare.com',
      subject: `New Job Application from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
      attachments: [
        {
          filename: fileName,
          content: buffer,
          contentType: mimeType,
        },
      ],
    });

    return NextResponse.json({ message: 'Application sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
