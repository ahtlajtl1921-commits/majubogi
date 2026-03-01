-- 결제 시스템 테이블 생성
CREATE TABLE IF NOT EXISTS public.payments_2026_02_14 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('card', 'kakaopay', 'tosspay', 'bank_transfer')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
    payment_key TEXT UNIQUE,
    order_id TEXT UNIQUE NOT NULL,
    user_name TEXT NOT NULL,
    user_phone TEXT NOT NULL,
    user_email TEXT,
    participant_type TEXT NOT NULL CHECK (participant_type IN ('male_new', 'male_returning', 'female')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    paid_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE,
    refund_amount INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 참가 신청 테이블
CREATE TABLE IF NOT EXISTS public.applications_2026_02_14 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    payment_id UUID REFERENCES public.payments_2026_02_14(id),
    application_status TEXT NOT NULL DEFAULT 'pending' CHECK (application_status IN ('pending', 'approved', 'rejected', 'cancelled')),
    user_name TEXT NOT NULL,
    user_phone TEXT NOT NULL,
    user_email TEXT,
    birth_year INTEGER NOT NULL,
    job TEXT NOT NULL,
    religion TEXT,
    height INTEGER,
    marital_status TEXT NOT NULL,
    residence TEXT NOT NULL,
    visit_type TEXT NOT NULL CHECK (visit_type IN ('new', 'returning')),
    referral_source TEXT,
    companion_name TEXT,
    profile_images TEXT[] DEFAULT '{}',
    id_verification_image TEXT,
    job_verification_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 매칭 결과 테이블
CREATE TABLE IF NOT EXISTS public.matching_results_2026_02_14 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    male_user_id UUID REFERENCES auth.users(id),
    female_user_id UUID REFERENCES auth.users(id),
    match_status TEXT NOT NULL DEFAULT 'pending' CHECK (match_status IN ('pending', 'mutual', 'one_sided', 'no_match')),
    male_choice BOOLEAN,
    female_choice BOOLEAN,
    contact_exchanged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id, male_user_id, female_user_id)
);

-- 공지사항 테이블
CREATE TABLE IF NOT EXISTS public.notices_2026_02_14 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    notice_type TEXT NOT NULL DEFAULT 'general' CHECK (notice_type IN ('general', 'event', 'system', 'important')),
    is_pinned BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    author_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ 테이블
CREATE TABLE IF NOT EXISTS public.faqs_2026_02_14 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1:1 문의 테이블
CREATE TABLE IF NOT EXISTS public.inquiries_2026_02_14 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    inquiry_type TEXT NOT NULL DEFAULT 'general' CHECK (inquiry_type IN ('general', 'payment', 'technical', 'complaint', 'suggestion')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'closed')),
    admin_reply TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 쿠폰 테이블
CREATE TABLE IF NOT EXISTS public.coupons_2026_02_14 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value INTEGER NOT NULL,
    min_amount INTEGER DEFAULT 0,
    max_discount INTEGER,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 쿠폰 테이블
CREATE TABLE IF NOT EXISTS public.user_coupons_2026_02_14 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    coupon_id UUID REFERENCES public.coupons_2026_02_14(id),
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    payment_id UUID REFERENCES public.payments_2026_02_14(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, coupon_id)
);

-- RLS 정책 설정
ALTER TABLE public.payments_2026_02_14 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications_2026_02_14 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matching_results_2026_02_14 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices_2026_02_14 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs_2026_02_14 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries_2026_02_14 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons_2026_02_14 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_coupons_2026_02_14 ENABLE ROW LEVEL SECURITY;

-- 결제 정책: 사용자는 자신의 결제만 조회 가능
CREATE POLICY "Users can view own payments" ON public.payments_2026_02_14
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments" ON public.payments_2026_02_14
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 신청 정책: 사용자는 자신의 신청만 관리 가능
CREATE POLICY "Users can view own applications" ON public.applications_2026_02_14
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications" ON public.applications_2026_02_14
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 공지사항 정책: 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can view published notices" ON public.notices_2026_02_14
    FOR SELECT USING (is_published = true);

-- FAQ 정책: 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can view published faqs" ON public.faqs_2026_02_14
    FOR SELECT USING (is_published = true);

-- 문의 정책: 사용자는 자신의 문의만 관리 가능
CREATE POLICY "Users can view own inquiries" ON public.inquiries_2026_02_14
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inquiries" ON public.inquiries_2026_02_14
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 쿠폰 정책: 활성화된 쿠폰만 조회 가능
CREATE POLICY "Anyone can view active coupons" ON public.coupons_2026_02_14
    FOR SELECT USING (is_active = true);

-- 사용자 쿠폰 정책: 자신의 쿠폰만 관리 가능
CREATE POLICY "Users can view own coupons" ON public.user_coupons_2026_02_14
    FOR SELECT USING (auth.uid() = user_id);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments_2026_02_14(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments_2026_02_14(payment_status);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications_2026_02_14(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_session_id ON public.applications_2026_02_14(session_id);
CREATE INDEX IF NOT EXISTS idx_matching_session_id ON public.matching_results_2026_02_14(session_id);
CREATE INDEX IF NOT EXISTS idx_notices_published ON public.notices_2026_02_14(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON public.faqs_2026_02_14(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON public.inquiries_2026_02_14(user_id);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON public.coupons_2026_02_14(is_active);

-- 초기 데이터 삽입
INSERT INTO public.faqs_2026_02_14 (category, question, answer, order_index) VALUES
('참가신청', '신청은 어떻게 하나요?', '홈페이지의 "신청하기" 버튼을 클릭하여 구글폼을 작성해주시면 됩니다. 매칭 매니저가 검토 후 2-3일 내에 개별 연락드립니다.', 1),
('참가신청', '참가비는 얼마인가요?', '남성 신규: 69,000원, 남성 재참여: 60,000원, 여성: 30,000원입니다.', 2),
('참가신청', '환불 규정이 어떻게 되나요?', 'D-Day 8일전까지는 50% 환불, D-Day 7일전부터는 환불이 불가합니다.', 3),
('모임진행', '모임은 어떻게 진행되나요?', '8:8 로테이션 방식으로 1:1 대화를 13분씩 진행합니다. 모든 이성과 대화할 수 있는 기회가 주어집니다.', 4),
('모임진행', '매칭 결과는 언제 알 수 있나요?', '모임 종료 후 3-5일 내에 개별적으로 연락드립니다.', 5),
('기타', '재참여 할인이 있나요?', '네, 기존 참여 이력이 있으신 분들은 9,000원 할인된 가격으로 참여하실 수 있습니다.', 6);

INSERT INTO public.notices_2026_02_14 (title, content, notice_type, is_pinned) VALUES
('마주보기 전 서비스 오픈!', '천안·평택 지역 프리미엄 8:8 로테이션 소개팅 서비스 "마주보기 전"이 정식 오픈했습니다. 많은 관심과 참여 부탁드립니다.', 'important', true),
('3월 정기모임 일정 안내', '3월 정기모임 일정이 확정되었습니다. 자세한 내용은 모임 리스트를 확인해주세요.', 'general', false);

INSERT INTO public.coupons_2026_02_14 (code, name, discount_type, discount_value, min_amount, usage_limit, valid_until) VALUES
('WELCOME2026', '신규 가입 환영 쿠폰', 'fixed', 10000, 50000, 100, '2026-12-31 23:59:59+09'),
('FRIEND2026', '친구 추천 쿠폰', 'percentage', 15, 30000, 50, '2026-12-31 23:59:59+09');