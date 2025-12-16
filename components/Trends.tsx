import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { CHART_DATA_TRENDS, CHART_DATA_TYPE } from '../constants';

const Trends: React.FC = () => {
  const COLORS = ['#009FE3', '#10B981', '#F59E0B', '#64748B'];

  return (
    <section id="trends" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">생활 환경 데이터 분석</h2>
          <p className="text-slate-500">최근 춘천시 생활 폐기물 발생 및 처리 현황 추세입니다. (데이터 기준: 실시간)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-700 mb-6 flex justify-between items-center">
              주간 민원 접수/처리 현황
              <span className="text-xs font-normal bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">최근 7일</span>
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA_TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{fontSize: 12, fill: '#64748B'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 12, fill: '#64748B'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="접수" stroke="#94A3B8" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="완료" stroke="#009FE3" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-700 mb-6 flex justify-between items-center">
              유형별 발생 비중
              <span className="text-xs font-normal bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">10월 누적</span>
            </h3>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CHART_DATA_TYPE}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CHART_DATA_TYPE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trends;