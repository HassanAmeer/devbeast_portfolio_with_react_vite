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
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/fbconfig';

interface Project {
    id: string;
    title: string;
    desc: string;
    tags: string[];
    projectImages: string[];
    githubLink: string;
    projectLink: string;
    totalTeams: string;
    isWeb: boolean;
    createdAt?: any;
    updatedAt?: any;
}

const AllItems = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const loadProjectsData = async () => {
            try {
                const projectsCollectionRef = collection(db, 'dev1', 'all_projects_id', 'projects');
                const q = query(projectsCollectionRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedProjects: Project[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title || 'Untitled',
                        desc: data.desc || data.description || '',
                        tags: data.tags || [],
                        projectImages: data.projectImages || [],
                        githubLink: data.githubLink || '',
                        projectLink: data.projectLink || '',
                        totalTeams: data.totalTeams || 0,
                        isWeb: data.isWeb || false,
                    } as Project;
                });

                setProjects(fetchedProjects);
                console.log("Projects loaded:", fetchedProjects);
            } catch (error) {
                console.error('Error loading projects:', error);
            } finally {
                setIsLoadingData(false);
            }
        };

        loadProjectsData();
    }, []);


    const filteredProjects = activeTab === 'all'
        ? projects
        : activeTab === 'web'
            ? projects.filter(p => p.isWeb)
            : projects.filter(p => !p.isWeb);

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
                            { id: 'app', label: 'Mobile Apps', icon: <Smartphone className="w-4 h-4" />, count: projects.filter(p => !p.isWeb).length },
                            { id: 'web', label: 'Web Apps', icon: <Code2 className="w-4 h-4" />, count: projects.filter(p => p.isWeb).length }
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
                                <div className={`absolute inset-0 bg-gradient-to-r ${project.isWeb ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'} opacity-10 group-hover:opacity-20 transition-all duration-500 blur-xl`} />

                                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all rounded-3xl overflow-hidden h-full">
                                    {project.projectLink && (
                                        <div className="absolute top-4 right-4 z-20">
                                            <div className="flex items-center space-x-2 px-2 py-1.5  opacity-60 hover:opacity-100 hover:bg-cyan-800/90  bg-purple-600/90 backdrop-blur-xl rounded-full text-xs font-bold shadow-lg">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                <span>View</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                                        <img
                                            src={project.projectImages[0] || 'https://via.placeholder.com/400x300'}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h4 className="text-lg font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all line-clamp-1">
                                            {project.title}
                                        </h4>
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                            {project.desc}
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