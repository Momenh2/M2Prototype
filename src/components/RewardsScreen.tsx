import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, Trophy, Star } from 'lucide-react';

interface RewardsScreenProps {
  rewardData: {
    xp: number;
    badges: string[];
    items: string[];
  } | null;
  onContinue: () => void;
}

export function RewardsScreen({ rewardData, onContinue }: RewardsScreenProps) {
  if (!rewardData) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <Card className="max-w-2xl w-full p-12 bg-white rounded-3xl shadow-2xl">
        <div className="space-y-8 text-center">
          {/* Celebration Animation */}
          <div className="relative">
            <div className="text-9xl animate-bounce">🎉</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-24 h-24 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-5xl text-purple-600">Amazing Work!</h2>
            <p className="text-2xl text-gray-600">You earned awesome rewards!</p>
          </div>

          {/* XP Reward */}
          <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-4 border-purple-300">
            <div className="flex items-center justify-center gap-4">
              <Star className="w-12 h-12 text-yellow-500" />
              <div className="text-left">
                <div className="text-4xl text-purple-600">+{rewardData.xp} XP</div>
                <div className="text-gray-600">Experience Points</div>
              </div>
            </div>
          </Card>

          {/* Badges */}
          {rewardData.badges.length > 0 && (
            <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-4 border-yellow-300">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <h3 className="text-2xl text-yellow-800">New Badge{rewardData.badges.length > 1 ? 's' : ''}!</h3>
                </div>
                <div className="space-y-2">
                  {rewardData.badges.map((badge, index) => (
                    <div key={index} className="text-xl text-yellow-700 flex items-center justify-center gap-2">
                      <span className="text-3xl">🏆</span>
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Items */}
          {rewardData.items.length > 0 && (
            <Card className="p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl border-4 border-blue-300">
              <div className="space-y-3">
                <h3 className="text-2xl text-blue-800">New Items Unlocked!</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {rewardData.items.map((item, index) => (
                    <div key={index} className="text-5xl">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Continue Button */}
          <Button
            onClick={onContinue}
            className="w-full h-16 text-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl"
          >
            Continue Adventure! →
          </Button>
        </div>
      </Card>
    </div>
  );
}
