import React from 'react'
import ImagePlaceholder from './ImagePlaceholder'
import '../styles/TestimonialCard.css'

const TestimonialCard = ({ name, title, text, image, templateImage }) => {
  // Check if image is a URL (starts with http, /, or data:)
  const isImageUrl = typeof image === 'string' && (image.startsWith('http') || image.startsWith('/') || image.startsWith('data:'))
  
  return (
    <div className="testimonial-card">
      <p className="testimonial-text">"{text}"</p>
      <div className="testimonial-author">
        <div className="testimonial-image">
          {templateImage ? (
            <ImagePlaceholder 
              templateImage={templateImage}
              alt={name}
              width="60px"
              height="60px"
              objectFit="cover"
              style={{ borderRadius: '50%' }}
            />
          ) : isImageUrl ? (
            <img src={image} alt={name} />
          ) : (
            <span>{image}</span>
          )}
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{name}</h4>
          <p className="testimonial-title">{title}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
