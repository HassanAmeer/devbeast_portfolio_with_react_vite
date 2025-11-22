# CaringWeb

A modern, responsive web application built with React, TypeScript, and Vite.

## About

CaringWeb is designed to provide caring solutions for the web. Built with modern technologies and best practices, it offers a clean, professional interface with smooth animations and responsive design.

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Backend services (optional)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd caringweb
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
caringweb/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   ├── config/          # Configuration files
│   └── assets/          # Static assets
├── public/              # Public assets
└── dist/                # Production build
```

## Firebase Setup (Optional)

If you want to use Firebase services:

1. Install Firebase:
```bash
npm install firebase
```

2. Configure Firebase in `src/config/fbconfig.tsx` with your credentials

3. Initialize Firebase:
```bash
firebase init
```

4. Deploy to Firebase Hosting:
```bash
npm run build
firebase deploy --only hosting
```

## Deployment

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Firebase Hosting

```bash
firebase deploy --only hosting:caringweb
```

## License

This project is private and proprietary.

## Contact

For more information, please contact the development team.