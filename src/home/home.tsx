import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, Code2, Smartphone, Globe, Star, Award, Users, CheckCircle, Menu, X, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import person1 from '../assets/person1.png';
import ContactSection from './contact';
import BringSection from './bring';

const Portfolio = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('all');
    // const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [scrolled] = useState(false);
    const [mousePosition] = useState({ x: 0, y: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // const handleScroll = () => setScrolled(window.scrollY > 50);
        // const handleMouseMove = (e) => {
        //     setMousePosition({
        //         x: (e.clientX / window.innerWidth) * 100,
        //         y: (e.clientY / window.innerHeight) * 100
        //     });
        // };

        // window.addEventListener('scroll', handleScroll);
        // window.addEventListener('mousemove', handleMouseMove);

        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        //     window.removeEventListener('mousemove', handleMouseMove);
        // };
    }, []);

    const platforms = [
        {
            name: 'Flutter',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
            color: 'from-blue-400 to-cyan-400',
            shadow: 'shadow-blue-500/50'
        },
        {
            name: 'Laravel',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
            color: 'from-red-400 to-orange-400',
            shadow: 'shadow-red-500/50'
        },
        {
            name: 'PHP',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
            color: 'from-purple-400 to-indigo-400',
            shadow: 'shadow-purple-500/50'
        },
        {
            name: 'React',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            color: 'from-cyan-400 to-blue-400',
            shadow: 'shadow-cyan-500/50'
        },
        {
            name: 'MySQL',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            color: 'from-blue-500 to-cyan-500',
            shadow: 'shadow-blue-500/50'
        },
        {
            name: 'Firebase',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
            color: 'from-yellow-400 to-orange-400',
            shadow: 'shadow-yellow-500/50'
        },
        {
            name: 'TensorFlow',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
            color: 'from-orange-400 to-red-400',
            shadow: 'shadow-orange-500/50'
        },
        {
            name: 'GitHub',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
            color: 'from-gray-400 to-gray-600',
            shadow: 'shadow-gray-500/50'
        },
        {
            name: 'Docker',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
            color: 'from-blue-400 to-cyan-500',
            shadow: 'shadow-blue-500/50'
        },
        {
            name: 'Dart',
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
            color: 'from-cyan-400 to-blue-500',
            shadow: 'shadow-cyan-500/50'
        },
        {
            name: 'Play Store',
            logo: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
            color: 'from-cyan-400 to-blue-500',
            shadow: 'shadow-cyan-500/50'
        },
        {
            name: 'Apple Store',
            logo: 'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1262304000',
            color: 'from-cyan-400 to-blue-500',
            shadow: 'shadow-cyan-500/50'
        }
    ];

    const stats = [
        { icon: <Award className="w-8 h-8" />, number: '4+', label: 'Years Experience', color: 'from-purple-500 to-pink-500' },
        { icon: <CheckCircle className="w-8 h-8" />, number: '150+', label: 'Projects Completed', color: 'from-blue-500 to-cyan-500' },
        { icon: <Users className="w-8 h-8" />, number: '90%', label: 'Happy Clients', color: 'from-green-500 to-emerald-500' },
        { icon: <Star className="w-8 h-8" />, number: '4.9', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' }
    ];

    const projects = [
        {
            id: 1,
            title: 'FinTech Mobile Banking',
            description: 'Advanced banking platform with AI-powered fraud detection, biometric authentication, and real-time cryptocurrency trading.',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
            tags: ['Flutter', 'Dart', 'Firebase', 'TensorFlow'],
            category: 'app',
            gradient: 'from-purple-600 via-pink-500 to-red-500',
            live: true
        },
        {
            id: 2,
            title: 'AI Healthcare Platform',
            description: 'Revolutionary telemedicine app with AI diagnosis, ML-powered health predictions, and secure patient data management.',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
            tags: ['Flutter', 'Laravel', 'MySQL', 'AI'],
            category: 'app',
            gradient: 'from-blue-600 via-cyan-500 to-teal-500',
            live: true
        },
        {
            id: 3,
            title: 'Real Estate Metaverse',
            description: 'Immersive 3D property marketplace with AR/VR tours, blockchain NFT deeds, and smart contract integration.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
            tags: ['React', 'Laravel', 'Three.js', 'Web3'],
            category: 'web',
            gradient: 'from-green-600 via-emerald-500 to-teal-500',
            live: true
        },
        {
            id: 4,
            title: 'Smart Fitness AI',
            description: 'AI-powered fitness companion with computer vision pose detection, personalized workout plans, and nutrition tracking.',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
            tags: ['Flutter', 'TensorFlow', 'Firebase', 'ML'],
            category: 'app',
            gradient: 'from-orange-600 via-red-500 to-pink-500',
            live: true
        },
        {
            id: 5,
            title: 'Cloud Restaurant OS',
            description: 'Complete restaurant ecosystem with AI demand forecasting, IoT kitchen management, and contactless dining.',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
            tags: ['React', 'Laravel', 'IoT', 'Firebase'],
            category: 'web',
            gradient: 'from-yellow-600 via-orange-500 to-red-500',
            live: true
        },
        {
            id: 6,
            title: 'Social Connect 3D',
            description: 'Next-gen social platform with 3D avatars, spatial audio, AR filters, and blockchain-based content monetization.',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
            tags: ['Flutter', 'WebRTC', 'Firebase', '3D'],
            category: 'app',
            gradient: 'from-pink-600 via-purple-500 to-indigo-500',
            live: true
        },
        {
            id: 7,
            title: 'Enterprise CRM AI',
            description: 'Intelligent CRM with predictive analytics, automated workflows, natural language processing, and voice commands.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
            tags: ['React', 'Laravel', 'AI', 'ML'],
            category: 'web',
            gradient: 'from-indigo-600 via-blue-500 to-cyan-500',
            live: true
        },
        {
            id: 8,
            title: 'EduTech Universe',
            description: 'Immersive learning platform with VR classrooms, AI tutoring, gamification, and blockchain certificates.',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
            tags: ['Flutter', 'WebXR', 'Firebase', 'Blockchain'],
            category: 'app',
            gradient: 'from-teal-600 via-green-500 to-emerald-500',
            live: true
        }
    ];


    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'CEO, TechStart Inc',
            text: 'Exceptional work! The app exceeded all expectations. Professional, fast, and delivered a product that our users absolutely love.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
        },
        {
            name: 'Michael Chen',
            role: 'CTO, FinanceHub',
            text: 'Best developer we have worked with. Clean code, great architecture, and outstanding communication throughout the project.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
        },
        {
            name: 'Emma Davis',
            role: 'Product Lead, Innovate',
            text: 'Transformed our vision into reality. The attention to detail and user experience is phenomenal. Highly recommend!',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
        }
    ];

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(p => p.category === activeTab);

    // const handleSubmit = () => {
    //     if (formData.name && formData.email && formData.message) {
    //         alert('✨ Thank you! Your message has been sent successfully.');
    //         setFormData({ name: '', email: '', message: '' });
    //     } else {
    //         alert('⚠️ Please fill in all fields.');
    //     }
    // };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Animated Gradient Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`
                    }}
                />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-500/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                {/* Modern Header */}
                <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3 group cursor-pointer">
                                <div className="relative animate-pulse">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all" />
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl font-black shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        <Code2 className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                        Dev Beast
                                    </h1>
                                    <p className="text-xs text-gray-400 font-medium">Senior Full-Stack Developer</p>
                                </div>
                            </div>

                            <nav className="hidden md:flex items-center space-x-1">
                                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="relative group px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-all"
                                    >
                                        <span className="relative z-10">{item}</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-cyan-600/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
                                    </a>
                                ))}
                            </nav>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/5">
                            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-2">
                                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-3 rounded-xl hover:bg-white/5 transition-all font-medium"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    )}
                </header>

                {/* Hero Section with Workspace Background */}
                <section id="home" className="relative flex items-center justify-center pt-20">
                    {/* Workspace Background Image */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80"
                            alt="Workspace"
                            className="w-full h-full object-cover opacity-20"
                        />
                    </div>

                    <div className="container mx-auto px-0 relative z-20 flex">
                        <div className="text-center max-w-5xl mx-auto pt-20">

                            <h2 className="text-6xl md:text-6xl font-black mb-4 leading-tight">
                                <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                    Akash Ameer
                                </span>
                                <br />
                                <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                    Senior Developer
                                </span>
                            </h2>

                            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
                                Senior Full-Stack Developer specializing in{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">Flutter</span>,{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-semibold">Laravel</span>, and{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">React</span>
                                {' '}— transforming ideas into stunning reality
                            </p>



                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="group relative">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-10 group-hover:opacity-60 transition-all duration-500`} />
                                        <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all transform hover:scale-120 hover:-translate-y-1 duration-300">
                                            <div className={`flex justify-center mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                                {stat.icon}
                                            </div>
                                            <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                                                {stat.number}
                                            </div>
                                            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 pt-8">
                                <button className="group relative px-8 py-4 rounded-2xl font-bold overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 transition-all duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    <span className="relative flex items-center space-x-2 text-white">
                                        <span>Explore Portfolio</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <button className="group relative px-8 py-4 rounded-2xl font-bold border-2 border-purple-500/30 hover:border-purple-500 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all">
                                    <span className="flex items-center space-x-2">
                                        <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                        <span>Download CV</span>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <img
                            src={person1}
                            alt="Workspace"
                            className="w-1/3 bject-cover opacity-80"
                        />



                    </div>

                </section>
                {/* Modern Platforms Marquee with Logos */}
                <section className="py-8 relative inline-flex ">
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-950/20 to-black" /> */}
                    <div className="mb-2 inline-flex items-center space-x-2 px-6 py-3  rounded-half backdrop-blur-xl">
                        <ArrowRight className="w-5 h-5 text-purple-400 animate-pulse" />
                        <span className="text-sm font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                            Services
                        </span>
                    </div>
                    <div className="relative overflow-hidden">
                        <div className="animate-marquee-slow whitespace-nowrap items-center space-x-2 overflow-x-scroll">
                            {[...platforms, ...platforms, ...platforms].map((platform, idx) => (
                                <div key={idx} className="inline-flex mx-4">
                                    <div className="group relative">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500`} />
                                        <div className="relative flex items-center space-x-4 px-8 py-6 bg-black/40 backdrop-blur-xl rounded-2xl transition-all hover:scale-110 transform duration-300">
                                            <img
                                                src={platform.logo}
                                                alt={platform.name}
                                                className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-all"
                                            />
                                            <span className="text-lg font-bold text-white">{platform.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>
                <hr style={{ border: 0, height: 1 }} className="bg-gray-700" />
                <BringSection />
                <hr style={{ border: 0, height: 1 }} className="bg-gray-700 mt-20" />

                {/* Projects with Real Images */}
                <section id="projects" className="py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
                    <div className="container mx-auto px-2 relative z-10">
                        <div className="text-center mb-12">
                            {/* <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full text-sm font-bold text-purple-300 border border-purple-500/30 mb-6">
                                PORTFOLIO
                            </div> */}
                            <h3 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                Featured Projects
                            </h3>
                            {/* <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                                Innovative solutions that push boundaries
                            </p> */}
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {[
                                { id: 'all', label: 'All Projects', icon: <Globe className="w-5 h-5" /> },
                                { id: 'app', label: 'Mobile Apps', icon: <Smartphone className="w-5 h-5" /> },
                                { id: 'web', label: 'Web Apps', icon: <Code2 className="w-5 h-5" /> }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`group relative px-4 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center space-x-2 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 shadow-2xl shadow-purple-500/50'
                                        : 'bg-black/40 border border-white/10 hover:border-white/30 backdrop-blur-xl'
                                        }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                            <button
                                onClick={() => navigate('/allitems')} // passing full data
                                className="flex items-center space-x-2 text-purple-400 hover:text-cyan-400 transition-all group/btn">
                                <span className="text-sm font-bold">View All</span>
                                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProjects.map((project, idx) => (
                                <div
                                    onClick={() => navigate('/item', { state: project })} // passing full data
                                    key={project.id}
                                    className="group relative rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl`} />

                                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all rounded-3xl overflow-hidden">
                                        {project.live && (
                                            <div className="absolute top-4 right-4 z-20">
                                                <div className="flex items-center space-x-2 px-2 py-1 bg-purple-500/90 opacity-70 backdrop-blur-xl rounded-full text-xs font-bold shadow-lg">
                                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                    <span>Open</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="relative h-50 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                            />
                                        </div>

                                        <div className="p-2">
                                            <h4 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                                                {project.title}
                                            </h4>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {project.tags.map((tag, tagIdx) => (
                                                    <span
                                                        key={tagIdx}
                                                        className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* <button
                                                onClick={() => navigate('/item', { state: project })} // passing full data
                                                className="flex items-center space-x-2 text-purple-400 hover:text-cyan-400 transition-all group/btn">
                                                <span className="text-sm font-bold">View Details</span>
                                                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <hr style={{ border: 0, height: 1 }} className="bg-gray-700" />

                {/* Testimonials */}
                <section className="py-24 container mx-auto px-4">
                    <div className="text-center mb-16">
                        {/* <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full text-sm font-bold text-purple-300 border border-purple-500/30 mb-6">
                            TESTIMONIALS
                        </div> */}
                        <h3 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            Client Success Stories
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="relative p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 hover:-translate-y-2 duration-500">
                                    <div className="flex mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 mb-6 italic leading-relaxed text-sm">
                                        "{testimonial.text}"
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/50"
                                        />
                                        <div>
                                            <div className="font-bold text-white">{testimonial.name}</div>
                                            <div className="text-sm text-gray-400">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <ContactSection></ContactSection>


                {/* Modern Footer */}
                <footer className="border-t border-white/5 bg-black/60 backdrop-blur-xl py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 mb-12">
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-lg opacity-50" />
                                        <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                            <Code2 className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                        DevBeast
                                    </span>
                                </div>
                                <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                                    Senior Full-Stack Developer crafting exceptional digital experiences with cutting-edge technologies. Let's build something amazing together.
                                </p>
                                <div className="flex space-x-4">
                                    {[
                                        { icon: <Github className="w-5 h-5" />, href: '#' },
                                        { icon: <Linkedin className="w-5 h-5" />, href: '#' },
                                        { icon: <Twitter className="w-5 h-5" />, href: '#' },
                                        { icon: <Mail className="w-5 h-5" />, href: '#' }
                                    ].map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 border border-white/10 hover:border-white/20"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h5 className="font-bold mb-4 text-lg text-white">Quick Links</h5>
                                <ul className="space-y-2">
                                    {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                        <li key={item}>
                                            <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-purple-400 transition-all">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h5 className="font-bold mb-4 text-lg text-white">Services</h5>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Mobile App Development</li>
                                    <li>Web Development</li>
                                    <li>UI/UX Design</li>
                                    <li>Backend Development</li>
                                    <li>Consulting</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-8">
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                <p className="text-gray-400 text-sm">
                                    © 2026 DevBeast. All rights reserved.
                                </p>
                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                    <a href="#" className="hover:text-purple-400 transition-all">Privacy Policy</a>
                                    <a href="#" className="hover:text-purple-400 transition-all">Terms of Service</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 60s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
        </div>
    );
};

export default Portfolio;