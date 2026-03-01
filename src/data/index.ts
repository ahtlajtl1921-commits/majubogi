import { Session, PaymentOption } from '@/lib/index';

/**
 * 실시간 세션 데이터 가져오기
 * 운영자 페이지에서 관리되는 데이터를 실시간으로 반영
 */
export const getSessionsData = (): Session[] => {
  const saved = localStorage.getItem('majubogi_sessions');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Failed to parse saved sessions:', error);
    }
  }
  return [];
};

/**
 * 기본 세션 데이터 (초기값 또는 백업용)
 */
export const SESSIONS_DATA: Session[] = [
  {
    id: 'sess_001',
    title: '천안 [89~95년생] 프라이빗 8:8 미팅',
    description: '천안의 분위기 좋은 카페에서 진행되는 정기 8:8 로테이션 미팅입니다. 1:1로 13분씩 대화하며 인연을 찾아보세요.',
    date: '2026-03-07T14:00:00Z',
    location: '천안 신부동 시크릿 라운지',
    region: '천안',
    ageGroup: '89~95년생',
    theme: '정기모임',
    price: 55000,
    maxParticipants: 16,
    currentParticipants: 12,
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1565720490558-136ad94e112f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sess_002',
    title: '평택 [92~98년생] 비흡연자 특집 8:8',
    description: '깔끔한 만남을 선호하는 비흡연자분들을 위한 특별 기수입니다. 공통된 라이프스타일을 가진 분들과 만나보세요.',
    date: '2026-03-08T15:00:00Z',
    location: '평택 송탄동 어반 가든',
    region: '평택',
    ageGroup: '92~98년생',
    theme: '비흡연자 특집',
    price: 55000,
    maxParticipants: 16,
    currentParticipants: 16,
    status: 'sold_out',
    imageUrl: 'https://images.unsplash.com/photo-1743793055775-3c07ab847ad0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sess_003',
    title: '천안 [85~91년생] 돌싱특집 새로운 시작',
    description: '새로운 시작을 꿈꾸는 분들을 위한 따뜻한 분위기의 돌싱 전용 미팅입니다. 서로의 상황을 이해하는 편안한 대화를 나눠보세요.',
    date: '2026-03-14T14:00:00Z',
    location: '천안 성환읍 부티크 라운지',
    region: '천안',
    ageGroup: '85~91년생',
    theme: '돌싱특집',
    price: 55000,
    maxParticipants: 12,
    currentParticipants: 6,
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1743793055911-52e19beba5d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sess_004',
    title: '평택 [95~01년생] 크리스천 특집 8:8',
    description: '신앙 안에서 가치관이 비슷한 이성을 만나고 싶은 분들을 위한 크리스천 전용 세션입니다.',
    date: '2026-03-15T16:00:00Z',
    location: '평택 비전동 그레이스 홀',
    region: '평택',
    ageGroup: '95~01년생',
    theme: '크리스천 특집',
    price: 55000,
    maxParticipants: 16,
    currentParticipants: 10,
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1768697358705-c1b60333da35?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sess_005',
    title: '천안 [97~03년생] 갓생 직장인 5:5 미팅',
    description: '바쁜 일상 속에서도 자기계발과 사랑을 놓치지 않는 젊은 직장인들의 소규모 프라이빗 미팅입니다.',
    date: '2026-03-21T17:00:00Z',
    location: '천안 불당동 모던 카페',
    region: '천안',
    ageGroup: '97~03년생',
    theme: '직장인 특집',
    price: 55000,
    maxParticipants: 10,
    currentParticipants: 4,
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1758648207365-df458d3e83f4?auto=format&fit=crop&q=80&w=800'
  }
];

/**
 * Pricing Tiers Data
 * Based on gender and participation history
 */
export const PRICING_DATA: PaymentOption[] = [
  {
    id: 'pay_male_new',
    label: '남성 신규 신청',
    price: 55000,
    description: '첫 방문 고객님을 위한 기본 참가권 (신원 및 사진 인증 포함)'
  },
  {
    id: 'pay_male_returning',
    label: '남성 참가권 (공통)',
    price: 55000,
    description: '남성 참가자를 위한 기본 참가권 (신규/재참여 동일)'
  },
  {
    id: 'pay_female_all',
    label: '여성 참가권 (공통)',
    price: 33000,
    description: '여성 참가자를 위한 특별 가격 (신규/재참여 동일)'
  }
];

/**
 * Application Form Options
 * Standardized options for the dating application form
 */
export const FORM_OPTIONS = {
  ageGroups: [
    '85~91년생',
    '89~95년생',
    '92~98년생',
    '95~01년생',
    '97~03년생'
  ],
  religions: [
    '무교',
    '기독교',
    '천주교',
    '불교',
    '기타'
  ],
  marriageStatus: [
    { value: 'single', label: '미혼(초혼)' },
    { value: 'divorced', label: '돌싱(재혼)' }
  ],
  regions: [
    '대전',
    '광주',
    '세종',
    '충남',
    '충북',
    '전남',
    '전북',
    '서울/경기',
    '기타'
  ],
  visitTypes: [
    { value: 'new', label: '설렘한편에 처음 왔어요' },
    { value: 'returning', label: '기존 가입 이력이 있어요 (재방문)' }
  ],
  smoking: [
    { value: false, label: '비흡연' },
    { value: true, label: '흡연' }
  ]
};