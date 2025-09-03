import React, { useState, useRef, useEffect } from 'react';
import { getNews, getNewsCategories } from '../services/newsService';
import { NewsArticle } from '../types';

type Theme = 'light' | 'sepia' | 'dark';

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

const ArticleView: React.FC<{ article: NewsArticle; onBack: () => void }> = ({ article, onBack }) => {
    const enRef = useRef<HTMLDivElement>(null);
    const viRef = useRef<HTMLDivElement>(null);
    const [isSyncScroll, setIsSyncScroll] = useState(true);
    const lastScrolled = useRef<'en' | 'vi' | null>(null);
    const [theme, setTheme] = useState<Theme>('light');
    const [fontSize, setFontSize] = useState(23); // Use a number for unlimited zoom

    const handleScroll = (scroller: 'en' | 'vi') => {
        if (!isSyncScroll || lastScrolled.current !== scroller) return;

        const source = scroller === 'en' ? enRef.current : viRef.current;
        const target = scroller === 'en' ? viRef.current : enRef.current;

        if (source && target) {
            const scrollPercent = source.scrollTop / (source.scrollHeight - source.clientHeight);
            target.scrollTop = scrollPercent * (target.scrollHeight - target.clientHeight);
        }
    };
    
    const themeClasses = {
        light: 'bg-gray-50 text-gray-800',
        sepia: 'bg-[#fbf3e4] text-[#5f4c3c]',
        dark: 'bg-gray-900 text-gray-300'
    }
    
    const contentThemeClasses = {
        light: 'bg-white',
        sepia: 'bg-[#fdfaf4]',
        dark: 'bg-gray-800'
    }
    
    const increaseFontSize = () => setFontSize(s => s + 1);
    const decreaseFontSize = () => setFontSize(s => Math.max(12, s - 1)); // Set a minimum size

    return (
        <div className={`-m-8 ${themeClasses[theme]} transition-colors duration-300`}>
            <div className="relative h-64 md:h-96">
                <img src={article.thumbnail} alt={article.title_en} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                <div className="relative h-full flex flex-col justify-end text-white p-8">
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">{article.title_vi}</h1>
                    <p className="text-2xl md:text-3xl mt-2 text-gray-200 drop-shadow-lg">{article.title_en}</p>
                </div>
            </div>

            <div className={`relative p-6 md:p-8 rounded-t-2xl -mt-10 shadow-2xl ${contentThemeClasses[theme]} transition-colors duration-300`}>
                <div className="flex items-center justify-between mb-4 sticky top-16 py-2 z-10 border-b border-gray-200/20" style={{backgroundColor: 'inherit'}}>
                    <button onClick={onBack} className="text-lg flex items-center gap-2 px-4 py-2 bg-gray-100/10 text-inherit font-semibold rounded-lg hover:bg-gray-200/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Quay lại
                    </button>
                    <div className="flex items-center space-x-4">
                        {/* Font Size Controls */}
                        <div className="flex items-center space-x-2">
                             <button onClick={decreaseFontSize} className="px-3 py-1 text-2xl rounded-md hover:bg-gray-200/20 transition-colors">-</button>
                             <span className="text-lg font-semibold w-8 text-center">{fontSize}</span>
                             <button onClick={increaseFontSize} className="px-3 py-1 text-2xl rounded-md hover:bg-gray-200/20 transition-colors">+</button>
                        </div>
                        {/* Theme Controls */}
                        <div className="flex items-center space-x-1 p-1 rounded-lg bg-gray-200/10">
                            <button onClick={() => setTheme('light')} className={`w-8 h-8 rounded-md bg-white border ${theme === 'light' ? 'ring-2 ring-blue-500' : ''}`}></button>
                            <button onClick={() => setTheme('sepia')} className={`w-8 h-8 rounded-md bg-[#fbf3e4] border ${theme === 'sepia' ? 'ring-2 ring-blue-500' : ''}`}></button>
                            <button onClick={() => setTheme('dark')} className={`w-8 h-8 rounded-md bg-gray-800 border ${theme === 'dark' ? 'ring-2 ring-blue-500' : ''}`}></button>
                        </div>
                         {/* Sync Scroll Toggle */}
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-medium">Sync Scroll</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={isSyncScroll} onChange={() => setIsSyncScroll(!isSyncScroll)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200/50 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div 
                        ref={viRef} 
                        onMouseEnter={() => lastScrolled.current = 'vi'}
                        onScroll={() => handleScroll('vi')}
                        className="prose prose-purple max-w-none prose-h2:text-inherit prose-p:text-inherit prose-b:text-purple-500"
                        style={{ fontSize: `${fontSize}px` }}
                        dangerouslySetInnerHTML={{ __html: article.content_vi }}
                    ></div>
                    <div 
                        ref={enRef} 
                        onMouseEnter={() => lastScrolled.current = 'en'}
                        onScroll={() => handleScroll('en')}
                        className="prose prose-indigo max-w-none prose-h2:text-inherit prose-p:text-inherit prose-b:text-purple-500"
                        style={{ fontSize: `${fontSize}px` }}
                        dangerouslySetInnerHTML={{ __html: article.content_en }}
                    ></div>
                </div>
            </div>
        </div>
    )
};

type Category = { vi: string, en: string };

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    useEffect(() => {
        setArticles(getNews({ onlyPublished: true }));
        setCategories(getNewsCategories());
    }, [selectedArticle]); // Refresh list when returning from article view in case of admin changes
    
    const filteredArticles = selectedCategory 
        ? articles.filter(a => a.category_vi === selectedCategory.vi)
        : articles;

    const navButtonClass = (isActive: boolean) => 
        `whitespace-nowrap py-3 px-1 border-b-2 font-medium text-lg transition-colors ${
          isActive
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`;

    if (selectedArticle) {
        return <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
    }

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
                    <FeaturedNewsCard article={featuredArticle} onSelect={() => setSelectedArticle(featuredArticle)} />
                </section>
            )}

            {otherArticles.length > 0 && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherArticles.map(article => (
                        <NewsCard key={article.id} article={article} onSelect={() => setSelectedArticle(article)} />
                    ))}
                </section>
            )}
        </div>
    );
};

export default NewsPage;