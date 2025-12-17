import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, mainCollection, siteSettingsCollectionId } from '../config/fbconfig';
import Portfolio from './home';
import HomeTemplate2 from './HomeTemplate2';
import { motion, AnimatePresence } from 'framer-motion';

// Template mapping
const templates: { [key: string]: React.ComponentType } = {
    'template1': Portfolio,
    'template2': HomeTemplate2,
};

// Template info for display
export const templateOptions = [
    {
        id: 'template1',
        name: 'Classic Dark',
        description: 'Modern dark theme with gradient backgrounds, animated particles, and dynamic hero section',
        preview: 'Original template with purple/cyan gradients'
    },
    {
        id: 'template2',
        name: 'Bento Premium',
        description: 'Ultra-modern bento grid layout with glassmorphism, interactive mouse effects, floating particles, and stunning animations',
        preview: 'Premium dark theme with glowing effects'
    }
];

const LandingWrapper = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('template1');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTemplateSettings = async () => {
            try {
                const docRef = doc(db, mainCollection, siteSettingsCollectionId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.landingTemplate && templates[data.landingTemplate]) {
                        setSelectedTemplate(data.landingTemplate);
                    }
                }
            } catch (error) {
                console.error('Error loading template settings:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTemplateSettings();
    }, []);

    const TemplateComponent = templates[selectedTemplate] || Portfolio;

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="skeleton"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-screen bg-[#030014] p-4 md:p-8 overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto space-y-8 relative">
                        {/* Background Glow */}
                        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />

                        {/* Nav Skeleton */}
                        <div className="flex justify-between items-center h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6">
                            <div className="w-32 h-8 bg-white/10 rounded-lg animate-pulse" />
                            <div className="hidden md:flex gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-20 h-4 bg-white/10 rounded-full animate-pulse" />
                                ))}
                            </div>
                        </div>

                        {/* Hero Section Skeleton (Bento Layout) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 min-h-[600px]">
                            {/* Profile Card Skeleton */}
                            <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 animate-pulse" />
                                <div className="w-40 h-40 rounded-full bg-white/10 animate-pulse" />
                                <div className="w-3/4 h-8 bg-white/10 rounded-xl animate-pulse" />
                                <div className="w-1/2 h-4 bg-white/10 rounded-lg animate-pulse" />
                                <div className="flex gap-4 mt-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
                                    ))}
                                </div>
                            </div>

                            {/* Main Content Skeleton */}
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title Block */}
                                <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 flex flex-col justify-center gap-6 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse" />
                                    <div className="w-32 h-8 bg-white/10 rounded-full animate-pulse" />
                                    <div className="w-3/4 h-16 bg-white/10 rounded-2xl animate-pulse" />
                                    <div className="w-1/2 h-16 bg-white/10 rounded-2xl animate-pulse" />
                                    <div className="flex gap-4 mt-4">
                                        <div className="w-32 h-12 rounded-xl bg-white/10 animate-pulse" />
                                        <div className="w-32 h-12 rounded-xl bg-white/10 animate-pulse" />
                                    </div>
                                </div>

                                {/* Stats Blocks */}
                                {[1, 2].map(i => (
                                    <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center gap-4 relative overflow-hidden">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 animate-pulse" />
                                        <div className="w-1/2 h-8 bg-white/10 rounded-lg animate-pulse" />
                                        <div className="w-3/4 h-4 bg-white/10 rounded-lg animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <TemplateComponent />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default LandingWrapper;
