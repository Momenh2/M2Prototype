import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ArrowLeft, Lock, Shield } from 'lucide-react';

interface ParentLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export function ParentLogin({ onLogin, onBack }: ParentLoginProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handlePinChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      setError('');
    }
  };

  const handleLogin = () => {
    // Demo: Accept "1234" as PIN
    if (pin === '1234') {
      onLogin();
    } else {
      setError('Incorrect PIN. Try 1234 for demo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="rounded-2xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <Card className="p-8 space-y-6 bg-white rounded-3xl shadow-2xl">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-5 rounded-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl text-gray-800">Parent Access</h2>
            <p className="text-gray-600">Enter your PIN to continue</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                4-Digit PIN
              </label>
              <Input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => handlePinChange(e.target.value)}
                placeholder="••••"
                className="h-14 text-2xl text-center tracking-widest rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && pin.length === 4 && handleLogin()}
                maxLength={4}
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <p className="text-xs text-gray-500 text-center">
                Demo PIN: 1234
              </p>
            </div>

            <Button
              onClick={handleLogin}
              disabled={pin.length !== 4}
              className="w-full h-12 bg-gray-800 hover:bg-gray-900 rounded-xl"
            >
              Access Dashboard
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Forgot your PIN? Contact support
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
