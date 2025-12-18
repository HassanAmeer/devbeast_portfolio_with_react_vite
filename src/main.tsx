import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import LandingWrapper from './home/LandingWrapper.tsx'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ItemDetails from './home/item_details.tsx'
import AllItems from './home/allitems.tsx'
import AdminLogin from './admin/login.tsx'
import AdminHomePage from './admin/home'
import ImportData from './import_data.tsx'
import CVViewer from './home/CVViewer.tsx'

import { ThemeProvider } from './context/ThemeContext.tsx'

import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop.tsx'
import PageLayout from './components/PageLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <RoutesWithTransitions />
      </Router>
    </ThemeProvider>
  </StrictMode>,
)

function RoutesWithTransitions() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageLayout><LandingWrapper /></PageLayout>} />
        <Route path="/apps" element={<PageLayout><LandingWrapper /></PageLayout>} />
        <Route path="/web" element={<PageLayout><LandingWrapper /></PageLayout>} />
        <Route path="/allitems" element={<PageLayout><AllItems /></PageLayout>} />
        <Route path="/item" element={<PageLayout><ItemDetails /></PageLayout>} />
        <Route path="/login" element={<PageLayout><AdminLogin /></PageLayout>} />
        <Route path="/adm" element={<PageLayout><AdminHomePage /></PageLayout>} />
        <Route path="/importdata" element={<PageLayout><ImportData /></PageLayout>} />
        <Route path="/cv" element={<PageLayout><CVViewer /></PageLayout>} />
      </Routes>
    </AnimatePresence>
  );
}
