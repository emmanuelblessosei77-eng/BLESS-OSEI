import React from 'react'
import '../styles/StatCard.css'

const StatCard = ({ icon, value, label, target }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-value">
          {value > 999 ? `${(value / 1000).toFixed(0)}K` : value}
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )
}

export default StatCard
