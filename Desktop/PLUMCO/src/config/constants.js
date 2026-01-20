export const SITE_INFO = {
  name: 'PLUMCO',
  tagline: 'Premium Plumbing Solutions',
  description: 'Professional plumbing services for residential and commercial needs',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:3002',
  phone: '+1 800 123 456 789',
  email: 'Plumco@gmail.com',
  address: '7 Green Lake Street Crawfordsville, IN 47933',
};

export const BUSINESS_HOURS = {
  weekday: '8:00 AM - 7:00 PM',
  weekend: 'Closed',
  emergency: '24/7 Available',
};

export const SERVICES = [
  { id: 'kitchen', name: 'Kitchen Plumbing', icon: '🚿', description: 'Professional kitchen plumbing solutions' },
  { id: 'gas', name: 'Gas Line Services', icon: '💨', description: 'Safe and reliable gas line installation and repair' },
  { id: 'water', name: 'Water Line Repair', icon: '💧', description: 'Expert water line repair and maintenance' },
  { id: 'bathroom', name: 'Bathroom Plumbing', icon: '🛁', description: 'Complete bathroom plumbing services' },
  { id: 'basement', name: 'Basement Plumbing', icon: '🏗️', description: 'Basement plumbing installation and repair' },
  { id: 'remodeling', name: 'Remodeling Service', icon: '🔧', description: 'Professional plumbing remodeling services' },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Top Tips for Maintaining Your Plumbing',
    date: 'Jan 15, 2024',
    category: 'Maintenance',
    author: 'Loura Sweety',
    excerpt: 'Essential maintenance tips to keep your system in top condition.',
    image: 'https://plumco-react.wpocean.com/static/media/img-1.cad5cd3de34102f5c6e7.jpg',
    slug: 'plumbing-maintenance-tips',
  },
  {
    id: 2,
    title: 'Common Plumbing Problems & Solutions',
    date: 'Jan 10, 2024',
    category: 'Tips',
    author: 'David Luis',
    excerpt: 'Common plumbing issues and quick solutions.',
    image: 'https://plumco-react.wpocean.com/static/media/img-2.c0198d20e96cdad46e84.jpg',
    slug: 'common-plumbing-problems',
  },
  {
    id: 3,
    title: 'The Importance of Professional Inspections',
    date: 'Jan 5, 2024',
    category: 'Inspection',
    author: 'Jenefer Willy',
    excerpt: 'Why professional inspections are essential.',
    image: 'https://plumco-react.wpocean.com/static/media/img-3.8c2bf670332809e74571.jpg',
    slug: 'professional-inspections',
  },
];

export const PROJECTS = [
  { id: 1, title: 'Water Line Repair', category: 'Plumbing', image: 'https://plumco-react.wpocean.com/static/media/1.f05a7ba81a5c7179e44a.jpg', description: 'Complete water line replacement and repair' },
  { id: 2, title: 'Basement Plumbing', category: 'Plumbing', image: 'https://plumco-react.wpocean.com/static/media/2.42247322168d05355e2d.jpg', description: 'Full basement plumbing installation' },
  { id: 3, title: 'Remodeling Service', category: 'Plumbing', image: 'https://plumco-react.wpocean.com/static/media/3.15ae66135ec4b273c803.jpg', description: 'Kitchen and bathroom remodeling' },
  { id: 4, title: 'Water Line Installation', category: 'Plumbing', image: 'https://plumco-react.wpocean.com/static/media/4.5f9525c6d0a2c7f98f83.jpg', description: 'New water line installation' },
  { id: 5, title: 'Kitchen Plumbing', category: 'Plumbing', image: 'https://plumco-react.wpocean.com/static/media/5.f093f2cb945fc9937751.jpg', description: 'Complete kitchen plumbing upgrade' },
  { id: 6, title: 'Gas Line Services', category: 'Plumbing', image: 'https://plumco-react.wpocean.com/static/media/6.0031406749b15bbc27f7.jpg', description: 'Gas line installation and safety check' },
];

export const STATISTICS = [
  { label: 'Customer Reviews', value: 89000, icon: '👥' },
  { label: 'Running Projects', value: 200, icon: '⚙️' },
  { label: 'Team Members', value: 85, icon: '👨‍💼' },
  { label: 'Happy Clients', value: 39000, icon: '😊' },
];

// ----------------------------------------------
// 🎨 Colors
// ----------------------------------------------
export const COLORS = {
  primary: '#ff6b35',
  secondary: '#004e89',
  dark: '#333',
  light: '#f5f5f5',
  white: '#ffffff',
  error: '#e74c3c',
  success: '#27ae60',
  warning: '#f39c12',
  info: '#3498db',
};

// ----------------------------------------------
// 📱 Responsive Breakpoints
// ----------------------------------------------
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1200,
};

// ----------------------------------------------
// 📝 Form Config
// ----------------------------------------------
export const FORM_CONFIG = {
  booking: {
    fields: ['fullName', 'email', 'phone', 'service', 'date', 'time', 'address'],
    required: true,
  },
  contact: {
    fields: ['name', 'email', 'phone', 'subject', 'message'],
    required: true,
  },
};

// ----------------------------------------------
// 🌐 API Endpoints (Future Backend Integration)
// ----------------------------------------------
export const API_ENDPOINTS = {
  bookings: '/api/bookings',
  contacts: '/api/contacts',
  services: '/api/services',
  blog: '/api/blog',
  projects: '/api/projects',
  team: '/api/team',
  testimonials: '/api/testimonials',
};

// ----------------------------------------------
// ⏱ Appointment Time Slots
// ----------------------------------------------
export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
];

// ----------------------------------------------
// 📱 Social Media
// ----------------------------------------------
export const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/plumco',
  twitter: 'https://twitter.com/plumco',
  instagram: 'https://instagram.com/plumco',
  linkedin: 'https://linkedin.com/company/plumco',
};

// ----------------------------------------------
// 🧭 Navigation Links
// ----------------------------------------------
export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

// ----------------------------------------------
// 📌 Footer Links
// ----------------------------------------------
export const FOOTER_LINKS = {
  company: [
    { path: '/about', label: 'About Us' },
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ],
  services: [
    { path: '/services#kitchen', label: 'Kitchen Plumbing' },
    { path: '/services#gas', label: 'Gas Line Services' },
    { path: '/services#water', label: 'Water Line Repair' },
    { path: '/services#bathroom', label: 'Bathroom Plumbing' },
  ],
  legal: [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/sitemap', label: 'Sitemap' },
  ],
};

// ----------------------------------------------
// 📦 Export All
// ----------------------------------------------
export default {
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
};
