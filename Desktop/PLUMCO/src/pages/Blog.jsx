import React, { useState } from 'react'
import { FiCalendar, FiUser, FiArrowRight, FiTag } from 'react-icons/fi'
import { useBlog } from '../context/PageDataContext'
import BlogCard from '../components/BlogCard'
import FilterButtons from '../components/FilterButtons'
import './Blog.css'

const Blog = () => {
  const { blogPosts, getBlogPostsByCategory } = useBlog()
  
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Maintenance', 'Tips', 'Inspection'].map(cat => ({
    value: cat,
    label: cat
  }))

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : getBlogPostsByCategory(selectedCategory)

  return (
    <div className="blog">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <h1 className="page-title">Our Blog</h1>
          <p className="page-subtitle">
            Insights, tips, and updates from our team of experts
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <FilterButtons 
            filters={categories}
            activeFilter={selectedCategory}
            onFilterChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Blog Posts */}
      <section className="blog-section section">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  date={post.date}
                  title={post.title}
                  author={post.author}
                  comments={post.comments}
                  shares={post.shares}
                  image={post.image}
                  category={post.category}
                />
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <p>No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="newsletter-description">
              Get the latest articles, tips, and updates delivered to your inbox.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog




