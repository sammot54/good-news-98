// Good News 98 - Main JavaScript File
class GoodNews98 {
    constructor() {
        this.currentSection = 'news';
        this.bookmarks = JSON.parse(localStorage.getItem('gn98-bookmarks') || '[]');
        this.preferences = JSON.parse(localStorage.getItem('gn98-preferences') || '{}');
        this.newsData = [];
        
        this.init();
    }
    
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 60000); // Update time every minute
        
        // Initialize filters
        this.initializeFilters();
        
        // Load news on startup
        this.loadNews();
        
        // Auto refresh news every 10 minutes
        setInterval(() => this.loadNews(), 600000);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load bookmarks
        this.displayBookmarks();
    }
    
    setupEventListeners() {
        // Filter checkboxes
        const filters = ['Science', 'Community', 'Environment', 'Health', 'Sports'];
        filters.forEach(filter => {
            const checkbox = document.getElementById(`filter${filter}`);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.filterNews());
            }
        });
        
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
        
        // Close start menu when clicking outside
        document.addEventListener('click', (e) => {
            const startMenu = document.getElementById('startMenu');
            const startButton = document.querySelector('.start-button');
            if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
                startMenu.classList.add('hidden');
                startButton.classList.remove('active');
            }
        });
    }
    
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        document.getElementById('currentTime').textContent = timeString;
    }
    
    initializeFilters() {
        // Set default filter preferences
        const defaultFilters = {
            Science: true,
            Community: true,
            Environment: true,
            Health: true,
            Sports: true
        };
        
        Object.keys(defaultFilters).forEach(filter => {
            const checkbox = document.getElementById(`filter${filter}`);
            if (checkbox) {
                checkbox.checked = this.preferences[`filter${filter}`] !== false;
            }
        });
    }
    
    async loadNews() {
        try {
            this.showLoading();
            
            // Simulate news loading for demo purposes
            // In a real implementation, this would call the news API
            const newsData = await this.fetchGoodNews();
            
            this.newsData = newsData;
            this.displayNews(newsData);
            this.updateNewsCount(newsData.length);
            this.updateLastUpdated();
            
        } catch (error) {
            console.error('Error loading news:', error);
            this.showError('Failed to load news. Please try again later.');
        }
    }
    
    async fetchGoodNews() {
        // Demo data - in real implementation, this would fetch from news APIs
        // and filter using sentiment analysis
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        title: 'Scientists Develop New Solar Panel Technology with 50% Higher Efficiency',
                        summary: 'Researchers at MIT have created innovative solar panels that can convert sunlight to electricity with unprecedented efficiency, potentially revolutionizing renewable energy.',
                        source: 'Science Daily',
                        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                        category: 'Science',
                        url: '#',
                        sentiment: 0.9
                    },
                    {
                        id: '2',
                        title: 'Local Community Raises $100,000 for Children\'s Hospital in Just One Week',
                        summary: 'A grassroots fundraising campaign organized by local volunteers exceeded all expectations, bringing hope and medical equipment to young patients.',
                        source: 'Community News',
                        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                        category: 'Community',
                        url: '#',
                        sentiment: 0.95
                    },
                    {
                        id: '3',
                        title: 'Ocean Cleanup Project Removes 50 Tons of Plastic from Pacific',
                        summary: 'The innovative ocean cleanup system continues to make remarkable progress in removing plastic waste from our oceans, protecting marine life.',
                        source: 'Environmental Times',
                        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                        category: 'Environment',
                        url: '#',
                        sentiment: 0.88
                    },
                    {
                        id: '4',
                        title: 'New Gene Therapy Shows Promise for Treating Rare Childhood Disease',
                        summary: 'Clinical trials reveal encouraging results for a breakthrough treatment that could help thousands of children worldwide lead healthier lives.',
                        source: 'Medical Journal',
                        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                        category: 'Health',
                        url: '#',
                        sentiment: 0.92
                    },
                    {
                        id: '5',
                        title: 'Paralympic Athlete Breaks World Record While Inspiring Millions',
                        summary: 'In an incredible display of human determination, the athlete not only achieved personal victory but became a beacon of hope for people everywhere.',
                        source: 'Sports Network',
                        publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
                        category: 'Sports',
                        url: '#',
                        sentiment: 0.87
                    },
                    {
                        id: '6',
                        title: 'AI Technology Helps Blind Students Learn Mathematics More Effectively',
                        summary: 'Innovative artificial intelligence applications are opening new doors for visually impaired students, making advanced mathematics more accessible than ever.',
                        source: 'Education Today',
                        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                        category: 'Science',
                        url: '#',
                        sentiment: 0.91
                    },
                    {
                        id: '7',
                        title: 'Volunteer Program Connects Seniors with Young Mentors, Reducing Isolation',
                        summary: 'An intergenerational mentorship program is bringing joy and companionship to elderly residents while teaching valuable life lessons to youth.',
                        source: 'Community Herald',
                        publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14 hours ago
                        category: 'Community',
                        url: '#',
                        sentiment: 0.89
                    },
                    {
                        id: '8',
                        title: 'Reforestation Initiative Plants 1 Million Trees in Record Time',
                        summary: 'Environmental volunteers and organizations collaborate to achieve unprecedented tree-planting goals, creating habitats and fighting climate change.',
                        source: 'Green Planet',
                        publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000), // 16 hours ago
                        category: 'Environment',
                        url: '#',
                        sentiment: 0.86
                    }
                ]);
            }, 1500); // Simulate loading time
        });
    }
    
    showLoading() {
        const container = document.getElementById('newsContainer');
        container.innerHTML = `
            <div class="loading-message">
                <div class="loading-spinner"></div>
                <p>Loading positive news stories...</p>
            </div>
        `;
    }
    
    showError(message) {
        const container = document.getElementById('newsContainer');
        container.innerHTML = `
            <div class="help-text" style="color: #ff0000;">
                <p>⚠️ ${message}</p>
            </div>
        `;
    }
    
    displayNews(newsData) {
        const container = document.getElementById('newsContainer');
        
        if (!newsData || newsData.length === 0) {
            container.innerHTML = '<div class="help-text">No positive news stories found at this time.</div>';
            return;
        }
        
        const newsHtml = newsData.map(article => this.createNewsArticleHtml(article)).join('');
        container.innerHTML = newsHtml;
    }
    
    createNewsArticleHtml(article) {
        const isBookmarked = this.bookmarks.some(b => b.id === article.id);
        const timeAgo = this.getTimeAgo(article.publishedAt);
        
        return `
            <div class="news-article" onclick="this.classList.toggle('expanded')">
                <h3>${article.title}</h3>
                <div class="news-meta">
                    <span>📰 ${article.source}</span>
                    <span>⏰ ${timeAgo}</span>
                    <span>📂 ${article.category}</span>
                </div>
                <div class="news-summary">${article.summary}</div>
                <div class="news-actions">
                    <button onclick="event.stopPropagation(); window.open('${article.url}', '_blank')">Read More</button>
                    <button onclick="event.stopPropagation(); goodNews98.toggleBookmark('${article.id}')" 
                            class="${isBookmarked ? 'bookmarked' : ''}">
                        ${isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
                    </button>
                    <button onclick="event.stopPropagation(); goodNews98.shareArticle('${article.id}')">Share</button>
                </div>
            </div>
        `;
    }
    
    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));
        
        if (hours > 0) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }
    
    filterNews() {
        const activeFilters = [];
        const filters = ['Science', 'Community', 'Environment', 'Health', 'Sports'];
        
        filters.forEach(filter => {
            const checkbox = document.getElementById(`filter${filter}`);
            if (checkbox && checkbox.checked) {
                activeFilters.push(filter);
            }
            // Save preference
            this.preferences[`filter${filter}`] = checkbox ? checkbox.checked : false;
        });
        
        localStorage.setItem('gn98-preferences', JSON.stringify(this.preferences));
        
        const filteredNews = this.newsData.filter(article => 
            activeFilters.includes(article.category)
        );
        
        this.displayNews(filteredNews);
        this.updateNewsCount(filteredNews.length);
    }
    
    performSearch() {
        const query = document.getElementById('searchInput').value.trim().toLowerCase();
        
        if (!query) {
            document.getElementById('searchResults').innerHTML = 
                '<p class="help-text">Please enter keywords to search.</p>';
            return;
        }
        
        const results = this.newsData.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.summary.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query)
        );
        
        const container = document.getElementById('searchResults');
        
        if (results.length === 0) {
            container.innerHTML = `<p class="help-text">No results found for "${query}". Try different keywords.</p>`;
        } else {
            const resultsHtml = results.map(article => this.createNewsArticleHtml(article)).join('');
            container.innerHTML = resultsHtml;
        }
    }
    
    toggleBookmark(articleId) {
        const article = this.newsData.find(a => a.id === articleId);
        if (!article) return;
        
        const existingIndex = this.bookmarks.findIndex(b => b.id === articleId);
        
        if (existingIndex >= 0) {
            // Remove bookmark
            this.bookmarks.splice(existingIndex, 1);
        } else {
            // Add bookmark
            this.bookmarks.push({
                id: article.id,
                title: article.title,
                summary: article.summary,
                source: article.source,
                publishedAt: article.publishedAt,
                category: article.category,
                url: article.url,
                bookmarkedAt: new Date()
            });
        }
        
        localStorage.setItem('gn98-bookmarks', JSON.stringify(this.bookmarks));
        
        // Refresh current view
        if (this.currentSection === 'news') {
            this.filterNews();
        } else if (this.currentSection === 'search') {
            this.performSearch();
        } else if (this.currentSection === 'bookmarks') {
            this.displayBookmarks();
        }
    }
    
    displayBookmarks() {
        const container = document.getElementById('bookmarksContainer');
        
        if (this.bookmarks.length === 0) {
            container.innerHTML = '<p class="help-text">You haven\'t bookmarked any articles yet. Click the bookmark button on any article to save it here.</p>';
            return;
        }
        
        const bookmarksHtml = this.bookmarks.map(article => this.createNewsArticleHtml(article)).join('');
        container.innerHTML = bookmarksHtml;
    }
    
    clearBookmarks() {
        if (confirm('Are you sure you want to clear all bookmarks? This action cannot be undone.')) {
            this.bookmarks = [];
            localStorage.removeItem('gn98-bookmarks');
            this.displayBookmarks();
        }
    }
    
    shareArticle(articleId) {
        const article = this.newsData.find(a => a.id === articleId);
        if (!article) return;
        
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.summary,
                url: window.location.href
            });
        } else {
            // Fallback for browsers without native sharing
            const shareText = `Check out this positive news: ${article.title} - ${article.summary}`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Article copied to clipboard! Share it with others to spread positivity.');
            });
        }
    }
    
    updateNewsCount(count) {
        document.getElementById('newsCount').textContent = `${count} positive stories`;
    }
    
    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });
        document.getElementById('lastUpdated').textContent = `Updated: ${timeString}`;
    }
    
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(sectionId).classList.add('active');
        
        // Update current section
        this.currentSection = sectionId.replace('Section', '');
    }
}

// Navigation Functions
function showNews() {
    goodNews98.showSection('newsSection');
    document.querySelector('.menu-item[onclick="showNews()"]').classList.add('active');
    goodNews98.filterNews(); // Refresh news display
}

function showSearch() {
    goodNews98.showSection('searchSection');
    document.querySelector('.menu-item[onclick="showSearch()"]').classList.add('active');
    document.getElementById('searchInput').focus();
}

function showBookmarks() {
    goodNews98.showSection('bookmarksSection');
    document.querySelector('.menu-item[onclick="showBookmarks()"]').classList.add('active');
    goodNews98.displayBookmarks();
}

function showAbout() {
    goodNews98.showSection('aboutSection');
    document.querySelector('.menu-item[onclick="showAbout()"]').classList.add('active');
}

function showContact() {
    goodNews98.showSection('contactSection');
    document.querySelector('.menu-item[onclick="showContact()"]').classList.add('active');
}

function refreshNews() {
    goodNews98.loadNews();
}

function performSearch() {
    goodNews98.performSearch();
}

function clearBookmarks() {
    goodNews98.clearBookmarks();
}

function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-button');
    
    if (startMenu.classList.contains('hidden')) {
        startMenu.classList.remove('hidden');
        startButton.classList.add('active');
    } else {
        startMenu.classList.add('hidden');
        startButton.classList.remove('active');
    }
}

function submitContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon!`);
    
    // Clear form
    event.target.reset();
}

// Initialize the application
let goodNews98;
document.addEventListener('DOMContentLoaded', () => {
    goodNews98 = new GoodNews98();
});