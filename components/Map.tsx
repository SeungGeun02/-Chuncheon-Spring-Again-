import React, { useState } from 'react';
import { Zone, Issue } from '../types';
import { Layers, Zap } from 'lucide-react';

interface MapProps {
  zones: Zone[];
  issues: Issue[];
  selectedIssueId: string | null;
  onIssueClick: (id: string) => void;
  onZoneClick: (zoneName: string) => void;
}

const Map: React.FC<MapProps> = ({ zones, issues, selectedIssueId, onIssueClick, onZoneClick }) => {
  const [viewMode, setViewMode] = useState<'live' | 'prediction'>('live');

  return (
    <div className="relative w-full h-full bg-[#F1F5F9] rounded-xl overflow-hidden shadow-inner border border-slate-200 flex items-center justify-center font-sans">
      
      {/* Control Tabs */}
      <div className="absolute top-4 left-4 z-30 flex gap-2">
        <div className="bg-white/95 backdrop-blur rounded-lg p-1 shadow-md border border-slate-200 flex text-xs font-bold">
          <button
            onClick={() => setViewMode('live')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all ${
              viewMode === 'live' 
                ? 'bg-[#009FE3] text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            현황
          </button>
          <button
            onClick={() => setViewMode('prediction')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all ${
              viewMode === 'prediction' 
                ? 'bg-purple-600 text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            분석
          </button>
        </div>
      </div>

      <svg 
        viewBox="0 0 100 100" 
        className="relative z-10 w-full h-full max-h-[95%]"
        preserveAspectRatio="xMidYMid meet" 
      >
        {/* --- 1. BASE GEOGRAPHY --- */}
        {/* Fill SVG area with Water color. The outer container is Land color (#F1F5F9) to handle aspect ratio gaps. */}
        <rect x="0" y="0" width="100" height="100" fill="#E0F2FE" />

        {/* --- 2. ZONES (Land Masses) --- */}
        {zones.map((zone) => {
          // Default colors for land
          let fillColor = "#F8FAFC"; // Slate 50
          let strokeColor = "#CBD5E1"; // Slate 300
          let strokeWidth = "0.3";
          
          if (viewMode === 'prediction') {
            strokeWidth = "0.4";
            switch (zone.prediction.level) {
              case '혼잡': fillColor = "#FEE2E2"; break; // Light Red
              case '주의': fillColor = "#FEF3C7"; break; // Light Amber
              case '보통': fillColor = "#DBEAFE"; break; // Light Blue
              case '원활': fillColor = "#D1FAE5"; break; // Light Emerald
            }
          }

          return (
            <g key={zone.id} onClick={() => onZoneClick(zone.name)} className="cursor-pointer group">
              <path
                d={zone.path}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                className={`transition-all duration-300 ${viewMode === 'live' ? 'group-hover:fill-brand-50 group-hover:stroke-brand-300' : ''}`}
              />
              
              {/* Zone Name Labels - Increased Size and Always Visible */}
              <text
                x={zone.cx}
                y={zone.cy}
                fontSize="3.5"
                textAnchor="middle"
                className="font-bold fill-slate-500 pointer-events-none opacity-70"
                style={{ textShadow: '1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white' }}
              >
                {zone.name}
              </text>
            </g>
          );
        })}


        {/* --- 3. INFRASTRUCTURE (Bridge) --- */}
        <g stroke="white" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
           {/* Single Soyang 2nd Bridge connecting North (z6) and South (z1/z2 border area) */}
           <path d="M 60,32 L 60,40" stroke="#94A3B8" strokeWidth="1.5" />
           <path d="M 60,32 L 60,40" stroke="white" strokeWidth="0.8" strokeDasharray="1 1" />
        </g>
        
        {/* --- 4. POI LABELS --- */}
        <g id="pois" className="pointer-events-none opacity-90" style={{ fontSize: '1.4px', fontFamily: '"Noto Sans KR", sans-serif', fontWeight: 600 }}>
          {/* City Hall */}
          <g transform="translate(45, 50)">
            <text fill="#3C4043" textAnchor="middle" fontWeight="bold">춘천시청</text>
            <circle cx="0" cy="1.2" r="0.6" fill="#F0938E" />
          </g>
           {/* Station */}
          <g transform="translate(15, 50)">
             <text fill="#3C4043" textAnchor="middle" fontWeight="bold">춘천역</text>
             <circle cx="0" cy="1.2" r="0.6" fill="#A8A29E" />
          </g>
        </g>

        {/* --- 5. ISSUE PINS --- */}
        {viewMode === 'live' && issues.map((issue) => {
          const isSelected = selectedIssueId === issue.id;
          let pinColor = '#94A3B8'; 
          let opacity = 1;
          
          if (issue.status === '처리중') pinColor = '#009FE3'; 
          if (issue.status === '완료') {
            pinColor = '#10B981'; 
            opacity = 0.8;
          }

          return (
            <g 
              key={issue.id} 
              transform={`translate(${issue.lng}, ${issue.lat})`}
              onClick={(e) => {
                e.stopPropagation();
                onIssueClick(issue.id);
              }}
              className="cursor-pointer group"
            >
              {/* Hit area */}
              <circle r="4" fill="transparent" />

              {/* Selection Ring */}
              {(isSelected) && (
                 <circle r="4" fill="none" stroke="#F59E0B" strokeWidth="0.8" className="animate-pulse" />
              )}
              
              {/* Pin Shadow */}
              <ellipse cx="0" cy="2.5" rx="2" ry="0.8" fill="black" opacity="0.15" className="transition-all duration-200 group-hover:rx-2.5 group-hover:opacity-20" />

              {/* Pin Shape (Circle) */}
              <circle 
                r={isSelected ? 2.5 : 2} 
                fill={isSelected ? '#F59E0B' : pinColor} 
                stroke="white" 
                strokeWidth="0.5"
                opacity={opacity}
                className="transition-all duration-200 group-hover:r-3 group-hover:opacity-100"
              />
              
              {/* Tooltip on hover - Increased Size */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ zIndex: 100 }}>
                {/* Tooltip Background */}
                <rect 
                  x="-12" 
                  y="-12" 
                  width="24" 
                  height="6" 
                  rx="1.5" 
                  fill="rgba(15, 23, 42, 0.95)" 
                  stroke="white"
                  strokeWidth="0.2"
                />
                {/* Tooltip Text */}
                <text 
                  x="0" 
                  y="-8" 
                  textAnchor="middle" 
                  fontSize="2.5" 
                  fontWeight="bold"
                  fill="white"
                  dominantBaseline="middle"
                >
                   {issue.type}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      
      {/* Attribution */}
      <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-sans pointer-events-none z-20">
        © Chuncheon Data Hub | OpenStreetMap Contributors
      </div>
      
      {/* Legend - Increased Z-Index to prevent overlapping */}
      {viewMode === 'live' && (
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200 text-xs text-slate-700 flex flex-col gap-2 z-30">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-slate-400 rounded-full border border-white shadow-sm"></div>
             <span className="font-medium">민원 접수</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#009FE3] rounded-full border border-white shadow-sm"></div>
             <span className="font-medium">처리중</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#10B981] rounded-full border border-white shadow-sm opacity-80"></div>
             <span className="font-medium">처리 완료</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;