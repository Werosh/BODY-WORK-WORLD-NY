# 🚀 Quick Start Guide - BODYWORKWORLDNY

## Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

## Common Tasks

### 1. Add Your Images
```bash
# Place images in public/images/ with these names:
# - spa-background.jpg (hero background)
# - bodywork.jpg, waxing.jpg, back-facial.jpg, facial.jpg, microdermabrasion.jpg, hydrafacial.jpg
# - gallery1.jpg through gallery8.jpg
# - product1.jpg through product4.jpg
```

### 2. Update Contact Info
Edit `src/App.jsx` - Search for:
- Phone: Line ~650 ("+1 (631) 381-8800")
- Email: Line ~665 ("bodyworkworld@gmail.com")
- Service Areas: Line ~680

### 3. Modify Services
Edit `src/App.jsx` - Lines 62-86 (services array):
```javascript
const services = [
  {
    title: 'Your Service Name',
    description: 'Service description',
    image: '/images/your-image.jpg'
  },
  // ... add more services
];
```

### 4. Update Shop Products
Edit `src/App.jsx` - Lines 88-95 (shopItems array):
```javascript
const shopItems = [
  { 
    name: 'Product Name', 
    price: '$XX', 
    image: '/images/product.jpg' 
  },
  // ... add more products
];
```

### 5. Change Colors
Edit `src/index.css` - Lines 4-9:
```css
:root {
  --color-primary: #A8C3A0;
  --color-secondary: #F2E8D5;
  --color-accent: #4B6043;
  --color-text: #2E2E2E;
  --color-background: #FAFAF8;
}
```

### 6. Add Google Maps
Edit `src/App.jsx` - Line ~695:
Replace the placeholder div with:
```jsx
<iframe
  src="YOUR_GOOGLE_MAPS_EMBED_URL"
  width="100%"
  height="256"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  className="rounded-xl"
></iframe>
```

### 7. Connect Form Backend
Options:
- **Formspree**: https://formspree.io (recommended)
- **EmailJS**: https://www.emailjs.com
- **Netlify Forms**: https://www.netlify.com/products/forms

Update form `onSubmit` handlers in `src/App.jsx`

### 8. Build for Production
```bash
npm run build
```
Output will be in `dist/` folder

### 9. Preview Production Build
```bash
npm run preview
```

## 📱 Test on Mobile

### Using Local Network:
1. Start dev server: `npm run dev`
2. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig`
3. On mobile, visit: `http://YOUR_IP:5173`

### Using Browser DevTools:
- Chrome: F12 → Toggle Device Toolbar
- Test different screen sizes

## 🚢 Deploy

### Netlify (Recommended):
1. Push code to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel:
```bash
npm install -g vercel
vercel
```

### GitHub Pages:
```bash
npm run build
# Upload dist/ contents to gh-pages branch
```

## 📝 Checklist Before Launch

- [ ] Add all images to `public/images/`
- [ ] Update contact information
- [ ] Test all forms
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Add real Google Maps location
- [ ] Set up form backend
- [ ] Test booking modal
- [ ] Verify all sections scroll correctly
- [ ] Check SEO meta tags
- [ ] Test on different browsers
- [ ] Optimize images (compress)
- [ ] Set up analytics (optional)
- [ ] Add favicon/logo

## 🆘 Need Help?

### Development Server Won't Start:
```bash
rm -rf node_modules
npm install
npm run dev
```

### Styling Issues:
- Clear browser cache
- Check Tailwind classes are correct
- Verify `index.css` is imported

### Images Not Showing:
- Check image paths start with `/images/`
- Verify files are in `public/images/`
- Check file names match exactly (case-sensitive)

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main website code |
| `src/index.css` | Global styles & colors |
| `index.html` | SEO meta tags & fonts |
| `public/images/` | All website images |
| `package.json` | Dependencies |

## 📚 Documentation

- **README.md** - Overview & getting started
- **SETUP.md** - Detailed setup guide  
- **FEATURES.md** - Complete feature list
- **QUICKSTART.md** - This file (quick reference)

---

**Need more details?** Check `SETUP.md` or `FEATURES.md`

