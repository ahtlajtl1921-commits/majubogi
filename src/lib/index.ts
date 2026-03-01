/**
 * Route Constants
 */
export const ROUTE_PATHS = {
  HOME: '/',
  SESSIONS: '/sessions',
  APPLICATION: '/apply',
  PROFILE: '/profile',
  ABOUT: '/about',
  PAYMENT: '/payment',
  FAQ: '/faq',
  INQUIRY: '/inquiry',
  ADMIN: '/admin',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

/**
 * User Types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  gender: 'male' | 'female';
  phone: string;
  kakaoId: string;
  birthYear: number;
  job: string;
  isVerified: boolean; // 본인 사진 및 신원 인증 여부
  profileImageUrls: string[];
  hasAppliedBefore: boolean; // 기존 가입 이력 여부
  createdAt: string;
  updatedAt: string;
}

/**
 * Session (Meeting) Types
 */
export interface Session {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  region: '천안' | '아산' | '평택' | '서울' | '기타';
  ageGroup: string; // 예: '89~95년생', '97~03년생'
  theme?: string; // 예: '돌싱특집', '크리스천', '비흡연자'
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  maleCount?: number;
  femaleCount?: number;
  status: 'available' | 'closed' | 'sold_out' | 'recruiting' | 'full';
  imageUrl?: string;
  formUrl?: string;
}

/**
 * Application Form Types
 */
export interface ApplicationForm {
  // 세션 정보 (쇼핑몰 옵션처럼 선택)
  selectedSessionId: string;
  
  // 기본 인적 사항 (재참여 시 기존 정보 활용)
  name: string;
  gender: 'male' | 'female';
  phone: string;
  kakaoId: string;
  birthYear: number;
  job: string;
  
  // 상세 정보 (소개팅 신청서 필수 항목)
  height?: number;
  religion?: string;
  residence?: string;
  marriageStatus?: 'single' | 'divorced';
  isSmoker?: boolean;
  
  // 첫 가입 시 필수 인증 (본인 사진 등)
  photoFiles?: File[];
  idCardPhoto?: File[];
  
  // 참여 유형 선택
  visitType: 'new' | 'returning'; // 새로 왔어요 / 재방문 할래요
  
  // 결제 정보
  paymentOptionId: string;
  agreedToTerms: boolean;
}

/**
 * Payment and Pricing Types
 */
export interface PaymentOption {
  id: string;
  label: string; // 예: '남성 일반', '남성 재참여 할인'
  price: number;
  description?: string;
}

/**
 * Utility Functions
 */

/**
 * 숫자를 통화 형식으로 변환 (KRW)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

/**
 * 날짜 문자열을 읽기 쉬운 한국어 형식으로 변환
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // 한국 시간대로 변환
  const koreaDate = new Date(date.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
  
  // 시간이 19시가 아니면 강제로 19시로 설정
  koreaDate.setHours(19, 0, 0, 0);
  
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul'
  }).format(koreaDate);
};

/**
 * 나이대 그룹 기반으로 참여 가능 여부 확인
 */
export const isEligibleForAgeGroup = (birthYear: number, ageGroupRange: string): boolean => {
  // 단순 문자열 파싱 로직 (예: '89~95' -> 1989, 1995)
  const matches = ageGroupRange.match(/(\d{2})~(\d{2})/);
  if (!matches) return true;

  const start = parseInt(`19${matches[1]}`);
  const end = parseInt(`19${matches[2]}`);
  
  // 2000년대생 처리 (간단한 로직)
  const actualStart = start < 1940 ? start + 100 : start;
  const actualEnd = end < 1940 ? end + 100 : end;

  return birthYear >= actualStart && birthYear <= actualEnd;
};

/**
 * Payment Types
 */
export interface Payment {
  id: string;
  userId: string;
  sessionId: string;
  amount: number;
  paymentMethod: 'card' | 'kakaopay' | 'tosspay' | 'bank_transfer';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  paymentKey?: string;
  orderId: string;
  userName: string;
  userPhone: string;
  userEmail?: string;
  participantType: 'male_new' | 'male_returning' | 'female';
  createdAt: string;
  paidAt?: string;
  refundedAt?: string;
  refundAmount?: number;
}

/**
 * Notice Types
 */
export interface Notice {
  id: string;
  title: string;
  content: string;
  noticeType: 'general' | 'event' | 'system' | 'important';
  isPinned: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * FAQ Types
 */
export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  orderIndex: number;
  isPublished: boolean;
}

/**
 * Inquiry Types
 */
export interface Inquiry {
  id: string;
  userId: string;
  title: string;
  content: string;
  inquiryType: 'general' | 'payment' | 'technical' | 'complaint' | 'suggestion';
  status: 'pending' | 'in_progress' | 'completed' | 'closed';
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Coupon Types
 */
export interface Coupon {
  id: string;
  code: string;
  name: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minAmount: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: string;
  validUntil?: string;
  isActive: boolean;
}

/**
 * Application Types
 */
export interface Application {
  id: string;
  userId: string;
  sessionId: string;
  paymentId?: string;
  applicationStatus: 'pending' | 'approved' | 'rejected' | 'cancelled';
  userName: string;
  userPhone: string;
  userEmail?: string;
  birthYear: number;
  job: string;
  religion?: string;
  height?: number;
  maritalStatus: string;
  residence: string;
  visitType: 'new' | 'returning';
  referralSource?: string;
  companionName?: string;
  profileImages?: string[];
  idVerificationImage?: string;
  jobVerificationImage?: string;
  createdAt: string;
  approvedAt?: string;
}

/**
 * Form Options and Constants
 */
export const FORM_OPTIONS = {
  ageGroups: [
    '85-95',
    '88-96', // 40기 추가
    '89-97', // 41기 추가
    '91-97',
    '93-00',
    '94-02',
    '95-03'
  ],
  regions: [
    '천안',
    '아산', 
    '평택'
  ],
  statuses: [
    'available',
    'closed',
    'full'
  ]
};