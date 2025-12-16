import React from 'react';
import { ArrowRight, LogIn } from 'lucide-react';

interface HeroProps {
  onLoginClick: () => void;
  onMapClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLoginClick, onMapClick }) => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Updated Image: Bright river city landscape with mountains and blue sky */}
        <img 
          src="https://images.unsplash.com/photo-1634956322929-16518175d7b8?q=80&w=2670&auto=format&fit=crop" 
          alt="Chuncheon Landscape" 
          className="w-full h-full object-cover"
        />
        {/* Natural overlay: Minimal tint on top to show blue sky, gradient at bottom for text readability */}
        <div className="absolute inset-0 bg-slate-900/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
        <div className="inline-block px-4 py-1.5 mb-6 border border-white/60 rounded-full bg-white/20 backdrop-blur-md shadow-sm">
          <span className="text-white text-sm font-bold tracking-wider drop-shadow-md">춘천시 자원순환과 운영 시스템</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
          춘천, <span className="text-brand-300">다시봄</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-10 leading-relaxed font-medium opacity-95 max-w-2xl mx-auto drop-shadow-lg">
          푸른 하늘과 맑은 호반의 도시 춘천.<br/>
          시민과 함께 깨끗한 생활 환경을 만들어갑니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onMapClick}
            className="group px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold shadow-lg shadow-brand-500/40 transition-all flex items-center gap-2 border border-transparent hover:scale-105"
          >
            현황 지도 보기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onLoginClick}
            className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white border border-white/60 rounded-full font-bold backdrop-blur-md transition-all flex items-center gap-2 hover:scale-105 shadow-lg"
          >
            <LogIn className="w-5 h-5" />
            업무 담당자 / 시민 로그인
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center shadow-lg bg-white/10 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;