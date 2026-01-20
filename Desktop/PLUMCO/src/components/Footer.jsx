import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <FiFacebook />, url: '#', label: 'Facebook' },
    { icon: <FiTwitter />, url: '#', label: 'Twitter' },
    { icon: <FiInstagram />, url: '#', label: 'Instagram' },
    { icon: <FiLinkedin />, url: '#', label: 'LinkedIn' },
  ]

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">PLUMCO</h3>
            <p className="footer-description">
              Providing premium solutions and exceptional service to help your business thrive.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#kitchen">Kitchen Plumbing</a></li>
              <li><a href="#gas">Gas Line Services</a></li>
              <li><a href="#water">Water Line Repair</a></li>
              <li><a href="#bathroom">Bathroom Plumbing</a></li>
              <li><a href="#basement">Basement Plumbing</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <FiMapPin className="contact-icon" />
                <span>7 Green Lake Street Crawfordsville, IN 47933</span>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <span>+1 800 123 456 789</span>
              </li>
              <li>
                <FiMail className="contact-icon" />
                <span>Plumco@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2022 Plumco by wpOceans. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer




