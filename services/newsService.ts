
import { NewsArticle } from '../types';
import { news as defaultNews } from '../data/news';
import { LOCAL_STORAGE_KEYS } from '../constants';

// Helper to parse dates in various formats for sorting. Handles yyyy-mm-dd, dd/mm/yyyy, and dd-mm-yyyy.
function parseDate(d?: string): number {
  if (!d) return 0;
  // Standardize formats like dd/mm/yyyy or dd-mm-yyyy to yyyy-mm-dd for reliable parsing
  const match = d.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  const isoDate = match ? `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}` : d;
  const timestamp = Date.parse(isoDate);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

/**
 * Loads news from localStorage and intelligently merges it with the default news from the codebase.
 * This ensures that new articles added in code are available, while user edits in localStorage are preserved.
 */
const loadAndMergeNews = (): NewsArticle[] => {
    try {
        const storedNewsRaw = localStorage.getItem(LOCAL_STORAGE_KEYS.NEWS);
        
        // Use a Map to handle merging and ensure unique IDs.
        const combinedNewsMap = new Map<string, NewsArticle>();
        
        // 1. Add default news as the base.
        for (const article of defaultNews) {
            if (article.id) {
                combinedNewsMap.set(article.id, article);
            }
        }

        // 2. If stored news exists, let it override/add to the defaults.
        if (storedNewsRaw) {
            const storedNews: NewsArticle[] = JSON.parse(storedNewsRaw);
            if (Array.isArray(storedNews)) {
                 for (const article of storedNews) {
                    if (article.id) {
                        combinedNewsMap.set(article.id, article);
                    }
                }
            }
        }
        
        return Array.from(combinedNewsMap.values());
    } catch (error) {
        console.error("Failed to load or parse news from localStorage", error);
        return defaultNews; // Fallback to default data in case of errors
    }
};

/**
 * Gets the list of news articles, with options for filtering and sorting.
 * This function reads from storage on each call to ensure data is fresh across the application.
 */
export const getNews = (options?: { limit?: number; onlyPublished?: boolean }): NewsArticle[] => {
    const { limit, onlyPublished = true } = options || {};

    let list = loadAndMergeNews();
    
    if (onlyPublished) {
        // Articles are considered published unless explicitly set to false.
        list = list.filter(n => n.published !== false);
    }
    
    // Sort by date, newest first. Uses updated_at if available, otherwise falls back to date.
    list.sort((a, b) => {
        const dateA = parseDate(a.updated_at || a.date);
        const dateB = parseDate(b.updated_at || b.date);
        return dateB - dateA;
    });

    return typeof limit === 'number' ? list.slice(0, limit) : list;
};

/**
 * Saves the entire list of news articles to localStorage.
 */
export const saveNews = (articles: NewsArticle[]): void => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.NEWS, JSON.stringify(articles, null, 2));
    } catch (error) {
        console.error("Failed to save news to localStorage", error);
    }
};

/**
 * Extracts a unique list of categories from all news articles.
 */
export const getNewsCategories = (): { vi: string, en: string }[] => {
    const allArticles = loadAndMergeNews();
    const categoryMap = new Map<string, { vi: string, en: string }>();
    for (const article of allArticles) {
        if (article.category_vi && article.category_en && !categoryMap.has(article.category_vi)) {
            categoryMap.set(article.category_vi, { vi: article.category_vi, en: article.category_en });
        }
    }
    return Array.from(categoryMap.values());
};