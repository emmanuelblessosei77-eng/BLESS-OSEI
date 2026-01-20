# PLUMCO React Website

A modern, fully responsive React website for PLUMCO with interactive components and smooth animations.

## Features

- 🏠 **Home Page** - Hero section with animated statistics, features showcase, and call-to-action
- 📖 **About Page** - Company story with interactive tabs, core values, and team section
- 🛠️ **Services Page** - Service cards with hover effects, process timeline, and detailed features
- 📧 **Contact Page** - Interactive contact form with validation and contact information
- 📝 **Blog Page** - Blog posts with category filtering and newsletter subscription

## Technologies Used

- React 18
- React Router DOM
- Vite
- React Icons
- CSS3 with custom properties

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
PLUMCO/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Navigation.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Services.jsx
│   │   ├── Services.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Blog.jsx
│   │   └── Blog.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Interactive Features

### Home Page
- Animated counter statistics
- Floating cards with animations
- Hover effects on feature cards
- Smooth scroll animations

### About Page
- Interactive tab switching
- Animated content transitions
- Hover effects on value cards

### Services Page
- Service cards with hover animations
- Color-coded service categories
- Interactive process timeline
- Feature lists with checkmarks

### Contact Page
- Form validation
- Real-time form status updates
- Interactive contact info cards
- Social media links

### Blog Page
- Category filtering
- Animated blog cards
- Newsletter subscription form
- Responsive grid layout

## Customization

### Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #f59e0b;
  /* ... */
}
```

### Content
Update the content in each page component file located in `src/pages/`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for use.




