// Signup.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface SignupProps {
  onSignup: (name: string, email: string, password: string) => void;
  onLoginClick: () => void;
}

export function Signup({ onSignup, onLoginClick }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    if (name && email && password) {
      onSignup(name, email, password);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name && email && password && confirmPassword && password === confirmPassword && agreedToTerms) {
      handleSubmit();
    }
  };

  const passwordsMatch = password === confirmPassword;
  const passwordStrength = password.length >= 8 ? 'strong' : password.length >= 6 ? 'medium' : 'weak';

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
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-5 rounded-2xl">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl text-purple-600 font-bold">Join the Adventure!</h2>
            <p className="text-gray-600 text-lg">Create your account to start learning</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-14 rounded-xl border-2"
              />
            </div>

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
                  placeholder="Create a strong password"
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
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    <div className={`h-1 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <div className={`h-1 flex-1 rounded ${passwordStrength === 'medium' || passwordStrength === 'strong' ? passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500' : 'bg-gray-200'}`}></div>
                    <div className={`h-1 flex-1 rounded ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </div>
                  <p className={`text-xs mt-1 ${passwordStrength === 'weak' ? 'text-red-600' : passwordStrength === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {passwordStrength === 'weak' && 'Weak password - use at least 6 characters'}
                    {passwordStrength === 'medium' && 'Medium strength - add more characters'}
                    {passwordStrength === 'strong' && 'Strong password! ✓'}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`h-14 rounded-xl border-2 flex-1 ${confirmPassword && !passwordsMatch ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-600 mt-1">Passwords don't match</p>
              )}
              {confirmPassword && passwordsMatch && (
                <p className="text-xs text-green-600 mt-1">Passwords match! ✓</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-1 rounded"
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <button className="text-purple-600 hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button className="text-purple-600 hover:underline">Privacy Policy</button>
              </span>
            </label>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!name || !email || !password || !confirmPassword || !passwordsMatch || !agreedToTerms}
              className="w-full h-14 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl"
            >
              Create Account 🚀
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup */}
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onLoginClick}
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Log in here
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
