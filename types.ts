export type IssueStatus = '접수' | '처리중' | '완료';
export type IssueType = '일반쓰레기' | '재활용(포장재)' | '음식물' | '대형폐기물';
export type Priority = '낮음' | '보통' | '높음';

export interface Prediction {
  level: '원활' | '보통' | '주의' | '혼잡';
  score: number; // 0-100
  reason: string;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  path: string; // SVG path data
  cx: number;   // Label center X
  cy: number;   // Label center Y
  prediction: Prediction;
}

export interface Issue {
  id: string;
  zoneId: string;
  lat: number; // Relative SVG Y coordinate (0-100)
  lng: number; // Relative SVG X coordinate (0-100)
  type: IssueType;
  status: IssueStatus;
  priority: Priority;
  address: string;
  description: string;
  reportedAt: string;
  expectedAt?: string;
  managerDept: string;
}

export interface User {
  isLoggedIn: boolean;
  role: 'citizen' | 'manager';
  name: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}