import React, { useState, useEffect } from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onLogoutClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      {/* Top Status Bar (Operational Feel) */}
      <div className={`w-full bg-brand-900 text-white text-[10px] sm:text-xs py-1.5 px-6 flex justify-between items-center transition-all ${scrolled ? 'h-0 overflow-hidden py-0 opacity-0' : 'h-auto opacity-100'}`}>
        <div className="flex gap-4">
          <span className="opacity-80">데이터 업데이트: 오늘 09:00</span>
          <span className="opacity-80 hidden sm:inline">|</span>
          <span className="text-emerald-300 font-medium hidden sm:inline">시스템 상태: 정상 가동중</span>
        </div>
        <div className="flex gap-4">
           <a href="#" className="opacity-70 hover:opacity-100">공지사항</a>
           <a href="#" className="opacity-70 hover:opacity-100">운영가이드</a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo (Text Only) */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
           <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-800' : 'text-white'}`}>
             춘천, <span className={scrolled ? 'text-brand-500' : 'text-brand-200'}>다시봄</span>
           </span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
          <a href="#map" className="hover:text-brand-500 transition-colors">현황 지도</a>
          <a href="#trends" className="hover:text-brand-500 transition-colors">추세 분석</a>
          <a href="#" className="hover:text-brand-500 transition-colors">정책 안내</a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className={`relative p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/10 text-white'}`}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {user?.isLoggedIn ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200/30">
              <div className={`text-right hidden sm:block ${scrolled ? 'text-slate-700' : 'text-white'}`}>
                <div className="text-xs opacity-70">안녕하세요</div>
                <div className="text-sm font-bold">{user.name} 님</div>
              </div>
              <button 
                onClick={onLogoutClick}
                className={`p-2 rounded-full border ${scrolled ? 'border-slate-200 hover:bg-slate-100 text-slate-600' : 'border-white/30 hover:bg-white/10 text-white'}`}
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${scrolled ? 'bg-brand-500 text-white hover:bg-brand-600' : 'bg-white text-brand-600 hover:bg-slate-100'}`}
            >
              로그인
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;