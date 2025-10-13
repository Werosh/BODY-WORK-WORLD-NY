# BODYWORKWORLDNY Website - Setup Guide

## 🎯 Project Overview
Modern, mobile-first responsive spa website built with React, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd spa
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
spa/
├── public/
│   ├── images/          # Place all website images here
│   │   ├── README.md    # Image requirements guide
│   │   └── (image files)
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles with custom color palette
│   └── main.jsx         # Application entry point
├── index.html           # HTML template with SEO meta tags
└── package.json         # Dependencies and scripts
```

## 🎨 Theme Colors

The website uses the "Calm & Natural Spa Vibe" color palette:

- **Primary**: #A8C3A0 (Soft Sage Green)
- **Secondary**: #F2E8D5 (Warm Beige)
- **Accent**: #4B6043 (Deep Olive)
- **Text**: #2E2E2E (Charcoal Gray)
- **Background**: #FAFAF8 (Off White)

## 🖼️ Adding Images

1. Add your images to the `public/images/` directory
2. Follow the naming convention specified in `public/images/README.md`
3. Images will be automatically available at `/images/filename.jpg`

## ✨ Features Implemented

- ✅ Sticky header navigation with smooth scrolling
- ✅ Mobile-responsive hamburger menu
- ✅ Hero section with parallax effect
- ✅ Services grid with booking modal
- ✅ Client forms section
- ✅ Photo gallery with hover effects
- ✅ Shop section with product cards
- ✅ Contact section with form and info
- ✅ Footer with quick links and social icons
- ✅ Scroll-to-top button
- ✅ Framer Motion animations
- ✅ SEO optimization with meta tags
- ✅ Google Fonts (Playfair Display & Poppins)

## 🔧 Customization

### Update Contact Information
Edit the contact details in `src/App.jsx` around lines 650-700.

### Modify Services
Edit the `services` array in `src/App.jsx` (around line 63).

### Change Shop Items
Edit the `shopItems` array in `src/App.jsx` (around line 89).

### Adjust Colors
Colors are defined in `src/index.css` using CSS variables. You can modify them in the `:root` selector.

## 📱 Responsive Breakpoints

The website is mobile-first and uses Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🌐 SEO Configuration

Meta tags are configured in `index.html` including:
- Title and description
- Keywords for target locations
- Open Graph tags for social sharing

Target locations:
- Manhattan, NY
- Long Island, NY (Suffolk & Nassau Counties)
- Queens, NY
- Tampa, FL
- Orlando, FL
- Fort Lauderdale, FL

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## 🚢 Deployment

The built files can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📞 Service Information

- **Phone**: +1 (631) 381-8800
- **Email**: bodyworkworld@gmail.com
- **Venmo**: @bodyworkworldny (for deposits)

## 💡 Next Steps

1. Add your actual spa images to `public/images/`
2. Update contact information and service details
3. Test the website on various devices
4. Set up a form backend (e.g., Formspree, EmailJS) for the contact and booking forms
5. Integrate payment processing for deposits
6. Add Google Maps embed with your actual location
7. Connect social media accounts

## 🐛 Troubleshooting

If you encounter any issues:
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Make sure all dependencies are up to date

## 📄 License

This project is created for BODYWORKWORLDNY.

