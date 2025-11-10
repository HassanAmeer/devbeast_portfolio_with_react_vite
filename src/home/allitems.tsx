import { useState, useEffect } from 'react';
import {
    Github,
    Linkedin,
    Twitter,
    Code2,
    Smartphone,
    Globe,
    Menu,
    X,
    Home,
    Briefcase,
    User,
    MessageCircle,
    Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllItems = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const [selectedProject] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const filteredProjects = activeTab === 'all'
        ? projects
        : projects.filter(p => p.category === activeTab);

    const handleProjectClick = (project: any) => {
        navigate('/item', { state: project });
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            {/* Sticky Header with Projects Title */}
            <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl' : 'bg-black/60 backdrop-blur-xl border-b border-white/5'}`}>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left Side - Projects Title */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-white/10 rounded-xl transition-all"
                            >
                                <Home className="w-5 h-5" />
                            </button>
                            <div className="hidden md:block h-6 w-px bg-white/20" />
                            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                All Projects
                            </h1>
                            <span className="hidden md:inline-block px-3 py-1 bg-purple-600/20 rounded-full text-sm font-semibold text-purple-300 border border-purple-500/30">
                                {filteredProjects.length} Projects
                            </span>
                        </div>

                        {/* Right Side - Navigation Buttons */}
                        <div className="flex items-center space-x-3">
                            {/* Desktop Menu */}
                            <nav className="hidden md:flex items-center space-x-2">
                                <button
                                    onClick={() => navigate('/')}
                                    className="group px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center space-x-2"
                                >
                                    <Home className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Home</span>
                                </button>
                                <button className="group px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center space-x-2">
                                    <Briefcase className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Portfolio</span>
                                </button>
                                <button className="group px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span className="text-sm font-semibold">About</span>
                                </button>
                                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-all flex items-center space-x-2">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">Contact</span>
                                </button>
                            </nav>

                            {/* Social Icons */}
                            <div className="hidden lg:flex items-center space-x-2 pl-2 border-l border-white/10">
                                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all">
                                    <Github className="w-4 h-4" />
                                </a>
                                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/5">
                        <nav className="container mx-auto px-4 py-6 flex flex-col space-y-2">
                            <button
                                onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all"
                            >
                                <Home className="w-5 h-5" />
                                <span className="font-medium">Home</span>
                            </button>
                            <button className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                                <Briefcase className="w-5 h-5" />
                                <span className="font-medium">Portfolio</span>
                            </button>
                            <button className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
                                <User className="w-5 h-5" />
                                <span className="font-medium">About</span>
                            </button>
                            <button className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold">
                                <MessageCircle className="w-5 h-5" />
                                <span>Contact</span>
                            </button>
                            <div className="flex items-center space-x-3 px-4 pt-4 border-t border-white/10">
                                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <section className="relative py-12">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                        <div className="flex items-center space-x-2 text-gray-400 mr-2">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-semibold">Filter:</span>
                        </div>
                        {[
                            { id: 'all', label: 'All Projects', icon: <Globe className="w-4 h-4" />, count: projects.length },
                            { id: 'app', label: 'Mobile Apps', icon: <Smartphone className="w-4 h-4" />, count: projects.filter(p => p.category === 'app').length },
                            { id: 'web', label: 'Web Apps', icon: <Code2 className="w-4 h-4" />, count: projects.filter(p => p.category === 'web').length }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`group relative px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center space-x-2 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 shadow-lg shadow-purple-500/30'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-xl'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProjects.map((project, idx) => (
                            <div
                                key={project.id}
                                onClick={() => handleProjectClick(project)}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-10 group-hover:opacity-20 transition-all duration-500 blur-xl`} />

                                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all rounded-3xl overflow-hidden h-full">
                                    {project.live && (
                                        <div className="absolute top-4 right-4 z-20">
                                            <div className="flex items-center space-x-2 px-2 py-1.5  opacity-60 hover:opacity-100 hover:bg-cyan-800/90  bg-purple-600/90 backdrop-blur-xl rounded-full text-xs font-bold shadow-lg">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                <span>View</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h4 className="text-lg font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all line-clamp-1">
                                            {project.title}
                                        </h4>
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 3).map((tag, tagIdx) => (
                                                <span
                                                    key={tagIdx}
                                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {/* {project.tags.length > 3 && (
                                                <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-xs font-medium">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )} */}
                                        </div>
                                        {/* 
                                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                            <span className="text-xs text-gray-500 font-medium">View Details</span>
                                            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-300">No Projects Found</h3>
                            <p className="text-gray-500">Try selecting a different filter</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AllItems;