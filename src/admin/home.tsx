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
    Sparkles
} from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    gradient: string;
    live: boolean;
}

interface ContactInfo {
    email: string;
    phone: string;
    location: string;
}

interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

const AdminHomePage = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        }
    ]);

    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        email: 'hello@devprostudio.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA'
    });

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        { platform: 'GitHub', url: '#', icon: 'github' },
        { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
        { platform: 'Twitter', url: '#', icon: 'twitter' },
        { platform: 'Email', url: '#', icon: 'mail' }
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
        // Here you would typically save to backend/localStorage
        setIsEditing(false);
        alert('Changes saved successfully!');
    };

    const addProject = () => {
        const newProject: Project = {
            id: projects.length + 1,
            title: 'New Project',
            description: 'Project description',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
            tags: ['React', 'TypeScript'],
            category: 'web',
            gradient: 'from-green-600 via-emerald-500 to-teal-500',
            live: false
        };
        setProjects([...projects, newProject]);
    };

    const deleteProject = (id: number) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    const updateProject = (id: number, field: keyof Project, value: any) => {
        setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
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
                            { id: 'hero', label: 'Hero Section', icon: <User className="w-5 h-5" /> },
                            { id: 'projects', label: 'Projects', icon: <Code2 className="w-5 h-5" /> },
                            { id: 'contact', label: 'Contact Info', icon: <MessageSquare className="w-5 h-5" /> },
                            { id: 'social', label: 'Social Links', icon: <Link className="w-5 h-5" /> },
                            { id: 'credentials', label: 'Admin Credentials', icon: <Key className="w-5 h-5" /> }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeSection === item.id
                                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                                    : 'hover:bg-white/5 text-gray-300'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
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
                                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Management
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
                                    { label: 'Live Projects', value: projects.filter(p => p.live).length, icon: <Globe className="w-8 h-8" />, color: 'from-green-500 to-emerald-500' },
                                    { label: 'Social Links', value: socialLinks.length, icon: <Link className="w-8 h-8" />, color: 'from-purple-500 to-pink-500' },
                                    { label: 'Contact Methods', value: 3, icon: <MessageSquare className="w-8 h-8" />, color: 'from-orange-500 to-red-500' }
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
                                <h5 className='text-purple-400 font-bold text-xl'>
                                    Buttons
                                </h5>
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
                                    {isEditing && (
                                        <button
                                            onClick={addProject}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add Project</span>
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map((project) => (
                                        <div key={project.id} className="relative group">
                                            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-2xl blur-xl opacity-10 group-hover:opacity-30 transition-all duration-500`} />
                                            <div className="relative p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all">
                                                {isEditing && (
                                                    <button
                                                        onClick={() => deleteProject(project.id)}
                                                        className="absolute top-4 right-4 w-8 h-8 bg-red-600/20 hover:bg-red-600/40 rounded-full flex items-center justify-center transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </button>
                                                )}
                                                <div className="space-y-4">
                                                    <input
                                                        type="text"
                                                        value={project.title}
                                                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 font-bold"
                                                    />
                                                    <textarea
                                                        value={project.description}
                                                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                                        disabled={!isEditing}
                                                        rows={2}
                                                        className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 resize-none text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={project.image}
                                                        onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                                                        disabled={!isEditing}
                                                        placeholder="Image URL"
                                                        className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm"
                                                    />
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tags.map((tag, tagIdx) => (
                                                            <input
                                                                key={tagIdx}
                                                                type="text"
                                                                value={tag}
                                                                onChange={(e) => {
                                                                    const newTags = [...project.tags];
                                                                    newTags[tagIdx] = e.target.value;
                                                                    updateProject(project.id, 'tags', newTags);
                                                                }}
                                                                disabled={!isEditing}
                                                                className="px-2 py-1 rounded bg-purple-600/20 text-purple-300 text-xs disabled:opacity-50"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Info */}
                        {activeSection === 'contact' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={contactInfo.email}
                                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={contactInfo.phone}
                                            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={contactInfo.location}
                                            onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Links */}
                        {activeSection === 'social' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Social Links ({socialLinks.length})</h3>
                                    {isEditing && (
                                        <button
                                            onClick={() => setSocialLinks([...socialLinks, { platform: 'New Platform', url: '#', icon: 'link' }])}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add Link</span>
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {socialLinks.map((link, idx) => (
                                        <div key={idx} className="flex space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Link className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={link.platform}
                                                    onChange={(e) => {
                                                        const newLinks = [...socialLinks];
                                                        newLinks[idx].platform = e.target.value;
                                                        setSocialLinks(newLinks);
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="Platform"
                                                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm"
                                                />
                                                <input
                                                    type="url"
                                                    value={link.url}
                                                    onChange={(e) => {
                                                        const newLinks = [...socialLinks];
                                                        newLinks[idx].url = e.target.value;
                                                        setSocialLinks(newLinks);
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="URL"
                                                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm"
                                                />
                                            </div>
                                            {isEditing && (
                                                <button
                                                    onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== idx))}
                                                    className="w-8 h-8 bg-red-600/20 hover:bg-red-600/40 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Admin Credentials */}
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

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default AdminHomePage;