import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Portfolio from './home/home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    {/* <div className="bg-red-500 text-white p-8 text-4xl">
      If this is RED with WHITE text, Tailwind is working! ✅
    </div> */}

    <Portfolio />
    {/* <App /> */}
  </StrictMode>,
)
