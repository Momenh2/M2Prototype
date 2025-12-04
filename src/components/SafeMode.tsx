import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Shield, Link as LinkIcon, Filter, Eye, AlertTriangle } from 'lucide-react';
import { Switch } from './ui/switch';

interface SafeModeProps {
  onBack: () => void;
}

export function SafeMode({ onBack }: SafeModeProps) {
  const [safeModeEnabled, setSafeModeEnabled] = useState(true);
  const [blockExternalLinks, setBlockExternalLinks] = useState(true);
  const [ageFilter, setAgeFilter] = useState(true);
  const [contentModeration, setContentModeration] = useState(true);

  const [contentCategories, setContentCategories] = useState([
    { id: 'math', name: 'Math & Numbers', emoji: '🔢', allowed: true },
    { id: 'reading', name: 'Reading & Stories', emoji: '📚', allowed: true },
    { id: 'science', name: 'Science & Nature', emoji: '🔬', allowed: true },
    { id: 'art', name: 'Art & Creativity', emoji: '🎨', allowed: true },
    { id: 'music', name: 'Music & Sounds', emoji: '🎵', allowed: true },
    { id: 'games', name: 'Educational Games', emoji: '🎮', allowed: true },
    { id: 'social', name: 'Social Features', emoji: '👥', allowed: false },
    { id: 'chat', name: 'Chat & Messaging', emoji: '💬', allowed: false },
  ]);

  const toggleCategory = (id: string) => {
    setContentCategories(prev =>
      prev.map(cat => cat.id === id ? { ...cat, allowed: !cat.allowed } : cat)
    );
  };

  const handleSave = () => {
    alert('Safety settings saved!');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl text-gray-800">Safe Mode & Content</h1>
          <div className="w-24"></div>
        </div>

        {/* Safe Mode Status */}
        <Card className={`p-6 rounded-2xl shadow-lg ${
          safeModeEnabled 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
            : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-12 h-12" />
              <div>
                <h3 className="text-2xl mb-1">
                  Safe Mode {safeModeEnabled ? 'Active' : 'Disabled'}
                </h3>
                <p className="opacity-90">
                  {safeModeEnabled 
                    ? 'Your child is protected with all safety features' 
                    : 'Enable safe mode to protect your child'}
                </p>
              </div>
            </div>
            <Switch
              checked={safeModeEnabled}
              onCheckedChange={setSafeModeEnabled}
              className="scale-125"
            />
          </div>
        </Card>

        {/* Safety Features */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Safety Features</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-xl">
                  <LinkIcon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-800">Block External Links</p>
                  <p className="text-sm text-gray-600">Prevent access to external websites</p>
                </div>
              </div>
              <Switch
                checked={blockExternalLinks}
                onCheckedChange={setBlockExternalLinks}
                disabled={!safeModeEnabled}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-800">Age-Appropriate Filter</p>
                  <p className="text-sm text-gray-600">Show only age-suitable content</p>
                </div>
              </div>
              <Switch
                checked={ageFilter}
                onCheckedChange={setAgeFilter}
                disabled={!safeModeEnabled}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-800">Content Moderation</p>
                  <p className="text-sm text-gray-600">AI-powered content filtering</p>
                </div>
              </div>
              <Switch
                checked={contentModeration}
                onCheckedChange={setContentModeration}
                disabled={!safeModeEnabled}
              />
            </div>
          </div>
        </Card>

        {/* Content Categories */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Content Categories</h3>
          <p className="text-gray-600 text-sm mb-4">
            Choose which types of content your child can access
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contentCategories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                  category.allowed 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.emoji}</span>
                  <span className="text-gray-800">{category.name}</span>
                </div>
                <Switch
                  checked={category.allowed}
                  onCheckedChange={() => toggleCategory(category.id)}
                  disabled={!safeModeEnabled}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Age Settings */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Age Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Child's Age</label>
              <select className="w-full p-3 border border-gray-300 rounded-xl bg-white">
                <option>5 years old</option>
                <option>6 years old</option>
                <option selected>7 years old</option>
                <option>8 years old</option>
                <option>9 years old</option>
                <option>10 years old</option>
              </select>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800">
                Content will be automatically filtered based on the age you select.
                We recommend keeping this accurate for the best experience.
              </p>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <Card className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-800 mb-1">Privacy & Data Protection</h4>
              <p className="text-sm text-gray-600 mb-3">
                This app is designed with COPPA compliance in mind. We do not collect personal information 
                from children without parental consent, and we do not share data with third parties.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Figma Make is not intended for collecting PII or securing sensitive data.
                For production use, implement proper backend security and compliance measures.
              </p>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-12 bg-green-600 hover:bg-green-700 rounded-xl"
          >
            <Shield className="w-5 h-5 mr-2" />
            Save Safety Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
