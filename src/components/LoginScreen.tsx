import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 animate-fadeIn">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-neutral-900 dark:text-neutral-100">
          Welcome back
        </h1>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          Sign in to continue
        </p>

        {/* Google Login Button */}
        <button
          onClick={onLoginSuccess}
          className="w-full px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:scale-[0.98] transition-all mb-3 flex items-center justify-center gap-3 shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
            <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Microsoft Login Button */}
        <button
          onClick={onLoginSuccess}
          className="w-full px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:scale-[0.98] transition-all mb-3 flex items-center justify-center gap-3 shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h10v10H0V0z" fill="#F25022"/>
            <path d="M11 0h10v10H11V0z" fill="#7FBA00"/>
            <path d="M0 11h10v10H0V11z" fill="#00A4EF"/>
            <path d="M11 11h10v10H11V11z" fill="#FFB900"/>
          </svg>
          Continue with Microsoft
        </button>

        {/* Apple Login Button */}
        <button
          onClick={onLoginSuccess}
          className="w-full px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:scale-[0.98] transition-all mb-6 flex items-center justify-center gap-3 shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Continue with Apple
        </button>
      </div>
    </div>
  );
}