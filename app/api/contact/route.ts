import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = schema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_EMAIL ?? 'joanagargalloantoni@gmail.com'

    if (!apiKey || apiKey === 'placeholder') {
      // En desarrollo sin Resend configurado, simulamos éxito
      console.log('[Contact form]', { name, email, message })
      return NextResponse.json({ ok: true })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Web Joana Gargallo <noreply@joanagargallo.es>',
      to: toEmail,
      replyTo: email,
      subject: `Mensaje de ${name} — Web Joana Gargallo`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 540px; margin: 0 auto; color: #2C2420;">
          <h2 style="font-weight: 300; font-size: 1.5rem; margin-bottom: 1rem;">
            Nuevo mensaje desde tu web
          </h2>
          <p style="margin-bottom: 0.5rem;"><strong>Nombre:</strong> ${name}</p>
          <p style="margin-bottom: 0.5rem;"><strong>Email:</strong> ${email}</p>
          <p style="margin-bottom: 1rem;"><strong>Mensaje:</strong></p>
          <p style="background: #F7F3EE; padding: 1rem; border-radius: 8px; line-height: 1.6;">
            ${message.replace(/\n/g, '<br>')}
          </p>
          <p style="margin-top: 2rem; font-size: 0.75rem; color: #8B7B6B;">
            Enviado desde joanagargallo.es
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Contact API]', err)
    return NextResponse.json({ error: 'Error enviando el mensaje' }, { status: 500 })
  }
}
