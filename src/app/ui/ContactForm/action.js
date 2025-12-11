'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData) {
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const name = `${firstName} ${lastName}`;
    const email = formData.get('email');
    const message = formData.get('message');

    try {
        await resend.emails.send({
            from: 'contact@navneelnandran.dev',
            to: 'navneel.nandran@gmail.com',
            subject: `New Contact Form Message from ${name}`,
            html: `<p><strong>${name}</strong> wrote:</p><p>${message}</p><p>Email: ${email}</p>`,
        });
    } catch (error) {
        console.error('Email failed:', error);
        throw new Error('Email failed');
    }
}
