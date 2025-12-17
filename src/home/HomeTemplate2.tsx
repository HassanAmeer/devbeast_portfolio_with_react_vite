import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Globe, Star, Menu, X, ArrowRight, ExternalLink, Instagram, Facebook, Youtube, Music2, ChevronDown, Sparkles, Zap, Code2, Smartphone, Database, Brain, Cloud, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db, heroSectionCollectionId, mainCollection, projectsCollection, projectsCollectionId, reviewsCollection, reviewsCollectionId, socialLinksCollectionId } from '../config/fbconfig';
import { preloadProjectImages } from '../utils/imageCache';
import ContactSection from './contact';

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
    isPin: boolean;
    createdAt?: any;
    updatedAt?: any;
}

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'telegram' | 'discord' | 'snapchat' | 'globe';
}

interface HeaderData {
    title: string;
    subtitle: string;
    logo: string;
}

interface Review {
    id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
    avatar: string;
    createdAt?: any;
    updatedAt?: any;
}

const HomeTemplate2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);

    const getDefaultTab = () => {
        if (location.pathname === '/apps') return 'app';
        if (location.pathname === '/web') return 'web';
        return 'all';
    };

    const [activeTab, setActiveTab] = useState(getDefaultTab());
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [heroData, setHeroData] = useState({
        title: 'Creative Developer',
        subtitle: 'Building Digital Experiences',
        desc: 'I craft beautiful, functional digital products with modern technologies',
        image: '',
        btn_name_1: 'View Work',
        btn_link_1: '#projects',
        btn_name_2: 'Contact',
        btn_link_2: '#contact',
        card_title_1: '4+',
        card_subtitle_1: 'Years',
        card_title_2: '150+',
        card_subtitle_2: 'Projects',
        card_title_3: '90%',
        card_subtitle_3: 'Clients',
        card_title_4: '4.9',
        card_subtitle_4: 'Rating'
    });

    const [projects, setProjects] = useState<Project[]>([]);
    const [headerData, setHeaderData] = useState<HeaderData>({
        title: 'Portfolio',
        subtitle: 'Developer',
        logo: '',
    });

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);

    // Track mouse position for interactive effects
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

    useEffect(() => {
        const loadSocialLinksData = async () => {
            try {
                const docRef = doc(db, mainCollection, socialLinksCollectionId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setHeaderData({
                        title: data.title || '',
                        subtitle: data.subtitle || '',
                        logo: data.logo || ''
                    });
                    setSocialLinks([
                        { id: '1', platform: 'Github', url: data.github || '', icon: 'github' as const },
                        { id: '2', platform: 'Linkedin', url: data.linkedin || '', icon: 'linkedin' as const },
                        { id: '3', platform: 'Twitter', url: data.twitter || '', icon: 'twitter' as const },
                        { id: '4', platform: 'Instagram', url: data.instagram || '', icon: 'instagram' as const },
                        { id: '5', platform: 'Facebook', url: data.facebook || '', icon: 'facebook' as const },
                        { id: '6', platform: 'Youtube', url: data.youtube || '', icon: 'youtube' as const },
                    ].filter(link => link.url));
                }
            } catch (error) {
                console.error('Error loading social data:', error);
            }
        };

        const loadHeroData = async () => {
            try {
                const docRef = doc(db, mainCollection, heroSectionCollectionId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setHeroData({
                        title: data.title || 'Creative Developer',
                        subtitle: data.subtitle || 'Building Digital Experiences',
                        desc: data.desc || '',
                        image: data.image || '',
                        btn_name_1: data.btn_name_1 || 'View Work',
                        btn_link_1: data.btn_link_1 || '#projects',
                        btn_name_2: data.btn_name_2 || 'Contact',
                        btn_link_2: data.btn_link_2 || '#contact',
                        card_title_1: data.card_title_1 || '4+',
                        card_subtitle_1: data.card_subtitle_1 || 'Years',
                        card_title_2: data.card_title_2 || '150+',
                        card_subtitle_2: data.card_subtitle_2 || 'Projects',
                        card_title_3: data.card_title_3 || '90%',
                        card_subtitle_3: data.card_subtitle_3 || 'Clients',
                        card_title_4: data.card_title_4 || '4.9',
                        card_subtitle_4: data.card_subtitle_4 || 'Rating'
                    });
                }
            } catch (error) {
                console.error('Error loading hero data:', error);
            }
        };

        const loadProjectsData = async () => {
            try {
                setLoading(true);
                const projectsCollectionRef = collection(db, mainCollection, projectsCollectionId, projectsCollection);
                const q = query(projectsCollectionRef, where('isHide', '==', false), orderBy('createdAt', 'desc'));
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
                        isPin: data.isPin || false,
                        createdAt: data.createdAt,
                    } as Project;
                });

                fetchedProjects.sort((a, b) => {
                    if (a.isPin !== b.isPin) return a.isPin ? -1 : 1;
                    if (a.createdAt && b.createdAt) return b.createdAt.toMillis() - a.createdAt.toMillis();
                    return 0;
                });

                setProjects(fetchedProjects);
                preloadProjectImages(fetchedProjects);
            } catch (error) {
                console.error('Error loading projects:', error);
            } finally {
                setLoading(false);
            }
        };

        const loadReviewsData = async () => {
            try {
                const reviewsCollectionRef = collection(db, mainCollection, reviewsCollectionId, reviewsCollection);
                const q = query(reviewsCollectionRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedReviews: Review[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name || '',
                        role: data.role || '',
                        text: data.text || '',
                        rating: data.rating || 5,
                        avatar: data.avatar || '',
                    } as Review;
                });
                setReviews(fetchedReviews);
            } catch (error) {
                console.error('Error loading reviews:', error);
            }
        };

        loadReviewsData();
        loadHeroData();
        loadSocialLinksData();
        loadProjectsData();
    }, []);

    useEffect(() => {
        if (reviews.length > 1) {
            const interval = setInterval(() => {
                setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [reviews.length]);

    const filteredProjects = activeTab === 'all'
        ? projects
        : activeTab === 'web'
            ? projects.filter(p => p.isWeb)
            : projects.filter(p => !p.isWeb);

    const getSocialIcon = (icon: string) => {
        const icons: { [key: string]: any } = {
            github: Github,
            linkedin: Linkedin,
            twitter: Twitter,
            instagram: Instagram,
            facebook: Facebook,
            youtube: Youtube,
            tiktok: Music2,
            globe: Globe,
        };
        const Icon = icons[icon] || Globe;
        return <Icon className="w-5 h-5" />;
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
            {/* Animated Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Gradient Mesh */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background: `
                            radial-gradient(ellipse at ${mousePosition.x}% ${mousePosition.y}%, rgba(120, 80, 255, 0.15) 0%, transparent 50%),
                            radial-gradient(ellipse at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(0, 200, 255, 0.1) 0%, transparent 50%),
                            radial-gradient(ellipse at 50% 50%, rgba(255, 100, 200, 0.05) 0%, transparent 70%)
                        `,
                        transition: 'all 0.3s ease-out'
                    }}
                />

                {/* Animated Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-[120px]"
                />

                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random() * 0.5
                        }}
                        animate={{
                            y: [null, -20, 20, -20],
                            opacity: [null, 0.8, 0.3, 0.8]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                    />
                ))}
            </div>

            {/* Glassmorphism Header */}
            <header className="fixed top-0 w-full z-50">
                <div className="mx-4 mt-4">
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-2xl shadow-black/20">
                        <div className="container mx-auto px-6 py-4">
                            <div className="flex justify-between items-center">
                                <a href="/" className="flex items-center space-x-4 group">
                                    {headerData.logo ? (
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                                            <img src={headerData.logo} alt="Logo" className="relative w-12 h-12 rounded-xl object-contain" />
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
                                                <Sparkles className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                            {headerData.title}
                                        </h1>
                                        <p className="text-xs text-white/40">{headerData.subtitle}</p>
                                    </div>
                                </a>

                                <nav className="hidden md:flex items-center">
                                    <div className="flex items-center bg-white/[0.03] rounded-full p-1">
                                        {['Home', 'Projects', 'Contact'].map((item) => (
                                            <a
                                                key={item}
                                                href={item === 'Projects' ? '#projects' : item === 'Contact' ? '#contact' : '#'}
                                                className="px-5 py-2 text-sm font-medium text-white/60 hover:text-white rounded-full hover:bg-white/[0.05] transition-all"
                                            >
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                </nav>

                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-all border border-white/[0.05]"
                                >
                                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mx-4 mt-2 bg-black/90 backdrop-blur-2xl border border-white/[0.05] rounded-2xl overflow-hidden"
                        >
                            <nav className="p-4 flex flex-col space-y-2">
                                {['Home', 'Projects', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={item === 'Projects' ? '#projects' : item === 'Contact' ? '#contact' : '#'}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Hero Section - Clean & Professional */}
            <section className="min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden">
                {/* Subtle Static Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px]" />
                </div>

                <div className="container mx-auto px-6 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Status Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/[0.08]"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm text-white/70">Open for opportunities</span>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                                    <span className="text-white">{heroData.title}</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                        {heroData.subtitle}
                                    </span>
                                </h1>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-lg text-white/50 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                            >
                                {heroData.desc.split('--').map((part, index) =>
                                    index % 2 === 1 ? (
                                        <span key={index} className="text-violet-400 font-medium">{part}</span>
                                    ) : (
                                        part
                                    )
                                )}
                            </motion.p>

                            {/* Stats Row */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10"
                            >
                                {[
                                    { value: heroData.card_title_1, label: heroData.card_subtitle_1 },
                                    { value: heroData.card_title_2, label: heroData.card_subtitle_2 },
                                    { value: heroData.card_title_3, label: heroData.card_subtitle_3 },
                                    { value: heroData.card_title_4, label: heroData.card_subtitle_4 },
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                                        <div className="text-sm text-white/40">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-4"
                            >
                                {heroData.btn_link_1 && (
                                    <a
                                        href={heroData.btn_link_1}
                                        className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                                    >
                                        {heroData.btn_name_1}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                )}
                                {heroData.btn_link_2 && (
                                    <a
                                        href={heroData.btn_link_2}
                                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.05] text-white font-semibold rounded-xl border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300"
                                    >
                                        {heroData.btn_name_2}
                                    </a>
                                )}
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                className="flex justify-center lg:justify-start gap-3 mt-10"
                            >
                                {socialLinks.slice(0, 5).map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                                    >
                                        {getSocialIcon(link.icon)}
                                    </a>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right - Profile Image */}
                        {heroData.image && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="relative flex-shrink-0 hidden lg:block"
                            >
                                {/* Subtle glow behind image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-fuchsia-500/20 blur-3xl scale-125" />

                                {/* Just the image */}
                                <img
                                    src={heroData.image}
                                    alt="Profile"
                                    className="relative w-72 md:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl"
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
                    >
                        <a href="#projects" className="flex flex-col items-center group">
                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-white/50 transition-colors" />
                            </motion.div>
                        </a>
                    </motion.div>
                </div>
            </section>
            {/* Tech Stack Logos Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
            >
                <div className="text-center mb-24 mt-20 relative px-4">
                    {/* Background Ambience */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

                    {/* Decorative Stars */}
                    <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-[20%] text-purple-400/30"
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0 left-[20%] text-cyan-400/30"
                    >
                        <Sparkles className="w-6 h-6" />
                    </motion.div>

                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight relative z-10">
                        <span className="block text-white mb-2 drop-shadow-lg">
                            Building Exceptional
                        </span>
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-lg">
                            Digital Experiences
                        </span>
                    </h3>

                    <div className="flex items-center justify-center gap-6 relative z-10">
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <p className="text-sm md:text-base text-white/60 font-medium tracking-[0.2em] uppercase">
                            with modern technologies
                        </p>
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                </div>

                {/* Animated Tech Logos Grid */}
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                    {[
                        {
                            name: 'Flutter', color: '#02569B', icon: (
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
                                </svg>
                            )
                        },
                        {
                            name: 'React', color: '#61DAFB', icon: (
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                                </svg>
                            )
                        },
                        {
                            name: 'Firebase', color: '#FFCA28', icon: (
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z" />
                                </svg>
                            )
                        },
                        {
                            name: 'Laravel', color: '#FF2D20', icon: (
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.027c-.008.002-.016.008-.024.01a.348.348 0 0 1-.192 0c-.011-.002-.02-.008-.03-.012-.02-.006-.043-.012-.063-.023L.533 18.755a.376.376 0 0 1-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 0 1 .023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034h.001L5.044.05a.375.375 0 0 1 .375 0L9.932 2.697h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 0 1 .024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 0 1 .375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003-.002-.002c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 0 1-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087l-1.58-.907v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z" />
                                </svg>
                            )
                        },
                        {
                            name: 'Node.js', color: '#339933', icon: (
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .139.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.076.242a1.932 1.932 0 0 1 1.844 0l8.794 5.076c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078a1.85 1.85 0 0 1-.922.247zm2.722-6.994c-3.943 0-4.77-1.812-4.77-3.332 0-.142.114-.253.256-.253h1.137c.127 0 .233.092.253.216.172 1.163.686 1.75 3.024 1.75 1.862 0 2.654-.421 2.654-1.409 0-.57-.225-.992-3.116-1.276-2.415-.239-3.907-.771-3.907-2.7 0-1.778 1.5-2.837 4.014-2.837 2.824 0 4.222.979 4.398 3.082a.254.254 0 0 1-.253.276h-1.142a.251.251 0 0 1-.245-.201c-.272-1.209-.931-1.596-2.757-1.596-2.032 0-2.268.708-2.268 1.238 0 .643.279.83 3.019 1.193 2.714.359 4.003.867 4.003 2.77-.001 1.92-1.601 3.019-4.393 3.019z" />
                                </svg>
                            )
                        },
                        {
                            name: 'MongoDB', color: '#47A248', icon: (
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
                                </svg>
                            )
                        },
                        {
                            name: 'AWS', color: '#FF9900', icon: (
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />
                                </svg>
                            )
                        },
                        {
                            name: 'Docker', color: '#2496ED', icon: (
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
                                </svg>
                            )
                        }
                    ].map((tech, idx) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.1 }}
                            className="group relative"
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }}
                                className="flex flex-col items-center gap-3"
                            >
                                {/* Glow effect on hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                                    style={{ backgroundColor: tech.color }}
                                />

                                {/* Icon container */}
                                <div
                                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-all duration-300"
                                    style={{ color: tech.color }}
                                >
                                    {tech.icon}
                                </div>

                                {/* Name */}
                                <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                                    {tech.name}
                                </span>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            {/* Services Section */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[150px]" />
                </div>

                <div className="container mx-auto px-6 relative">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-full border border-white/[0.08] mb-6">
                            <Layers className="w-4 h-4 text-violet-400" />
                            <span className="text-sm text-white/60">What I Offer</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="text-white">Services & </span>
                            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Expertise</span>
                        </h2>
                        <p className="text-white/50 max-w-2xl mx-auto text-lg">
                            Full-stack development with cutting-edge technologies
                        </p>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {[
                            {
                                icon: <Smartphone className="w-7 h-7" />,
                                title: 'Cross-Platform Apps',
                                desc: 'Native iOS & Android apps with Flutter and React Native',
                                gradient: 'from-blue-500 to-cyan-400'
                            },
                            {
                                icon: <Code2 className="w-7 h-7" />,
                                title: 'Clean Architecture',
                                desc: 'Scalable code with SOLID principles and best practices',
                                gradient: 'from-purple-500 to-pink-400'
                            },
                            {
                                icon: <Database className="w-7 h-7" />,
                                title: 'Backend Development',
                                desc: 'Robust APIs with Laravel, Node.js, and Firebase',
                                gradient: 'from-green-500 to-emerald-400'
                            },
                            {
                                icon: <Brain className="w-7 h-7" />,
                                title: 'AI Integration',
                                desc: 'Machine learning and AI-powered features',
                                gradient: 'from-orange-500 to-amber-400'
                            },
                            {
                                icon: <Globe className="w-7 h-7" />,
                                title: 'Modern Web Apps',
                                desc: 'Fast React apps with Next.js and Vite',
                                gradient: 'from-cyan-500 to-blue-400'
                            },
                            {
                                icon: <Cloud className="w-7 h-7" />,
                                title: 'Cloud & DevOps',
                                desc: 'AWS, Firebase, Docker, and CI/CD pipelines',
                                gradient: 'from-indigo-500 to-violet-400'
                            }
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative"
                            >
                                {/* Hover glow */}
                                <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

                                <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] backdrop-blur-sm transition-all duration-300">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg`}>
                                        {service.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-all">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/50 leading-relaxed">
                                        {service.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-32 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/[0.03] rounded-full border border-white/[0.05] mb-6">
                            <Zap className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-white/60">Featured Projects</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Selected </span>
                            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Work</span>
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            A collection of projects showcasing expertise in modern development
                        </p>
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-12"
                    >
                        <div className="inline-flex p-1.5 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.05]">
                            {[
                                { id: 'all', label: 'All', icon: <Globe className="w-4 h-4" /> },
                                { id: 'app', label: 'Mobile', icon: <Smartphone className="w-4 h-4" /> },
                                { id: 'web', label: 'Web', icon: <Code2 className="w-4 h-4" /> }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-white text-black'
                                        : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                                        }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.slice(0, 12).map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => navigate('/item', { state: project })}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10">
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
                                            <img
                                                src={project.projectImages[0] || 'https://via.placeholder.com/400x300'}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-cyan-600/0 group-hover:from-purple-600/20 group-hover:to-cyan-600/20 transition-all duration-500 z-10" />

                                            {/* Badge */}
                                            {project.projectLink && (
                                                <div className="absolute top-4 right-4 z-20">
                                                    <div className="flex items-center space-x-1 px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                        <span className="text-xs font-medium">Live</span>
                                                    </div>
                                                </div>
                                            )}

                                            {project.isPin && (
                                                <div className="absolute top-4 left-4 z-20">
                                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${project.isWeb
                                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                                    }`}>
                                                    {project.isWeb ? 'Web' : 'Mobile'}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-white/40 line-clamp-2 mb-4">{project.desc}</p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.slice(0, 3).map((tag, tagIdx) => (
                                                    <span key={tagIdx} className="px-2 py-1 text-xs bg-white/[0.05] text-white/50 rounded-lg border border-white/[0.05]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Hover Arrow */}
                                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                            <div className="p-3 bg-white rounded-full">
                                                <ArrowRight className="w-4 h-4 text-black" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {filteredProjects.length > 12 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <button
                                onClick={() => navigate('/allitems')}
                                className="inline-flex items-center space-x-3 px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-2xl font-medium transition-all group"
                            >
                                <span>View All Projects</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Reviews Section - Ultra Enhanced */}
            {reviews.length > 0 && (
                <section className="py-32 relative overflow-hidden">
                    {/* Enhanced Background decoration */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />
                        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[200px]" />

                        {/* Floating Stars Decoration */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.2, 0.5, 0.2],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: 4 + i,
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                                className="absolute"
                                style={{
                                    top: `${15 + i * 15}%`,
                                    left: i % 2 === 0 ? `${5 + i * 3}%` : 'auto',
                                    right: i % 2 === 1 ? `${5 + i * 3}%` : 'auto',
                                }}
                            >
                                <Star className="w-4 h-4 text-yellow-400/30 fill-yellow-400/30" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="container mx-auto px-6 relative">
                        {/* Section Header - Enhanced */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            {/* Rating Badge */}


                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                <span className="text-white">What Clients </span>
                                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Say</span>
                            </h2>
                            <p className="text-white/50 max-w-2xl mx-auto text-lg">
                                Real experiences from clients who trusted us with their vision
                            </p>
                        </motion.div>

                        {/* Review Card - Enhanced */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative max-w-4xl mx-auto"
                        >
                            {/* Card glow - animated */}
                            <motion.div
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 via-purple-600/20 to-fuchsia-600/30 rounded-[3rem] blur-2xl"
                            />

                            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.1] rounded-[2.5rem] p-6 md:p-10 overflow-hidden">
                                {/* Decorative corner elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-bl-full" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-fuchsia-500/10 to-transparent rounded-tr-full" />

                                {/* Large Quote Icon - Left */}
                                <div className="absolute -top-6 left-10 md:left-16">
                                    <motion.div
                                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                                        transition={{ duration: 6, repeat: Infinity }}
                                        className="relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-lg opacity-50" />
                                        <div className="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Quote Icon - Right (closing) */}
                                <div className="absolute -bottom-6 right-10 md:right-16">
                                    <motion.div
                                        animate={{ rotate: [0, -5, 0, 5, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                                        className="relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-2xl blur-lg opacity-50" />
                                        <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-fuchsia-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/25">
                                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentReviewIndex}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="pt-8"
                                    >
                                        {/* Stars */}
                                        <div className="flex justify-center gap-1 mb-8">
                                            {[...Array(reviews[currentReviewIndex]?.rating || 5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <Star className="w-6 h-6 md:w-7 md:h-7 text-yellow-400 fill-yellow-400" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-10 leading-relaxed text-center">
                                            "{reviews[currentReviewIndex]?.text}"
                                        </p>

                                        {/* Reviewer Info */}
                                        <div className="flex flex-col items-center">
                                            {reviews[currentReviewIndex]?.avatar && (
                                                <div className="relative mb-4">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                        className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-lg"
                                                    />
                                                    <img
                                                        src={reviews[currentReviewIndex].avatar}
                                                        alt={reviews[currentReviewIndex].name}
                                                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-3 border-white/20"
                                                    />
                                                </div>
                                            )}
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 font-bold text-white text-xl md:text-2xl mb-1">
                                                    {reviews[currentReviewIndex]?.name}
                                                    {/* Verified Badge */}
                                                    <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="text-white/50 text-lg mb-2">
                                                    {reviews[currentReviewIndex]?.role}
                                                </div>
                                                {/* Verified Client Badge */}
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                    Verified Client
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>


                                {/* Navigation Arrows - Outside Card */}
                            </div>

                            {/* Navigation Arrows at far edges */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none" style={{ left: '-140px', right: '-140px' }}>
                                <button
                                    onClick={() => setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                                    className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-violet-500/20 hover:border-violet-500/30 transition-all duration-300 shadow-lg hidden lg:flex"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)}
                                    className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-violet-500/20 hover:border-violet-500/30 transition-all duration-300 shadow-lg hidden lg:flex"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Navigation Arrows */}
                            <div className="flex justify-center gap-4 mt-6 lg:hidden">
                                <button
                                    onClick={() => setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                                    className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-violet-500/20 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)}
                                    className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-violet-500/20 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Dots Navigation */}
                            <div className="flex justify-center gap-2 mt-8">
                                {reviews.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentReviewIndex(idx)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentReviewIndex
                                            ? 'w-10 bg-gradient-to-r from-violet-500 to-fuchsia-500'
                                            : 'w-2.5 bg-white/20 hover:bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Review Counter */}
                            <div className="text-center mt-6 text-white/40 text-sm">
                                {currentReviewIndex + 1} / {reviews.length}
                            </div>
                        </motion.div>

                    </div>

                </section>

            )}
            {/* <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full border border-yellow-500/20 mb-6"
            >
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>
                <span className="text-sm font-medium text-yellow-400">5.0 Average Rating</span>
                <span className="text-white/30">•</span>
                <span className="text-sm text-white/50">{reviews.length} Reviews</span>
            </motion.div> */}

            {/* Contact Section with Form */}
            <ContactSection />

            {/* Footer - Enhanced */}
            <footer className="relative pt-16 pb-8 overflow-hidden">
                {/* Gradient line at top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

                {/* Background glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 relative">
                    <div className="flex flex-col items-center text-center mb-12">
                        {/* Logo/Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                {headerData.title}
                            </span>
                        </motion.div>

                        {/* Enhanced Tagline Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative mb-16 max-w-3xl mx-auto"
                        >
                            {/* Ambient Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 relative z-10">
                                <span className="text-white drop-shadow-lg">Building </span>
                                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-lg">
                                    Exceptional
                                </span>
                                <br />
                                <span className="text-white/80">Digital Experiences</span>
                            </h3>

                            <div className="flex items-center justify-center gap-4 text-white/40 mb-8 relative z-10">
                                <span className="h-px w-8 bg-white/20" />
                                <span className="uppercase tracking-[0.2em] text-sm font-medium">with modern technologies</span>
                                <span className="h-px w-8 bg-white/20" />
                            </div>

                            {/* Tech Stack Icons - Floating */}
                            <div className="flex flex-wrap justify-center gap-3 relative z-10">
                                {['React', 'Flutter', 'Firebase', 'Laravel', 'Node', 'TypeScript'].map((tech, idx) => (
                                    <motion.div
                                        key={tech}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                        whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                        className="px-4 py-2 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl text-sm text-white/60 cursor-default transition-colors shadow-lg shadow-black/20"
                                    >
                                        {tech}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <div className="flex gap-3 mb-10">
                            {socialLinks.slice(0, 5).map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-violet-500/20 hover:border-violet-500/30 transition-all duration-300"
                                >
                                    {getSocialIcon(link.icon)}
                                </a>
                            ))}
                        </div>

                        {/* Back to top button */}
                        <motion.button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            whileHover={{ y: -3 }}
                            className="group flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-violet-500/30 group-hover:bg-violet-500/10 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </div>
                            <span className="text-xs">Back to top</span>
                        </motion.button>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-white/[0.05] pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-white/30">
                                © {new Date().getFullYear()} {headerData.title}. All rights reserved.
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-sm text-white/30">Available for work</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient 6s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default HomeTemplate2;
