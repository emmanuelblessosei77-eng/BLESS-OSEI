import React from 'react'
import ImagePlaceholder from './ImagePlaceholder'
import '../styles/TeamCard.css'

const TeamCard = ({ name, position, image, templateImage }) => {
  // Check if image is a URL (starts with http, /, or data:)
  const isImageUrl = typeof image === 'string' && (image.startsWith('http') || image.startsWith('/') || image.startsWith('data:'))
  
  return (
    <div className="team-card">
      <div className="team-image">
        {templateImage ? (
          <ImagePlaceholder 
            templateImage={templateImage}
            alt={name}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        ) : isImageUrl ? (
          <img src={image} alt={name} />
        ) : (
          <span>{image}</span>
        )}
      </div>
      <div className="team-info">
        <h4 className="team-name">{name}</h4>
        <p className="team-position">{position}</p>
      </div>
    </div>
  )
}

export default TeamCard
