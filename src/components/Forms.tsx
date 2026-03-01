import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Upload, 
  Camera, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  CreditCard, 
  User as UserIcon, 
  Calendar,
  Heart,
  Lock
} from 'lucide-react';
import { 
  User, 
  ApplicationForm as ApplicationFormType, 
  Session, 
  PaymentOption, 
  formatCurrency 
} from '@/lib/index';
import { SESSIONS_DATA, PRICING_DATA, FORM_OPTIONS } from '@/data/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const applicationSchema = z.object({
  selectedSessionId: z.string().min(1, '참가하실 일정을 선택해주세요.'),
  name: z.string().min(2, '이름을 입력해주세요.'),
  gender: z.enum(['male', 'female']),
  phone: z.string().min(10, '연락처를 정확히 입력해주세요.'),
  kakaoId: z.string().min(1, '카카오톡 ID를 입력해주세요.'),
  birthYear: z.coerce.number().min(1960).max(2010),
  job: z.string().min(1, '직업을 입력해주세요.'),
  height: z.coerce.number().optional(),
  religion: z.string().optional(),
  residence: z.string().optional(),
  marriageStatus: z.enum(['single', 'divorced']).optional(),
  isSmoker: z.boolean().optional(),
  visitType: z.enum(['new', 'returning']),
  paymentOptionId: z.string().min(1, '결제 옵션을 선택해주세요.'),
  agreedToTerms: z.boolean().refine(val => val === true, '이용약관에 동의해야 합니다.'),
});

interface ApplicationFormProps {
  selectedSession?: Session;
  onSubmit: (data: ApplicationFormType) => void;
}

export function ApplicationForm({ selectedSession, onSubmit }: ApplicationFormProps) {
  const { user, isVerified } = useAuth();
  const [photos, setPhotos] = useState<File[]>([]);
  const [idCard, setIdCard] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ApplicationFormType>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      selectedSessionId: selectedSession?.id || '',
      visitType: user?.hasAppliedBefore ? 'returning' : 'new',
      gender: user?.gender || 'male',
      name: user?.name || '',
      phone: user?.phone || '',
      kakaoId: user?.kakaoId || '',
      birthYear: user?.birthYear || 1994,
      job: user?.job || '',
      agreedToTerms: false,
    }
  });

  const watchVisitType = watch('visitType');
  const watchSessionId = watch('selectedSessionId');
  const watchPaymentId = watch('paymentOptionId');

  const currentSession = SESSIONS_DATA.find(s => s.id === watchSessionId);
  const currentPayment = PRICING_DATA.find(p => p.id === watchPaymentId);

  const handleFormSubmit = (data: ApplicationFormType) => {
    onSubmit({ ...data, photoFiles: photos, idCardPhoto: idCard ? [idCard] : undefined });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Session Selection (Shopping Mall Style) */}
          <Card className="border-primary/10 shadow-sm">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                참여 일정 및 옵션 선택
              </CardTitle>
              <CardDescription>쇼핑몰에서 상품을 고르듯 원하는 일정과 옵션을 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <Label>참여 희망 기수/날짜</Label>
                <Controller
                  name="selectedSessionId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-12 border-primary/20">
                        <SelectValue placeholder="참여하실 세션을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {SESSIONS_DATA.map(session => (
                          <SelectItem 
                            key={session.id} 
                            value={session.id}
                            disabled={session.status === 'sold_out'}
                          >
                            {session.title} ({session.region}) - {session.status === 'sold_out' ? '매진' : '신청가능'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedSessionId && <p className="text-xs text-destructive">{errors.selectedSessionId.message}</p>}
              </div>

              <div className="space-y-3">
                <Label>방문 유형</Label>
                <Controller
                  name="visitType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value} 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {FORM_OPTIONS.visitTypes.map((type) => (
                        <div key={type.value}>
                          <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                          <Label
                            htmlFor={type.value}
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                          >
                            <span className="text-sm font-semibold">{type.label}</span>
                            <span className="text-xs text-muted-foreground mt-1">
                              {type.value === 'returning' ? '기존 정보로 간편 신청' : '신규 가입 및 인증 필요'}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>

              <div className="space-y-3">
                <Label>결제 옵션</Label>
                <Controller
                  name="paymentOptionId"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      {PRICING_DATA.map((option) => (
                        <div 
                          key={option.id} 
                          className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${watchPaymentId === option.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                          onClick={() => setValue('paymentOptionId', option.id)}
                        >
                          <div className="flex-1">
                            <p className="font-bold text-sm">{option.label}</p>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{formatCurrency(option.price)}</p>
                          </div>
                          {watchPaymentId === option.id && <Check className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white rounded-full p-1 shadow-md" />}
                        </div>
                      ))}
                    </div>
                  )}
                />
                {errors.paymentOptionId && <p className="text-xs text-destructive">{errors.paymentOptionId.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Personal Information */}
          <Card className="border-primary/10 shadow-sm">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-primary" />
                기본 인적 사항
              </CardTitle>
              <CardDescription>정확한 매칭을 위해 필수 정보를 입력해주세요.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" {...register('name')} placeholder="성함을 입력하세요" className="border-primary/10" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">연락처</Label>
                <Input id="phone" {...register('phone')} placeholder="010-0000-0000" className="border-primary/10" />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="kakaoId">카카오톡 ID</Label>
                <Input id="kakaoId" {...register('kakaoId')} placeholder="카톡 아이디" className="border-primary/10" />
                {errors.kakaoId && <p className="text-xs text-destructive">{errors.kakaoId.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthYear">출생년도</Label>
                <Input id="birthYear" type="number" {...register('birthYear')} placeholder="1994" className="border-primary/10" />
                {errors.birthYear && <p className="text-xs text-destructive">{errors.birthYear.message}</p>}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="job">직업</Label>
                <Input id="job" {...register('job')} placeholder="예: IT 대기업 개발자, 초등교사 등" className="border-primary/10" />
                {errors.job && <p className="text-xs text-destructive">{errors.job.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Verification (Only for New Users) */}
          {(watchVisitType === 'new' || !isVerified) && (
            <Card className="border-accent shadow-sm overflow-hidden">
              <div className="bg-accent p-1 text-center text-[10px] font-bold text-accent-foreground uppercase tracking-widest">
                Identity Verification Required
              </div>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-accent-foreground" />
                  첫 방문 본인 인증
                </CardTitle>
                <CardDescription>안전하고 신뢰할 수 있는 모임을 위해 사진 인증이 필수입니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label>본인 얼굴 사진 (2장)</Label>
                    <PhotoUploadForm onUpload={(files) => setPhotos(files)} />
                    <p className="text-[11px] text-muted-foreground italic">* 마스크 미착용, 얼굴이 선명하게 나온 사진</p>
                  </div>
                  <div className="space-y-3">
                    <Label>신분증 또는 직업 인증 (1장)</Label>
                    <div 
                      className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => document.getElementById('id-upload')?.click()}
                    >
                      <input 
                        type="file" 
                        id="id-upload" 
                        className="hidden" 
                        onChange={(e) => e.target.files && setIdCard(e.target.files[0])} 
                      />
                      {idCard ? (
                        <div className="flex flex-col items-center">
                          <Check className="w-8 h-8 text-green-500 mb-2" />
                          <span className="text-xs font-medium">업로드 완료</span>
                          <span className="text-[10px] text-muted-foreground">{idCard.name}</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">파일 선택</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground italic">* 주민번호 뒷자리는 가리고 올려주세요.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 4: Detailed Information (Dating Profile) */}
          <Card className="border-primary/10 shadow-sm">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                추가 정보 (매칭 활용)
              </CardTitle>
              <CardDescription>이상형 매칭과 원활한 진행을 위해 참고되는 정보입니다.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>종교</Label>
                <Controller
                  name="religion"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="border-primary/10">
                        <SelectValue placeholder="선택안함" />
                      </SelectTrigger>
                      <SelectContent>
                        {FORM_OPTIONS.religions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">키 (cm)</Label>
                <Input id="height" type="number" {...register('height')} placeholder="175" className="border-primary/10" />
              </div>
              <div className="space-y-2">
                <Label>결혼 여부</Label>
                <Controller
                  name="marriageStatus"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="border-primary/10">
                        <SelectValue placeholder="미선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {FORM_OPTIONS.marriageStatus.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label>거주 지역</Label>
                <Controller
                  name="residence"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="border-primary/10">
                        <SelectValue placeholder="선택안함" />
                      </SelectTrigger>
                      <SelectContent>
                        {FORM_OPTIONS.regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2 md:col-span-2 pt-2">
                <Controller
                  name="isSmoker"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="isSmoker" 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  )}
                />
                <Label htmlFor="isSmoker" className="text-sm font-medium">흡연을 하십니까? (비흡연 특집 신청 시 필수 확인)</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Sidebar: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="border-primary shadow-lg overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-lg">신청 내역 요약</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">선택한 일정</p>
                  <p className="text-sm font-bold">{currentSession?.title || '일정을 선택해주세요'}</p>
                  {currentSession && (
                    <p className="text-[11px] text-muted-foreground italic">{currentSession.location}</p>
                  )}
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">결제 옵션</p>
                  <p className="text-sm">{currentPayment?.label || '옵션을 선택해주세요'}</p>
                </div>
                <div className="pt-4 border-t border-dashed">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">총 합계</span>
                    <span className="text-2xl font-black text-primary">{formatCurrency(currentPayment?.price || 0)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start space-x-2">
                    <Controller
                      name="agreedToTerms"
                      control={control}
                      render={({ field }) => (
                        <Checkbox 
                          id="terms" 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          className="mt-1"
                        />
                      )}
                    />
                    <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                      개인정보 수집 및 이용 동의, 환불 규정(D-7 환불 불가 등)을 확인하였으며 이에 동의합니다.
                    </Label>
                  </div>
                  {errors.agreedToTerms && <p className="text-xs text-destructive">{errors.agreedToTerms.message}</p>}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                  size="lg"
                >
                  신청 및 결제하기
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>

            <div className="bg-accent/10 border border-accent rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent-foreground shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-accent-foreground">안내사항</h4>
                  <p className="text-[11px] text-accent-foreground/80 mt-1 leading-relaxed">
                    재참여 고객님은 기존 가입 시 등록한 정보를 기반으로 빠른 매칭이 진행됩니다. 정보가 변경된 경우에만 수정해주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

/**
 * Login Form Component
 */
export function LoginForm({ onSubmit }: { onSubmit: (email: string, password: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-primary/10 shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-black">다시 오셨군요!</CardTitle>
        <CardDescription>설렘한편에서 새로운 인연을 다시 찾아보세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-primary/20"
            />
          </div>
          <Button type="submit" className="w-full font-bold h-12 mt-4">
            로그인
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-xs text-center text-muted-foreground">
          계정이 없으신가요? <span className="text-primary font-bold cursor-pointer">신규 신청하기</span>
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * Photo Upload Form Component
 */
export function PhotoUploadForm({ onUpload }: { onUpload: (files: File[]) => void }) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews].slice(0, 2));
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="border-2 border-dashed border-primary/30 rounded-xl p-8 flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors"
        onClick={() => document.getElementById('photo-upload')?.click()}
      >
        <input 
          type="file" 
          id="photo-upload" 
          multiple 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
        <Upload className="w-8 h-8 text-primary mb-2" />
        <span className="text-xs font-medium text-primary">사진 선택 또는 드래그</span>
        <span className="text-[10px] text-muted-foreground mt-1">최대 2장까지 가능</span>
      </div>
      
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {previews.map((src, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-border shadow-sm">
              <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute top-1 right-1 bg-primary text-white p-0.5 rounded-full">
                <Check className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
