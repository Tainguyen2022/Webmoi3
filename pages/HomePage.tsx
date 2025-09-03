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

const ClipboardDocumentListIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 4.8424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C6.34 4.01 5.25 4.973 5.25 6.108V18.75c0 1.243.801 2.25 1.82 2.25h1.061M12 2.25c-.249 0-.497.008-.744.024C10.941 2.39 10.5 2.94 10.5 3.625v1.125c0 .621.504 1.125 1.125 1.125h1.75c.621 0 1.125-.504 1.125-1.125V3.625c0-.685-.441-1.235-.989-1.361A48.424 48.424 0 0 0 12 2.25Z" />
    </svg>
);

const AcademicCapIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
);

const DevicePhoneMobileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75A2.25 2.25 0 0 0 15.75 1.5H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="relative p-1 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300 group">
        <div className="bg-white rounded-xl p-8 h-full">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-4 text-indigo-600 group-hover:text-purple-600 transition-colors">
                {icon}
            </div>
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">{title}</h3>
            <p className="text-slate-600 text-xl">{description}</p>
        </div>
    </div>
);

const HomePage: React.FC = () => {
    const [featuredArticles, setFeaturedArticles] = useState<NewsArticle[]>([]);

    useEffect(() => {
        setFeaturedArticles(getNews({ limit: 4, onlyPublished: true }));
    }, []);

    return (
        <div className="space-y-24 my-12">
            <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden rounded-3xl">
                <div aria-hidden="true" className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full">
                        <div className="blob blob-1 top-1/4 left-1/4"></div>
                        <div className="blob blob-2 top-1/2 right-1/4"></div>
                    </div>
                </div>

                <div className="relative z-10">
                    <h1 className="text-7xl md:text-8xl font-extrabold text-slate-900 tracking-tighter">
                        Chào mừng đến <br className="md:hidden"/>
                        <span 
                            className="animate-gradient bg-gradient-to-r from-fuchsia-500 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 200%', filter: 'drop-shadow(0 2px 15px rgba(192, 132, 252, 0.4))' }}
                        >
                            matcanban.com
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-2xl md:text-3xl text-slate-600">
                        Nền tảng học ngữ pháp tiếng Anh thông minh, trực quan và hiệu quả.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/grammar" className="text-xl flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                            <BookOpenIcon />
                            Bắt đầu học
                        </Link>
                        <Link to="/news" className="text-xl flex items-center gap-2 px-8 py-4 bg-white/50 border border-slate-300 text-slate-700 font-semibold rounded-full shadow-lg backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
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
                    title="Giao diện Hiện đại"
                    description="Trải nghiệm học tập mượt mà với giao diện sạch sẽ, tối ưu cho cả máy tính và di động, nay với tone màu sáng đầy cảm hứng."
                    icon={<DevicePhoneMobileIcon />}
                />
            </section>

            <section>
                <h2 className="text-5xl font-bold text-slate-900 mb-10 text-center">Bài nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredArticles.map((article) => (
                        <Link to="/news" key={article.id} className="group relative bg-white border border-slate-200 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden">
                             <img src={article.thumbnail} alt={article.title_vi} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                             <div className="p-4">
                                <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-xl">
                                    {article.title_vi}
                                </h3>
                                <p className="text-lg text-slate-500 mt-1">
                                    {new Date(article.date || Date.now()).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;