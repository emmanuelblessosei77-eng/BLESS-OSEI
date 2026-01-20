import React, { useState } from 'react'
import { usePageData } from '../context/PageDataContext'
import './BookingForm.css'

const BookingForm = () => {
  const { services } = usePageData()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ fullName: '', email: '', phone: '', service: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Full name here*"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email here*"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Contact number*"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <select
        name="service"
        value={formData.service}
        onChange={handleChange}
        required
      >
        <option value="">Select service*</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary">
        {submitted ? 'Appointment Booked!' : 'GET AN APPOINTMENT'}
      </button>
    </form>
  )
}

export default BookingForm
