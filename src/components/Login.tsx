
// Login.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSignupClick: () => void;
}

export function Login({ onLogin, onSignupClick }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    if (email && password) {
      onLogin(email, password);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && password) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full opacity-50 animate-pulse delay-75"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-blue-300 rounded-full opacity-50 animate-pulse delay-150"></div>

      <div className="relative z-10 max-w-md w-full">
        <Card className="p-8 space-y-6 bg-white/90 backdrop-blur rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-5 rounded-2xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl text-purple-600 font-bold">Welcome Back!</h2>
            <p className="text-gray-600 text-lg">Log in to continue your learning adventure</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-14 rounded-xl border-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-14 rounded-xl border-2 flex-1"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!email || !password}
              className="w-full h-14 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl"
            >
              Log In ✨
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-xl">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSignupClick}
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ========================================
