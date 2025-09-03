import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GrammarPage from './pages/GrammarPage';
import NewsPage from './pages/NewsPage';
import AdminPage from './pages/AdminPage';
import SolvePage from './pages/SolvePage';

const App: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
    }`;

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans bg-transparent">
        <header className="sticky top-0 bg-white/60 backdrop-blur-md shadow-sm z-50">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.747h18"/>
                        </svg>
                        <span className="font-bold text-xl text-slate-900">matcanban.com</span>
                    </NavLink>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink to="/" className={navLinkClass}>Trang chủ</NavLink>
                  <NavLink to="/grammar" className={navLinkClass}>Ngữ pháp</NavLink>
                  <NavLink to="/news" className={navLinkClass}>Báo song ngữ</NavLink>
                  <NavLink to="/giai-de" className={navLinkClass}>Giải đề</NavLink>
                  <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/grammar" element={<GrammarPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/giai-de" element={<SolvePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
        <footer className="bg-transparent border-t border-slate-200">
            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
                Made by <a href="#" className="font-semibold text-indigo-600 hover:underline">Thầy Nguyễn Tài</a>
            </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;