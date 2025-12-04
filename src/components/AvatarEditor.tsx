// AvatarEditor.tsx - Wrapper with navigation props
import React, { useState } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface AvatarEditorProps {
  onBack: () => void;
  onSave: () => void;
}

// Image links configuration
const MAIN_AVATAR_LINK = "Assets/main.png";

const HAIR_STYLE_LINKS = {
  messy:  "Assets/messy.png",
  side:   "Assets/side.png",
  middle: "Assets/middle.png",
  spiky:  "Assets/spiky.png",
  slick:  "Assets/slick.png",
};

const SKIN_TONES = [
  { id: 'skin-1', color: '#5D4037', name: 'Dark Brown' },
  { id: 'skin-2', color: '#8D5524', name: 'Medium Brown' },
  { id: 'skin-3', color: '#C68642', name: 'Tan' },
  { id: 'skin-4', color: '#FFDCB1', name: 'Light' },
  { id: 'skin-5', color: '#F5E0C6', name: 'Pale' },
];

const HAIR_STYLES = [
  { id: 'style-1', label: 'Messy',  imgSrc: HAIR_STYLE_LINKS.messy },
  { id: 'style-2', label: 'Side',   imgSrc: HAIR_STYLE_LINKS.side },
  { id: 'style-3', label: 'Middle', imgSrc: HAIR_STYLE_LINKS.middle }, 
  { id: 'style-4', label: 'Spiky',  imgSrc: HAIR_STYLE_LINKS.spiky },
  { id: 'style-5', label: 'Slick',  imgSrc: HAIR_STYLE_LINKS.slick },
];

const HAIR_COLORS = [
  { id: 'hair-yellow', color: '#FDD835', name: 'Blonde' },
  { id: 'hair-auburn', color: '#5D2E2E', name: 'Auburn' },
  { id: 'hair-brown', color: '#3E2723', name: 'Dark Brown' },
  { id: 'hair-lightbrown', color: '#795548', name: 'Light Brown' },
  { id: 'hair-black', color: '#000000', name: 'Black' },
];

export function AvatarEditor({ onBack, onSave }: AvatarEditorProps) {
  const [selectedSkin, setSelectedSkin] = useState('skin-4');
  const [selectedHairStyle, setSelectedHairStyle] = useState('style-3');
  const [selectedHairColor, setSelectedHairColor] = useState('hair-black');

  const handleSave = () => {
    // In production, save the avatar data to backend or state
    console.log('Saving avatar:', { selectedSkin, selectedHairStyle, selectedHairColor });
    onSave();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF3E0] via-[#FFE0B2] to-[#F8BBD0] flex flex-col items-center py-8 px-4 font-sans text-gray-800">
      
      {/* Back Button */}
      <div className="w-full max-w-5xl mb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold italic mb-8 flex items-center gap-2 drop-shadow-sm text-gray-900">
        <Sparkles className="text-yellow-400 fill-yellow-400 animate-pulse" />
        Customize Your Avatar
        <Sparkles className="text-yellow-400 fill-yellow-400 animate-pulse" />
      </h1>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        
        {/* Left Column: Avatar Preview */}
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-[#FFEBE5] rounded-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border-4 border-white/50 w-full max-w-md aspect-[3/4] p-4 relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] flex items-center justify-center">
             
             <img 
               src={MAIN_AVATAR_LINK}
               alt="Main Avatar"
               className="w-full h-full object-contain rounded-[30px]"
             />
             
          </div>
        </div>

        {/* Right Column: Customization Options */}
        <div className="flex-1 bg-[#FFE0B2]/40 backdrop-blur-sm rounded-[30px] p-6 border border-white/40 shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Customize Your Character</h2>

          {/* Skin Tone Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Skin Tone:</h3>
            <div className="bg-[#FFE0B2] p-4 rounded-2xl flex gap-3 overflow-x-auto pb-4 scrollbar-hide border border-orange-200/50 shadow-inner">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedSkin(tone.id)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl transition-all duration-200 shadow-sm border-2 ${
                    selectedSkin === tone.id 
                      ? 'border-green-500 ring-2 ring-green-300 scale-105' 
                      : 'border-transparent hover:scale-105 hover:shadow-md'
                  }`}
                  style={{ backgroundColor: tone.color }}
                  aria-label={`Select ${tone.name} skin tone`}
                />
              ))}
            </div>
          </div>

          {/* Hair Style Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Hair:</h3>
            <div className="bg-[#FFE0B2] p-4 rounded-2xl flex gap-3 overflow-x-auto pb-4 scrollbar-hide border border-orange-200/50 shadow-inner">
              {HAIR_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedHairStyle(style.id)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden relative transition-all duration-200 border-2 flex items-center justify-center bg-white/40 ${
                    selectedHairStyle === style.id 
                      ? 'border-green-500 ring-2 ring-green-300 bg-white scale-105' 
                      : 'border-white/50 hover:bg-white hover:shadow-md'
                  }`}
                  aria-label={`Select ${style.label} hair style`}
                >
                  <img 
                    src={style.imgSrc} 
                    alt={style.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Hair Tone Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Hair Tone:</h3>
            <div className="bg-[#FFE0B2] p-4 rounded-2xl flex gap-3 overflow-x-auto pb-4 scrollbar-hide border border-orange-200/50 shadow-inner">
              {HAIR_COLORS.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedHairColor(tone.id)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl transition-all duration-200 shadow-sm border-2 ${
                    selectedHairColor === tone.id 
                      ? 'border-green-500 ring-2 ring-green-300 scale-105' 
                      : 'border-transparent hover:scale-105 hover:shadow-md'
                  }`}
                  style={{ backgroundColor: tone.color }}
                  aria-label={`Select ${tone.name} hair color`}
                />
              ))}
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl text-white font-bold text-lg"
          >
            Save Avatar ✨
          </Button>
          
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}