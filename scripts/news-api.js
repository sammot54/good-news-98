// News API Integration for Good News 98
class NewsAPIService {
    constructor() {
        // For demo purposes, we'll use mock data
        // In production, you would use a real news API key
        this.apiKey = 'demo-key';
        this.baseUrl = 'https://newsapi.org/v2';
        this.goodNewsKeywords = [
            'breakthrough', 'discovery', 'innovation', 'success', 'achievement', 'help', 'rescue',
            'donation', 'volunteer', 'kindness', 'recovery', 'improvement', 'progress', 'cure',
            'solution', 'victory', 'celebration', 'award', 'honor', 'milestone', 'record',
            'inspiring', 'uplifting', 'positive', 'good news', 'heartwarming', 'miracle',
            'triumph', 'hope', 'healing', 'community', 'unity', 'cooperation', 'love',
            'generosity', 'compassion', 'environmental protection', 'clean energy',
            'sustainability', 'conservation', 'renewable', 'green technology'
        ];
    }
    
    async fetchNews(category = '', query = '') {
        // In a real implementation, this would make actual API calls
        // For demo purposes, we'll return mock data based on category
        
        try {
            if (query) {
                return this.searchNews(query);
            }
            
            return this.getNewsByCategory(category);
        } catch (error) {
            console.error('Error fetching news:', error);
            throw new Error('Failed to fetch news');
        }
    }
    
    getNewsByCategory(category) {
        const newsData = {
            'science': [
                {
                    id: 'sci-1',
                    title: 'Revolutionary Gene Therapy Restores Vision in Blind Patients',
                    summary: 'Clinical trials show remarkable success in treating inherited blindness, with patients regaining significant vision after a single treatment.',
                    source: 'Nature Medicine',
                    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
                    category: 'Science',
                    url: '#',
                    sentiment: 0.94
                },
                {
                    id: 'sci-2',
                    title: 'AI Breakthrough Helps Scientists Discover New Antibiotics',
                    summary: 'Machine learning algorithms have identified promising new compounds that could combat antibiotic-resistant bacteria.',
                    source: 'Science Journal',
                    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
                    category: 'Science',
                    url: '#',
                    sentiment: 0.91
                }
            ],
            'community': [
                {
                    id: 'comm-1',
                    title: 'Neighbors Unite to Build Playground for Local Children',
                    summary: 'An entire neighborhood came together over the weekend to construct a beautiful new playground, creating a safe space for kids to play and families to connect.',
                    source: 'Local Community News',
                    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    category: 'Community',
                    url: '#',
                    sentiment: 0.96
                },
                {
                    id: 'comm-2',
                    title: 'High School Students Start Free Tutoring Program for Younger Kids',
                    summary: 'A group of dedicated high school students has launched a volunteer tutoring program, helping elementary students improve their reading and math skills.',
                    source: 'Education Weekly',
                    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
                    category: 'Community',
                    url: '#',
                    sentiment: 0.88
                }
            ],
            'environment': [
                {
                    id: 'env-1',
                    title: 'City Becomes First to Run Entirely on Renewable Energy',
                    summary: 'After years of planning and investment, the city has successfully transitioned to 100% renewable energy, setting an example for communities worldwide.',
                    source: 'Green Energy Today',
                    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
                    category: 'Environment',
                    url: '#',
                    sentiment: 0.93
                },
                {
                    id: 'env-2',
                    title: 'Innovative Water Purification System Brings Clean Water to Remote Villages',
                    summary: 'New solar-powered water purification technology is providing safe drinking water to thousands of people in previously underserved communities.',
                    source: 'Water Solutions',
                    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000),
                    category: 'Environment',
                    url: '#',
                    sentiment: 0.92
                }
            ],
            'health': [
                {
                    id: 'health-1',
                    title: 'New Treatment Shows 95% Success Rate in Early Cancer Detection',
                    summary: 'Researchers have developed a simple blood test that can detect multiple types of cancer in their earliest stages, dramatically improving treatment outcomes.',
                    source: 'Medical Breakthrough',
                    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
                    category: 'Health',
                    url: '#',
                    sentiment: 0.97
                },
                {
                    id: 'health-2',
                    title: 'Mental Health App Helps Thousands of Teens Cope with Anxiety',
                    summary: 'A new mobile application designed specifically for teenagers has shown remarkable success in helping young people manage anxiety and build resilience.',
                    source: 'Mental Health Today',
                    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                    category: 'Health',
                    url: '#',
                    sentiment: 0.89
                }
            ],
            'sports': [
                {
                    id: 'sport-1',
                    title: 'Paralympic Champion Inspires New Generation of Adaptive Athletes',
                    summary: 'After winning multiple gold medals, the champion has started a foundation to provide sports equipment and training to young athletes with disabilities.',
                    source: 'Sports Inspiration',
                    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
                    category: 'Sports',
                    url: '#',
                    sentiment: 0.95
                },
                {
                    id: 'sport-2',
                    title: 'Youth Soccer League Emphasizes Fun Over Competition',
                    summary: 'A new approach to youth sports focuses on enjoyment, skill development, and teamwork rather than winning, resulting in happier, more confident young athletes.',
                    source: 'Youth Sports Network',
                    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000),
                    category: 'Sports',
                    url: '#',
                    sentiment: 0.86
                }
            ]
        };
        
        if (category && newsData[category.toLowerCase()]) {
            return newsData[category.toLowerCase()];
        }
        
        // Return all news if no specific category
        return Object.values(newsData).flat();
    }
    
    searchNews(query) {
        const allNews = this.getNewsByCategory('');
        const searchTerms = query.toLowerCase().split(' ');
        
        return allNews.filter(article => {
            const searchText = (article.title + ' ' + article.summary + ' ' + article.category).toLowerCase();
            return searchTerms.some(term => searchText.includes(term));
        });
    }
    
    async fetchFromNewsAPI(endpoint, params) {
        // This would be used for real API calls
        const url = new URL(`${this.baseUrl}/${endpoint}`);
        url.searchParams.append('apiKey', this.apiKey);
        
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    }
    
    filterPositiveNews(articles) {
        // In a real implementation, this would use sentiment analysis
        return articles.filter(article => {
            const text = (article.title + ' ' + article.description).toLowerCase();
            
            // Check for positive keywords
            const hasPositiveKeywords = this.goodNewsKeywords.some(keyword => 
                text.includes(keyword.toLowerCase())
            );
            
            // Check for negative keywords to exclude
            const negativeKeywords = [
                'death', 'kill', 'murder', 'war', 'attack', 'violence', 'crime',
                'disaster', 'accident', 'crash', 'fire', 'flood', 'earthquake',
                'crisis', 'recession', 'unemployment', 'bankruptcy', 'fraud',
                'corrupt', 'scandal', 'fail', 'decline', 'protest', 'riot'
            ];
            
            const hasNegativeKeywords = negativeKeywords.some(keyword =>
                text.includes(keyword.toLowerCase())
            );
            
            return hasPositiveKeywords && !hasNegativeKeywords;
        });
    }
    
    categorizeArticle(article) {
        const text = (article.title + ' ' + article.description).toLowerCase();
        
        const categories = {
            'Science': [
                'research', 'study', 'discovery', 'breakthrough', 'technology', 'ai',
                'artificial intelligence', 'innovation', 'invention', 'science', 'medical'
            ],
            'Community': [
                'community', 'volunteer', 'help', 'support', 'donate', 'charity',
                'neighbor', 'local', 'fundraiser', 'kindness', 'generosity'
            ],
            'Environment': [
                'environment', 'climate', 'green', 'renewable', 'solar', 'wind',
                'conservation', 'wildlife', 'forest', 'ocean', 'sustainability'
            ],
            'Health': [
                'health', 'medical', 'treatment', 'cure', 'therapy', 'medicine',
                'hospital', 'patient', 'recovery', 'wellness', 'mental health'
            ],
            'Sports': [
                'sport', 'athlete', 'competition', 'championship', 'medal',
                'record', 'team', 'game', 'match', 'tournament', 'olympic'
            ]
        };
        
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => text.includes(keyword))) {
                return category;
            }
        }
        
        return 'General';
    }
    
    // Real-world API integration methods (commented for demo)
    /*
    async fetchTopHeadlines(country = 'us', category = '') {
        const params = { country };
        if (category) params.category = category;
        
        const data = await this.fetchFromNewsAPI('top-headlines', params);
        const positiveArticles = this.filterPositiveNews(data.articles);
        
        return positiveArticles.map(article => ({
            id: article.url,
            title: article.title,
            summary: article.description || 'Click to read more...',
            source: article.source.name,
            publishedAt: new Date(article.publishedAt),
            category: this.categorizeArticle(article),
            url: article.url,
            imageUrl: article.urlToImage,
            sentiment: this.calculateSentiment(article)
        }));
    }
    
    async searchEverything(query) {
        const positiveQuery = query + ' AND (' + this.goodNewsKeywords.slice(0, 10).join(' OR ') + ')';
        
        const params = {
            q: positiveQuery,
            sortBy: 'publishedAt',
            language: 'en'
        };
        
        const data = await this.fetchFromNewsAPI('everything', params);
        const positiveArticles = this.filterPositiveNews(data.articles);
        
        return positiveArticles.map(article => ({
            id: article.url,
            title: article.title,
            summary: article.description || 'Click to read more...',
            source: article.source.name,
            publishedAt: new Date(article.publishedAt),
            category: this.categorizeArticle(article),
            url: article.url,
            imageUrl: article.urlToImage,
            sentiment: this.calculateSentiment(article)
        }));
    }
    */
}