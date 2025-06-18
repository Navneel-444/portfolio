import './ContactSection.scss'
import ContactInfo from '@/app/ui/ContactInfo/ContactInfo'
import ContactForm from '@/app/ui/ContactForm/ContactForm'

export default function ContactSection() {
    return (
        <div className="contact-section">
            <ContactInfo />
            <ContactForm />
        </div>
    )
}