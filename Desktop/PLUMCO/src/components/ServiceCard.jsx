import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import '../styles/ServiceCard.css'

const ServiceCard = ({ icon, title, description, isExpanded, onToggle, details, price }) => {
  return (
    <div className={`service-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="service-header" onClick={onToggle}>
        <div className="service-icon">{icon}</div>
        <div className="service-title-section">
          <h3 className="service-title">{title}</h3>
          <p className="service-description">{description}</p>
        </div>
        <FiArrowRight className="service-arrow" />
      </div>
      {isExpanded && (
        <div className="service-details">
          <p>{details}</p>
          {price && <div className="service-price">{price}</div>}
          <button className="service-read-more">Read More</button>
        </div>
      )}
    </div>
  )
}

export default ServiceCard
