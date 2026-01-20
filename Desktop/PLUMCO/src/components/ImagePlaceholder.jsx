import React, { useState } from 'react'
import '../styles/ImagePlaceholder.css'

const ImagePlaceholder = ({ 
  imageUrl, 
  templateImage,
  emoji = '📷',
  alt = 'Image',
  title = 'Image',
  size = 'medium',
  src = null,
  className = '',
  width = '100%',
  height = 'auto',
  showFallback = true,
  objectFit = 'cover',
  ...props 
}) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const templateImages = {
    contact1: '/images/contact.ab1cf0dc07f7530bb714.jpg',
    contact2: '/images/contact.b123e757a7a835411515.png',
    hero1: '/images/img-1.7d97fb189776759580bd.jpg',
    hero2: '/images/img-2.2cfcf4c1a7ad901c1f62.jpg',
    hero3: '/images/img-3.3a4af9de063a8f785913.jpg',
    team1: '/images/1.2a8d1fdeac1157b78328.jpg',
    team2: '/images/2.42247322168d05355e2d.jpg',
    team3: '/images/3.15ae66135ec4b273c803.jpg',
    team4: '/images/4.15e88dceb2f548fa10c1.jpg',
    service1: '/images/img-1.cad5cd3de34102f5c6e7.jpg',
    service2: '/images/img-2.c0198d20e96cdad46e84.jpg',
    service3: '/images/img-3.8c2bf670332809e74571.jpg',
    project1: '/images/1.f05a7ba81a5c7179e44a.jpg',
    project2: '/images/2.7bb328451c91e249948b.jpg',
    project3: '/images/3.7ecc06be3c8b739f35f6.jpg',
    project4: '/images/4.5f9525c6d0a2c7f98f83.jpg',
    project5: '/images/5.f093f2cb945fc9937751.jpg',
    project6: '/images/6.0031406749b15bbc27f7.jpg',
    rightImg: '/images/right-img.142eec85c41d39f8f12d.png',
    gallery1: '/images/1.f05a7ba81a5c7179e44a.jpg',
    gallery2: '/images/2.7bb328451c91e249948b.jpg',
    gallery3: '/images/3.7ecc06be3c8b739f35f6.jpg',
    gallery4: '/images/4.5f9525c6d0a2c7f98f83.jpg',
    gallery5: '/images/5.f093f2cb945fc9937751.jpg',
    gallery6: '/images/6.0031406749b15bbc27f7.jpg',
  }

  const getImageUrl = () => {
    if (imageUrl) return imageUrl
    if (templateImage && templateImages[templateImage]) {
      return templateImages[templateImage]
    }
    return src
  }

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const currentImageUrl = getImageUrl()

  if (!currentImageUrl && !src) {
    if (!showFallback) {
      return null
    }
    return (
      <div 
        className={`image-placeholder emoji-placeholder ${size} ${className}`}
        role="img"
        aria-label={alt}
        style={{ width, height }}
        {...props}
      >
        <span className="emoji-content">{emoji}</span>
      </div>
    )
  }

  // If image source exists, show image with fallback
  if (currentImageUrl) {
    return (
      <div 
        className="image-container"
        style={{ 
          width, 
          height: height === 'auto' ? undefined : height, 
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <span style={{ color: '#999', fontSize: '12px' }}>Loading...</span>
          </div>
        )}
        <img
          src={currentImageUrl}
          alt={alt}
          title={title}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
          className={`image-placeholder ${size} ${className}`}
          {...props}
        />
        {imageError && showFallback && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center', color: '#999' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{emoji}</div>
              <div style={{ fontSize: '12px' }}>Image not found</div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default ImagePlaceholder
