import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Map from './components/Map';
import DashboardPanel from './components/DashboardPanel';
import Trends from './components/Trends';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import { INITIAL_ISSUES, ZONES } from './constants';
import { Issue, IssueStatus, User } from './types';

const App: React.FC = () => {
  // Global State
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toast, setToast] = useState<{message: string, visible: boolean}>({ message: '', visible: false });

  // Handlers
  const handleIssueSelect = (id: string | null) => {
    setSelectedIssueId(id);
  };

  const handleZoneClick = (zoneName: string) => {
    showToast(`'${zoneName}' 구역이 선택되었습니다.`);
    // In a real app, this would zoom the map or filter the list
  };

  const handleStatusChange = (id: string, newStatus: IssueStatus) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    ));
    showToast(`민원(${id}) 상태가 '${newStatus}'(으)로 변경되었습니다.`);
  };

  const handleLogin = (role: 'manager' | 'citizen') => {
    setUser({
      isLoggedIn: true,
      role,
      name: role === 'manager' ? '김춘천 주무관' : '시민 홍길동'
    });
    showToast(`${role === 'manager' ? '관리자' : '시민'} 계정으로 로그인되었습니다.`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('로그아웃 되었습니다.');
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const scrollToMap = () => {
    const mapSection = document.getElementById('map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB] font-sans text-slate-800">
      <Navbar 
        user={user} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      
      <main>
        <Hero onLoginClick={() => setIsLoginModalOpen(true)} onMapClick={scrollToMap} />
        
        {/* Map + Dashboard Section */}
        <section id="map" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">실시간 환경 민원 현황</h2>
            <p className="text-slate-500 mt-2">각 구역별 생활 폐기물 접수 및 처리 현황을 실시간으로 모니터링합니다.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 h-[800px] lg:h-[600px]">
            {/* Left: Map */}
            <div className="lg:w-3/5 h-[350px] lg:h-full shadow-lg rounded-xl bg-white p-1 border border-slate-100">
              <Map 
                zones={ZONES} 
                issues={issues} 
                selectedIssueId={selectedIssueId} 
                onIssueClick={handleIssueSelect}
                onZoneClick={handleZoneClick}
              />
            </div>
            
            {/* Right: Dashboard */}
            <div className="lg:w-2/5 h-full min-h-[400px]">
              <DashboardPanel 
                issues={issues}
                selectedIssueId={selectedIssueId}
                onIssueSelect={handleIssueSelect}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
        </section>

        <Trends />
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin}
      />

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};

export default App;