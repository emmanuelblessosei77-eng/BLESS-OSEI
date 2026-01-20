import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useSiteInfo } from '../context/PageDataContext';
import validation from '../utils/validation';
import '../pages/ContactForm.css';

function ContactForm() {
  const { siteInfo, businessHours } = useSiteInfo()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = validation.getErrorMessage('name', 'required');
    } else if (!validation.isValidName(formData.name)) {
      newErrors.name = validation.getErrorMessage('name', 'invalid');
    }

    if (!formData.email.trim()) {
      newErrors.email = validation.getErrorMessage('email', 'required');
    } else if (!validation.isValidEmail(formData.email)) {
      newErrors.email = validation.getErrorMessage('email', 'invalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = validation.getErrorMessage('phone', 'required');
    } else if (!validation.isValidPhone(formData.phone)) {
      newErrors.phone = validation.getErrorMessage('phone', 'invalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = validation.getErrorMessage('message', 'required');
    } else if (!validation.isValidMessage(formData.message)) {
      newErrors.message = validation.getErrorMessage('message', 'invalid');
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setErrors({});
      setIsSubmitting(false);

      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-form-wrapper">
      <div className="contact-container">

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions? We're here to help. Fill out the form and we'll get back to you as soon as possible.</p>

          <div className="info-items">
            <div className="info-item">
              <div className="info-icon"><FiPhone /></div>
              <div className="info-content">
                <h4>Phone</h4>
                <p>{siteInfo.phone}</p>
                <p className="small">Available {businessHours.emergency}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><FiMail /></div>
              <div className="info-content">
                <h4>Email</h4>
                <p>{siteInfo.email}</p>
                <p className="small">Response within 24 hours</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><FiMapPin /></div>
              <div className="info-content">
                <h4>Address</h4>
                <p>{siteInfo.address}</p>
              </div>
            </div>
          </div>

          <div className="contact-hours">
            <h4>Business Hours</h4>
            <div className="hours-item"><span>Weekdays:</span> <span>{businessHours.weekday}</span></div>
            <div className="hours-item"><span>Weekend:</span> <span>{businessHours.weekend}</span></div>
            <div className="hours-item emergency"><span>Emergency:</span> <span>{businessHours.emergency}</span></div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-box">
          <h3>Send us a Message</h3>

          {submitted && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h4>Thank You!</h4>
              <p>We've received your message and will get back to you shortly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={submitted ? 'hidden' : ''}>
            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (123) 456-7890"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Plumbing Issue"
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your plumbing issue..."
                rows="6"
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Sending...
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default ContactForm;
