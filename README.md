```markdown
# 🎨 Bio Site Customization Guide

## 📝 Basic Information

Update in `public/index.html`:

```html
<title>Your Name</title>
<link rel="icon" type="image/png" href="your-avatar-url">
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your Description">
<meta property="og:image" content="your-image-url">
<meta property="og:url" content="your-github-url">
```

## 👋 Greeting Messages

Modify in `src/components/Home.js`:

```javascript
const greetings = [
    "Hello",
    "Bonjour",
];
```

## 🔧 Tech Stack Icons

Change in `src/components/Home.js`:

```javascript
const icons = [
    { Icon: FaPython, color: '#3776AB' },
    { Icon: IoLogoJavascript, color: '#F7DF1E' },
];
```

## 🔗 Navigation Links

Edit in `src/components/Navbar.js`:

```html
<div className="nav-links">
    <a href="your_url" target="_blank" rel="noopener noreferrer">
        Your Link Text
    </a>
</div>
```

## 🎨 Theme Customization

Modify in `src/App.css`:

```css
body {
    background-color: your_color;
    color: your_text_color;
    font-family: your_font;
}
```

## 🎵 Audio Settings

Replace `/song.mp3` with your preferred audio file in `/public`.

## 📱 Responsive Design

Adjust breakpoints in `src/components/*.css` files:

```css
@media screen and (max-width: 768px) {
}
```

## 🚀 Deployment

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Make your changes
5. Test locally: `npm start`
6. Deploy to hosting platform of choice
```
