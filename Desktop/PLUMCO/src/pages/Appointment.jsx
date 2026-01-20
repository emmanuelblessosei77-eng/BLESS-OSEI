import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { useServices, useSiteInfo, useConfig } from '../context/PageDataContext'
import { validation } from '../utils/validation'
import './Appointment.css'

const Appointment = () => {
  const { services } = useServices()
  const { siteInfo } = useSiteInfo()
  const { timeSlots } = useConfig()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    address: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validation.isValidName(formData.fullName)) {
      newErrors.fullName = 'Please enter your full name'
    }

    if (!validation.isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!validation.isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    if (!formData.date) {
      newErrors.date = 'Please select an appointment date'
    }

    if (!formData.time) {
      newErrors.time = 'Please select an appointment time'
    }

    if (!formData.address) {
      newErrors.address = 'Please enter your address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Appointment booked:', formData)
      setSubmitted(true)
      setIsSubmitting(false)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          address: '',
          notes: '',
        })
        setSubmitted(false)
      }, 3000)
    }, 1500)
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="appointment">
      {/* Hero Section */}
      <section className="appointment-hero">
        <div className="container">
          <h1 className="page-title">Book Your Appointment</h1>
          <p className="page-subtitle">
            Schedule a convenient time for our expert plumbers to visit you
          </p>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="appointment-section">
        <div className="container">
          <div className="appointment-wrapper">
            {/* Left Column - Info */}
            <div className="appointment-info">
              <h2>Why Choose Our Appointment System?</h2>
              <p>Our online booking system makes it easy to schedule your plumbing service.</p>

              <div className="info-cards">
                <div className="info-card">
                  <FiClock className="info-icon" />
                  <h3>Save Time</h3>
                  <p>Quick and easy online booking without phone calls</p>
                </div>

                <div className="info-card">
                  <FiCalendar className="info-icon" />
                  <h3>Choose Your Time</h3>
                  <p>Select from available time slots that work for you</p>
                </div>

                <div className="info-card">
                  <FiUser className="info-icon" />
                  <h3>Expert Plumbers</h3>
                  <p>All our technicians are licensed and fully insured</p>
                </div>

                <div className="info-card">
                  <FiPhone className="info-icon" />
                  <h3>24/7 Support</h3>
                  <p>Call us anytime for emergency plumbing services</p>
                </div>
              </div>

              <div className="contact-info">
                <h3>Need Help?</h3>
                <p>Contact us directly:</p>
                <div className="contact-details">
                  <div className="contact-item">
                    <FiPhone /> <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
                  </div>
                  <div className="contact-item">
                    <FiMail /> <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
                  </div>
                  <div className="contact-item">
                    <FiMapPin /> {siteInfo.address}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="appointment-form-wrapper">
              <div className="form-header">
                <h2>Book Your Appointment</h2>
                <p>Fill in the details below and we'll confirm your booking</p>
              </div>

              <form className="appointment-form" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="address">Service Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Your service address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                {/* Service */}
                <div className="form-group">
                  <label htmlFor="service">Service Required *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={errors.service ? 'error' : ''}
                  >
                    <option value="">Select a service...</option>
                    {services.map(svc => (
                      <option key={svc.id} value={svc.id}>{svc.name}</option>
                    ))}
                  </select>
                  {errors.service && <span className="error-message">{errors.service}</span>}
                </div>

                {/* Date */}
                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? 'error' : ''}
                  />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>

                {/* Time */}
                <div className="form-group">
                  <label htmlFor="time">Preferred Time *</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? 'error' : ''}
                  >
                    <option value="">Select a time...</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <span className="error-message">{errors.time}</span>}
                </div>

                {/* Notes */}
                <div className="form-group full-width">
                  <label htmlFor="notes">Additional Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Any additional information about your plumbing issue..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>

                {/* Status Message */}
                {submitted && (
                  <div className="form-status success">
                    <div className="status-message">
                      <h3>Appointment Booked Successfully!</h3>
                      <p>We'll confirm your appointment shortly via email.</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting || submitted}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Booking...
                    </>
                  ) : submitted ? (
                    <>✓ Booked</>
                  ) : (
                    <>Book Appointment <FiArrowRight /></>
                  )}
                </button>

                <p className="form-note">
                  * Required fields. We respect your privacy and never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="appointment-cta">
        <div className="container">
          <h2>Need Emergency Service?</h2>
          <p>Our emergency plumbers are available 24/7</p>
          <div className="cta-buttons">
            <a href={`tel:${siteInfo.phone}`} className="btn btn-primary btn-large">
              CALL NOW <FiPhone />
            </a>
            <Link to="/contact" className="btn btn-secondary btn-large">
              CONTACT US <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Appointment
