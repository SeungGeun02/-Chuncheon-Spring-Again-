import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white font-bold text-lg mb-4">춘천, 다시봄</h3>
          <p className="mb-4 text-slate-500 max-w-sm">
            본 서비스는 춘천시 자원순환과에서 운영하는 생활환경 모니터링 시스템입니다.
            시민 여러분의 소중한 참여가 깨끗한 춘천을 만듭니다.
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <span className="text-slate-600">|</span>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <span className="text-slate-600">|</span>
            <a href="#" className="hover:text-white transition-colors">이메일무단수집거부</a>
          </div>
        </div>
        
        <div>
          <h4 className="text-slate-200 font-semibold mb-3">관련 사이트</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">춘천시청</a></li>
            <li><a href="#" className="hover:text-white transition-colors">자원순환과</a></li>
            <li><a href="#" className="hover:text-white transition-colors">생활폐기물 배출안내</a></li>
          </ul>
        </div>

        <div>
           <h4 className="text-slate-200 font-semibold mb-3">문의처</h4>
           <div className="space-y-1 text-xs">
             <p>강원특별자치도 춘천시 시청길 11 (옥천동)</p>
             <p>대표전화: 033-250-3114</p>
             <p>자원순환과: 033-250-1234</p>
           </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-700 text-center text-xs text-slate-500">
        © Chuncheon City. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;