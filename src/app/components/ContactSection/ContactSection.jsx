'use client';

import './ContactSection.scss'
import ContactInfo from '@/app/ui/ContactInfo/ContactInfo'
import ContactForm from '@/app/ui/ContactForm/ContactForm'
import useSectionViewTracker from '@/hooks/useSectionViewTracker';

export default function ContactSection() {
    useSectionViewTracker('contact');

    return (
        <div id='contact' className="contact-section">
            <ContactInfo />
            <ContactForm />
        </div>
    )
}