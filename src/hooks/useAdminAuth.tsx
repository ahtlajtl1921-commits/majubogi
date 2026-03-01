import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'manager';
  isAuthenticated: boolean;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// 간단한 관리자 계정 (실제 운영시에는 서버에서 관리)
const ADMIN_ACCOUNTS = {
  'admin': { password: 'majubogi2026!', role: 'admin' as const },
  'manager': { password: 'manager2026!', role: 'manager' as const }
};

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 로드시 로컬 스토리지에서 관리자 정보 확인
    const savedAdmin = localStorage.getItem('admin_auth');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        setAdmin(adminData);
      } catch (error) {
        localStorage.removeItem('admin_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // 실제 로그인 검증 (간단한 시뮬레이션)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const account = ADMIN_ACCOUNTS[username as keyof typeof ADMIN_ACCOUNTS];
    if (account && account.password === password) {
      const adminUser: AdminUser = {
        id: `admin_${Date.now()}`,
        username,
        role: account.role,
        isAuthenticated: true
      };
      
      setAdmin(adminUser);
      localStorage.setItem('admin_auth', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}