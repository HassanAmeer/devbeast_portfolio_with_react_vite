import React, { useState, useEffect } from 'react';
import {
    Settings,
    Edit3,
    Save,
    X,
    Plus,
    Trash2,
    Upload,
    Eye,
    EyeOff,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    Globe,
    Code2,
    Smartphone,
    Database,
    Brain,
    Cloud,
    Star,
    Award,
    Users,
    Zap,
    Download,
    Send,
    ArrowRight,
    CheckCircle,
    Menu,
    Shield,
    User,
    Key,
    Palette,
    FileText,
    Link,
    MessageSquare,
    Sparkles,
    Instagram,
    Facebook,
    Youtube,
    Music2Icon
} from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    projectLink: string;
    totalTeams: number;
    githubLink: string;
    projectImages: string[];
}

interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    headerName: string;
    headerLogo: string;
}

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'telegram' | 'discord' | 'snapchat' | 'globe';
}

interface ContactMessage {
    id: string;
    phone: string;
    email: string;
    message: string;
    date: string;
    read: boolean;
}

const AdminHomePage = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showAddProject, setShowAddProject] = useState(false);

    // Editable data states
    const [heroData, setHeroData] = useState({
        name: 'Akash Ameer',
        title: 'Senior Developer',
        description: 'Senior Full-Stack Developer specializing in Flutter, Laravel, and React — transforming ideas into stunning reality',
        image: '',
        btn1Name: 'View Portfolio',
        btn1Link: '#',
        btn2Name: 'View Portfolio',
        btn2Link: '#',
        stats: [
            { number: '4+', label: 'Years Experience' },
            { number: '150+', label: 'Projects Completed' },
            { number: '90%', label: 'Happy Clients' },
            { number: '4.9', label: 'Average Rating' }
        ]
    });

    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: 'FinTech Mobile Banking',
            description: 'Advanced banking platform with AI-powered fraud detection, biometric authentication, and real-time cryptocurrency trading.',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
            tags: ['Flutter', 'Dart', 'Firebase', 'TensorFlow'],
            projectLink: '',
            totalTeams: 0,
            githubLink: '',
            projectImages: []
        },
        {
            id: 2,
            title: 'AI Healthcare Platform',
            description: 'Revolutionary telemedicine app with AI diagnosis, ML-powered health predictions, and secure patient data management.',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
            tags: ['Flutter', 'Laravel', 'MySQL', 'AI'],
            projectLink: '',
            totalTeams: 0,
            githubLink: '',
            projectImages: []
        }
    ]);

    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        email: 'hello@devprostudio.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        headerName: 'Akash Ameer',
        headerLogo: 'https://via.placeholder.com/150x50/6366f1/ffffff?text=LOGO'
    });

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        { id: '1', platform: 'Github', url: '', icon: 'github' },
        { id: '2', platform: 'Linkedin', url: '', icon: 'linkedin' },
        { id: '3', platform: 'Twitter', url: '', icon: 'twitter' },
        { id: '4', platform: 'Instagram', url: '', icon: 'instagram' },
        { id: '5', platform: 'Facebook', url: '', icon: 'facebook' },
        { id: '6', platform: 'Youtube', url: '', icon: 'youtube' },
        { id: '7', platform: 'Tiktok', url: '', icon: 'tiktok' },
        { id: '8', platform: 'Telegram', url: '', icon: 'telegram' },
        { id: '9', platform: 'Discord', url: '', icon: 'discord' },
        { id: '10', platform: 'Snapchat', url: '', icon: 'snapchat' },
        { id: '12', platform: 'Globe', url: '', icon: 'globe' }
    ]);

    const [messages, setMessages] = useState<ContactMessage[]>([
        {
            id: '1',
            phone: '0301234567',
            email: 'john@example.com',
            message: 'Hi Akash, I loved your AI Healthcare app. Can we discuss a partnership?',
            date: 'Nov 10, 2025',
            read: false
        },
        {
            id: '2',
            phone: '0301234567',
            email: 'sarah@startup.io',
            message: 'We are hiring senior developers. Your portfolio is impressive!',
            date: 'Nov 9, 2025',
            read: true
        }
    ]);

    const [adminCredentials, setAdminCredentials] = useState({
        email: 'admin@devpro.com',
        password: 'admin123'
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSave = () => {
        setIsEditing(false);
        alert('All changes saved successfully!');
    };

    const addProject = (newProject: Project) => {
        setProjects([...projects, newProject]);
    };

    const updateProjectData = (updatedProject: Project) => {
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    const deleteProject = (id: number) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    const updateProject = (id: number, field: keyof Project, value: any) => {
        setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, {
            id: Date.now().toString(),
            platform: 'New Platform',
            url: 'https://',
            icon: 'globe'
        }]);
    };

    const deleteSocialLink = (id: string) => {
        setSocialLinks(socialLinks.filter(l => l.id !== id));
    };

    const deleteMessage = (id: string) => {
        setMessages(messages.filter(m => m.id !== id));
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`
                    }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
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

            <div className="relative z-10 flex">
                {/* Sidebar */}
                <div className="w-80 min-h-screen bg-black/60 backdrop-blur-2xl border-r border-white/10 p-6">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Admin Panel</h2>
                            <p className="text-sm text-gray-400">Content Management</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { id: 'overview', label: 'Overview', icon: <Eye className="w-5 h-5" /> },
                            { id: 'projects', label: 'Projects', icon: <Code2 className="w-5 h-5" /> },
                            { id: 'hero', label: 'Hero Section', icon: <User className="w-5 h-5" /> },
                            { id: 'social', label: 'Social Setting', icon: <Link className="w-5 h-5" /> },
                            { id: 'credentials', label: 'Admin Settings', icon: <Key className="w-5 h-5" /> },
                            { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, badge: messages.filter(m => !m.read).length },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-xl transition-all ${activeSection === item.id
                                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                                    : 'hover:bg-white/5 text-gray-300'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                                {item.badge ? (
                                    <span className="px-2 py-1 bg-red-500 text-xs rounded-full">{item.badge}</span>
                                ) : null}
                            </button>
                        ))}
                    </nav>

                    <div className="absolute bottom-6 left-6 right-6">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                        >
                            <Globe className="w-5 h-5" />
                            <span>View Portfolio</span>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('messages', 'Contact Us')} Management
                            </h1>
                            <p className="text-gray-400">Edit and manage your portfolio content</p>
                        </div>
                        <div className="flex space-x-3">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
                                    >
                                        <Save className="w-5 h-5" />
                                        <span>Save Changes</span>
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                        <span>Cancel</span>
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all"
                                >
                                    <Edit3 className="w-5 h-5" />
                                    <span>Edit Content</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-8">

                        {/* Overview */}
                        {activeSection === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Projects', value: projects.length, icon: <Code2 className="w-8 h-8" />, color: 'from-blue-500 to-cyan-500' },
                                    { label: 'Social Links', value: socialLinks.length, icon: <Link className="w-8 h-8" />, color: 'from-purple-500 to-pink-500' },
                                    { label: 'Unread Messages', value: messages.filter(m => !m.read).length, icon: <MessageSquare className="w-8 h-8" />, color: 'from-orange-500 to-red-500' }
                                ].map((stat, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-10 group-hover:opacity-60 transition-all duration-500`} />
                                        <div className="relative p-6 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all transform hover:scale-105 duration-300">
                                            <div className={`flex justify-center mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                                {stat.icon}
                                            </div>
                                            <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Hero Section */}
                        {activeSection === 'hero' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={heroData.name}
                                            onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={heroData.title}
                                            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                                    <textarea
                                        value={heroData.description}
                                        onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-purple-400 mb-2">Statistics</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {heroData.stats.map((stat, idx) => (
                                            <div key={idx} className="flex space-x-2">
                                                <input
                                                    type="text"
                                                    value={stat.number}
                                                    onChange={(e) => {
                                                        const newStats = [...heroData.stats];
                                                        newStats[idx].number = e.target.value;
                                                        setHeroData({ ...heroData, stats: newStats });
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="Number"
                                                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                                <input
                                                    type="text"
                                                    value={stat.label}
                                                    onChange={(e) => {
                                                        const newStats = [...heroData.stats];
                                                        newStats[idx].label = e.target.value;
                                                        setHeroData({ ...heroData, stats: newStats });
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="Label"
                                                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <h5 className='text-purple-400 font-bold text-xl'>Buttons</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Button 1 Name</label>
                                        <input
                                            type="text"
                                            value={heroData.btn1Name}
                                            onChange={(e) => setHeroData({ ...heroData, btn1Name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Link</label>
                                        <input
                                            type="text"
                                            value={heroData.btn1Link}
                                            onChange={(e) => setHeroData({ ...heroData, btn1Link: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Button 2 Name</label>
                                        <input
                                            type="text"
                                            value={heroData.btn2Name}
                                            onChange={(e) => setHeroData({ ...heroData, btn2Name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Link</label>
                                        <input
                                            type="text"
                                            value={heroData.btn2Link}
                                            onChange={(e) => setHeroData({ ...heroData, btn2Link: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-purple-400 mb-2">Hero Image</label>
                                    <input
                                        type='file'
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    setHeroData({ ...heroData, image: event.target?.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                    />
                                    {heroData.image && (
                                        <div className="mt-4">
                                            <img
                                                src={heroData.image}
                                                alt="Hero Preview"
                                                className="w-32 h-32 object-contain rounded-xl border border-white/20"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {activeSection === 'projects' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Projects ({projects.length})</h3>
                                    <button
                                        onClick={() => setShowAddProject(true)}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add Project</span>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {projects.map((project) => (
                                        <div key={project.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all">
                                            <div className="flex items-center space-x-4">
                                                {project.image && (
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-16 h-16 object-cover rounded-lg border border-white/20"
                                                    />
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-white">{project.title}</h4>
                                                    <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs text-purple-400">{project.tags.length} tags</span>
                                                        <span className="text-xs text-cyan-400">{project.totalTeams} team members</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => setEditingProject(project)}
                                                    className="p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg transition-all"
                                                >
                                                    <Edit3 className="w-4 h-4 text-blue-400" />
                                                </button>
                                                <button
                                                    onClick={() => deleteProject(project.id)}
                                                    className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}



                        {/* Social Links */}
                        {activeSection === 'social' && (
                            <div className="space-y-6">

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-purple-400 mb-4">Header & Branding</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Header Title</label>
                                                <input
                                                    type="text"
                                                    value={contactInfo.headerName}
                                                    onChange={(e) => setContactInfo({ ...contactInfo, headerName: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Header subtitle</label>
                                                <input
                                                    type="text"
                                                    value={contactInfo.headerName}
                                                    onChange={(e) => setContactInfo({ ...contactInfo, headerName: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>


                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Header Logo</label>
                                                <input
                                                    type='file'
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = (event) => {
                                                                setContactInfo({ ...contactInfo, headerLogo: event.target?.result as string });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                                />
                                                {contactInfo.headerLogo && (
                                                    <div className="mt-4">
                                                        <img
                                                            src={contactInfo.headerLogo}
                                                            alt="Hero Preview"
                                                            className="w-32 h-32 object-contain rounded-xl border border-white/20"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-cyan-400 mb-4">Contact Details</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="flex items-center space-x-3">
                                                <Mail className="w-5 h-5 text-purple-400" />
                                                <input
                                                    type="email"
                                                    value={contactInfo.email}
                                                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Phone className="w-5 h-5 text-cyan-400" />
                                                <input
                                                    type="tel"
                                                    value={contactInfo.phone}
                                                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <MapPin className="w-5 h-5 text-pink-400" />
                                                <input
                                                    type="text"
                                                    value={contactInfo.location}
                                                    onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold">Social Media Links</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {socialLinks.map((link) => {
                                        const Icon = {
                                            github: Github,
                                            linkedin: Linkedin,
                                            twitter: Twitter,
                                            instagram: Instagram,
                                            facebook: Facebook,
                                            youtube: Youtube,
                                            tiktok: Music2Icon,
                                            telegram: Globe,
                                            discord: Globe,
                                            snapchat: Globe,
                                            globe: Globe
                                        }[link.icon] || Globe;

                                        return (
                                            <div key={link.id} className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
                                                        <Icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        <div className="text-white font-medium">{link.platform}</div>
                                                        <input
                                                            type="url"
                                                            value={link.url}
                                                            onChange={(e) => {
                                                                const updated = socialLinks.map(l => l.id === link.id ? { ...l, url: e.target.value } : l);
                                                                setSocialLinks(updated);
                                                            }}
                                                            disabled={!isEditing}
                                                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500 outline-none text-white disabled:opacity-50 text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Messages (Contact Us) */}
                        {activeSection === 'messages' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold">Contact Messages ({messages.length})</h3>
                                    <div className="text-sm text-gray-400">
                                        {messages.filter(m => !m.read).length} unread
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="text-center py-12 text-gray-400">
                                            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                            <p>No messages yet</p>
                                        </div>
                                    ) : (
                                        messages.map((msg) => (
                                            <div key={msg.id} className={`p-6 rounded-2xl border ${msg.read ? 'bg-white/5 border-white/10' : 'bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border-purple-500/30'} backdrop-blur-xl`}>
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            {!msg.read && <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
                                                            <h4 className="font-bold text-lg">{msg.phone}</h4>
                                                            <span className="text-sm text-gray-400">{msg.date}</span>
                                                        </div>
                                                        <p className="text-gray-300 mb-2">{msg.email}</p>
                                                        <p className="text-gray-400 mt-2 line-clamp-2">{msg.message}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteMessage(msg.id)}
                                                        className="ml-4 p-3 bg-red-600/20 hover:bg-red-600/30 rounded-xl"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Admin Settings */}
                        {activeSection === 'credentials' && (
                            <div className="space-y-6">
                                <div className="max-w-md">
                                    <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 mb-6">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <Shield className="w-6 h-6 text-red-400" />
                                            <h3 className="text-lg font-bold text-red-400">Security Warning</h3>
                                        </div>
                                        <p className="text-sm text-gray-300">
                                            Changing admin credentials will require you to log in again with the new credentials.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">Admin Email</label>
                                            <input
                                                type="email"
                                                value={adminCredentials.email}
                                                onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">Admin Password</label>
                                            <input
                                                type="password"
                                                value={adminCredentials.password}
                                                onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add/Edit Project Modal */}
            {(showAddProject || editingProject) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowAddProject(false);
                                    setEditingProject(null);
                                }}
                                className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all"
                            >
                                <X className="w-5 h-5 text-red-400" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Project Images (Gallery)</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        const imageUrls = files.map(file => {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            return new Promise<string>((resolve) => {
                                                reader.onload = () => resolve(reader.result as string);
                                            });
                                        });
                                        Promise.all(imageUrls).then(urls => {
                                            if (editingProject) {
                                                setEditingProject({ ...editingProject, projectImages: urls });
                                            }
                                        });
                                    }}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                />
                                {(editingProject?.projectImages.length || 0) > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {(editingProject?.projectImages || []).map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt={`Project ${idx + 1}`}
                                                className="w-16 h-16 object-cover rounded-lg border border-white/20"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <input
                                type="text"
                                placeholder="Enter project title"
                                value={editingProject?.title || ''}
                                onChange={(e) => editingProject && setEditingProject({ ...editingProject, title: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white font-bold"
                            />

                            <textarea
                                placeholder="Enter project description"
                                value={editingProject?.description || ''}
                                onChange={(e) => editingProject && setEditingProject({ ...editingProject, description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white resize-none text-sm"
                            />

                            <input
                                type="text"
                                placeholder="Enter main image URL"
                                value={editingProject?.image || ''}
                                onChange={(e) => editingProject && setEditingProject({ ...editingProject, image: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                            />

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Tags</label>
                                <div className="space-y-2">
                                    {(editingProject?.tags || []).map((tag, tagIdx) => (
                                        <div key={tagIdx} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter tag name"
                                                value={tag}
                                                onChange={(e) => {
                                                    if (editingProject) {
                                                        const newTags = [...editingProject.tags];
                                                        newTags[tagIdx] = e.target.value;
                                                        setEditingProject({ ...editingProject, tags: newTags });
                                                    }
                                                }}
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                                            />
                                            <button
                                                onClick={() => {
                                                    if (editingProject) {
                                                        const newTags = editingProject.tags.filter((_, idx) => idx !== tagIdx);
                                                        setEditingProject({ ...editingProject, tags: newTags });
                                                    }
                                                }}
                                                className="px-2 py-1 bg-red-600/20 hover:bg-red-600/40 rounded text-red-400 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            if (editingProject) {
                                                const newTags = [...editingProject.tags, ''];
                                                setEditingProject({ ...editingProject, tags: newTags });
                                            }
                                        }}
                                        className="px-3 py-2 bg-green-600/20 hover:bg-green-600/40 rounded text-green-400 text-sm"
                                    >
                                        Add Tag
                                    </button>
                                </div>
                            </div>

                            <input
                                type="url"
                                placeholder="Enter project live/demo link"
                                value={editingProject?.projectLink || ''}
                                onChange={(e) => editingProject && setEditingProject({ ...editingProject, projectLink: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                            />

                            <input
                                type="number"
                                placeholder="Enter total team members count"
                                value={editingProject?.totalTeams || 0}
                                onChange={(e) => editingProject && setEditingProject({ ...editingProject, totalTeams: parseInt(e.target.value) || 0 })}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                            />

                            <input
                                type="url"
                                placeholder="Enter GitHub repository link"
                                value={editingProject?.githubLink || ''}
                                onChange={(e) => editingProject && setEditingProject({ ...editingProject, githubLink: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                            />

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={() => {
                                        setShowAddProject(false);
                                        setEditingProject(null);
                                    }}
                                    className="px-6 py-3 rounded-xl bg-gray-600/20 hover:bg-gray-600/40 border border-gray-500/30 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (editingProject) {
                                            if (showAddProject) {
                                                // Adding new project
                                                const newProject = {
                                                    ...editingProject,
                                                    id: projects.length + 1
                                                };
                                                addProject(newProject);
                                            } else {
                                                // Updating existing project
                                                updateProjectData(editingProject);
                                            }
                                            setShowAddProject(false);
                                            setEditingProject(null);
                                        }
                                    }}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
                                >
                                    {showAddProject ? 'Add Project' : 'Update Project'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
                    50% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default AdminHomePage;