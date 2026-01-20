import React, { useState } from 'react'
import { FiCheck, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi'
import { useTeam, useStatistics } from '../context/PageDataContext'
import './About.css'

const About = () => {
  const { teamMembers } = useTeam()
  const { statistics } = useStatistics()

  const teamStats = [
    { icon: <FiUsers />, number: '50+', label: 'Team Members' },
    { icon: <FiAward />, number: '45', label: 'Awards Won' },
    { icon: <FiTrendingUp />, number: '15+', label: 'Years Experience' },
    { icon: <FiCheck />, number: '200', label: 'Projects Completed' },
  ]

  const values = [
    { title: 'Excellence', description: 'We strive for excellence in every project' },
    { title: 'Integrity', description: 'Honest and transparent business practices' },
    { title: 'Innovation', description: 'Continuous improvement and innovation' },
    { title: 'Customer Focus', description: 'Your satisfaction is our priority' },
  ]

  const milestones = [
    { year: '2010', title: 'Founded PLUMCO', description: 'Started with a small team and big dreams' },
    { year: '2013', title: 'First 100 Projects', description: 'Reached a major milestone in our growth' },
    { year: '2016', title: 'Expanded Services', description: 'Added new service offerings' },
    { year: '2020', title: 'Industry Recognition', description: 'Received multiple industry awards' },
  ]

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About PLUMCO</h1>
          <p>Leading Plumbing Solutions Provider</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                PLUMCO was founded with a simple mission: to provide premium plumbing services 
                that exceed customer expectations. Over the years, we've grown from a small team 
                to become one of the most trusted plumbing service providers in the region.
              </p>
              <p>
                Our commitment to quality, reliability, and customer satisfaction has earned us 
                a reputation for excellence. We believe in building long-term relationships with 
                our clients through exceptional service delivery and professional expertise.
              </p>
              <div className="story-highlights">
                <div className="highlight-item">
                  <FiCheck />
                  <span>ISO Certified Company</span>
                </div>
                <div className="highlight-item">
                  <FiCheck />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="highlight-item">
                  <FiCheck />
                  <span>Licensed & Insured</span>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">📷</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {teamStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{milestone.year}</h3>
                  <h4>{milestone.title}</h4>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose PLUMCO?</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <h3>Professional Team</h3>
              <p>Our experienced and certified plumbers are trained to handle any plumbing challenge</p>
            </div>
            <div className="reason-card">
              <h3>Quality Guarantee</h3>
              <p>We guarantee the quality of our work with comprehensive warranties</p>
            </div>
            <div className="reason-card">
              <h3>Fast Response</h3>
              <p>Emergency services available 24/7 with quick response times</p>
            </div>
            <div className="reason-card">
              <h3>Affordable Pricing</h3>
              <p>Competitive rates without compromising on service quality</p>
            </div>
            <div className="reason-card">
              <h3>Transparent Communication</h3>
              <p>We keep you informed throughout the service process</p>
            </div>
            <div className="reason-card">
              <h3>Licensed & Insured</h3>
              <p>Fully licensed, insured, and bonded for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About




