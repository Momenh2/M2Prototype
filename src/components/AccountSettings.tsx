import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ArrowLeft, User, Mail, Bell, Lock, Link2, AlertCircle, LogOut } from 'lucide-react';
import { Switch } from './ui/switch';

interface AccountSettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

export function AccountSettings({ onBack, onLogout }: AccountSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(false);

  const handleChangePIN = () => {
    alert('PIN change feature - In production, this would open a secure PIN change flow');
  };

  const handleUnlinkChild = () => {
    if (confirm('Are you sure you want to unlink this child account? This action cannot be undone.')) {
      alert('Child account unlinked');
    }
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
          <h1 className="text-4xl text-gray-800">Account Settings</h1>
          <div className="w-24"></div>
        </div>

        {/* Parent Account Info */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Parent Account</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                <User className="w-4 h-4" />
                Parent Name
              </label>
              <Input
                type="text"
                defaultValue="Sarah Johnson"
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <Input
                type="email"
                defaultValue="sarah.johnson@email.com"
                className="h-12 rounded-xl"
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Security</h3>
          <div className="space-y-3">
            <Button
              onClick={handleChangePIN}
              variant="outline"
              className="w-full justify-start h-14 rounded-xl"
            >
              <Lock className="w-5 h-5 mr-3" />
              Change PIN Code
            </Button>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">
                Your PIN protects parent settings and ensures only you can access this dashboard.
                Choose a PIN that's easy for you to remember but hard for children to guess.
              </p>
            </div>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-gray-700" />
            <h3 className="text-xl text-gray-800">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-800">Weekly Progress Reports</p>
                <p className="text-sm text-gray-600">Summary every Sunday</p>
              </div>
              <Switch
                checked={weeklyReports}
                onCheckedChange={setWeeklyReports}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-800">Achievement Alerts</p>
                <p className="text-sm text-gray-600">When child earns badges</p>
              </div>
              <Switch
                checked={achievementAlerts}
                onCheckedChange={setAchievementAlerts}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-800">Daily Learning Reminders</p>
                <p className="text-sm text-gray-600">Encourage daily practice</p>
              </div>
              <Switch
                checked={dailyReminders}
                onCheckedChange={setDailyReminders}
              />
            </div>
          </div>
        </Card>

        {/* Linked Accounts */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-gray-700" />
            <h3 className="text-xl text-gray-800">Linked Child Accounts</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-2xl">
                  🙂
                </div>
                <div>
                  <p className="text-gray-800">Alex</p>
                  <p className="text-sm text-gray-600">Level 1 Explorer</p>
                </div>
              </div>
              <Button
                onClick={handleUnlinkChild}
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Unlink
              </Button>
            </div>
            
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-dashed"
            >
              + Link Another Child
            </Button>
          </div>
        </Card>

        {/* Data & Privacy */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl text-gray-800 mb-4">Data & Privacy</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl"
            >
              Download My Data
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl"
            >
              Privacy Policy
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl"
            >
              Terms of Service
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 bg-red-50 rounded-2xl border border-red-200">
          <div className="flex gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-800 mb-1">Danger Zone</h4>
              <p className="text-sm text-red-600">
                These actions are permanent and cannot be undone.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl text-red-600 border-red-300 hover:bg-red-100"
            >
              Delete All Progress Data
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl text-red-600 border-red-300 hover:bg-red-100"
            >
              Delete Account
            </Button>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-14 rounded-xl border-2"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout from Parent Dashboard
        </Button>

        {/* Save Button */}
        <Button
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-xl"
        >
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
