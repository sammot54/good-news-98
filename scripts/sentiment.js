// Sentiment Analysis for Good News 98
class SentimentAnalyzer {
    constructor() {
        this.positiveWords = [
            'amazing', 'awesome', 'beautiful', 'best', 'better', 'brilliant', 'celebrate', 'celebration',
            'champion', 'compassionate', 'congratulations', 'creative', 'cure', 'delighted', 'discovery',
            'donate', 'donation', 'excellent', 'exceptional', 'exciting', 'fantastic', 'fortunate',
            'free', 'generous', 'gift', 'glad', 'good', 'grateful', 'great', 'happiness', 'happy',
            'heal', 'healing', 'health', 'healthy', 'help', 'helpful', 'hero', 'hope', 'hopeful',
            'improve', 'improvement', 'incredible', 'innovation', 'innovative', 'inspire', 'inspiring',
            'joy', 'joyful', 'kind', 'kindness', 'love', 'loving', 'lucky', 'magnificent', 'miracle',
            'outstanding', 'perfect', 'positive', 'progress', 'promise', 'proud', 'recovery', 'remarkable',
            'rescue', 'restore', 'reward', 'save', 'solution', 'special', 'succeed', 'success',
            'successful', 'support', 'surprise', 'thank', 'thanks', 'triumph', 'volunteer', 'win',
            'winner', 'winning', 'wonder', 'wonderful', 'achieve', 'achievement', 'accomplish',
            'breakthrough', 'benefit', 'blessing', 'boost', 'bright', 'care', 'caring', 'cheerful',
            'comfort', 'community', 'cooperation', 'dedication', 'dream', 'empower', 'encourage',
            'energy', 'enjoyable', 'enlighten', 'enthusiastic', 'faith', 'flourish', 'freedom',
            'friendship', 'fulfill', 'generous', 'giving', 'grace', 'growth', 'guide', 'harmony',
            'honor', 'humanitarian', 'illuminate', 'improve', 'incredible', 'inspire', 'integrity',
            'joyous', 'justice', 'kindness', 'leader', 'learn', 'light', 'meaningful', 'motivate',
            'noble', 'nurture', 'opportunity', 'optimistic', 'overcome', 'peace', 'peaceful',
            'pleasure', 'prosper', 'protect', 'pure', 'quality', 'radiant', 'rebuild', 'refresh',
            'rejoice', 'relieve', 'renew', 'respect', 'restore', 'reunite', 'revive', 'safe',
            'satisfy', 'secure', 'shine', 'smile', 'strength', 'strong', 'thrive', 'together',
            'treasure', 'trust', 'truth', 'unity', 'uplift', 'valuable', 'victory', 'warm',
            'wealth', 'welcome', 'wise', 'worthy'
        ];
        
        this.negativeWords = [
            'abuse', 'accident', 'afraid', 'anger', 'angry', 'anxiety', 'anxious', 'attack',
            'awful', 'bad', 'bankruptcy', 'battle', 'beaten', 'betray', 'bitter', 'blame',
            'blood', 'bomb', 'break', 'broken', 'cancer', 'careless', 'catastrophe', 'cheat',
            'collapse', 'complaint', 'condemn', 'conflict', 'corrupt', 'crash', 'crime',
            'criminal', 'crisis', 'cruel', 'damage', 'danger', 'dangerous', 'dead', 'deadly',
            'death', 'debt', 'decline', 'defeat', 'depression', 'despair', 'destroy', 'die',
            'difficult', 'disaster', 'disease', 'divorce', 'doubt', 'drown', 'earthquake',
            'emergency', 'enemy', 'error', 'evil', 'explosion', 'fail', 'failure', 'fake',
            'false', 'fatal', 'fear', 'fight', 'fire', 'flood', 'force', 'fraud', 'frighten',
            'guilty', 'gun', 'hate', 'hatred', 'hell', 'horrible', 'horror', 'hurt', 'illness',
            'injure', 'jail', 'kill', 'knife', 'lawsuit', 'lie', 'lose', 'loss', 'murder',
            'pain', 'panic', 'poison', 'pollute', 'poor', 'poverty', 'problem', 'protest',
            'quit', 'racist', 'rape', 'reject', 'revenge', 'riot', 'rob', 'scandal', 'scared',
            'scream', 'shame', 'shoot', 'sick', 'sin', 'steal', 'suffer', 'suicide', 'tear',
            'terrible', 'terror', 'threat', 'torture', 'toxic', 'tragedy', 'trap', 'trouble',
            'ugly', 'unfair', 'unhappy', 'victim', 'violence', 'violent', 'war', 'warn',
            'weapon', 'worry', 'worse', 'worst', 'wound'
        ];
        
        this.contextualPhrases = {
            positive: [
                'good news', 'positive development', 'breakthrough discovery', 'major success',
                'inspiring story', 'heartwarming tale', 'acts of kindness', 'community support',
                'scientific advancement', 'medical breakthrough', 'environmental progress',
                'helping others', 'making a difference', 'positive impact', 'uplifting news',
                'hope restored', 'lives saved', 'dreams realized', 'goals achieved',
                'barriers broken', 'records set', 'milestones reached', 'progress made',
                'solutions found', 'problems solved', 'recovery story', 'success story'
            ],
            negative: [
                'breaking news', 'urgent alert', 'developing story', 'tragic incident',
                'serious concern', 'major setback', 'devastating impact', 'alarming trend',
                'growing crisis', 'urgent situation', 'emergency response', 'serious threat',
                'critical condition', 'major decline', 'significant loss', 'widespread damage',
                'severe consequences', 'troubling development', 'mounting pressure',
                'escalating conflict', 'rising tensions', 'growing concern'
            ]
        };
    }
    
    analyzeSentiment(text) {
        if (!text || typeof text !== 'string') {
            return { score: 0, classification: 'neutral', confidence: 0 };
        }
        
        const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
        const words = cleanText.split(/\s+/).filter(word => word.length > 0);
        
        let positiveScore = 0;
        let negativeScore = 0;
        let totalWords = words.length;
        
        // Check for contextual phrases first (they have higher weight)
        const contextualPositive = this.checkContextualPhrases(text, 'positive');
        const contextualNegative = this.checkContextualPhrases(text, 'negative');
        
        positiveScore += contextualPositive * 2; // Higher weight for phrases
        negativeScore += contextualNegative * 2;
        
        // Analyze individual words
        words.forEach(word => {
            if (this.positiveWords.includes(word)) {
                positiveScore += 1;
            } else if (this.negativeWords.includes(word)) {
                negativeScore += 1;
            }
        });
        
        // Calculate normalized score (-1 to 1)
        const totalSentiment = positiveScore + negativeScore;
        let score = 0;
        
        if (totalSentiment > 0) {
            score = (positiveScore - negativeScore) / totalSentiment;
        }
        
        // Adjust for text length (longer texts might have more nuanced sentiment)
        if (totalWords > 50) {
            score *= 0.9; // Slightly reduce extreme scores for longer texts
        }
        
        // Classify sentiment
        let classification;
        if (score > 0.1) {
            classification = 'positive';
        } else if (score < -0.1) {
            classification = 'negative';
        } else {
            classification = 'neutral';
        }
        
        // Calculate confidence based on the number of sentiment-bearing words
        const confidence = Math.min(totalSentiment / Math.max(totalWords * 0.1, 1), 1);
        
        return {
            score: Math.round(score * 100) / 100, // Round to 2 decimal places
            classification,
            confidence: Math.round(confidence * 100) / 100,
            details: {
                positiveWords: positiveScore - (contextualPositive * 2),
                negativeWords: negativeScore - (contextualNegative * 2),
                contextualPositive,
                contextualNegative,
                totalWords
            }
        };
    }
    
    checkContextualPhrases(text, type) {
        const phrases = this.contextualPhrases[type];
        let count = 0;
        
        phrases.forEach(phrase => {
            const regex = new RegExp(phrase.replace(/\s+/g, '\\s+'), 'gi');
            const matches = text.match(regex);
            if (matches) {
                count += matches.length;
            }
        });
        
        return count;
    }
    
    isPositiveNews(title, content = '') {
        const combinedText = `${title} ${content}`;
        const analysis = this.analyzeSentiment(combinedText);
        
        // For news filtering, we want to be more selective
        // Only return true for clearly positive content
        return analysis.score > 0.2 && analysis.classification === 'positive';
    }
    
    scoreNews(articles) {
        return articles.map(article => {
            const titleAnalysis = this.analyzeSentiment(article.title);
            const contentAnalysis = this.analyzeSentiment(article.summary || article.description || '');
            
            // Weight title more heavily than content
            const combinedScore = (titleAnalysis.score * 0.7) + (contentAnalysis.score * 0.3);
            
            return {
                ...article,
                sentiment: Math.round(combinedScore * 100) / 100,
                sentimentDetails: {
                    title: titleAnalysis,
                    content: contentAnalysis,
                    combined: combinedScore
                }
            };
        });
    }
    
    filterPositiveNews(articles) {
        const scoredArticles = this.scoreNews(articles);
        
        return scoredArticles
            .filter(article => article.sentiment > 0.1) // Only positive or very neutral
            .sort((a, b) => b.sentiment - a.sentiment); // Sort by most positive first
    }
    
    categorizeNewsByMood(articles) {
        const scoredArticles = this.scoreNews(articles);
        
        return {
            veryPositive: scoredArticles.filter(a => a.sentiment > 0.5),
            positive: scoredArticles.filter(a => a.sentiment > 0.1 && a.sentiment <= 0.5),
            neutral: scoredArticles.filter(a => a.sentiment >= -0.1 && a.sentiment <= 0.1),
            negative: scoredArticles.filter(a => a.sentiment < -0.1),
            all: scoredArticles
        };
    }
    
    getEmotionalTone(text) {
        const analysis = this.analyzeSentiment(text);
        
        if (analysis.score > 0.5) return '😊 Very Positive';
        if (analysis.score > 0.2) return '🙂 Positive';
        if (analysis.score > -0.2) return '😐 Neutral';
        if (analysis.score > -0.5) return '😞 Negative';
        return '😢 Very Negative';
    }
    
    getSentimentSummary(articles) {
        if (!articles || articles.length === 0) {
            return {
                averageScore: 0,
                distribution: { positive: 0, neutral: 0, negative: 0 },
                totalArticles: 0
            };
        }
        
        const scoredArticles = this.scoreNews(articles);
        const totalScore = scoredArticles.reduce((sum, article) => sum + article.sentiment, 0);
        const averageScore = totalScore / scoredArticles.length;
        
        const distribution = scoredArticles.reduce((dist, article) => {
            if (article.sentiment > 0.1) {
                dist.positive++;
            } else if (article.sentiment < -0.1) {
                dist.negative++;
            } else {
                dist.neutral++;
            }
            return dist;
        }, { positive: 0, neutral: 0, negative: 0 });
        
        return {
            averageScore: Math.round(averageScore * 100) / 100,
            distribution,
            totalArticles: articles.length
        };
    }
}