import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiPhone, FiChevronDown } from 'react-icons/fi'
import './Navigation.css'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [location])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { 
      path: '/services', 
      label: 'Services',
      submenu: [
        { path: '/services#kitchen', label: 'Kitchen Plumbing' },
        { path: '/services#gas', label: 'Gas Line Services' },
        { path: '/services#water', label: 'Water Line Repair' },
        { path: '/services#bathroom', label: 'Bathroom Plumbing' },
        { path: '/services#basement', label: 'Basement Plumbing' },
        { path: '/services#remodeling', label: 'Remodeling Service' },
      ]
    },
    { path: '/blog', label: 'Blog' },
    { 
      path: '#', 
      label: 'Pages',
      submenu: [
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact Us' },
        { path: '/appointment', label: 'Book Appointment' },
        { path: '/blog', label: 'Blog' },
      ]
    },
    { 
      path: '#', 
      label: 'Shop',
      submenu: [
        { path: '/services', label: 'All Services' },
        { path: '/services', label: 'Emergency Services' },
        { path: '/services', label: 'Premium Packages' },
        { path: '/services', label: 'Maintenance Plans' },
      ]
    },
  ]

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <a href="tel:+18001234567" className="phone-link">
                <FiPhone /> +1 800 123 456 789
              </a>
              <span className="divider">|</span>
              <span className="hours">Sun - Fri || 8:00 - 7:00</span>
            </div>
            <div className="top-bar-right">
              <Link to="/appointment" className="book-btn">BOOK ONLINE</Link>
            </div>
          </div>
        </div>
      </div>
      
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="logo">
              <span className="logo-text">PLUMCO</span>
            </Link>
            
            <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
              {navLinks.map((link) => (
                <li key={link.path} className="nav-item">
                  <div className="nav-link-wrapper">
                    <Link 
                      to={link.path} 
                      className={location.pathname === link.path ? 'active' : ''}
                    >
                      {link.label}
                      {link.submenu && <FiChevronDown className="chevron" />}
                    </Link>
                    {link.submenu && (
                      <button 
                        className="dropdown-toggle"
                        onClick={() => toggleDropdown(link.label)}
                        aria-expanded={openDropdown === link.label}
                      >
                        <FiChevronDown />
                      </button>
                    )}
                  </div>
                  {link.submenu && (
                    <ul className={`dropdown-menu ${openDropdown === link.label ? 'active' : ''}`}>
                      {link.submenu.map((item, idx) => (
                        <li key={idx}>
                          <Link to={item.path}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation




