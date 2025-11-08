import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink, Code, Smartphone, Globe, Database, Brain, Cloud, Star, Award, Users, Zap, Download, Send, ArrowRight, CheckCircle } from 'lucide-react';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [scrolled, setScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        // const handleMouseMove = (e) => {
        //   setMousePosition({ x: e.clientX, y: e.clientY });
        // };

        // window.addEventListener('scroll', handleScroll);
        // window.addEventListener('mousemove', handleMouseMove);

        // return () => {
        //   window.removeEventListener('scroll', handleScroll);
        //   window.removeEventListener('mousemove', handleMouseMove);
        // };
    }, []);

    const platforms = [
        { name: 'Flutter', icon: '📱', color: 'from-blue-500 to-cyan-400', desc: 'Cross-platform' },
        { name: 'Laravel', icon: '🔶', color: 'from-red-500 to-orange-400', desc: 'Backend' },
        { name: 'PHP', icon: '🐘', color: 'from-purple-500 to-indigo-400', desc: 'Server-side' },
        { name: 'React JS', icon: '⚛️', color: 'from-cyan-500 to-blue-400', desc: 'Frontend' },
        { name: 'MySQL', icon: '🗄️', color: 'from-blue-600 to-cyan-500', desc: 'Database' },
        { name: 'Firebase', icon: '🔥', color: 'from-yellow-500 to-orange-500', desc: 'Cloud' },
        { name: 'TensorFlow Lite', icon: '🧠', color: 'from-orange-500 to-red-400', desc: 'AI/ML' },
        { name: 'App Store', icon: '🍎', color: 'from-gray-700 to-gray-500', desc: 'iOS' },
        { name: 'Play Store', icon: '▶️', color: 'from-green-500 to-teal-400', desc: 'Android' },
        { name: 'GitHub', icon: '💻', color: 'from-gray-800 to-gray-600', desc: 'Version Control' }
    ];

    const stats = [
        { icon: <Award className="w-8 h-8" />, number: '8+', label: 'Years Experience' },
        { icon: <CheckCircle className="w-8 h-8" />, number: '150+', label: 'Projects Completed' },
        { icon: <Users className="w-8 h-8" />, number: '80+', label: 'Happy Clients' },
        { icon: <Star className="w-8 h-8" />, number: '4.9', label: 'Average Rating' }
    ];

    const projects = [
        {
            id: 1,
            title: 'FinTech Mobile Banking',
            description: 'Secure banking app with biometric auth, instant transfers, investment tracking, and real-time market updates.',
            image: '💳',
            tags: ['Flutter', 'Dart', 'Firebase', 'TensorFlow Lite'],
            category: 'app',
            gradient: 'from-purple-600 via-pink-500 to-red-500',
            live: true
        },
        {
            id: 2,
            title: 'AI Healthcare Platform',
            description: 'Telemedicine app with AI diagnosis, appointment booking, prescription management, and health monitoring.',
            image: '🏥',
            tags: ['Flutter', 'Laravel', 'MySQL', 'TensorFlow Lite'],
            category: 'app',
            gradient: 'from-blue-600 via-cyan-500 to-teal-500',
            live: true
        },
        {
            id: 3,
            title: 'Real Estate Marketplace',
            description: 'Modern property portal with AR tours, AI price prediction, mortgage calculator, and agent dashboard.',
            image: '🏠',
            tags: ['React JS', 'Laravel', 'MySQL', 'PHP'],
            category: 'web',
            gradient: 'from-green-600 via-emerald-500 to-teal-500',
            live: true
        },
        {
            id: 4,
            title: 'Smart Fitness Companion',
            description: 'AI-powered fitness app with personalized workouts, nutrition plans, progress tracking, and AR coach.',
            image: '💪',
            tags: ['Flutter', 'Dart', 'TensorFlow Lite', 'Firebase'],
            category: 'app',
            gradient: 'from-orange-600 via-red-500 to-pink-500',
            live: true
        },
        {
            id: 5,
            title: 'Cloud Restaurant POS',
            description: 'Complete restaurant management with orders, inventory, analytics, staff management, and delivery tracking.',
            image: '🍽️',
            tags: ['React JS', 'Laravel', 'MySQL', 'Firebase'],
            category: 'web',
            gradient: 'from-yellow-600 via-orange-500 to-red-500',
            live: false
        },
        {
            id: 6,
            title: 'Social Connect Pro',
            description: 'Next-gen social platform with live streaming, AR filters, stories, communities, and marketplace.',
            image: '📱',
            tags: ['Flutter', 'Dart', 'Firebase', 'TensorFlow Lite'],
            category: 'app',
            gradient: 'from-pink-600 via-purple-500 to-indigo-500',
            live: true
        },
        {
            id: 7,
            title: 'Enterprise CRM Suite',
            description: 'Powerful CRM with sales automation, customer analytics, email campaigns, and API integrations.',
            image: '💼',
            tags: ['React JS', 'Laravel', 'MySQL', 'PHP'],
            category: 'web',
            gradient: 'from-indigo-600 via-blue-500 to-cyan-500',
            live: true
        },
        {
            id: 8,
            title: 'EduTech Learning Hub',
            description: 'Interactive e-learning with live classes, AI tutoring, gamification, certificates, and progress analytics.',
            image: '📚',
            tags: ['Flutter', 'Dart', 'Firebase', 'Laravel'],
            category: 'app',
            gradient: 'from-teal-600 via-green-500 to-emerald-500',
            live: true
        }
    ];

    const features = [
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: 'Cross-Platform Excellence',
            desc: 'Beautiful native apps for iOS & Android from a single codebase with native performance',
            color: 'from-blue-500 to-cyan-400'
        },
        {
            icon: <Code className="w-8 h-8" />,
            title: 'Clean Architecture',
            desc: 'Scalable, maintainable code following SOLID principles and industry best practices',
            color: 'from-purple-500 to-pink-400'
        },
        {
            icon: <Database className="w-8 h-8" />,
            title: 'Backend Integration',
            desc: 'Seamless API integration with Laravel, PHP, Firebase and RESTful services',
            color: 'from-green-500 to-teal-400'
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: 'AI/ML Integration',
            desc: 'Intelligent features using TensorFlow Lite for predictions and recommendations',
            color: 'from-orange-500 to-red-400'
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: 'Modern Web Apps',
            desc: 'Responsive, fast React applications with cutting-edge UI/UX design',
            color: 'from-cyan-500 to-blue-400'
        },
        {
            icon: <Cloud className="w-8 h-8" />,
            title: 'Cloud Solutions',
            desc: 'Firebase, AWS integration with real-time databases and authentication',
            color: 'from-indigo-500 to-purple-400'
        }
    ];

    const testimonials = [
        { name: 'Sarah Johnson', role: 'CEO, TechStart', text: 'Outstanding developer! Delivered our app ahead of schedule with exceptional quality.', rating: 5 },
        { name: 'Michael Chen', role: 'CTO, FinanceHub', text: 'Best Flutter developer I have worked with. Clean code and great communication.', rating: 5 },
        { name: 'Emma Davis', role: 'Product Manager', text: 'Transformed our ideas into a beautiful, functional app. Highly recommended!', rating: 5 }
    ];

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(p => p.category === activeTab);

    const handleSubmit = () => {
        if (formData.name && formData.email && formData.message) {
            alert('Thank you! Your message has been sent successfully.');
            setFormData({ name: '', email: '', message: '' });
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
                    style={{
                        left: `${mousePosition.x / 20}px`,
                        top: `${mousePosition.y / 20}px`,
                        transition: 'all 0.3s ease-out'
                    }}
                />
                <div
                    className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
                    style={{
                        right: `${mousePosition.x / 30}px`,
                        bottom: `${mousePosition.y / 30}px`,
                        transition: 'all 0.3s ease-out'
                    }}
                />
            </div>

            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-purple-500/30 shadow-lg shadow-purple-500/10' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-all transform group-hover:scale-110">
                                    FD
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                    Flutter Dev Pro
                                </h1>
                                <p className="text-xs text-gray-400">Senior Full-Stack Developer</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="relative group text-sm font-medium"
                                >
                                    <span className="hover:text-purple-400 transition">{item}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            <section id="home" className="relative container mx-auto px-4 pt-32 pb-20">
                <div className="text-center max-w-5xl mx-auto">
                    <div className="mb-8 inline-block relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                        <div className="relative w-40 h-40 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full flex items-center justify-center text-7xl shadow-2xl shadow-purple-500/50 transform hover:scale-110 transition-all duration-500 cursor-pointer">
                            👨‍💻
                        </div>
                    </div>

                    <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-full border border-purple-500/30">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                            Available for Freelance Projects
                        </span>
                    </div>

                    <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Senior Flutter
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Developer
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Crafting <span className="text-purple-400 font-semibold">beautiful</span>,
                        <span className="text-pink-400 font-semibold"> high-performance</span> mobile and web applications with
                        <span className="text-cyan-400 font-semibold"> 8+ years</span> of expertise
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center space-x-2">
                            <span>View My Work</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="group px-8 py-4 border-2 border-purple-500 rounded-xl font-semibold hover:bg-purple-500/20 transition-all backdrop-blur-sm flex items-center space-x-2">
                            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            <span>Download CV</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="group p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 hover:border-purple-400 transition-all hover:scale-105 backdrop-blur-sm">
                                <div className="flex justify-center mb-3 text-purple-400 group-hover:text-pink-400 transition-colors group-hover:scale-110 transform">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-black/40 border-y border-purple-500/30 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5" />
                <div className="animate-marquee whitespace-nowrap">
                    <div className="inline-flex space-x-6">
                        {[...platforms, ...platforms, ...platforms].map((platform, idx) => (
                            <div key={idx} className="inline-flex flex-col items-center space-y-2 px-8 py-4 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
                                <span className="text-4xl">{platform.icon}</span>
                                <span className="text-lg font-bold">{platform.name}</span>
                                <span className="text-xs text-gray-400">{platform.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="skills" className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <span className="px-4 py-2 bg-purple-900/50 rounded-full text-sm font-semibold text-purple-300 border border-purple-500/30">
                        TECH STACK
                    </span>
                    <h3 className="text-5xl font-black mt-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Technologies and Platforms
                    </h3>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Mastering the latest technologies to build exceptional digital experiences
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {platforms.map((platform, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-8 text-center hover:scale-110 transition-all transform cursor-pointer backdrop-blur-sm hover:border-purple-400">
                            <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                            <div className="relative">
                                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{platform.icon}</div>
                                <h4 className="font-bold text-base mb-1">{platform.name}</h4>
                                <p className="text-xs text-gray-400">{platform.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="about" className="py-24 bg-black/40 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="px-4 py-2 bg-purple-900/50 rounded-full text-sm font-semibold text-purple-300 border border-purple-500/30">
                            SERVICES
                        </span>
                        <h3 className="text-5xl font-black mt-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            What I Bring to the Table
                        </h3>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Full-stack expertise delivering end-to-end solutions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="group p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-400 transition-all hover:scale-105 backdrop-blur-sm relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                <div className="relative">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all group-hover:scale-110 transform`}>
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{feature.title}</h4>
                                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="projects" className="container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <span className="px-4 py-2 bg-purple-900/50 rounded-full text-sm font-semibold text-purple-300 border border-purple-500/30">
                        PORTFOLIO
                    </span>
                    <h3 className="text-5xl font-black mt-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Featured Projects
                    </h3>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                        Showcase of innovative solutions across mobile and web platforms
                    </p>
                </div>

                <div className="flex justify-center space-x-4 mb-16">
                    {[
                        { id: 'all', label: 'All Projects', icon: '🎯' },
                        { id: 'app', label: 'Mobile Apps', icon: '📱' },
                        { id: 'web', label: 'Web Apps', icon: '🌐' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`group px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                                : 'bg-purple-900/20 border border-purple-500/30 hover:bg-purple-900/40 backdrop-blur-sm'
                                }`}
                        >
                            <span className="text-xl">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-400 transition-all hover:scale-105 transform backdrop-blur-sm relative">
                            <div className="absolute top-4 right-4 z-10">
                                {project.live && (
                                    <div className="flex items-center space-x-1 px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-xs font-semibold">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        <span>Live</span>
                                    </div>
                                )}
                            </div>

                            <div className={`h-56 bg-gradient-to-r ${project.gradient} flex items-center justify-center text-8xl relative overflow-hidden group-hover:scale-110 transition-transform`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                <span className="relative z-10">{project.image}</span>
                            </div>

                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{project.title}</h4>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-purple-600/30 rounded-full text-xs font-medium border border-purple-500/50 hover:bg-purple-600/50 transition-colors cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                                    <span className="text-sm font-semibold">View Case Study</span>
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24 bg-black/40 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="px-4 py-2 bg-purple-900/50 rounded-full text-sm font-semibold text-purple-300 border border-purple-500/30">
                            TESTIMONIALS
                        </span>
                        <h3 className="text-5xl font-black mt-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Client Success Stories
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 italic leading-relaxed">{testimonial.text}</p>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <span className="px-4 py-2 bg-purple-900/50 rounded-full text-sm font-semibold text-purple-300 border border-purple-500/30">
                        GET IN TOUCH
                    </span>
                    <h3 className="text-5xl font-black mt-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Let's Work Together
                    </h3>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have a project in mind? Let's create something amazing together
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="space-y-6">
                        <h4 className="text-2xl font-bold mb-6">Get In Touch</h4>

                        <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-400 transition-all">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Email</p>
                                <p className="font-semibold">contact@flutterdevpro.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-400 transition-all">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Phone</p>
                                <p className="font-semibold">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-400 transition-all">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Location</p>
                                <p className="font-semibold">San Francisco, CA</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <h5 className="text-lg font-bold mb-4">Connect With Me</h5>
                            <div className="flex space-x-4">
                                <a href="#" className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-purple-500/50">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-purple-500/50">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-purple-500/50">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-purple-500/50">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-6 py-4 rounded-xl bg-purple-900/20 border border-purple-500/30 focus:border-purple-400 outline-none transition backdrop-blur-sm text-white placeholder-gray-400"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-6 py-4 rounded-xl bg-purple-900/20 border border-purple-500/30 focus:border-purple-400 outline-none transition backdrop-blur-sm text-white placeholder-gray-400"
                        />
                        <textarea
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            // rows="6"
                            className="w-full px-6 py-4 rounded-xl bg-purple-900/20 border border-purple-500/30 focus:border-purple-400 outline-none transition resize-none backdrop-blur-sm text-white placeholder-gray-400"
                        ></textarea>
                        <button
                            onClick={handleSubmit}
                            className="group w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                        >
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span>Send Message</span>
                        </button>
                    </div>
                </div>
            </section>

            <footer className="border-t border-purple-500/30 bg-black/40 backdrop-blur-sm py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-500/50">
                                    FD
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Flutter Dev Pro</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Senior Flutter Developer specializing in cross-platform mobile and web solutions. Transforming ideas into exceptional digital experiences.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold mb-4 text-lg">Quick Links</h5>
                            <ul className="space-y-2">
                                <li><a href="#home" className="text-gray-400 hover:text-purple-400 transition">Home</a></li>
                                <li><a href="#about" className="text-gray-400 hover:text-purple-400 transition">About</a></li>
                                <li><a href="#skills" className="text-gray-400 hover:text-purple-400 transition">Skills</a></li>
                                <li><a href="#projects" className="text-gray-400 hover:text-purple-400 transition">Projects</a></li>
                                <li><a href="#contact" className="text-gray-400 hover:text-purple-400 transition">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold mb-4 text-lg">Services</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li>Mobile App Development</li>
                                <li>Web Development</li>
                                <li>UI/UX Design</li>
                                <li>Backend Development</li>
                                <li>Consulting</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-400 text-sm">
                                © 2025 Flutter Dev Pro. All rights reserved.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                                {platforms.slice(0, 6).map((platform, idx) => (
                                    <span key={idx} className="flex items-center space-x-1 opacity-70 hover:opacity-100 transition cursor-pointer">
                                        <span className="text-lg">{platform.icon}</span>
                                        <span>{platform.name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
};

export default Portfolio;