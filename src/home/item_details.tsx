import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Users,
    MessageCircle
} from 'lucide-react';

const ItemDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state;
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!item) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        No Project Data Available
                    </h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl font-bold hover:scale-105 transition-all"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Demo images gallery
    const demoImages = [
        item.image,
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
    ];

    const teamSize = '5 members';
    const githubUrl = 'https://github.com/yourusername/project';
    const liveUrl = 'https://yourproject.com';
    const whatsappNumber = '+923012345678';

    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`, '_blank');
    };

    const opacity = Math.min(scrollY / 300, 1);
    const imageScale = 1 - (scrollY / 2000);

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Fixed Full-Height Hero Image */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    transform: `scale(${imageScale})`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
                {/* Lighter gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
            </div>

            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center space-x-2 px-6 py-3 bg-black/60 hover:bg-black/80 backdrop-blur-xl rounded-2xl transition-all border border-white/20 hover:border-white/40"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Back</span>
                </button>
            </div>

            {/* Floating WhatsApp Button */}
            <button
                onClick={handleWhatsAppClick}
                className="fixed bottom-8 right-8 z-50 group"
            >
                <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-all" />
                <div className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
                    <MessageCircle className="w-8 h-8 text-white" />
                </div>
            </button>

            {/* Content that scrolls over the image */}
            <div className="relative z-10">
                {/* Spacer to show hero image */}
                <div className="h-screen" />

                {/* Main Content Card */}
                <div
                    className="bg-black rounded-t-[3rem] shadow-2xl"
                    style={{
                        boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.8)'
                    }}
                >
                    <div className="container mx-auto px-6 py-12 max-w-5xl">
                        {/* Title Section */}
                        <div className="mb-12">
                            {item.live && (
                                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-6">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-green-400 font-semibold text-sm">Live Project</span>
                                </div>
                            )}

                            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                    {item.title}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        {/* Technologies Tags */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold mb-6 text-white">Technologies</h3>
                            <div className="flex flex-wrap gap-3">
                                {item.tags.map((tag: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full border border-purple-500/50 font-semibold text-white hover:scale-105 hover:border-purple-400 transition-all cursor-pointer backdrop-blur-xl"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Team & Links Section */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {/* Team Size */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/30 transition-all">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Users className="w-6 h-6 text-cyan-400" />
                                        <span className="text-gray-400 text-sm">Team Size</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">{teamSize}</p>
                                </div>
                            </div>

                            {/* GitHub Link */}
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/30 transition-all h-full flex flex-col justify-between">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Github className="w-6 h-6 text-gray-300" />
                                        <span className="text-gray-400 text-sm">Source Code</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-lg font-bold text-white">View on GitHub</p>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </div>
                            </a>

                            {/* Live Demo Link */}
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="relative p-6 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-xl rounded-2xl border border-purple-500/50 hover:border-purple-400 transition-all h-full flex flex-col justify-between">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <ExternalLink className="w-6 h-6 text-purple-300" />
                                        <span className="text-purple-200 text-sm">Live Demo</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-lg font-bold text-white">Visit Website</p>
                                        <ExternalLink className="w-4 h-4 text-purple-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Demo Images Gallery */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold mb-6 text-white">Project Gallery</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {demoImages.map((img: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="group relative rounded-2xl overflow-hidden aspect-video cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                                        <img
                                            src={img}
                                            alt={`Demo ${idx + 1}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all z-10" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="relative group mt-16">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
                            <div className="relative p-8 md:p-12 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-xl rounded-3xl border border-purple-500/30 text-center">
                                <h3 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    Interested in This Project?
                                </h3>
                                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Let's discuss how we can create something amazing together
                                </p>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl hover:shadow-green-500/50"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    <span>Contact on WhatsApp</span>
                                </button>
                            </div>
                        </div>

                        {/* Bottom Spacing */}
                        <div className="h-20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;