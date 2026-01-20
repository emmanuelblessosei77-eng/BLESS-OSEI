import React from 'react'
import '../styles/ProjectCard.css'

const ProjectCard = ({ title, category, image }) => {
  // Check if image is a URL (starts with http or /)
  const isImageUrl = typeof image === 'string' && (image.startsWith('http') || image.startsWith('/'))
  
  return (
    <div className="project-card">
      <div className="project-image">
        {isImageUrl ? (
          <img src={image} alt={title} />
        ) : (
          <span>{image}</span>
        )}
      </div>
      <div className="project-info">
        <h4 className="project-title">{title}</h4>
        <p className="project-category">{category}</p>
      </div>
    </div>
  )
}

export default ProjectCard
