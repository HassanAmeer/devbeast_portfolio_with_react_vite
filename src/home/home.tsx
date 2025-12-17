import { useState, useEffect } from 'react';

import { Github, Linkedin, Twitter, Code2, Smartphone, Globe, Star, Award, Users, CheckCircle, Menu, X, ArrowRight, ExternalLink, Instagram, Facebook, Youtube, Music2, Send, DessertIcon, Camera, Link, ArrowBigDownDashIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import person1 from '../assets/person1.png';
import services1 from '../assets/services1.png';
import services2 from '../assets/services2.png';
import ContactSection from './contact';
import BringSection from './bring';
import { doc, getDoc, collection, getDocs, query, orderBy, where, serverTimestamp, addDoc } from 'firebase/firestore';
import { db, heroSectionCollectionId, mainCollection, projectsCollection, projectsCollectionId, reviewsCollection, reviewsCollectionId, socialLinksCollectionId } from '../config/fbconfig';
import { preloadProjectImages } from '../utils/imageCache';



interface Project {
    id: string;           // ← CHANGE FROM number TO string
    title: string;
    desc: string;
    tags: string[];
    projectImages: string[];  // or { url: string; name: string }[]
    githubLink: string;
    projectLink: string;
    totalTeams: string;
    isWeb: boolean;
    isPin: boolean;
    createdAt?: any;
    updatedAt?: any;
}

// interface ContactInfo {
//     email: string;
//     phone: string;
//     location: string;
// }

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'telegram' | 'discord' | 'snapchat' | 'globe';
}

// interface ContactMessage {
//     id: string;
//     phone: string;
//     email: string;
//     desc: string;
//     createdAt: string;
//     read: boolean;
// }

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

const Portfolio = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine default tab based on URL path
    const getDefaultTab = () => {
        if (location.pathname === '/apps') return 'app';
        if (location.pathname === '/web') return 'web';
        return 'all';
    };

    const [activeTab, setActiveTab] = useState(getDefaultTab());
    // const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [scrolled] = useState(false);
    const [mousePosition] = useState({ x: 0, y: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);


    const [logoSrc, setLogoSrc] = useState(services1);



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



    ////////// now getting data from firebase and set it

    // Editable data states
    const [heroData, setHeroData] = useState({
        title: 'FLUTTER, REACT, AND LARAVEL DEVELOPER',
        subtitle: 'Senior Developer',
        desc: 'Senior Full-Stack Developer specializing in -- Flutter, Laravel, and React -- transforming ideas into stunning reality',
        image: person1,
        btn_name_1: 'Portfolio',
        btn_link_1: '#',
        btn_name_2: 'Github',
        btn_link_2: '#',
        card_title_1: '4+',
        card_subtitle_1: 'Years Experience',
        card_title_2: '150+',
        card_subtitle_2: 'Projects Completed',
        card_title_3: '90%',
        card_subtitle_3: 'Happy Clients',
        card_title_4: '4.9',
        card_subtitle_4: 'Average Rating'
    });

    const [projects, setProjects] = useState<Project[]>([]);

    const [headerData, setHeaderData] = useState<HeaderData>({
        title: 'DeavBeast',
        subtitle: 'Senior Flutter Developer',
        logo: '',
    });

    // const [contactInfo, setContactInfo] = useState<ContactInfo>({
    //     email: 'devbeast143@gmail.com',
    //     phone: '+921234567',
    //     location: 'Lahore Pakistan',
    // });

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        { id: '1', platform: 'Github', url: 'https://github.com', icon: 'github' },
        { id: '2', platform: 'Linkedin', url: 'https://linkedin.com', icon: 'linkedin' },
        { id: '3', platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
        { id: '4', platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
        { id: '5', platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
        { id: '6', platform: 'Youtube', url: 'https://youtube.com', icon: 'youtube' },
        { id: '7', platform: 'Tiktok', url: 'https://tiktok.com', icon: 'tiktok' },
        { id: '8', platform: 'Telegram', url: 'https://telegram.com', icon: 'telegram' },
        { id: '9', platform: 'Discord', url: 'https://discord.com', icon: 'discord' },
        { id: '10', platform: 'Snapchat', url: 'https://snapchat.com', icon: 'snapchat' },
        { id: '12', platform: 'Globe', url: 'https://globe.com', icon: 'globe' }
    ]);



    // const [currentAdminData, setCurrentAdminData] = useState<{ email: string, pass: string } | null>(null);

    useEffect(() => {

        // const deviceInfo = getDeviceName();
        // console.log('Device:', deviceInfo.full);

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
                    // setContactInfo({
                    //     email: data.email || '',
                    //     phone: data.phone || '',
                    //     location: data.location || ''
                    // });
                    setSocialLinks([
                        { id: '1', platform: 'Github', url: data.github || '', icon: 'github' },
                        { id: '2', platform: 'Linkedin', url: data.linkedin || '', icon: 'linkedin' },
                        { id: '3', platform: 'Twitter', url: data.twitter || '', icon: 'twitter' },
                        { id: '4', platform: 'Instagram', url: data.instagram || '', icon: 'instagram' },
                        { id: '5', platform: 'Facebook', url: data.facebook || '', icon: 'facebook' },
                        { id: '6', platform: 'Youtube', url: data.youtube || '', icon: 'youtube' },
                        { id: '7', platform: 'Tiktok', url: data.tiktok || '', icon: 'tiktok' },
                        { id: '8', platform: 'Telegram', url: data.telegram || '', icon: 'telegram' },
                        { id: '9', platform: 'Discord', url: data.discord || '', icon: 'discord' },
                        { id: '10', platform: 'Snapchat', url: data.snapchat || '', icon: 'snapchat' },
                        { id: '11', platform: 'Globe', url: data.globe || '', icon: 'globe' }
                    ]);
                }
                // console.log("loadSocialLinksData loaded:", docSnap.data);s
            } catch (error) {
                console.error('Error loading admin data:', error);
            } finally {
                // setIsLoadingData(false);
            }
        };
        // Load loadHearoData
        const loadHeroData = async () => {
            try {
                const docRef = doc(db, mainCollection, heroSectionCollectionId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setHeroData({
                        title: data.title || 'Flutter, React, Laravel',
                        subtitle: data.subtitle || 'Senior Developer',
                        desc: data.desc || 'Senior Full-Stack Developer specializing in -- Flutter, Laravel, and React -- transforming ideas into stunning reality',
                        image: data.image || '',
                        btn_name_1: data.btn_name_1 || 'Portfolio',
                        btn_link_1: data.btn_link_1 || '#',
                        btn_name_2: data.btn_name_2 || 'Github',
                        btn_link_2: data.btn_link_2 || '#',
                        card_title_1: data.card_title_1 || '4+',
                        card_subtitle_1: data.card_subtitle_1 || 'Years Experience',
                        card_title_2: data.card_title_2 || '150+',
                        card_subtitle_2: data.card_subtitle_2 || 'Projects Completed',
                        card_title_3: data.card_title_3 || '90%',
                        card_subtitle_3: data.card_subtitle_3 || 'Happy Clients',
                        card_title_4: data.card_title_4 || '4.9',
                        card_subtitle_4: data.card_subtitle_4 || 'Average Rating'
                    });
                }
                // console.log("loadHeroData loaded:", docSnap.data);
            } catch (error) {
                console.error('Error loading admin data:', error);
            } finally {
                // setIsLoadingData(false);
            }
        };


        const loadProjectsData = async () => {
            try {
                setLoading(true);
                const projectsCollectionRef = collection(db, mainCollection, projectsCollectionId, projectsCollection);
                const q = query(projectsCollectionRef,
                    where('isHide', '==', false),
                    orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedProjects: Project[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,                    // ← string, matches your interface
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

                // Sort projects: pinned first, then by createdAt desc
                fetchedProjects.sort((a, b) => {
                    if (a.isPin !== b.isPin) {
                        return a.isPin ? -1 : 1;
                    }
                    if (a.createdAt && b.createdAt) {
                        return b.createdAt.toMillis() - a.createdAt.toMillis();
                    }
                    return 0;
                });

                setLoading(false);
                setProjects(fetchedProjects);
                preloadProjectImages(fetchedProjects);
                console.log("Projects loaded:", fetchedProjects);
            } catch (error) {
                console.error('Error loading admin data:', error);
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
                console.log("Reviews loaded:", fetchedReviews);
            } catch (error) {
                console.error('Error loading reviews:', error);
            } finally {
                // setIsLoadingData(false);
            }
        };

        loadReviewsData();
        loadHeroData();
        loadSocialLinksData();
        if (projects.length === 0) {
            loadProjectsData();
        }
    }, []);



    useEffect(() => {
        if (headerData.logo) {
            const images = [services1, headerData.logo, services1];
            let index = 0;
            const interval = setInterval(() => {
                setLogoSrc(images[index]);
                index = (index + 1) % images.length;
            }, 1200);
            return () => clearInterval(interval);
        }
    }, [headerData.logo]);


    const addReview = async (newReview: Omit<Review, 'id'>) => {
        try {
            setLoader(true);
            const reviewsCollectionRef = collection(db, mainCollection, reviewsCollectionId, reviewsCollection);

            const reviewData = {
                name: newReview.name,
                role: newReview.role,
                text: newReview.text,
                rating: newReview.rating,
                avatar: newReview.avatar,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const docRef = await addDoc(reviewsCollectionRef, reviewData);

            const fullReview: Review = {
                ...newReview,
                id: docRef.id,
            };

            setReviews(prev => [...prev, fullReview]);
            console.log("Review added successfully:", docRef.id);
            alert('Review added successfully!');
        } catch (error) {
            console.error("Error adding review:", error);
            alert('Failed to add review. Please try again.');
        } finally {
            setLoader(false);
        }
    };



    //////////


    // Reviews state
    const [reviews, setReviews] = useState<Review[]>([
        // {
        //     id: '1',
        //     name: 'Sarah Johnson',
        //     role: 'CEO, TechStart Inc',
        //     text: 'Exceptional work! The app exceeded all expectations. Professional, fast, and delivered a product that our users absolutely love.',
        //     rating: 5,
        //     avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
        // },
        // {
        //     id: '2',
        //     name: 'Michael Chen',
        //     role: 'CTO, FinanceHub',
        //     text: 'Best developer we have worked with. Clean code, great architecture, and outstanding communication throughout the project.',
        //     rating: 5,
        //     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
        // },
        // {
        //     id: '3',
        //     name: 'Emma Davis',
        //     role: 'Product Lead, Innovate',
        //     text: 'Transformed our vision into reality. The attention to detail and user experience is phenomenal. Highly recommend!',
        //     rating: 5,
        //     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
        // }
    ]);

    // Review form state
    const [reviewForm, setReviewForm] = useState({
        name: '',
        role: '',
        text: '',
        rating: 5,
        avatar: ''
    });
    const [showReviewModal, setShowReviewModal] = useState(false);



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

    // const stats = [
    //     { icon: <Award className="w-8 h-8" />, number: '4+', label: 'Years Experience', color: 'from-purple-500 to-pink-500' },
    //     { icon: <CheckCircle className="w-8 h-8" />, number: '150+', label: 'Projects Completed', color: 'from-blue-500 to-cyan-500' },
    //     { icon: <Users className="w-8 h-8" />, number: '90%', label: 'Happy Clients', color: 'from-green-500 to-emerald-500' },
    //     { icon: <Star className="w-8 h-8" />, number: '4.9', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' }
    // ];

    const filteredProjects = activeTab === 'all'
        ? projects
        : activeTab === 'web'
            ? projects.filter(p => p.isWeb)
            : projects.filter(p => !p.isWeb);

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
                            <a href="/" className="flex items-center space-x-3 group cursor-pointer">

                                {/* <img src={services1} alt="" className="w-20" /> */}
                                <div className="relative animate-pulse w-14 h-8">
                                    {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all" /> */}
                                    {/* <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl font-black shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"> */}
                                    {/* <Code2 className="w-7 h-7 text-white" /> */}
                                    <img src={logoSrc} alt="" className="absolute inset-0 transition-opacity duration-500" />
                                    {/* </div> */}
                                </div>


                                <div>
                                    <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                        {headerData.title}
                                    </h1>
                                    <p className="text-xs text-gray-400 font-medium">
                                        {headerData.subtitle}
                                    </p>
                                </div>
                            </a>

                            <nav className="hidden md:flex items-center space-x-1">
                                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={item === 'Projects' ? '/allitems' : `#${item.toLowerCase()}`}
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
                                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={item === 'Projects' ? '/allitems' : `#${item.toLowerCase()}`}
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

                    <div className="container mx-auto px-0 relative z-20 flex flex-col md:flex-row items-center justify-center">
                        <div className="text-center max-w-5xl mx-auto md:pt-0 pt-20">

                            <motion.h2
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                                <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                    {heroData.title}
                                </span>
                                <br />
                                <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                    {heroData.subtitle}
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
                                {heroData.desc.split('--').map((part, index) =>
                                    index % 2 === 1 ? (
                                        <span key={index} className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                                            {part}
                                        </span>
                                    ) : (
                                        part
                                    )
                                )}
                            </motion.p>



                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                                <div className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-10 group-hover:opacity-60 transition-all duration-500" />
                                    <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all transform hover:scale-120 hover:-translate-y-1 duration-300">
                                        <div className="flex justify-center mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                            <Award className="w-8 h-8" />
                                        </div>
                                        <div className="text-4xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">
                                            {heroData.card_title_1}
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">{heroData.card_subtitle_1}</div>
                                    </div>
                                </div>
                                <div className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-10 group-hover:opacity-60 transition-all duration-500" />
                                    <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all transform hover:scale-120 hover:-translate-y-1 duration-300">
                                        <div className="flex justify-center mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <div className="text-4xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-1">
                                            {heroData.card_title_2}
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">{heroData.card_subtitle_2}</div>
                                    </div>
                                </div>
                                <div className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-10 group-hover:opacity-60 transition-all duration-500" />
                                    <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all transform hover:scale-120 hover:-translate-y-1 duration-300">
                                        <div className="flex justify-center mb-3 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                                            <Users className="w-8 h-8" />
                                        </div>
                                        <div className="text-4xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-1">
                                            {heroData.card_title_3}
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">{heroData.card_subtitle_3}</div>
                                    </div>
                                </div>
                                <div className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-10 group-hover:opacity-60 transition-all duration-500" />
                                    <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all transform hover:scale-120 hover:-translate-y-1 duration-300">
                                        <div className="flex justify-center mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                                            <Star className="w-8 h-8" />
                                        </div>
                                        <div className="text-4xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-1">
                                            {heroData.card_title_4}
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">{heroData.card_subtitle_4}</div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex flex-wrap justify-center gap-4 pt-8">
                                {heroData.btn_link_1 ? <a
                                    href={heroData.btn_link_1}
                                    className="group relative px-8 py-4 rounded-2xl font-bold overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 transition-all duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    <span className="relative flex items-center space-x-2 text-white">
                                        <span>{heroData.btn_name_1}</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a> : ''}

                                {heroData.btn_link_2 ?
                                    <a
                                        href={heroData.btn_link_2}
                                        target="_blank"
                                        className="group relative px-8 py-4 rounded-2xl font-bold border-2 border-purple-500/30 hover:border-purple-500 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all">
                                        <span className="flex items-center space-x-2">
                                            <Link className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                            <span>{heroData.btn_name_2}</span>
                                        </span>
                                    </a> : ""}
                            </motion.div>
                        </div>

                        <motion.img
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 0.8 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            src={heroData.image}
                            alt="Workspace"
                            className="w-1/2 bject-cover opacity-80 md:w-1/3 pt-10 md:pt-0"
                        />
                    </div>

                </section>
                {/* Modern Platforms Marquee with Logos */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="py-8 relative inline-flex " >
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-950/20 to-black" /> */}
                    <div className="hidden md:inline-flex mb-2 items-center space-x-2 px-6 py-3 rounded-half backdrop-blur-xl">
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
                                        <div className="relative flex items-center space-x-4 px-2 md:px-6 py-2 bg-black/40 backdrop-blur-xl rounded-2xl transition-all hover:scale-110 transform duration-300">
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

                </motion.section>
                <hr style={{ border: 0, height: 1 }} className="bg-gray-700" />

                {/* Services Showcase Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="py-8 relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                Our Services
                            </h3>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Perfect solutions for mobile and web development that bring your ideas to life with stunning animations and seamless experiences.
                            </p>
                        </div>
                        <img src={services2} alt="" className="w-full object-cover" />

                    </div>
                </motion.section>

                <BringSection />
                <hr style={{ border: 0, height: 1 }} className="bg-gray-700 mt-0" />

                {/* Projects with Real Images */}
                <motion.section
                    id="projects"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
                    <div className="container mx-auto px-2 relative z-10">
                        <div className="text-center mb-12">
                            {/* <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full text-sm font-bold text-purple-300 border border-purple-500/30 mb-6">
                                PORTFOLIO
                            </div> */}
                            <motion.h3
                                initial={{ y: -30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                Featured Projects
                            </motion.h3>
                            {/* <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                                Innovative solutions that push boundaries
                            </p> */}
                        </div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-4 mb-16">
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
                        </motion.div>

                        {loading ? (
                            <center className='md:pt-20 pt-20'>
                                <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                            </center>
                        ) : (
                            <></>
                        )}

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProjects.map((project, idx) => idx < 20 ? (
                                <motion.div
                                    onClick={() => navigate('/item', { state: project })} // passing full data
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative md:pt-8 rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${project.isWeb ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'} opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl`} />

                                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all rounded-3xl overflow-hidden">
                                        {project.projectLink && (
                                            <div className="absolute top-4 right-4 z-20">
                                                <div className="flex items-center space-x-2 px-2 py-1 bg-purple-500/90 opacity-70 backdrop-blur-xl rounded-full text-xs font-bold shadow-lg">
                                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                    <span>Open</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="relative h-60 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                                            <img
                                                src={project.projectImages[0] || 'https://via.placeholder.com/400x300'}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                            />
                                        </div>

                                        <div className="p-2">
                                            <h4 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                                                {project.title}
                                            </h4>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                                {project.desc}
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
                                </motion.div>
                            ) : (<></>))}
                        </div>
                    </div>
                </motion.section>
                <center>
                    <button
                        onClick={() => navigate('/allitems')} // passing full data
                        className="flex items-center md:mb-20 mb-10 space-x-2 text-purple-400 hover:text-cyan-400 transition-all group/btn">
                        <ArrowBigDownDashIcon className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform animate-bounce" />
                        <span className="text-lg font-bold">View More</span>
                    </button>
                </center>

                <hr style={{ border: 0, height: 1 }} className="bg-gray-700" />

                {/* Testimonials */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="py-24 container mx-auto px-4">
                    <div className="text-center mb-16">
                        {/* <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full text-sm font-bold text-purple-300 border border-purple-500/30 mb-6">
                            TESTIMONIALS
                        </div> */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                            <motion.h3
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                Client Success Stories
                            </motion.h3>
                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="group relative px-6 py-3 rounded-2xl font-bold border border-white/40 hover:border-white/70 transition-all transform hover:scale-105 shadow-lg shadow-white/10"
                            >
                                <span className="flex items-center space-x-2 text-white">
                                    <span>Add Review</span>
                                    <Star className="w-5 h-5 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-all" />
                                </span>
                            </button>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="gap-4 flex flex-row items-center overflow-x-auto">
                        {reviews.map((r, idx) => (
                            <div
                                key={idx}
                                className="group relative flex-shrink-0 w-[280px] md:w-1/3 lg:w-1/3"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="relative p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all transform scale-90 hover:scale-95 hover:-translate-y-2 duration-500">
                                    <div className="flex mb-4">
                                        {[...Array(r.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 mb-6 italic leading-relaxed text-sm">
                                        "{r.text}"
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={r.avatar}
                                            alt={r.name}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/50"
                                        />
                                        <div>
                                            <div className="font-bold text-white">{r.name}</div>
                                            <div className="text-sm text-gray-400">{r.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Add Review Modal */}
                {
                    showReviewModal && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            <div className="bg-black/90 backdrop-blur-xl rounded-3xl border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                            Add Your Review
                                        </h3>
                                        <button
                                            onClick={() => setShowReviewModal(false)}
                                            className="text-gray-400 hover:text-white transition-all"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        if (!reviewForm.name || !reviewForm.text) return;

                                        const newReview: Omit<Review, 'id'> = {
                                            name: reviewForm.name,
                                            role: reviewForm.role || 'Client',
                                            text: reviewForm.text,
                                            rating: reviewForm.rating,
                                            avatar: reviewForm.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewForm.name)}&background=random&color=fff&size=100`
                                        };

                                        try {
                                            await addReview(newReview);
                                            setReviewForm({ name: '', role: '', text: '', rating: 5, avatar: '' });
                                            setShowReviewModal(false);
                                        } catch (error) {
                                            console.error('Error submitting review:', error);
                                        }
                                    }} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                                            <input
                                                type="text"
                                                value={reviewForm.name}
                                                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                                            <input
                                                type="text"
                                                value={reviewForm.role}
                                                onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all"
                                                placeholder="e.g. Ecommerce, chating App"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Avatar Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onload = (event) => {
                                                            const base64 = event.target?.result as string;
                                                            if (base64) {
                                                                setReviewForm({ ...reviewForm, avatar: base64 });
                                                            }
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                            />
                                            {reviewForm.avatar && reviewForm.avatar.startsWith('data:image/') && (
                                                <div className="mt-4">
                                                    <img
                                                        src={reviewForm.avatar}
                                                        alt="Avatar Preview"
                                                        className="w-16 h-16 object-cover rounded-full border-2 border-purple-500/50"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                        className="focus:outline-none"
                                                    >
                                                        <Star
                                                            className={`w-6 h-6 ${star <= reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'} hover:text-yellow-400 transition-all`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Review *</label>
                                            <textarea
                                                value={reviewForm.text}
                                                onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all resize-none"
                                                rows={4}
                                                placeholder="Share your experience..."
                                                required
                                            />
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowReviewModal(false)}
                                                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loader || !reviewForm.name || !reviewForm.text}
                                                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-bold hover:from-cyan-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loader ? (
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                                                ) : (
                                                    'Submit Review'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Contact Section */}
                <ContactSection></ContactSection>


                {/* Modern Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="border-t border-white/5 bg-black/60 backdrop-blur-xl py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 mb-4">
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-lg opacity-50" />
                                        <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                            {/* <Code2 className="w-6 h-6 text-white" /> */}
                                            <img src={headerData.logo} alt="" />
                                        </div>
                                    </div>
                                    <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                        {headerData.title}
                                    </span>
                                </div>
                                <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                                    Senior Full-Stack Developer crafting exceptional digital experiences with cutting-edge technologies. Let's build something amazing together.
                                </p>
                                <div className="flex space-x-4 flex-wrap">
                                    {socialLinks.filter(link => link.url && link.url.trim() !== '').map((link) => {
                                        const Icon = {
                                            github: Github,
                                            linkedin: Linkedin,
                                            twitter: Twitter,
                                            instagram: Instagram,
                                            facebook: Facebook,
                                            youtube: Youtube,
                                            tiktok: Music2,
                                            telegram: Send,
                                            discord: DessertIcon,
                                            snapchat: Camera,
                                            globe: Globe
                                        }[link.icon] || Github;

                                        return (
                                            <a
                                                key={link.id}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mb-2 md:mb-0 group relative w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 border border-white/10 hover:border-white/20"
                                            >
                                                <Icon className="w-5 h-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h5 className="font-bold mb-4 text-lg text-white">Quick Links</h5>
                                <ul className="space-y-2">
                                    {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                                        <li key={item}>
                                            <a href={item === 'Projects' ? '/allitems' : `#${item.toLowerCase()}`} className="text-gray-400 hover:text-purple-400 transition-all">
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
                                    © 2026 {headerData.title}. All rights reserved.
                                </p>
                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                    <a href="#" className="hover:text-purple-400 transition-all">Privacy Policy</a>
                                    <a href="#" className="hover:text-purple-400 transition-all">Terms of Service</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.footer>
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
        @keyframes fade-in {
           from {
             opacity: 0;
             transform: translateY(20px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         .animate-services {
           animation: fade-in 1s ease-out;
         }
      `}</style>
        </div>
    );
};

export default Portfolio;