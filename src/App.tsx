  import { useState } from 'react';
  import { Login } from './components/Login';
  import { Signup } from './components/Signup';
  import { RoleSelection } from './components/RoleSelection';
  import { AvatarCreation } from './components/AvatarCreation';
  import { AvatarEditor } from './components/AvatarEditor';
  import { ChildDashboard } from './components/ChildDashboard';
  import { QuizActivity } from './components/QuizActivity';
  import QuizSelectionPage from './components/QuizSelectionPage';
  import GameSelectionPage from './components/GameSelectionPage';
  import { MiniGame } from './components/MiniGame';
  import  StoryAdventure  from './components/StoryAdventure';
  import { RewardsScreen } from './components/RewardsScreen';
  import { ChildProgress } from './components/ChildProgress';
  import { DailyMissions } from './components/DailyMissions';
  import { ParentLogin } from './components/ParentLogin';
  import { ParentDashboard } from './components/ParentDashboard';
  import { ProgressReports } from './components/ProgressReports';
  import { ScreenTimeControl } from './components/ScreenTimeControl';
  import { SafeMode } from './components/SafeMode';
  import { AccountSettings } from './components/AccountSettings';

  export interface AvatarData {
    name: string;
    body: string;
    hair: string;
    outfit: string;
    accessories: string[];
    level: number;
    xp: number;
    maxXp: number;
  }

  export interface ChildData extends AvatarData {
    badges: string[];
    completedActivities: string[];
    stats: {
      totalTime: number;
      activitiesCompleted: number;
      streakDays: number;
    };
  }

  export type ViewType = 
    | 'login'
    | 'signup'
    | 'role-selection'
    | 'avatar-creation'
    | 'avatar-editor'
    | 'child-dashboard' 
    | 'quiz'
    | 'quiz-selection'
    | 'game-selection'
    | 'mini-game' 
    | 'story' 
    | 'rewards' 
    | 'child-progress' 
    | 'missions'
    | 'parent-login'
    | 'parent-dashboard'
    | 'progress-reports'
    | 'screen-time'
    | 'safe-mode'
    | 'account-settings';

  export default function App() {
    const [currentView, setCurrentView] = useState<ViewType>('login');
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    
    const [childData, setChildData] = useState<ChildData>({
      name: '',
      body: 'default',
      hair: 'short',
      outfit: 'casual',
      accessories: [],
      level: 1,
      xp: 0,
      maxXp: 100,
      badges: [],
      completedActivities: [],
      stats: {
        totalTime: 0,
        activitiesCompleted: 0,
        streakDays: 0,
      },
    });
    
    const [rewardData, setRewardData] = useState<{
      xp: number;
      badges: string[];
      items: string[];
    } | null>(null);

    // Authentication Handlers
    const handleLogin = (email: string, password: string) => {
      // In production, validate credentials with backend
      console.log('Login:', { email, password });
      setUserEmail(email);
      // Extract name from email for demo purposes
      const name = email.split('@')[0];
      setUserName(name);
      setCurrentView('role-selection');
    };

    const handleSignup = (name: string, email: string, password: string) => {
      // In production, create account with backend
      console.log('Signup:', { name, email, password });
      setUserName(name);
      setUserEmail(email);
      setCurrentView('role-selection');
    };

    // Role Selection Handlers
    const handleSelectChild = () => {
      setCurrentView('avatar-creation');
    };

    const handleSelectParent = () => {
      // Go to parent PIN entry
      setCurrentView('parent-login');
    };

    // Child Data Management
    const updateChildData = (updates: Partial<ChildData>) => {
      setChildData(prev => ({ ...prev, ...updates }));
    };

    const addXP = (amount: number) => {
      setChildData(prev => {
        let newXp = prev.xp + amount;
        let newLevel = prev.level;
        let newMaxXp = prev.maxXp;

        while (newXp >= newMaxXp) {
          newXp -= newMaxXp;
          newLevel += 1;
          newMaxXp = Math.floor(newMaxXp * 1.5);
        }

        return {
          ...prev,
          xp: newXp,
          level: newLevel,
          maxXp: newMaxXp,
        };
      });
    };

    const completeActivity = (activityType: string, xpReward: number, badges: string[] = [], items: string[] = []) => {
      addXP(xpReward);
      setChildData(prev => ({
        ...prev,
        completedActivities: [...prev.completedActivities, activityType],
        badges: [...prev.badges, ...badges],
        stats: {
          ...prev.stats,
          activitiesCompleted: prev.stats.activitiesCompleted + 1,
        },
      }));
      setRewardData({ xp: xpReward, badges, items });
      setCurrentView('rewards');
    };

    // Logout Handler
    const handleLogout = () => {
      setUserName('');
      setUserEmail('');
      setChildData({
        name: '',
        body: 'default',
        hair: 'short',
        outfit: 'casual',
        accessories: [],
        level: 1,
        xp: 0,
        maxXp: 100,
        badges: [],
        completedActivities: [],
        stats: {
          totalTime: 0,
          activitiesCompleted: 0,
          streakDays: 0,
        },
      });
      setCurrentView('login');
    };

    // View Rendering
    const renderView = () => {
      switch (currentView) {
        case 'login':
          return (
            <Login 
              onLogin={handleLogin}
              onSignupClick={() => setCurrentView('signup')}
            />
          );
          
        case 'signup':
          return (
            <Signup 
              onSignup={handleSignup}
              onLoginClick={() => setCurrentView('login')}
            />
          );
          
        case 'role-selection':
          return (
            <RoleSelection
              onSelectChild={handleSelectChild}
              onSelectParent={handleSelectParent}
              userName={userName}
            />
          );
          
        case 'avatar-creation':
          return (
            <AvatarCreation 
              childData={childData} 
              updateChildData={updateChildData} 
              onComplete={() => setCurrentView('child-dashboard')} 
            />
          );
        case 'avatar-editor':
          return (
            <AvatarEditor 
              onBack={() => setCurrentView('child-dashboard')}
              onSave={() => {
                // Save avatar changes
                setCurrentView('child-dashboard');
              }}
            />
          );
          
 case 'child-dashboard':
  return (
    <ChildDashboard 
      childData={childData} 
      setCurrentView={setCurrentView}
      onLogin={() => setCurrentView('parent-dashboard')}
      onBack={() => setCurrentView('role-selection')}
    />
  );
        case 'quiz':
          return (
            <QuizActivity 
              childData={childData} 
              onComplete={completeActivity} 
              onBack={() => setCurrentView('child-dashboard')} 
            />
          );

          case 'quiz-selection':
          return (
            <QuizSelectionPage 
              onBack={() => setCurrentView('child-dashboard')}
              onSelectQuiz={(quizId) => {
                // Handle quiz selection - you can pass quizId to QuizActivity
                console.log('Selected quiz:', quizId);
                setCurrentView('quiz');
              }}
            />
          );
          
  
        case 'mini-game':
          return (
            <MiniGame 
              childData={childData} 
              onComplete={completeActivity} 
              onBack={() => setCurrentView('child-dashboard')} 
            />
          );
          case 'game-selection':
          return (
            <GameSelectionPage 
              onBack={() => setCurrentView('child-dashboard')}
              onSelectGame={(gameId) => {
                // Handle game selection - you can pass gameId to MiniGame
                console.log('Selected game:', gameId);
                setCurrentView('mini-game');
              }}
            />
          );
        case 'story':
          return (
            <StoryAdventure 
              childData={childData} 
              onComplete={completeActivity} 
              onBack={() => setCurrentView('child-dashboard')} 
            />
          );
          
        case 'rewards':
          return (
            <RewardsScreen 
              rewardData={rewardData} 
              onContinue={() => setCurrentView('child-dashboard')} 
            />
          );
          
        case 'child-progress':
          return (
            <ChildProgress 
              childData={childData} 
              onBack={() => setCurrentView('child-dashboard')} 
            />
          );
          
        case 'missions':
          return (
            <DailyMissions 
              childData={childData} 
              onBack={() => setCurrentView('child-dashboard')} 
              onComplete={completeActivity} 
            />
          );
          
        case 'parent-login':
          return (
            <ParentLogin 
              onLogin={() => setCurrentView('parent-dashboard')} 
              onBack={() => setCurrentView('role-selection')} 
            />
          );
          
        case 'parent-dashboard':
          return (
            <ParentDashboard 
              childData={childData} 
              setCurrentView={setCurrentView} 
            />
          );
          
        case 'progress-reports':
          return (
            <ProgressReports 
              childData={childData} 
              onBack={() => setCurrentView('parent-dashboard')} 
            />
          );
          
        case 'screen-time':
          return (
            <ScreenTimeControl 
              onBack={() => setCurrentView('parent-dashboard')} 
            />
          );
          
        case 'safe-mode':
          return (
            <SafeMode 
              onBack={() => setCurrentView('parent-dashboard')} 
            />
          );
          
        case 'account-settings':
          return (
            <AccountSettings 
              onBack={() => setCurrentView('parent-dashboard')} 
              onLogout={handleLogout} 
            />
          );
          
        default:
          return (
            <Login 
              onLogin={handleLogin}
              onSignupClick={() => setCurrentView('signup')}
            />
          );
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        {renderView()}
      </div>
    );
  }