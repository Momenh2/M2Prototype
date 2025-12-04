// RoleSelection.tsx
import { Button } from './ui/button';
import { Card } from './ui/card';
import { User, Shield, Sparkles } from 'lucide-react';

interface RoleSelectionProps {
  onSelectChild: () => void;
  onSelectParent: () => void;
  userName?: string;
}

export function RoleSelection({ onSelectChild, onSelectParent, userName }: RoleSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full opacity-50 animate-pulse delay-75"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-blue-300 rounded-full opacity-50 animate-pulse delay-150"></div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-3xl shadow-2xl">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 font-bold">
            Welcome{userName ? `, ${userName}` : ''}! 👋
          </h1>
          <p className="text-2xl text-gray-700">
            Choose how you'd like to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Child Card */}
          <Card 
            onClick={onSelectChild}
            className="p-8 bg-white/90 backdrop-blur rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_rgba(168,85,247,0.4)] transition-all cursor-pointer hover:scale-105 group"
          >
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-8 rounded-3xl group-hover:scale-110 transition-transform">
                  <User className="w-20 h-20 text-white" />
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <h2 className="text-4xl text-purple-600 font-bold">I'm a Child</h2>
                <p className="text-xl text-gray-600">
                  Start your learning adventure and have fun!
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Create your avatar</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Play educational games</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Earn badges and rewards</span>
                </div>
              </div>

              <Button className="w-full h-14 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl">
                Start Quest! ✨
              </Button>
            </div>
          </Card>

          {/* Parent Card */}
          <Card 
            onClick={onSelectParent}
            className="p-8 bg-white/90 backdrop-blur rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] transition-all cursor-pointer hover:scale-105 group"
          >
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-3xl group-hover:scale-110 transition-transform">
                  <Shield className="w-20 h-20 text-white" />
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <h2 className="text-4xl text-blue-600 font-bold">I'm a Parent</h2>
                <p className="text-xl text-gray-600">
                  Monitor progress and manage settings
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Track learning progress</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Control screen time</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Manage safety settings</span>
                </div>
              </div>

              <Button className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-2xl">
                Parent Dashboard 🛡️
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}