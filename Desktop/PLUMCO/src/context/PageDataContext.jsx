import React, { createContext, useContext, useMemo } from 'react'
import {
  SITE_INFO,
  BUSINESS_HOURS,
  SERVICES,
  TEAM_MEMBERS,
  TESTIMONIALS,
  BLOG_POSTS,
  PROJECTS,
  STATISTICS,
  COLORS,
  BREAKPOINTS,
  FORM_CONFIG,
  API_ENDPOINTS,
  TIME_SLOTS,
  SOCIAL_MEDIA,
  NAV_LINKS,
  FOOTER_LINKS,
} from '../config/constants'

const PageDataContext = createContext()

export const PageDataProvider = ({ children }) => {
  const pageData = useMemo(
    () => ({
      // Site Information
      siteInfo: SITE_INFO,
      businessHours: BUSINESS_HOURS,

      // Content Data
      services: SERVICES,
      teamMembers: TEAM_MEMBERS,
      testimonials: TESTIMONIALS,
      blogPosts: BLOG_POSTS,
      projects: PROJECTS,
      statistics: STATISTICS,

      // Configuration
      colors: COLORS,
      breakpoints: BREAKPOINTS,
      formConfig: FORM_CONFIG,
      apiEndpoints: API_ENDPOINTS,
      timeSlots: TIME_SLOTS,
      socialMedia: SOCIAL_MEDIA,
      navLinks: NAV_LINKS,
      footerLinks: FOOTER_LINKS,

      getServiceById: (id) => SERVICES.find((s) => s.id === id),
      getTeamMemberById: (id) => TEAM_MEMBERS.find((m) => m.id === id),
      getTestimonialById: (id) => TESTIMONIALS.find((t) => t.id === id),
      getBlogPostBySlug: (slug) => BLOG_POSTS.find((b) => b.slug === slug),
      getProjectById: (id) => PROJECTS.find((p) => p.id === id),
      getStatisticByLabel: (label) => STATISTICS.find((s) => s.label === label),
      
      getBlogPostsByCategory: (category) =>
        BLOG_POSTS.filter((b) => b.category === category),
      getProjectsByCategory: (category) =>
        PROJECTS.filter((p) => p.category === category),
      sortBlogPostsByDate: () =>
        [...BLOG_POSTS].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
    }),
    []
  )

  return (
    <PageDataContext.Provider value={pageData}>
      {children}
    </PageDataContext.Provider>
  )
}


export const usePageData = () => {
  const context = useContext(PageDataContext)
  
  if (!context) {
    throw new Error(
      'usePageData must be used within a PageDataProvider'
    )
  }
  
  return context
}

/**
 * Specific hooks for individual data categories
 * These can be used for more granular data access
 */

export const useServices = () => {
  const { services, getServiceById } = usePageData()
  return { services, getServiceById }
}

export const useTeam = () => {
  const { teamMembers, getTeamMemberById } = usePageData()
  return { teamMembers, getTeamMemberById }
}

export const useTestimonials = () => {
  const { testimonials, getTestimonialById } = usePageData()
  return { testimonials, getTestimonialById }
}

export const useBlog = () => {
  const { blogPosts, getBlogPostBySlug, getBlogPostsByCategory, sortBlogPostsByDate } = usePageData()
  return { blogPosts, getBlogPostBySlug, getBlogPostsByCategory, sortBlogPostsByDate }
}

export const useProjects = () => {
  const { projects, getProjectById, getProjectsByCategory } = usePageData()
  return { projects, getProjectById, getProjectsByCategory }
}

export const useSiteInfo = () => {
  const { siteInfo, businessHours } = usePageData()
  return { siteInfo, businessHours }
}

export const useStatistics = () => {
  const { statistics, getStatisticByLabel } = usePageData()
  return { statistics, getStatisticByLabel }
}

export const useConfig = () => {
  const { colors, breakpoints, formConfig, apiEndpoints, timeSlots, socialMedia } = usePageData()
  return { colors, breakpoints, formConfig, apiEndpoints, timeSlots, socialMedia }
}

export const useNavigation = () => {
  const { navLinks, footerLinks } = usePageData()
  return { navLinks, footerLinks }
}

export default PageDataContext
