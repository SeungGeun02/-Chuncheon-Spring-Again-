import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: 'manager' | 'citizen') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'citizen' | 'manager'>('manager');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API delay
    setTimeout(() => {
      onLogin(activeTab);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">로그인</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'manager' ? 'text-brand-600 border-b-2 border-brand-500' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('manager')}
          >
            업무 담당자
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'citizen' ? 'text-brand-600 border-b-2 border-brand-500' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('citizen')}
          >
            시민
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">아이디 (이메일)</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="example@chuncheon.go.kr" 
            />
          </div>
          <div>
             <label className="block text-xs font-bold text-slate-500 mb-1">비밀번호</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="••••••••" 
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg shadow-lg shadow-brand-500/30 transition-all mt-4"
          >
            {activeTab === 'manager' ? '행정망 로그인' : '간편 로그인'}
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            * 춘천시청 통합 계정으로 이용 가능합니다.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;