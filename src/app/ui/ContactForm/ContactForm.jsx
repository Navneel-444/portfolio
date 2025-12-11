'use client';
import './ContactForm.scss';
import { useEffect, useRef } from 'react';
import { analytics } from '@/app/firebase/firebase';
import { logEvent } from 'firebase/analytics';
import { sendEmail } from '../ContactForm/action';
import { useFormStatus } from 'react-dom';
import Form from 'next/form';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="form__button">
            <span className={pending ? 'form__button-text form__button-text--visible' : 'form__button-text'}>
                {pending ? 'Sending...' : 'Submit'}
            </span>
        </button>
    );
}

export default function ContactForm() {
    const filledFields = useRef(new Set());
    const submitted = useRef(false);
    const { ref: formRef, isVisible } = useIntersectionObserver({
        threshold: 0.3
    });

    const handleInput = (e) => {
        filledFields.current.add(e.target.name);
    };

    const handleClientSubmit = () => {
        submitted.current = true;

        if (analytics) {
            logEvent(analytics, 'submit_contact_form', {
                method: 'email_form',
                fields_filled: filledFields.current.size,
            });
        }
    };

    useEffect(() => {
        const handleUnload = () => {
            if (!submitted.current && filledFields.current.size > 0 && analytics) {
                logEvent(analytics, 'abandon_contact_form', {
                    fields_typed: filledFields.current.size,
                });
            }
        };

        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    return (
        <div ref={formRef} className={`form-wrapper ${isVisible ? 'form-wrapper--visible' : ''}`}>
            <Form
                className="form"
                action={(formData) => {
                    handleClientSubmit();
                    sendEmail(formData);
                }}
                autoComplete="off"
            >
                <div className="form__field form__field--name">
                    <label htmlFor="first-name" className="form__label">First Name</label>
                    <input
                        className="form__input"
                        type="text"
                        id="first-name"
                        name="firstName"
                        required
                        onChange={handleInput}
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
                        onChange={handleInput}
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
                        onChange={handleInput}
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
                        onChange={handleInput}
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
        </div>
    );
}
