// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//     ArrowLeft,
//     ExternalLink,
//     Github,
//     Globe,
//     Calendar,
//     Users,
//     Code2,
//     Smartphone,
//     Zap,
//     CheckCircle,
//     Star,
//     Play,
//     Download,
//     Share2
// } from 'lucide-react';

// const ItemDetails = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const item = location.state;
//     const [activeTab, setActiveTab] = useState('overview');
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             setMousePosition({
//                 x: (e.clientX / window.innerWidth) * 100,
//                 y: (e.clientY / window.innerHeight) * 100
//             });
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         return () => window.removeEventListener('mousemove', handleMouseMove);
//     }, []);

//     if (!item) {
//         return (
//             <div className="min-h-screen bg-black text-white flex items-center justify-center">
//                 <div className="text-center">
//                     <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                         No Project Data Available
//                     </h2>
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl font-bold hover:scale-105 transition-all"
//                     >
//                         Go Back
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Mock detailed project data (in real app, fetch from API)
//     const projectDetails = {
//         ...item,
//         client: 'Tech Innovations Inc.',
//         duration: '6 months',
//         team: '5 members',
//         role: 'Lead Developer',
//         completionDate: 'December 2024',
//         technologies: item.tags || [],
//         features: [
//             'User Authentication & Authorization',
//             'Real-time Data Synchronization',
//             'Advanced Analytics Dashboard',
//             'Push Notifications',
//             'Offline Mode Support',
//             'Multi-language Support',
//             'Payment Gateway Integration',
//             'Social Media Integration'
//         ],
//         challenges: [
//             'Implementing complex state management across multiple screens',
//             'Optimizing performance for low-end devices',
//             'Ensuring data security and compliance with regulations',
//             'Creating smooth animations while maintaining 60fps'
//         ],
//         results: [
//             '500K+ downloads in first 3 months',
//             '4.8★ rating on app stores',
//             '40% increase in user engagement',
//             '99.9% uptime achieved'
//         ],
//         gallery: [
//             item.image,
//             'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
//             'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
//             'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80'
//         ]
//     };

//     const tabs = [
//         { id: 'overview', label: 'Overview', icon: <Code2 className="w-4 h-4" /> },
//         { id: 'features', label: 'Features', icon: <Zap className="w-4 h-4" /> },
//         { id: 'gallery', label: 'Gallery', icon: <Smartphone className="w-4 h-4" /> }
//     ];

//     return (
//         <div className="min-h-screen bg-black text-white overflow-hidden relative">
//             {/* Animated Background */}
//             <div className="fixed inset-0 z-0">
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
//                 <div
//                     className="absolute inset-0 opacity-30"
//                     style={{
//                         background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`
//                     }}
//                 />
//                 <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
//             </div>

//             {/* Floating Particles */}
//             <div className="fixed inset-0 z-0 pointer-events-none">
//                 {[...Array(15)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="absolute w-2 h-2 bg-purple-500/20 rounded-full animate-float"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             animationDelay: `${Math.random() * 5}s`,
//                             animationDuration: `${5 + Math.random() * 10}s`
//                         }}
//                     />
//                 ))}
//             </div>

//             <div className="relative z-10">
//                 {/* Header */}
//                 <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5">
//                     <div className="container mx-auto px-4 py-6">
//                         <div className="flex items-center justify-between">
//                             <button
//                                 onClick={() => navigate(-1)}
//                                 className="group flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 hover:border-white/20"
//                             >
//                                 <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//                                 <span className="font-semibold">Back to Portfolio</span>
//                             </button>

//                             <div className="flex items-center space-x-3">
//                                 <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 hover:border-white/20">
//                                     <Share2 className="w-5 h-5" />
//                                 </button>
//                                 <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-all flex items-center space-x-2">
//                                     <ExternalLink className="w-5 h-5" />
//                                     <span>Live Demo</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Hero Section */}
//                 <section className="relative py-20">
//                     <div className="container mx-auto px-4">
//                         <div className="grid lg:grid-cols-2 gap-12 items-center">
//                             {/* Left Content */}
//                             <div className="space-y-8">
//                                 {item.live && (
//                                     <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
//                                         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                                         <span className="text-green-400 font-semibold text-sm">Live Project</span>
//                                     </div>
//                                 )}

//                                 <h1 className="text-5xl md:text-7xl font-black leading-tight">
//                                     <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
//                                         {projectDetails.title}
//                                     </span>
//                                 </h1>

//                                 <p className="text-xl text-gray-300 leading-relaxed">
//                                     {projectDetails.description}
//                                 </p>

//                                 {/* Quick Stats */}
//                                 <div className="grid grid-cols-2 gap-4">
//                                     {[
//                                         { icon: <Calendar className="w-5 h-5" />, label: 'Duration', value: projectDetails.duration },
//                                         { icon: <Users className="w-5 h-5" />, label: 'Team Size', value: projectDetails.team },
//                                         { icon: <Code2 className="w-5 h-5" />, label: 'Role', value: projectDetails.role },
//                                         { icon: <CheckCircle className="w-5 h-5" />, label: 'Completed', value: projectDetails.completionDate }
//                                     ].map((stat, idx) => (
//                                         <div key={idx} className="p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
//                                             <div className="flex items-center space-x-2 text-purple-400 mb-2">
//                                                 {stat.icon}
//                                                 <span className="text-xs text-gray-400">{stat.label}</span>
//                                             </div>
//                                             <p className="font-bold text-white">{stat.value}</p>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Action Buttons */}
//                                 <div className="flex flex-wrap gap-4">
//                                     <button className="group relative px-8 py-4 rounded-2xl font-bold overflow-hidden">
//                                         <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600" />
//                                         <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
//                                         <span className="relative flex items-center space-x-2 text-white">
//                                             <Play className="w-5 h-5" />
//                                             <span>Watch Demo</span>
//                                         </span>
//                                     </button>

//                                     <button className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold border border-white/10 hover:border-white/20 transition-all flex items-center space-x-2">
//                                         <Github className="w-5 h-5" />
//                                         <span>View Code</span>
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Right Image */}
//                             <div className="relative group">
//                                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500" />
//                                 <div className="relative rounded-3xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all duration-500">
//                                     <img
//                                         src={projectDetails.image}
//                                         alt={projectDetails.title}
//                                         className="w-full h-full object-cover"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Technologies */}
//                 <section className="py-12">
//                     <div className="container mx-auto px-4">
//                         <div className="p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10">
//                             <h3 className="text-2xl font-bold mb-6 text-white">Technologies Used</h3>
//                             <div className="flex flex-wrap gap-3">
//                                 {projectDetails.technologies.map((tech: string, idx: number) => (
//                                     <span
//                                         key={idx}
//                                         className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full border border-purple-500/30 font-semibold text-white hover:scale-110 transition-all cursor-pointer backdrop-blur-xl"
//                                     >
//                                         {tech}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Tabs Section */}
//                 <section className="py-12">
//                     <div className="container mx-auto px-4">
//                         {/* Tab Navigation */}
//                         <div className="flex justify-center space-x-4 mb-12">
//                             {tabs.map((tab) => (
//                                 <button
//                                     key={tab.id}
//                                     onClick={() => setActiveTab(tab.id)}
//                                     className={`group px-8 py-4 rounded-2xl font-bold transition-all flex items-center space-x-2 ${activeTab === tab.id
//                                             ? 'bg-gradient-to-r from-purple-600 to-cyan-600 shadow-2xl'
//                                             : 'bg-white/5 border border-white/10 hover:bg-white/10'
//                                         }`}
//                                 >
//                                     {tab.icon}
//                                     <span>{tab.label}</span>
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Tab Content */}
//                         <div className="space-y-12">
//                             {activeTab === 'overview' && (
//                                 <div className="grid md:grid-cols-2 gap-8">
//                                     {/* Key Features */}
//                                     <div className="space-y-6">
//                                         <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
//                                             Key Features
//                                         </h3>
//                                         {projectDetails.features.map((feature: string, idx: number) => (
//                                             <div key={idx} className="group flex items-start space-x-4 p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all">
//                                                 <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                                                     <CheckCircle className="w-5 h-5" />
//                                                 </div>
//                                                 <p className="text-gray-300 font-medium">{feature}</p>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* Results */}
//                                     <div className="space-y-6">
//                                         <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
//                                             Results & Impact
//                                         </h3>
//                                         {projectDetails.results.map((result: string, idx: number) => (
//                                             <div key={idx} className="group relative">
//                                                 <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
//                                                 <div className="relative flex items-start space-x-4 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-green-500/50 transition-all">
//                                                     <Star className="w-6 h-6 text-yellow-400 flex-shrink-0" />
//                                                     <p className="text-gray-300 font-medium text-lg">{result}</p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {activeTab === 'features' && (
//                                 <div className="space-y-8">
//                                     <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
//                                         Technical Challenges & Solutions
//                                     </h3>
//                                     {projectDetails.challenges.map((challenge: string, idx: number) => (
//                                         <div key={idx} className="group relative">
//                                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
//                                             <div className="relative p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/30 transition-all">
//                                                 <div className="flex items-start space-x-4">
//                                                     <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 text-xl font-bold">
//                                                         {idx + 1}
//                                                     </div>
//                                                     <div>
//                                                         <h4 className="text-xl font-bold text-white mb-2">Challenge {idx + 1}</h4>
//                                                         <p className="text-gray-300 leading-relaxed">{challenge}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             {activeTab === 'gallery' && (
//                                 <div className="grid md:grid-cols-2 gap-6">
//                                     {projectDetails.gallery.map((img: string, idx: number) => (
//                                         <div key={idx} className="group relative rounded-3xl overflow-hidden">
//                                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500" />
//                                             <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all duration-500">
//                                                 <img
//                                                     src={img}
//                                                     alt={`Gallery ${idx + 1}`}
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all" />
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </section>

//                 {/* CTA Section */}
//                 <section className="py-20">
//                     <div className="container mx-auto px-4">
//                         <div className="relative group">
//                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500" />
//                             <div className="relative p-12 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 text-center">
//                                 <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                                     Interested in Similar Projects?
//                                 </h3>
//                                 <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//                                     Let's collaborate and bring your ideas to life with cutting-edge technology
//                                 </p>
//                                 <div className="flex flex-wrap justify-center gap-4">
//                                     <button className="group relative px-8 py-4 rounded-2xl font-bold overflow-hidden">
//                                         <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600" />
//                                         <span className="relative text-white">Get In Touch</span>
//                                     </button>
//                                     <button className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold border border-white/10 hover:border-white/20 transition-all flex items-center space-x-2">
//                                         <Download className="w-5 h-5" />
//                                         <span>Download Case Study</span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
//           50% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default ItemDetails;