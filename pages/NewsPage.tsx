
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { getNews, getNewsCategories } from '../services/newsService';
import { NewsArticle } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

type Theme = 'light' | 'sepia' | 'dark';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// This is the main view for browsing articles
const NewsBrowser: React.FC<{
    articles: NewsArticle[];
    categories: { vi: string; en: string }[];
    onSelectArticle: (article: NewsArticle) => void;
}> = ({ articles, categories, onSelectArticle }) => {
    const [selectedCategory, setSelectedCategory] = useState<{ vi: string; en: string } | null>(null);

    const filteredArticles = selectedCategory
        ? articles.filter(a => a.category_vi === selectedCategory.vi)
        : articles;

    const navButtonClass = (isActive: boolean) =>
        `whitespace-nowrap py-3 px-1 border-b-2 font-medium text-lg transition-colors ${
          isActive
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`;
    
    const featuredArticle = filteredArticles[0];
    const otherArticles = filteredArticles.slice(1);

    return (
         <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Báo song ngữ</h1>
                <p className="mt-1 text-xl text-gray-600">Khám phá thế giới qua các bài đọc được tuyển chọn.</p>
            </div>
            
            <nav className="border-b border-gray-200">
                <ul className="flex items-center -mb-px space-x-6 overflow-x-auto toolbar">
                    <li>
                        <button onClick={() => setSelectedCategory(null)} className={navButtonClass(!selectedCategory)}>
                            Tất cả
                        </button>
                    </li>
                    {categories.map(cat => (
                         <li key={cat.vi}>
                            <button onClick={() => setSelectedCategory(cat)} className={navButtonClass(selectedCategory?.vi === cat.vi)}>
                                {cat.vi}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {featuredArticle && (
                <section>
                    <FeaturedNewsCard article={featuredArticle} onSelect={() => onSelectArticle(featuredArticle)} />
                </section>
            )}

            {otherArticles.length > 0 && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherArticles.map(article => (
                        <NewsCard key={article.id} article={article} onSelect={() => onSelectArticle(article)} />
                    ))}
                </section>
            )}
        </div>
    );
};

const FeaturedNewsCard: React.FC<{ article: NewsArticle; onSelect: () => void }> = ({ article, onSelect }) => (
    <div 
        className="grid md:grid-cols-2 gap-0 md:gap-8 items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
        onClick={onSelect}
    >
        <div className="relative h-64 md:h-full w-full">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={article.thumbnail} alt={article.title_en} />
        </div>
        <div className="p-6 md:p-8">
            <p className="text-lg text-indigo-600 font-semibold">{article.category_vi}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{article.title_vi}</h2>
            <p className="mt-1 text-xl text-gray-600">{article.title_en}</p>
            <p className="mt-4 text-lg text-gray-500">{new Date(article.date || Date.now()).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
    </div>
);

const NewsCard: React.FC<{ article: NewsArticle; onSelect: () => void }> = ({ article, onSelect }) => (
    <div 
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
        onClick={onSelect}
    >
        <div className="relative h-48 overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={article.thumbnail} alt={article.title_en} />
        </div>
        <div className="p-4">
            <p className="text-base text-indigo-600 font-semibold">{article.category_vi}</p>
            <h3 className="text-gray-800 font-bold text-xl mt-1 group-hover:text-indigo-600 transition-colors">{article.title_vi}</h3>
            <p className="text-lg text-gray-500">{article.title_en}</p>
        </div>
    </div>
);

// --- Word Lookup Modal Component ---
type TranslationResult = { ipa: string; ipa_vi: string; vi: string };
type ModalData = {
  word: string;
  translation: TranslationResult | null;
  loading: boolean;
};

const WordLookupModal: React.FC<{ data: ModalData; onClose: () => void }> = ({ data, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl text-center p-8 md:p-12 relative"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-7xl md:text-8xl font-bold text-indigo-600 break-words mb-4" style={{lineHeight: '1.1'}}>{data.word}</h2>
                {data.loading && (
                    <div className="space-y-4 mt-6">
                        <div className="animate-pulse bg-slate-200 h-8 w-1/2 mx-auto rounded-md"></div>
                        <div className="animate-pulse bg-slate-200 h-6 w-1/3 mx-auto rounded-md"></div>
                        <div className="animate-pulse bg-slate-200 h-10 w-2/3 mx-auto rounded-md"></div>
                    </div>
                )}
                {data.translation && (
                    <div className="space-y-4 mt-6">
                        <p className="text-4xl text-slate-700 font-mono">{data.translation.ipa}</p>
                        <p className="text-2xl text-slate-500 font-medium">{data.translation.ipa_vi}</p>
                        <p className="text-5xl text-rose-600 font-bold">{data.translation.vi}</p>
                    </div>
                )}
                 <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors text-3xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

// --- Main Article View Component ---
const ArticleView: React.FC<{ article: NewsArticle; onBack: () => void }> = ({ article, onBack }) => {
    const enRef = useRef<HTMLDivElement>(null);
    const viRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef<boolean>(false);
    const scrollTimeout = useRef<number | null>(null);
    const wordCache = useRef<Map<string, TranslationResult>>(new Map());

    const [isSyncScroll, setIsSyncScroll] = useState(true);
    const [theme, setTheme] = useState<Theme>('light');
    const [fontSize, setFontSize] = useState(23);
    const [modalData, setModalData] = useState<ModalData | null>(null);
    
    // This function robustly wraps every word in a clickable span
    const processClickableContent = (htmlContent: string): string => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          const fragment = document.createDocumentFragment();
          const words = node.textContent.split(/(\s+)/); // Split by spaces, keeping them
          words.forEach(word => {
            if (word.trim().length > 0) {
              const span = document.createElement('span');
              span.className = 'clickable-word cursor-pointer hover:bg-yellow-200 transition-colors rounded';
              span.textContent = word;
              fragment.appendChild(span);
            } else {
              fragment.appendChild(document.createTextNode(word)); // Re-add space
            }
          });
          node.parentNode?.replaceChild(fragment, node);
        } else {
          node.childNodes.forEach(walk);
        }
      };
      
      walk(tempDiv);
      return tempDiv.innerHTML;
    };

    const processedContentEn = useMemo(() => processClickableContent(article.content_en), [article.content_en]);
    
    const handleContentClick = useCallback(async (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('clickable-word')) {
            const word = (target.textContent || '').trim().replace(/[.,!?;:"“'”]/g, '');
            if (!word) return;

            setModalData({ word, translation: null, loading: true });

            // 1. Check cache first
            if (wordCache.current.has(word.toLowerCase())) {
                setModalData({ word, translation: wordCache.current.get(word.toLowerCase())!, loading: false });
                return;
            }

            // 2. If not in cache, call API
            try {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Provide the IPA, a Vietnamized phonetic guide, and the Vietnamese translation for the English word: "${word}".`,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                ipa: { type: Type.STRING },
                                ipa_vi: { type: Type.STRING },
                                vi: { type: Type.STRING }
                            }
                        }
                    }
                });
                
                const result = JSON.parse(response.text) as TranslationResult;
                wordCache.current.set(word.toLowerCase(), result); // Save to cache
                setModalData({ word, translation: result, loading: false });

            } catch (error) {
                console.error("Gemini API call failed:", error);
                 const errorResult = { ipa: "N/A", ipa_vi: "Không thể dịch", vi: "Lỗi" };
                 setModalData({ word, translation: errorResult, loading: false });
            }
        }
    }, []);

    const handleScroll = (scroller: 'en' | 'vi') => {
        if (!isSyncScroll || isScrolling.current) return;
        isScrolling.current = true;
        
        const source = scroller === 'en' ? enRef.current : viRef.current;
        const target = scroller === 'en' ? viRef.current : enRef.current;

        if (source && target) {
            const scrollPercent = source.scrollTop / (source.scrollHeight - source.clientHeight);
            target.scrollTop = scrollPercent * (target.scrollHeight - target.clientHeight);
        }
        
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = window.setTimeout(() => {
            isScrolling.current = false;
        }, 100);
    };

    const themeClasses = {
        light: 'bg-gray-50 text-gray-800',
        sepia: 'bg-[#fbf3e4] text-[#5f4c3c]',
        dark: 'bg-gray-900 text-gray-300'
    };
    const contentClasses = {
        light: 'bg-white',
        sepia: 'bg-[#fdfaf4]',
        dark: 'bg-gray-800'
    };
    
    const increaseFontSize = () => setFontSize(s => Math.min(40, s + 1));
    const decreaseFontSize = () => setFontSize(s => Math.max(12, s - 1));

    return (
        <div className={`-m-4 sm:-m-6 lg:-m-8 font-serif ${themeClasses[theme]} transition-colors duration-300`}>
            {modalData && <WordLookupModal data={modalData} onClose={() => setModalData(null)} />}
            
             <div className="relative h-64 md:h-96 w-full">
                <img src={article.thumbnail} alt={article.title_en} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                <div className="relative h-full flex flex-col justify-end text-white p-4 sm:p-6 lg:p-8 container mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">{article.title_vi}</h1>
                    <p className="text-2xl md:text-3xl mt-2 text-gray-200 drop-shadow-lg">{article.title_en}</p>
                </div>
            </div>
            
            <div className={`sticky top-[63px] py-2 z-40 border-b border-black/10 shadow-sm ${themeClasses[theme]}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                     <button onClick={onBack} className="text-lg flex items-center gap-2 px-4 py-2 bg-black/5 text-inherit font-sans font-semibold rounded-lg hover:bg-black/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Quay lại</span>
                    </button>
                    <div className="flex items-center gap-4 md:gap-6 font-sans">
                        <div className="flex items-center gap-1">
                            <button onClick={decreaseFontSize} className="px-3 py-1 text-2xl rounded-md hover:bg-black/10 transition-colors">-</button>
                            <span className="text-lg font-semibold w-6 text-center">{fontSize}</span>
                            <button onClick={increaseFontSize} className="px-3 py-1 text-2xl rounded-md hover:bg-black/10 transition-colors">+</button>
                        </div>
                        <div className="flex items-center gap-1 p-1 bg-black/5 rounded-md">
                            <button onClick={() => setTheme('light')} className={`w-8 h-8 rounded bg-white ${theme === 'light' ? 'ring-2 ring-indigo-500' : ''}`}></button>
                            <button onClick={() => setTheme('sepia')} className={`w-8 h-8 rounded bg-[#fbf3e4] ${theme === 'sepia' ? 'ring-2 ring-indigo-500' : ''}`}></button>
                            <button onClick={() => setTheme('dark')} className={`w-8 h-8 rounded bg-gray-800 ${theme === 'dark' ? 'ring-2 ring-indigo-500' : ''}`}></button>
                        </div>
                         <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold hidden md:inline">Sync Scroll</span>
                            <button onClick={() => setIsSyncScroll(v => !v)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isSyncScroll ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSyncScroll ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:p-8 py-8">
                <div className={`p-4 rounded-lg mb-6 text-center font-sans ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                    💡 Mẹo: Nhấp vào một từ tiếng Anh để xem nghĩa, phiên âm IPA và cách đọc Việt hóa.
                </div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                     <div 
                        ref={viRef} 
                        onScroll={() => handleScroll('vi')}
                        className={`prose prose-xl max-w-none leading-relaxed overflow-y-auto max-h-[calc(100vh-200px)] p-4 rounded-lg ${contentClasses[theme]}`}
                        style={{ fontSize: `${fontSize}px` }}
                        dangerouslySetInnerHTML={{ __html: article.content_vi }}
                     />
                      <div 
                        ref={enRef} 
                        onScroll={() => handleScroll('en')}
                        onClick={handleContentClick}
                        className={`prose prose-xl max-w-none leading-relaxed overflow-y-auto max-h-[calc(100vh-200px)] p-4 rounded-lg ${contentClasses[theme]}`}
                        style={{ fontSize: `${fontSize}px` }}
                        dangerouslySetInnerHTML={{ __html: processedContentEn }}
                      />
                </div>
            </div>
        </div>
    );
};

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [categories, setCategories] = useState<{ vi: string; en: string }[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    useEffect(() => {
        setArticles(getNews({ onlyPublished: true }));
        setCategories(getNewsCategories());
    }, []);

    if (selectedArticle) {
        return <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
    }

    return (
        <NewsBrowser
            articles={articles}
            categories={categories}
            onSelectArticle={setSelectedArticle}
        />
    );
};

export default NewsPage;
