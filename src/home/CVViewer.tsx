import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, mainCollection, siteSettingsCollectionId } from '../config/fbconfig';

const CVViewer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const docRef = doc(db, mainCollection, siteSettingsCollectionId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().cvUrl) {
                    window.location.href = docSnap.data().cvUrl;
                } else {
                    setError('CV not found');
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError('Error loading CV');
                setLoading(false);
            }
        };

        fetchCV();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black p-4 md:p-8 flex flex-col gap-6">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="h-8 w-32 bg-white/10 rounded-lg animate-pulse" />
                    <div className="flex gap-4">
                        <div className="h-8 w-24 bg-white/10 rounded-lg animate-pulse" />
                        <div className="h-8 w-8 bg-white/10 rounded-full animate-pulse" />
                    </div>
                </div>

                <div className="flex-1 flex gap-6">
                    {/* Sidebar Skeleton (hidden on mobile) */}
                    <div className="hidden md:block w-64 bg-white/5 rounded-xl border border-white/10 p-4 space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-4 bg-white/10 rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }} />
                        ))}
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-8 space-y-6">
                        <div className="h-12 w-3/4 bg-white/10 rounded-lg animate-pulse mb-8" />
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="h-4 bg-white/10 rounded animate-pulse" style={{ width: `${Math.random() * 30 + 70}%` }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">CV Not Available</h1>
                <p className="text-gray-400">{error || 'The requested document could not be found.'}</p>
                <a href="/" className="mt-6 inline-block px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition">Go Home</a>
            </div>
        </div>
    );
};

export default CVViewer;
