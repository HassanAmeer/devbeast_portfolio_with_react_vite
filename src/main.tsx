import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Portfolio from './home/home.tsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ItemDetails from './home/item_details.tsx'
import AllItems from './home/allitems.tsx'
import AdminLogin from './admin/login.tsx'
import AdminHomePage from './admin/home'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    {/* <div className="bg-red-500 text-white p-8 text-4xl">
      If this is RED with WHITE text, Tailwind is working! ✅
    </div> */}

    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/allitems" element={<AllItems />} />
        <Route path="/item" element={<ItemDetails />} />
        {/* admin routes */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHomePage />} />
        {/* Optional: Redirect /home → /admin/home */}
        {/* <Route path="/home" element={<Navigate to="/admin/home" replace />} /> */}
      </Routes>
    </Router>

    {/* <App /> */}
  </StrictMode>,
)
