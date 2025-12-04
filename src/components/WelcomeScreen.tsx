import { Sparkles, User } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
  onParentAccess: () => void;
}

export function WelcomeScreen({ onNext, onParentAccess }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full opacity-50 animate-pulse delay-75"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-blue-300 rounded-full opacity-50 animate-pulse delay-150"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-3xl shadow-2xl">
              <Sparkles className="w-24 h-24 text-white" />
            </div>
          </div>
          <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Learning Quest
          </h1>
          <p className="text-2xl text-gray-700">
            Your Adventure Starts Here! 🚀
          </p>
        </div>

        {/* Main CTA */}
        <div className="space-y-4">
          <Button
            onClick={onNext}
            className="w-full max-w-md h-20 text-3xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-3xl shadow-2xl transform hover:scale-105 transition-all"
          >
            Start Your Quest! ✨
          </Button>
          
          <p className="text-gray-600">
            Create your avatar and begin learning!
          </p>
        </div>

        {/* Parent Access */}
        <div className="pt-8">
          <Button
            onClick={onParentAccess}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            <User className="w-4 h-4 mr-2" />
            Parent Access
          </Button>
        </div>
      </div>
    </div>
  );
}
