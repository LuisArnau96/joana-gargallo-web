import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Web Joana <onboarding@resend.dev>',
    to: 'joanagargalloantoni@gmail.com',
    replyTo: email,
    subject: `Mensaje de ${name} — joanayog.vercel.app`,
    text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
