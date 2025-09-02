import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../services/newsService';
import { NewsArticle } from '../types';

const BookOpenIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

const NewspaperIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
);

const ArrowUpRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

const ClipboardDocumentListIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 4.8424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C6.34 4.01 5.25 4.973 5.25 6.108V18.75c0 1.243.801 2.25 1.82 2.25h1.061M12 2.25c-.249 0-.497.008-.744.024C10.941 2.39 10.5 2.94 10.5 3.625v1.125c0 .621.504 1.125 1.125 1.125h1.75c.621 0 1.125-.504 1.125-1.125V3.625c0-.685-.441-1.235-.989-1.361A48.424 48.424 0 0 0 12 2.25Z" />
    </svg>
);

const AcademicCapIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
);

const DevicePhoneMobileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75A2.25 2.25 0 0 0 15.75 1.5H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);

const DocumentTextIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-slate-100/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="text-indigo-500 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
    </div>
);

const HomePage: React.FC = () => {
    const [featuredArticles, setFeaturedArticles] = useState<NewsArticle[]>([]);

    useEffect(() => {
        setFeaturedArticles(getNews({ limit: 4, onlyPublished: true }));
    }, []);

    return (
        <div className="space-y-24 my-12">
            <section className="relative text-center py-24 overflow-hidden rounded-3xl">
                {/* Background container */}
                <div 
                    aria-hidden="true" 
                    className="absolute inset-0 w-full h-full">
                    
                    {/* Villa background image banner */}
                    <img 
                        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" 
                        alt="Modern villa background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>

                {/* Content container */}
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter" style={{ textShadow: '0 2px 15px rgba(255, 255, 255, 0.5)' }}>
                        Chào mừng đến <br className="md:hidden"/>
                        <span 
                            className="animate-gradient bg-gradient-to-r from-fuchsia-500 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 200%', filter: 'drop-shadow(0 2px 10px rgba(192, 132, 252, 0.7))' }}
                        >
                            matcanban.com
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200">
                        Nền tảng học ngữ pháp tiếng Anh thông minh, trực quan và hiệu quả.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/grammar" className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                            <BookOpenIcon />
                            Bắt đầu học
                        </Link>
                        <Link to="/news" className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
                            <NewspaperIcon />
                            Tin tức song ngữ
                        </Link>
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8">
                <FeatureCard 
                    title="Vocabulary Pack"
                    description="Tùy chỉnh và mở rộng vốn từ vựng của bạn. Import/Export dễ dàng để học mọi lúc, mọi nơi."
                    icon={<ClipboardDocumentListIcon />}
                />
                <FeatureCard 
                    title="137 Đơn vị Ngữ pháp"
                    description="Bao quát toàn bộ các điểm ngữ pháp cốt lõi, từ cơ bản đến nâng cao, được trình bày một cách hệ thống."
                    icon={<AcademicCapIcon />}
                />
                <FeatureCard 
                    title="Giao diện Apple-Flat"
                    description="Trải nghiệm học tập mượt mà với giao diện sạch sẽ, hiện đại và tối ưu cho cả máy tính và di động."
                    icon={<DevicePhoneMobileIcon />}
                />
            </section>

            <section>
                <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Bài nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredArticles.map((article) => (
                        <Link to="/news" key={article.id} className="group relative bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-start gap-5">
                            <div className="flex-shrink-0 mt-1 text-indigo-600 bg-indigo-100 p-3 rounded-xl">
                                <DocumentTextIcon />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                    {article.title_vi}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(article.date || Date.now()).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <ArrowUpRightIcon className="w-5 h-5"/>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;