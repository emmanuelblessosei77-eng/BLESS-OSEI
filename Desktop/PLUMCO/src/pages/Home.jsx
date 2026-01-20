import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiTrendingUp, FiUsers, FiAward, FiZap, FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import { usePageData } from '../context/PageDataContext'
import StatCard from '../components/StatCard'
import ServiceCard from '../components/ServiceCard'
import TeamCard from '../components/TeamCard'
import ProjectCard from '../components/ProjectCard'
import TestimonialCard from '../components/TestimonialCard'
import SectionHeader from '../components/SectionHeader'
import BlogCard from '../components/BlogCard'
import BookingForm from '../components/BookingForm'
import ImagePlaceholder from '../components/ImagePlaceholder'
import './Home.css'

const Home = () => {
  // Get all data from context
  const { services, teamMembers, testimonials, blogPosts, projects, statistics, businessHours } = usePageData()
  
  // Local state for animations and interactions
  const [stats, setStats] = useState([
    { value: 0, label: 'Customer Review', icon: <FiUsers />, target: 89000 },
    { value: 0, label: 'Running Project', icon: <FiAward />, target: 200 },
    { value: 0, label: 'Team Member', icon: <FiTrendingUp />, target: 85 },
    { value: 0, label: 'Happy Clients', icon: <FiZap />, target: 39000 },
  ])

  const [activeService, setActiveService] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const animateStats = () => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.value < stat.target 
            ? Math.min(stat.value + Math.ceil(stat.target / 50), stat.target)
            : stat.target
        }))
      )
    }

    const interval = setInterval(animateStats, 30)
    return () => clearInterval(interval)
  }, [])

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="home">
      {/* Topbar */}
      <section className="topbar">
        <div className="container">
          <div className="topbar-content">
            <div className="topbar-left">
              <div className="topbar-item">
                <FiClock className="topbar-icon" />
                <span>{businessHours.weekday}</span>
              </div>
              <div className="topbar-item">
                <FiPhone className="topbar-icon" />
                <a href={`tel:${businessHours.phone || '+1234567890'}`}>{businessHours.phone || '+1 (234) 567-890'}</a>
              </div>
            </div>
            <div className="topbar-right">
              <select className="language-select">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Ready For Help You</h1>
            <p className="hero-subtitle">
              We are certified company. We provide best plumbing services for you & your company.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">
                BOOK ONLINE <FiArrowRight />
              </Link>
              <Link to="/services" className="btn btn-secondary">
                OUR SERVICES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="process-steps">
            <div className="step">
              <div className="step-icon">📋</div>
              <div className="step-number">1</div>
              <h3>Book Online</h3>
              <p>Schedule your appointment easily online</p>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-icon">🚗</div>
              <div className="step-number">2</div>
              <h3>We Arrive</h3>
              <p>Our team arrives at the scheduled time</p>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-icon">✅</div>
              <div className="step-number">3</div>
              <h3>Solve Problem</h3>
              <p>We solve your plumbing issues efficiently</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="service-types">
        <div className="container">
          <div className="service-boxes">
            <div className="service-box commercial">
              <h3>Commercial Plumbing</h3>
              <p>Professional plumbing solutions for your business needs and infrastructure requirements</p>
              <Link to="/services" className="link-arrow">Learn More <FiArrowRight /></Link>
            </div>
            <div className="service-box residential">
              <h3>Residential Plumbing</h3>
              <p>Quality plumbing services for your home and family comfort</p>
              <Link to="/services" className="link-arrow">Learn More <FiArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <SectionHeader 
            title="Best Service We Offer"
            subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been the industry's standard dummy text ever since the 1500s."
          />
          <div className="services-grid">
            {services.map((service, index) => {
              const serviceImages = ['service1', 'service2', 'service3']
              const templateImage = serviceImages[index % serviceImages.length]
              return (
                <div key={service.id} className="service-card-enhanced">
                  <div className="service-card-image">
                    <ImagePlaceholder 
                      templateImage={templateImage}
                      alt={service.name}
                      width="100%"
                      height="200px"
                      objectFit="cover"
                    />
                  </div>
                  <div className="service-card-content">
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <Link to="/services" className="link-arrow">
                      READ MORE <FiArrowRight />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <div className="container">
          <h2>We Provide Always Different From Other Services</h2>
          <div className="why-us-content">
            <div className="why-us-left">
              <div className="feature-list">
                <div className="feature-item">
                  <FiCheck />
                  <span>Highly Trained Staff</span>
                </div>
                <div className="feature-item">
                  <FiCheck />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="feature-item">
                  <FiCheck />
                  <span>Affordable Pricing</span>
                </div>
                <div className="feature-item">
                  <FiCheck />
                  <span>Fast Response Time</span>
                </div>
              </div>
            </div>
            <div className="why-us-right">
              <p>Our team of expert plumbers are dedicated to providing the highest quality service with exceptional customer care. We bring years of experience and expertise to every job, ensuring your plumbing issues are resolved efficiently and professionally.</p>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '20px' }}>
                ABOUT US <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-header">
            <h2>89K</h2>
            <p>Customer Review</p>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                target={stat.target}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <SectionHeader 
            title="Our Latest Project"
            subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been the industry's standard dummy text ever since the 1500s."
          />
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                title={project.title}
                category={project.category}
                image={project.image}
              />
            ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="btn btn-primary">
              View All Project
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="container">
          <SectionHeader 
            title="Latest Blog Posts"
            subtitle="Stay updated with our latest plumbing tips, maintenance guides, and industry insights."
          />
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <BlogCard 
                key={post.id}
                title={post.title}
                date={post.date}
                category={post.category}
                excerpt={post.excerpt}
                image={post.image}
              />
            ))}
          </div>
          <div className="text-center">
            <Link to="/blog" className="btn btn-primary">
              View All Blog Post
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <SectionHeader 
            title="Dedicated Member"
            subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been the industry's standard dummy text ever since the 1500s."
          />
          <div className="team-grid">
            {teamMembers.map((member, index) => {
              const teamImages = ['team1', 'team2', 'team3', 'team4']
              const templateImage = teamImages[index % teamImages.length]
              return (
                <TeamCard 
                  key={member.id}
                  name={member.name}
                  position={member.position}
                  image={member.image}
                  templateImage={templateImage}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <SectionHeader 
            title="What People's Say"
            subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been the industry's standard dummy text ever since the 1500s."
          />
          <div className="testimonials-carousel">
            <button className="carousel-btn prev" onClick={handlePrevTestimonial}>←</button>
            <TestimonialCard 
              name={testimonials[testimonialIndex].name}
              title={testimonials[testimonialIndex].title}
              text={testimonials[testimonialIndex].text}
              image={testimonials[testimonialIndex].image}
              templateImage={testimonialIndex === 0 ? 'team1' : testimonialIndex === 1 ? 'team2' : 'team3'}
            />
            <button className="carousel-btn next" onClick={handleNextTestimonial}>→</button>
          </div>
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === testimonialIndex ? 'active' : ''}`}
                onClick={() => setTestimonialIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking-section">
        <div className="container">
          <h2>Online Booking For Appointments</h2>
          <p className="booking-subtitle">Schedule your appointment with us today</p>
          <BookingForm />
        </div>
      </section>
    </div>
  )
}

export default Home




