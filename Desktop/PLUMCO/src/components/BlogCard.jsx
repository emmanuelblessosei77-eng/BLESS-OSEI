import React from 'react'
import { FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi'
import '../styles/BlogCard.css'

const BlogCard = ({ date, title, category, excerpt, image }) => {
  // Check if image is a URL (starts with http, /, or data:)
  const isImageUrl = typeof image === 'string' && (image.startsWith('http') || image.startsWith('/') || image.startsWith('data:'))
  
  return (
    <div className="blog-card">
      <div className="blog-image">
        {isImageUrl ? (
          <img src={image} alt={title} />
        ) : (
          <span>{image}</span>
        )}
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-date">
            <FiCalendar /> {date}
          </span>
          {category && <span className="blog-category">{category}</span>}
        </div>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-excerpt">{excerpt}</p>
        <a href="#" className="blog-link">
          Read More <FiArrowRight />
        </a>
      </div>
    </div>
  )
}

export default BlogCard
