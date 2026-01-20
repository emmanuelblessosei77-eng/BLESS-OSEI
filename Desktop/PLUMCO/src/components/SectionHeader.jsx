import React from 'react'
import '../styles/SectionHeader.css'

const SectionHeader = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`section-header ${centered ? 'centered' : ''}`}>
      <h2 className="section-header-title">{title}</h2>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    </div>
  )
}

export default SectionHeader
