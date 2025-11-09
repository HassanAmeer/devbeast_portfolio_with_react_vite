# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# demo image
<img src="demo/1.png">


## Installation

### Create a Simple Project

To create a new React project, you can use one of the following methods:

- **Using Create React App:**
  ```bash
  npx create-react-app projectName
  ```

- **Using Vite + React (Recommended):**
  ```bash
  npm create vite@latest projectName
  ```

### Upgrade React

To upgrade React to the latest version:

```bash
npm install react@latest react-dom@latest
```

## Usage

### Run the Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Permissions and File Access

If you encounter permission issues when changing or adding folders and files:

1. Change permissions:
   ```bash
   sudo chmod -R 755 /path/to/your/project/src
   ```

2. Change ownership:
   ```bash
   sudo chown -R $(whoami):$(id -gn) /path/to/your/project/src
   ```

## Cache and Dependencies

### Clear NPM Cache

```bash
sudo chown -R $(whoami):$(id -gn) ~/.npm
npm cache clean --force
```

### Fix Audit Issues

```bash
sudo chown -R $(whoami):$(id -gn) ~/.npm
npm audit fix --force
```

## Environment Variables

If you encounter issues with environment variables, try:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```


