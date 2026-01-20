import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiFilter } from 'react-icons/fi'
import { useServices } from '../context/PageDataContext'
import ServiceCard from '../components/ServiceCard'
import FilterButtons from '../components/FilterButtons'
import './Services.css'

const Services = () => {
  const { services } = useServices()
  
  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedService, setExpandedService] = useState(null)

  // Add category and pricing to services
  const servicesWithCategories = services.map((service, index) => ({
    ...service,
    category: index % 2 === 0 ? 'residential' : 'commercial',
    details: service.description,
    price: `Starting from $${150 + index * 10}`
  }))

  const filters = [
    { value: 'all', label: 'All Services' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'emergency', label: 'Emergency' },
  ]

  const filteredServices = activeFilter === 'all' 
    ? servicesWithCategories 
    : servicesWithCategories.filter(service => service.category === activeFilter)

  const toggleExpandedService = (id) => {
    setExpandedService(expandedService === id ? null : id)
  }

  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Plumbing Services</h1>
          <p>Comprehensive plumbing solutions for residential and commercial needs</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <FilterButtons 
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.name}
                description={service.description}
                isExpanded={expandedService === service.id}
                onToggle={() => toggleExpandedService(service.id)}
                details={service.details}
                price={service.price}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="service-process">
        <div className="container">
          <h2>Our Service Process</h2>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Assessment</h3>
              <p>We thoroughly assess your plumbing issue to provide accurate diagnosis</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Quote</h3>
              <p>Receive a transparent quote with no hidden charges</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Repair</h3>
              <p>Our experts perform the repair with precision and efficiency</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Follow-up</h3>
              <p>We follow up to ensure your complete satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="service-features">
        <div className="container">
          <h2>What Makes Our Service Special</h2>
          <div className="features-list">
            <div className="feature">
              <h3>✓ Certified Professionals</h3>
              <p>All our plumbers are licensed, certified, and insured</p>
            </div>
            <div className="feature">
              <h3>✓ 24/7 Availability</h3>
              <p>Emergency services available round the clock</p>
            </div>
            <div className="feature">
              <h3>✓ Quality Guarantee</h3>
              <p>All work comes with our comprehensive warranty</p>
            </div>
            <div className="feature">
              <h3>✓ Transparent Pricing</h3>
              <p>No hidden fees, upfront pricing before work begins</p>
            </div>
            <div className="feature">
              <h3>✓ Quick Response</h3>
              <p>Fast response times to your emergency calls</p>
            </div>
            <div className="feature">
              <h3>✓ Advanced Equipment</h3>
              <p>We use state-of-the-art tools and technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <h2>Need Professional Plumbing Services?</h2>
          <p>Contact us today for a free consultation</p>
          <Link to="/contact" className="btn btn-primary btn-large">
            Schedule Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Services




