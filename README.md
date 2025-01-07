<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bio Site Customization Guide</title>
</head>
<body>
    <h1>🎨 Bio Site Customization Guide</h1>

    <h2>📝 Basic Information</h2>
    <div>
        Update in <code>public/index.html</code>:
        <pre>
&lt;title&gt;Your Name&lt;/title&gt;
&lt;link rel="icon" type="image/png" href="your-avatar-url"&gt;
&lt;meta property="og:title" content="Your Title"&gt;
&lt;meta property="og:description" content="Your Description"&gt;
&lt;meta property="og:image" content="your-image-url"&gt;
&lt;meta property="og:url" content="your-github-url"&gt;
        </pre>
    </div>

    <h2>👋 Greeting Messages</h2>
    <div>
        Modify in <code>src/components/Home.js</code>:
        <pre>
const greetings = [
    "Hello",
    "Bonjour",
];
        </pre>
    </div>

    <h2>🔧 Tech Stack Icons</h2>
    <div>
        Change in <code>src/components/Home.js</code>:
        <pre>
const icons = [
    { Icon: FaPython, color: '#3776AB' },
    { Icon: IoLogoJavascript, color: '#F7DF1E' },
];
        </pre>
    </div>

    <h2>🔗 Navigation Links</h2>
    <div>
        Edit in <code>src/components/Navbar.js</code>:
        <pre>
&lt;div className="nav-links"&gt;
    &lt;a href="your_url" target="_blank" rel="noopener noreferrer"&gt;
        Your Link Text
    &lt;/a&gt;
&lt;/div&gt;
        </pre>
    </div>

    <h2>🎨 Theme Customization</h2>
    <div>
        Modify in <code>src/App.css</code>:
        <pre>
body {
    background-color: your_color;
    color: your_text_color;
    font-family: your_font;
}
        </pre>
    </div>

    <h2>🎵 Audio Settings</h2>
    <div>
        Replace <code>/song.mp3</code> with your preferred audio file in <code>src/components/IntroScreen.js</code>
    </div>

    <h2>📱 Responsive Design</h2>
    <div>
        Adjust breakpoints in <code>src/components/*.css</code> files:
        <pre>
@media screen and (max-width: 768px) {
}
        </pre>
    </div>

    <h2>🚀 Deployment</h2>
    <div>
        <ol>
            <li>Fork the repository</li>
            <li>Clone your fork</li>
            <li>Install dependencies: <code>npm install</code></li>
            <li>Make your changes</li>
            <li>Test locally: <code>npm start</code></li>
            <li>Deploy to hosting platform of choice</li>
        </ol>
    </div>
</body>
</html>
