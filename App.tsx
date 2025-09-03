
import React, { useState } from 'react';
// FIX: The named imports from 'react-router-dom' were not being found.
// Switched to a namespace import to resolve potential module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import HomePage from './pages/HomePage';
import GrammarPage from './pages/GrammarPage';
import NewsPage from './pages/NewsPage';
import AdminPage from './pages/AdminPage';
import SolvePage from './pages/SolvePage';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Trang chủ' },
    { to: '/grammar', label: 'Ngữ pháp' },
    { to: '/giai-de', label: 'Giải đề' },
    { to: '/news', label: 'Báo song ngữ' },
    { to: '/admin', label: 'Admin' },
  ];

  const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-xl font-medium transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-lg font-medium transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
    }`;

  return (
    <ReactRouterDOM.HashRouter>
      <div className="min-h-screen flex flex-col font-sans bg-transparent">
        <header className="sticky top-0 bg-white/60 backdrop-blur-md shadow-sm z-50">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                    <ReactRouterDOM.NavLink to="/" className="flex items-center space-x-2">
                        <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.747h18"/>
                        </svg>
                        <span className="font-bold text-xl text-slate-900">matcanban.com</span>
                    </ReactRouterDOM.NavLink>
                </div>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-baseline space-x-6">
                {navItems.map((item) => (
                  <ReactRouterDOM.NavLink key={item.to} to={item.to} className={desktopNavLinkClass}>
                    {item.label}
                  </ReactRouterDOM.NavLink>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-controls="mobile-menu"
                  aria-expanded={isMenuOpen}
                  aria-label="Main menu"
                >
                  {isMenuOpen ? (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )}
                </button>
              </div>

            </div>
            
            {/* Mobile Menu Panel */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-3`} id="mobile-menu">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <ReactRouterDOM.NavLink
                    key={item.to}
                    to={item.to}
                    className={mobileNavLinkClass}
                    onClick={() => setIsMenuOpen(false)} // Close menu on navigation
                  >
                    {item.label}
                  </ReactRouterDOM.NavLink>
                ))}
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <ReactRouterDOM.Routes>
            <ReactRouterDOM.Route path="/" element={<HomePage />} />
            <ReactRouterDOM.Route path="/grammar" element={<GrammarPage />} />
            <ReactRouterDOM.Route path="/news" element={<NewsPage />} />
            <ReactRouterDOM.Route path="/giai-de" element={<SolvePage />} />
            <ReactRouterDOM.Route path="/admin" element={<AdminPage />} />
          </ReactRouterDOM.Routes>
        </main>
        
        <footer className="bg-transparent border-t border-slate-200">
            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
                Made by <a href="#" className="font-semibold text-indigo-600 hover:underline">Thầy Nguyễn Tài</a>
            </div>
        </footer>
      </div>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;
