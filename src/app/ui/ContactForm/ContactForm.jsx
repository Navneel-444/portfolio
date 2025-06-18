'use client';
import './ContactForm.scss';
import Form from 'next/form';
import { useFormStatus } from 'react-dom';
import { sendEmail } from '../ContactForm/action';

function SubmitButton() {
    const { pending } = useFormStatus();
    return <button type="submit" disabled={pending} className="form__button">{pending ? 'Sending...' : 'Submit'} </button>;
}

export default function ContactForm() {
    return (
        <Form className='form' action={sendEmail} autoComplete="off">
            <div className="form__field form__field--name">
                <label htmlFor="first-name" className="form__label">First Name</label>
                <input
                    className="form__input"
                    type="text"
                    id="first-name"
                    name="firstName"
                    required
                    placeholder="Alex"
                    minLength={2}
                    maxLength={50}
                    pattern="[a-zA-Z\s.'-]+"
                    autoComplete="given-name"
                />
            </div>

            <div className="form__field form__field--name">
                <label htmlFor="last-name" className="form__label">Last Name</label>
                <input
                    className="form__input"
                    type="text"
                    id="last-name"
                    name="lastName"
                    required
                    placeholder="Rivera"
                    minLength={2}
                    maxLength={50}
                    pattern="[a-zA-Z\s.'-]+"
                    autoComplete="family-name"
                />
            </div>

            <div className="form__field">
                <label htmlFor="email" className="form__label">Email</label>
                <input
                    className="form__input"
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                    maxLength={254}
                    autoComplete="email"
                />
            </div>

            <div className="form__field">
                <label htmlFor="message" className="form__label">Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    className="form__input form__input--textbox"
                    placeholder="Your message..."
                    minLength={10}
                    maxLength={1000}
                />
            </div>

            <input
                type="text"
                name="bot-field"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
            />

            <SubmitButton />
        </Form>

    );
}
