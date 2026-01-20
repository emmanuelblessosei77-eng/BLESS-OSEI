import React from 'react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useSiteInfo } from '../context/PageDataContext'
import ContactForm from './ContactForm'
import './Contact.css'

const Contact = () => {
  const { siteInfo } = useSiteInfo()

  return (
    <div className="contact-page">
      <ContactForm />
    </div>
  )
}

export default Contact




