# Good News 98 🪟

**A retro Windows 98-style good news aggregator that brings you only positive, uplifting news stories!**

![Windows 98 Interface](https://img.shields.io/badge/UI-Windows%2098-blue?style=flat-square) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square) ![CSS3](https://img.shields.io/badge/CSS3-Responsive-green?style=flat-square) ![Good News Only](https://img.shields.io/badge/News-Positive%20Only-brightgreen?style=flat-square)

## 🌟 Features

### Core Functionality
- **🗞️ Curated Good News**: Only positive, inspiring stories from various categories
- **🔍 Smart Search**: Find specific positive news stories with full-text search
- **⭐ Bookmark System**: Save your favorite uplifting articles
- **📂 Category Filtering**: Filter by Science, Community, Environment, Health, Sports
- **📱 Responsive Design**: Works on all devices while maintaining retro aesthetic

### Authentic Windows 98 Experience
- **🖥️ Classic Interface**: Authentic Windows 98 styling with gray backgrounds and blue title bars
- **📋 Taskbar & Start Menu**: Functional taskbar with working Start menu
- **🪟 Window Controls**: Classic minimize, maximize, and close buttons
- **📏 Status Bar**: Shows news count and last update time
- **🖱️ Retro Elements**: Classic buttons, inset/outset borders, and pixelated styling

### Technical Highlights
- **💾 Local Storage**: Saves bookmarks and user preferences
- **🔄 Auto-Refresh**: News updates automatically every 10 minutes
- **📊 Sentiment Analysis**: Custom sentiment filtering ensures only positive content
- **🚀 Modern Web Standards**: Built with HTML5, CSS3, and vanilla JavaScript
- **🔗 Social Sharing**: Share positive stories via native sharing or clipboard

## 🎯 Mission

In a world filled with negative headlines, Good News 98 serves as a beacon of positivity. We believe there's always good news happening around the world, and our platform filters through the noise to bring you only the most uplifting, inspiring, and positive stories.

The Windows 98 aesthetic represents a simpler, more optimistic time in technology history, reminding us that progress and positivity go hand in hand.

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sammot54/good-news-98.git
   cd good-news-98
   ```

2. **Serve the files**
   ```bash
   # Using Python
   python3 -m http.server 8080
   
   # Using Node.js
   npx http-server -p 8080
   
   # Using PHP
   php -S localhost:8080
   ```

3. **Open in browser**
   Navigate to `http://localhost:8080` in your web browser

## 📁 Project Structure

```
good-news-98/
├── index.html              # Main HTML file with Windows 98 layout
├── styles/
│   └── win98.css          # Complete Windows 98 styling
├── scripts/
│   ├── main.js            # Core application logic
│   ├── news-api.js        # News aggregation and API integration
│   └── sentiment.js       # Sentiment analysis for positive filtering
├── assets/
│   └── icons/
│       └── favicon.ico    # Site icon
└── README.md              # This file
```

## 🎮 How to Use

### News Feed
- Browse positive news stories from multiple categories
- Use category checkboxes to filter content
- Click articles to expand details
- Bookmark articles you want to save

### Search Function
- Click "Search" in the menu bar
- Enter keywords to find specific stories
- Results show matching positive news articles

### Bookmarks
- Click the "☆ Bookmark" button on any article
- Access saved articles in the "Bookmarks" section
- Remove bookmarks by clicking "⭐ Bookmarked" again

### Start Menu
- Click the "Start" button in the taskbar
- Access all main features through the classic Windows 98 menu
- Navigate between sections quickly

## 🛠️ Technical Details

### Architecture
- **Frontend Only**: Pure client-side application
- **No Dependencies**: Built with vanilla JavaScript, HTML5, and CSS3
- **Responsive**: Mobile-friendly while maintaining retro aesthetic
- **Local Storage**: Persistent bookmarks and preferences

### News Categories Covered
- 🔬 **Science & Technology**: Breakthroughs, innovations, discoveries
- 🤝 **Community**: Acts of kindness, volunteer work, fundraising
- 🌱 **Environment**: Conservation, clean energy, sustainability
- 🏥 **Health**: Medical breakthroughs, wellness, mental health
- 🏆 **Sports**: Inspiring athletic achievements and stories

### Sentiment Analysis
Custom keyword-based sentiment analysis ensures only positive content is displayed:
- **Positive Keywords**: breakthrough, discovery, success, help, kindness, etc.
- **Contextual Filtering**: Considers phrases and context
- **Negative Filtering**: Excludes content with negative themes

## 🎨 Design Philosophy

### Windows 98 Authenticity
- Accurate color palette (`#c3c3c3` gray, `#0a246a` blue)
- MS Sans Serif typography (with web-safe fallbacks)
- Classic UI elements (inset/outset borders, system buttons)
- Authentic scrollbars and form elements

### Positive User Experience
- Calming retro interface reduces news-related anxiety
- Only uplifting content prevents information overload
- Simple, familiar navigation patterns
- Immediate visual feedback for user actions

## 🔧 Customization

### Adding News Sources
To integrate real news APIs, modify `scripts/news-api.js`:

```javascript
// Replace mock data with real API calls
async fetchTopHeadlines(country = 'us', category = '') {
    const params = { country, apiKey: 'YOUR_API_KEY' };
    if (category) params.category = category;
    
    const response = await fetch(`https://newsapi.org/v2/top-headlines?${new URLSearchParams(params)}`);
    const data = await response.json();
    
    return this.filterPositiveNews(data.articles);
}
```

### Adjusting Sentiment Analysis
Modify the keyword arrays in `scripts/sentiment.js`:

```javascript
this.positiveWords = [
    'amazing', 'breakthrough', 'success', // Add more positive keywords
];

this.negativeWords = [
    'disaster', 'crisis', 'failure', // Add more negative keywords to filter out
];
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ Internet Explorer not supported (but that's very Windows 98 authentic!)

## 📱 Responsive Breakpoints

- **Desktop**: Full Windows 98 experience with all features
- **Tablet** (768px): Optimized layout maintaining retro styling
- **Mobile** (480px): Compact interface with touch-friendly controls

## 🤝 Contributing

We welcome contributions that maintain the authentic Windows 98 aesthetic while improving functionality:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Maintain Windows 98 visual authenticity
- Focus on positive news and user experience
- Write clean, commented code
- Test on multiple devices and browsers
- Update documentation for new features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the optimism and simplicity of the Windows 98 era
- Built for users who want to stay informed while maintaining mental wellness
- Dedicated to spreading positivity in the digital age

---

**🌈 Spreading positivity, one headline at a time, with a nostalgic twist! 🪟✨**

*Remember: In a world where you can read anything, choose to read something that makes you smile.*