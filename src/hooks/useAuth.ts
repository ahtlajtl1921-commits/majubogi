import { useState, useEffect, useCallback } from 'react';
import { User } from '@/lib/index';

/**
 * Authentication Hook
 * 
 * Provides state management for user login, registration, and profile verification.
 * Implements logic to handle 'first-time' vs 'returning' users as per service requirements:
 * - First-time: Requires photo verification and full application.
 * - Returning: Uses existing profile data to simplify re-application.
 */

const AUTH_STORAGE_KEY = 'seolrem_auth_user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from local storage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Check if the stored data is valid (simple check)
          if (parsedUser && parsedUser.id) {
            setUser(parsedUser);
          }
        }
      } catch (err) {
        console.error('Failed to load auth state:', err);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Mock Login Function
   * In production, this would call an API like Supabase or a custom backend.
   */
  const login = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulated API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data for a returning user
      const mockUser: User = {
        id: 'user_2026_001',
        email,
        name: '김설렘',
        gender: 'female',
        phone: '010-1234-5678',
        kakaoId: 'seolrem_love',
        birthYear: 1994,
        job: '디자이너',
        isVerified: true,
        profileImageUrls: [
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80'
        ],
        hasAppliedBefore: true,
        createdAt: '2026-01-15T09:00:00Z',
        updatedAt: '2026-02-14T10:29:42Z',
      };

      setUser(mockUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      return mockUser;
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Registration Function
   * Sets initial flags for verification and application history.
   */
  const register = useCallback(async (data: Partial<User>) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const newUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email: data.email || '',
        name: data.name || '',
        gender: data.gender || 'male',
        phone: data.phone || '',
        kakaoId: data.kakaoId || '',
        birthYear: data.birthYear || 1990,
        job: data.job || '',
        isVerified: false, // New users start unverified
        profileImageUrls: [],
        hasAppliedBefore: false, // First application indicator
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data
      };

      setUser(newUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update User Profile
   * Used for identity verification (photo upload) or updating job/contact info.
   */
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      setError('프로필 업데이트에 실패했습니다.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  /**
   * Mark as Verified
   * Called after the admin approves the uploaded photos.
   */
  const verifyUser = useCallback(async (imageUrls: string[]) => {
    return updateProfile({
      isVerified: true,
      profileImageUrls: imageUrls,
    });
  }, [updateProfile]);

  /**
   * Logout
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isVerified: user?.isVerified || false,
    isReturningUser: user?.hasAppliedBefore || false,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    verifyUser,
  };
};
