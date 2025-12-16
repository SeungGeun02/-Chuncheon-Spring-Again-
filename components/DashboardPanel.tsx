import React, { useState, useMemo } from 'react';
import { Issue, IssueStatus, IssueType, Priority } from '../types';
import { Search, Filter, AlertCircle, Clock, CheckCircle2, MapPin, Calendar, UserCheck } from 'lucide-react';

interface DashboardPanelProps {
  issues: Issue[];
  selectedIssueId: string | null;
  onIssueSelect: (id: string | null) => void;
  onStatusChange: (id: string, newStatus: IssueStatus) => void;
}

const DashboardPanel: React.FC<DashboardPanelProps> = ({ issues, selectedIssueId, onIssueSelect, onStatusChange }) => {
  const [filterStatus, setFilterStatus] = useState<IssueStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<IssueType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering Logic
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchStatus = filterStatus === 'all' || issue.status === filterStatus;
      const matchType = filterType === 'all' || issue.type === filterType;
      const matchSearch = issue.address.includes(searchTerm) || issue.description.includes(searchTerm) || issue.id.includes(searchTerm);
      return matchStatus && matchType && matchSearch;
    });
  }, [issues, filterStatus, filterType, searchTerm]);

  // KPIs
  const kpiStats = useMemo(() => ({
    received: issues.filter(i => i.status === '접수').length,
    processing: issues.filter(i => i.status === '처리중').length,
    completed: issues.filter(i => i.status === '완료').length,
  }), [issues]);

  const selectedIssue = issues.find(i => i.id === selectedIssueId);

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      {/* KPI Header */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50">
        <div className="p-4 text-center">
          <div className="text-xs text-slate-500 mb-1">오늘 접수</div>
          <div className="text-xl font-bold text-slate-800">{kpiStats.received}</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-xs text-slate-500 mb-1">처리중</div>
          <div className="text-xl font-bold text-brand-500">{kpiStats.processing}</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-xs text-slate-500 mb-1">완료</div>
          <div className="text-xl font-bold text-emerald-600">{kpiStats.completed}</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        
        {/* Selected Issue Detail View */}
        {selectedIssue ? (
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
            <button 
              onClick={() => onIssueSelect(null)}
              className="text-xs text-slate-500 hover:text-brand-500 mb-4 flex items-center gap-1"
            >
              ← 목록으로 돌아가기
            </button>
            
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm mb-4">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                   selectedIssue.status === '접수' ? 'bg-slate-100 text-slate-600' :
                   selectedIssue.status === '처리중' ? 'bg-brand-50 text-brand-600' :
                   'bg-emerald-50 text-emerald-600'
                }`}>
                  {selectedIssue.status}
                </span>
                <span className="text-xs font-mono text-slate-400">{selectedIssue.id}</span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-2">{selectedIssue.type}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{selectedIssue.description}</p>
              
              <div className="space-y-3 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {selectedIssue.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  접수일: {selectedIssue.reportedAt}
                </div>
                 <div className="flex items-center gap-2 text-sm text-slate-600">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  담당: {selectedIssue.managerDept}
                </div>
              </div>
            </div>

            {/* Operational Action */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                [운영] 처리 상태 변경
              </label>
              <select 
                value={selectedIssue.status}
                onChange={(e) => onStatusChange(selectedIssue.id, e.target.value as IssueStatus)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md focus:ring-brand-500 focus:border-brand-500 block p-2.5"
              >
                <option value="접수">접수 (대기중)</option>
                <option value="처리중">처리중 (작업지시)</option>
                <option value="완료">완료 (결과통보)</option>
              </select>
              <p className="text-xs text-slate-400 mt-2">
                * 상태 변경 시 민원인에게 알림톡이 발송됩니다.
              </p>
            </div>
          </div>
        ) : (
          /* List View */
          <>
            {/* Filters */}
            <div className="p-4 border-b border-slate-100 bg-white space-y-3">
               <div className="relative">
                <input
                  type="text"
                  placeholder="주소, 유형 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {['all', '접수', '처리중', '완료'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      filterStatus === status 
                        ? 'bg-brand-500 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status === 'all' ? '전체' : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Notice Box */}
            <div className="bg-blue-50/50 p-3 mx-4 mt-4 rounded border border-blue-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-brand-800">동절기 수거 일정 안내</p>
                <p className="text-xs text-brand-700 mt-0.5">11월부터 야간 수거 시간이 20시로 변경됩니다.</p>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 text-xs font-semibold text-slate-500">상태</th>
                    <th className="p-3 text-xs font-semibold text-slate-500">내용/위치</th>
                    <th className="p-3 text-xs font-semibold text-slate-500 text-right">날짜</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredIssues.map((issue) => (
                    <tr 
                      key={issue.id} 
                      onClick={() => onIssueSelect(issue.id)}
                      className="hover:bg-brand-50/30 cursor-pointer transition-colors group"
                    >
                      <td className="p-3 align-top">
                        <span className={`inline-block w-2 h-2 rounded-full mb-1 ${
                          issue.status === '접수' ? 'bg-slate-400' :
                          issue.status === '처리중' ? 'bg-brand-500' :
                          'bg-emerald-500'
                        }`}></span>
                      </td>
                      <td className="p-3">
                        <div className="text-sm font-medium text-slate-700 group-hover:text-brand-600 transition-colors">
                          [{issue.type}] {issue.description.slice(0, 15)}...
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{issue.address}</div>
                      </td>
                      <td className="p-3 text-right align-top text-xs text-slate-400 font-mono">
                        {issue.reportedAt.split(' ')[0].slice(5)}
                      </td>
                    </tr>
                  ))}
                  {filteredIssues.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-400 text-sm">
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPanel;