# React + TypeScript + Vite

# Portfolio
## demo image
<img src="demo/1.png">
<img src="demo/2.png">
<img src="demo/3.png">
<img src="demo/4.png">
<img src="demo/5.png">

admin login 
- admin@gmail.com
- 786

<hr> 

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


# ------------------  firebase setup start -------------------
- add this packge to package.json file
```json
"firebase": "^11.8.1",
```
- make a file a new file in any directory
`fbconfig.tsx`
configration file 
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlp5hxn8uHFGEqhkDroq_khz8RpCQ-K7A",
    authDomain: "emergencyapp786.firebaseapp.com",
    projectId: "emergencyapp786",
    storageBucket: "emergencyapp786.appspot.com", // Make sure this is correct
    messagingSenderId: "714485189721",
    appId: "1:714485189721:web:a552df09f28327e698f548"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
```
- login and forgot password usage demo
```js
import React, { useState } from "react";
import './login.css';
import logo from './../../assets/appicons/logoh.png';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography, Divider, useMediaQuery, Snackbar, Alert } from '@mui/material';
import { blueGrey, blue, red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { db } from './../../hooks/fbconfig';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const LoginComp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const isMobile = useMediaQuery('(max-width:600px)');
    const auth = getAuth();

    const handleClick = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleLogin = () => {
        if (email === "") {
            setError("Please enter your Email!");
            return;
        }
        if (!email.includes('@')) {
            setError("Please enter a valid Email!");
            return;
        }
        if (password === "") {
            setError("Please enter your Password!");
            return;
        }
        setError("");
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (email !== "" && password !== "") {
                    // handleClick('success', 'Login Success!');
                }
                setLoading(false);
                const user = userCredential.user;
                navigate("/home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/invalid-email") setError("Invalid email!");
                else if (errorCode === "auth/wrong-password") setError("Wrong password!");
                else if (errorCode === "auth/user-not-found") setError("User not found!");
                else if (errorCode === "auth/invalid-credential") setError("Wrong Email Or Password!");
                else setError(errorMessage);
                setLoading(false);
                handleClick('error', errorMessage);
            });
    };

    const handleForgotPassword = () => {
        if (email === "") {
            setError("Please enter your email!");
            return;
        }

        if (!email.includes('@')) {
            setError("Please enter a valid Email!");
            return;
        }

        setLoading(true);
        const actionCodeSettings = {
            url: 'https://evacovation.web.app',
            handleCodeInApp: true,
        };

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setLoading(false);
                handleClick('success', 'Password reset email sent!');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/invalid-email") setError("Invalid email!");
                else if (errorCode === "auth/user-not-found") setError("User not found!");
                else setError(errorMessage);
                setLoading(false);
                handleClick('error', errorMessage);
            });
    };

    return (
        <Box display="flex" paddingLeft={isMobile ? '7%' : 0} flexDirection={isMobile ? 'column' : 'row'} height="100vh" justifyContent="center" alignItems="center" margin='0'>
            {!isMobile && <Box width="55%" display="flex" justifyContent="center" alignItems="center">
                <img src={logo} alt="logo" style={{ width: '40%' }} />
            </Box>}

            {!isMobile && <Divider sx={{ height: '70ch', m: 0.5, mt: '10ch', width: '10px' }} orientation="vertical" />}

            <Box width={isMobile ? '100%' : '45%'} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', ml: isMobile ? 0 : '5%' }}>
                <Typography variant="h4" fontWeight={'bold'} letterSpacing={5}>EVACOVATION</Typography>
                <p style={{ color: 'grey' }}>Welcome! Please login to your account.</p>

                <TextField
                    sx={{ width: isMobile ? '100%' : '50ch' }}
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ height: '2em' }}></div>
                <TextField
                    sx={{ width: isMobile ? '100%' : '50ch' }}
                    label="Password"
                    type="password"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <Typography color={red[500]}>{error}</Typography>}

                <Box display="flex" flexDirection="row" alignItems="center" sx={{ width: isMobile ? '100%' : '50ch', mt: 2 }}>
                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                    <Typography variant="body2" component="a" href="#forgot-password" style={{ marginLeft: 'auto' }}>
                        <Button sx={{ color: blueGrey[500], fontWeight: 'bold' }} onClick={handleForgotPassword} variant="text">Forgot password?</Button>
                    </Typography>
                </Box>

                <Button
                    onClick={handleLogin}
                    sx={{ width: isMobile ? '100%' : '65ch', padding: '16px', backgroundColor: blue[600], fontWeight: 'bold', mt: 3 }}
                    variant="contained"
                    fullWidth
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign In'}
                </Button>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default LoginComp;
```

# ------------------  firebase setup end -------------------



