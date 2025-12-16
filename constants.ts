import { Issue, Zone } from './types';

// Zones representing stylized Chuncheon districts
// Coordinates updated to share vertices perfectly, eliminating gaps.
// River flows between Z6 (North) and the Southern blocks.
export const ZONES: Zone[] = [
  { 
    id: 'z6', // North (Sinbuk/Udu)
    name: '신북·우두', 
    description: '강북 주거 및 농촌 복합', 
    cx: 50, cy: 15, 
    // Top section
    path: 'M 0,0 L 100,0 L 100,25 L 60,32 L 30,32 L 0,25 Z',
    prediction: { level: '원활', score: 15, reason: '특이사항 없음' }
  },
  { 
    id: 'z5', // West (Soyang/Geunhwa)
    name: '소양·근화', 
    description: '수변 공원 및 춘천역 인근', 
    cx: 15, cy: 48, 
    // Left Middle
    path: 'M 0,33 L 30,40 L 30,65 L 0,60 Z',
    prediction: { level: '주의', score: 60, reason: '날씨 호조로 인한 관광객 쓰레기 증가' }
  },
  { 
    id: 'z2', // Center (Myeongdong/Jungang)
    name: '명동·조양', 
    description: '시청 및 핵심 상권', 
    cx: 45, cy: 52, 
    // Center Middle - Shares border with z5(30,40-30,65)
    path: 'M 30,40 L 60,40 L 60,65 L 30,65 Z',
    prediction: { level: '주의', score: 65, reason: '시장 장날(2일, 7일) 박스 배출 증가' }
  },
  { 
    id: 'z1', // East (Hyoja/Gangwondae)
    name: '효자·강원대', 
    description: '대학가 및 원룸 밀집', 
    cx: 80, cy: 48, 
    // Right Middle - Shares border with z2(60,40-60,65)
    path: 'M 60,40 L 100,33 L 100,60 L 60,65 Z',
    prediction: { level: '혼잡', score: 85, reason: '축제 기간 및 주말 야간 배출 급증 예상' }
  },
  { 
    id: 'z4', // South-West (Toegye/Namchuncheon)
    name: '퇴계·남춘천', 
    description: '대단지 아파트 및 교통 중심', 
    cx: 25, cy: 82, 
    // Bottom Left - Shares border with z5(0,60-30,65) and z2(30,65)
    path: 'M 0,60 L 30,65 L 45,65 L 45,100 L 0,100 Z',
    prediction: { level: '보통', score: 45, reason: '주말 유동인구 증가에 따른 소폭 상승' }
  },
  { 
    id: 'z3', // South-East (Seoksa/Hupyeong)
    name: '석사·후평', 
    description: '주거 밀집 지역', 
    cx: 72, cy: 82, 
    // Bottom Right - Shares border with z1(60,65-100,60) and z4(45,65-45,100)
    path: 'M 45,100 L 45,65 L 60,65 L 100,60 L 100,100 Z',
    prediction: { level: '원활', score: 20, reason: '정기 수거일 이후 안정적 상태' }
  },
];

// Initial Issue Data - Coordinates adjusted to fit the new map shapes
export const INITIAL_ISSUES: Issue[] = [
  { id: 'ISS-2023-001', zoneId: 'z2', lat: 50, lng: 45, type: '재활용(포장재)', status: '접수', priority: '높음', address: '명동길 24번길 입구', description: '상가 앞 박스 적치물 통행 방해', reportedAt: '2023-10-24 09:15', managerDept: '자원순환과' },
  { id: 'ISS-2023-002', zoneId: 'z2', lat: 55, lng: 55, type: '음식물', status: '처리중', priority: '보통', address: '중앙시장 3구역', description: '음식물 수거통 파손 신고', reportedAt: '2023-10-23 18:30', expectedAt: '2023-10-25', managerDept: '자원순환과' },
  { id: 'ISS-2023-003', zoneId: 'z1', lat: 45, lng: 80, type: '일반쓰레기', status: '접수', priority: '보통', address: '효자동 312번지 전봇대', description: '무단 투기 쓰레기 발생', reportedAt: '2023-10-24 08:45', managerDept: '자원순환과' },
  { id: 'ISS-2023-004', zoneId: 'z1', lat: 50, lng: 90, type: '재활용(포장재)', status: '완료', priority: '낮음', address: '강원대 후문 편의점 앞', description: '분리수거함 미비로 인한 혼합 배출', reportedAt: '2023-10-22 14:20', expectedAt: '2023-10-23', managerDept: '자원순환과' },
  { id: 'ISS-2023-005', zoneId: 'z3', lat: 80, lng: 80, type: '대형폐기물', status: '접수', priority: '높음', address: '석사동 주공아파트', description: '신고되지 않은 가구(장롱) 방치', reportedAt: '2023-10-24 10:10', managerDept: '자원순환과' },
  { id: 'ISS-2023-006', zoneId: 'z3', lat: 75, lng: 90, type: '일반쓰레기', status: '처리중', priority: '보통', address: '석사천 산책로', description: '산책로 주변 비닐 쓰레기 다수', reportedAt: '2023-10-23 09:00', expectedAt: '2023-10-25', managerDept: '자원순환과' },
  { id: 'ISS-2023-007', zoneId: 'z4', lat: 85, lng: 20, type: '음식물', status: '완료', priority: '보통', address: '남춘천역 하부 공간', description: '악취 민원 발생', reportedAt: '2023-10-21 21:00', expectedAt: '2023-10-22', managerDept: '자원순환과' },
  { id: 'ISS-2023-008', zoneId: 'z4', lat: 75, lng: 30, type: '일반쓰레기', status: '접수', priority: '낮음', address: '퇴계동 먹자골목', description: '가로 청소 요청', reportedAt: '2023-10-24 11:30', managerDept: '자원순환과' },
  { id: 'ISS-2023-009', zoneId: 'z5', lat: 45, lng: 15, type: '재활용(포장재)', status: '처리중', priority: '높음', address: '소양강 스카이워크', description: '관광객 투기 쓰레기 급증', reportedAt: '2023-10-23 13:40', expectedAt: '2023-10-24', managerDept: '자원순환과' },
  { id: 'ISS-2023-010', zoneId: 'z5', lat: 55, lng: 25, type: '일반쓰레기', status: '접수', priority: '보통', address: '근화동 주민센터', description: '배출 시간 미준수 적치물', reportedAt: '2023-10-24 07:50', managerDept: '자원순환과' },
  { id: 'ISS-2023-011', zoneId: 'z6', lat: 10, lng: 50, type: '대형폐기물', status: '접수', priority: '높음', address: '신북읍 마을회관', description: '농업 폐기물 혼합 배출 의심', reportedAt: '2023-10-24 09:30', managerDept: '자원순환과' },
  { id: 'ISS-2023-012', zoneId: 'z2', lat: 45, lng: 50, type: '일반쓰레기', status: '완료', priority: '낮음', address: '시청 앞 광장', description: '행사 후 청소 완료 확인', reportedAt: '2023-10-20 17:00', expectedAt: '2023-10-20', managerDept: '자원순환과' },
  { id: 'ISS-2023-013', zoneId: 'z1', lat: 45, lng: 70, type: '음식물', status: '접수', priority: '보통', address: '효자1동 골목길', description: '고양이 훼손 음식물 봉투', reportedAt: '2023-10-24 12:00', managerDept: '자원순환과' },
];

export const CHART_DATA_TRENDS = [
  { name: '10.18', 접수: 12, 완료: 10 },
  { name: '10.19', 접수: 19, 완료: 15 },
  { name: '10.20', 접수: 15, 완료: 18 },
  { name: '10.21', 접수: 22, 완료: 20 },
  { name: '10.22', 접수: 18, 완료: 22 },
  { name: '10.23', 접수: 25, 완료: 15 },
  { name: '10.24', 접수: 14, 완료: 5 },
];

export const CHART_DATA_TYPE = [
  { name: '일반쓰레기', value: 45 },
  { name: '재활용(포장)', value: 30 },
  { name: '음식물', value: 15 },
  { name: '대형폐기물', value: 10 },
];