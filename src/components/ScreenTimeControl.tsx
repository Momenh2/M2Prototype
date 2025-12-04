import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Clock, Moon, Sun, Lock, AlertCircle } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

interface ScreenTimeControlProps {
  onBack: () => void;
}

export function ScreenTimeControl({ onBack }: ScreenTimeControlProps) {
  const [dailyLimit, setDailyLimit] = useState([60]);
  const [screenTimeEnabled, setScreenTimeEnabled] = useState(true);
  const [bedtimeMode, setBedtimeMode] = useState(true);
  const [weekendExtra, setWeekendExtra] = useState(true);
  
  const [scheduleBlocks, setScheduleBlocks] = useState([
    { id: 1, name: 'School Hours', start: '08:00', end: '15:00', blocked: true },
    { id: 2, name: 'Dinner Time', start: '18:00', end: '19:00', blocked: true },
    { id: 3, name: 'Bedtime', start: '20:00', end: '07:00', blocked: true },
  ]);

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Screen time settings saved!');
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
          <h1 className="text-4xl text-gray-800">Screen Time Control</h1>
          <div className="w-24"></div>
        </div>

        {/* Current Usage Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl mb-2">Today's Usage</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl">45</span>
                <span className="text-2xl opacity-90">/ {dailyLimit[0]} min</span>
              </div>
            </div>
            <div className="text-center">
              <Clock className="w-16 h-16 mx-auto mb-2" />
              <p className="text-lg opacity-90">15 minutes remaining</p>
            </div>
          </div>
        </Card>

        {/* Daily Limit Settings */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl text-gray-800">Daily Time Limit</h3>
                <p className="text-gray-600 text-sm">Set maximum screen time per day</p>
              </div>
              <Switch
                checked={screenTimeEnabled}
                onCheckedChange={setScreenTimeEnabled}
              />
            </div>

            {screenTimeEnabled && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Time Limit</span>
                  <span className="text-2xl text-blue-600">{dailyLimit[0]} min</span>
                </div>
                <Slider
                  value={dailyLimit}
                  onValueChange={setDailyLimit}
                  max={180}
                  min={15}
                  step={15}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>15 min</span>
                  <span>180 min</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Special Modes */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Special Modes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Moon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-800">Bedtime Mode</p>
                  <p className="text-sm text-gray-600">Auto-lock from 8 PM to 7 AM</p>
                </div>
              </div>
              <Switch
                checked={bedtimeMode}
                onCheckedChange={setBedtimeMode}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Sun className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-800">Weekend Bonus</p>
                  <p className="text-sm text-gray-600">+30 minutes on Sat & Sun</p>
                </div>
              </div>
              <Switch
                checked={weekendExtra}
                onCheckedChange={setWeekendExtra}
              />
            </div>
          </div>
        </Card>

        {/* Schedule Blocks */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-gray-800">Scheduled Blocks</h3>
            <Button variant="outline" className="rounded-xl" size="sm">
              Add Block
            </Button>
          </div>
          <div className="space-y-3">
            {scheduleBlocks.map((block) => (
              <div
                key={block.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-gray-800">{block.name}</p>
                    <p className="text-sm text-gray-600">
                      {block.start} - {block.end}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={block.blocked} />
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Warning Notice */}
        <Card className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-800 mb-1">Time Limit Notifications</h4>
              <p className="text-sm text-gray-600">
                Your child will receive warnings at 10 minutes, 5 minutes, and 1 minute before time runs out.
                They can request extra time, which you can approve or deny.
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
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
