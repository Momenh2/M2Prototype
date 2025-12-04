# M2Prototype


# Kids Learning Platform 🎓

A fun, interactive educational platform designed for children aged 5-10, featuring quizzes, games, stories, and progress tracking with parental controls.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (version 16.x or higher)
- **npm** (version 7.x or higher) or **yarn** (version 1.22.x or higher)

### Installation Steps

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd kids-learning-platform
```

2. **Install dependencies**
```bash
   npm install
   # or
   yarn install
```

3. **Start the development server**
```bash
   npm run dev
   # or
   yarn dev
```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📦 Core Dependencies

This project is built with the following technologies:

### Framework & Build Tools
- **React** (^18.x) - UI library
- **TypeScript** (^5.x) - Type-safe JavaScript
- **Vite** (^5.x) - Fast build tool and dev server

### UI Components & Styling
- **Tailwind CSS** (^3.x) - Utility-first CSS framework
- **Lucide React** (^0.263.1) - Icon library
- **Radix UI** - Accessible UI components:
  - `@radix-ui/react-progress`
  - `@radix-ui/react-switch`
  - Custom UI components (Button, Card, Input, etc.)

### Required Assets
The project requires image assets in the `Assets/` directory:
- `main.png` - Main avatar image
- `messy.png`, `side.png`, `middle.png`, `spiky.png`, `slick.png` - Hair style images

**Note:** These assets are not included in the repository. You'll need to add your own images to the `Assets/` folder.

## 📁 Project Structure
```
src/
├── App.tsx                      # Main application component
├── components/
│   ├── Login.tsx               # User login screen
│   ├── Signup.tsx              # User registration
│   ├── RoleSelection.tsx       # Child/Parent role selection
│   ├── AvatarCreation.tsx      # Child avatar setup
│   ├── AvatarEditor.tsx        # Avatar customization
│   ├── ChildDashboard.tsx      # Main child interface
│   ├── QuizActivity.tsx        # Quiz interface
│   ├── QuizSelectionPage.tsx   # Quiz selection screen
│   ├── GameSelectionPage.tsx   # Game selection screen
│   ├── MiniGame.tsx            # Mini-games interface
│   ├── StoryAdventure.tsx      # Story reading interface
│   ├── RewardsScreen.tsx       # Rewards display
│   ├── ChildProgress.tsx       # Progress tracking
│   ├── DailyMissions.tsx       # Daily missions
│   ├── ParentLogin.tsx         # Parent authentication
│   ├── ParentDashboard.tsx     # Parent control panel
│   ├── ProgressReports.tsx     # Detailed progress reports
│   ├── ScreenTimeControl.tsx   # Screen time management
│   ├── SafeMode.tsx            # Content filtering settings
│   ├── AccountSettings.tsx     # Account management
│   └── ui/                     # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── progress.tsx
│       └── switch.tsx
└── Assets/                     # Image assets (not included)
```

## 🎮 Features

### For Children
- **Avatar Creation**: Customize your character with different styles
- **Interactive Quizzes**: Test knowledge across multiple subjects
- **Mini Games**: Educational games for skill development
- **Story Adventures**: Interactive reading experiences with choices
- **Progress Tracking**: Level up and earn XP and badges
- **Daily Missions**: Complete challenges for rewards

### For Parents
- **Progress Reports**: Detailed analytics on learning activities
- **Screen Time Control**: Set daily usage limits
- **Safe Mode**: Content filtering and age-appropriate settings
- **Account Management**: Manage child accounts and preferences
- **PIN Protection**: Secure parent dashboard access (default PIN: 1234)

## 🔧 Configuration

### Tailwind CSS Setup
Ensure your `tailwind.config.js` includes:
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### TypeScript Configuration
The project uses strict TypeScript settings. Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  }
}
```

## 🎨 Adding Custom Assets

1. Create an `Assets` folder in your project root or `public` directory
2. Add the following images:
   - `main.png` - Base avatar image
   - `messy.png` - Messy hairstyle
   - `side.png` - Side-parted hairstyle
   - `middle.png` - Middle-parted hairstyle
   - `spiky.png` - Spiky hairstyle
   - `slick.png` - Slicked-back hairstyle

## 🔐 Default Credentials

### Parent Dashboard Access
- **PIN**: 1234 (for demo purposes)

**Important**: In production, implement proper authentication with secure password hashing and storage.

## 🚀 Building for Production
```bash
npm run build
# or
yarn build
```

The build output will be in the `dist/` directory, ready for deployment.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port.

### Missing Assets Error
Ensure all required images are placed in the `Assets/` directory with correct filenames.

### TypeScript Errors
Run `npm install` to ensure all type definitions are installed.

## 📝 Notes

- This is a **demo application** for educational purposes
- Not production-ready without proper backend integration
- Implement secure authentication and data storage for production use
- Ensure COPPA compliance when collecting data from children
- Add proper error boundaries and loading states for production

## 🤝 Contributing



## 📄 License

