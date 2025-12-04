import { useState } from 'react';
import { ChildData } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { User, Shirt, Sparkles } from 'lucide-react';

interface AvatarCreationProps {
  childData: ChildData;
  updateChildData: (updates: Partial<ChildData>) => void;
  onComplete: () => void;
}

export function AvatarCreation({ childData, updateChildData, onComplete }: AvatarCreationProps) {
  const [step, setStep] = useState<'name' | 'body' | 'hair' | 'outfit'>('name');
  const [name, setName] = useState(childData.name);

  const bodyOptions = [
    { id: 'default', emoji: '🙂', color: 'bg-amber-200' },
    { id: 'happy', emoji: '😊', color: 'bg-rose-200' },
    { id: 'cool', emoji: '😎', color: 'bg-blue-200' },
    { id: 'star', emoji: '🌟', color: 'bg-yellow-200' },
  ];

  const hairOptions = [
    { id: 'short', name: 'Short Hair', emoji: '💇' },
    { id: 'long', name: 'Long Hair', emoji: '💇‍♀️' },
    { id: 'curly', name: 'Curly Hair', emoji: '🦱' },
    { id: 'cool', name: 'Cool Cut', emoji: '✨' },
  ];

  const outfitOptions = [
    { id: 'casual', name: 'Casual', emoji: '👕' },
    { id: 'sporty', name: 'Sporty', emoji: '⚽' },
    { id: 'wizard', name: 'Wizard', emoji: '🧙' },
    { id: 'superhero', name: 'Superhero', emoji: '🦸' },
  ];

  const handleNameSubmit = () => {
    if (name.trim()) {
      updateChildData({ name: name.trim() });
      setStep('body');
    }
  };

  const handleBodySelect = (bodyId: string) => {
    updateChildData({ body: bodyId });
    setStep('hair');
  };

  const handleHairSelect = (hairId: string) => {
    updateChildData({ hair: hairId });
    setStep('outfit');
  };

  const handleOutfitSelect = (outfitId: string) => {
    updateChildData({ outfit: outfitId });
    onComplete();
  };

  if (step === 'name') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-lg w-full p-8 space-y-6 bg-white/90 backdrop-blur rounded-3xl shadow-2xl">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-2xl">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl text-purple-600">What's your name?</h2>
            <p className="text-xl text-gray-600">Let's get to know you!</p>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="h-16 text-2xl text-center rounded-2xl border-4 border-purple-200 focus:border-purple-400"
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
            />
            
            <Button
              onClick={handleNameSubmit}
              disabled={!name.trim()}
              className="w-full h-16 text-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl"
            >
              Next! →
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'body') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-5xl text-purple-600">Choose Your Avatar!</h2>
            <p className="text-xl text-gray-600">Pick the one you like best</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bodyOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => handleBodySelect(option.id)}
                className={`p-8 cursor-pointer hover:scale-105 transition-transform rounded-3xl ${option.color} border-4 border-white hover:border-purple-400`}
              >
                <div className="text-center space-y-2">
                  <div className="text-8xl">{option.emoji}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'hair') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-5xl text-purple-600">Choose Your Hair!</h2>
            <p className="text-xl text-gray-600">Looking good!</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hairOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => handleHairSelect(option.id)}
                className="p-8 cursor-pointer hover:scale-105 transition-transform rounded-3xl bg-white border-4 border-purple-200 hover:border-purple-400"
              >
                <div className="text-center space-y-3">
                  <div className="text-7xl">{option.emoji}</div>
                  <p className="text-xl">{option.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-5xl text-purple-600">Choose Your Outfit!</h2>
          <p className="text-xl text-gray-600">Almost ready for adventure!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {outfitOptions.map((option) => (
            <Card
              key={option.id}
              onClick={() => handleOutfitSelect(option.id)}
              className="p-8 cursor-pointer hover:scale-105 transition-transform rounded-3xl bg-white border-4 border-purple-200 hover:border-purple-400"
            >
              <div className="text-center space-y-3">
                <div className="text-7xl">{option.emoji}</div>
                <p className="text-xl">{option.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
