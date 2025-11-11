import { useState, useEffect } from 'react';
import { browserName, browserVersion, osName, osVersion, deviceType, mobileModel, mobileVendor } from 'react-device-detect';

import {
    Edit3,
    Save,
    X,
    Plus,
    Trash2,
    Eye,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    Globe,
    Code2,
    Shield,
    User,
    Key,
    Link,
    MessageSquare,
    Instagram,
    Facebook,
    Youtube,
    Music2Icon,
    Star,
    Menu,

} from 'lucide-react';
import {
    collection, getDocs, doc, updateDoc, deleteDoc,
    query, orderBy, serverTimestamp, addDoc, getDoc
} from "firebase/firestore";
import { db } from '../config/fbconfig';

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
    createdAt?: any;
    updatedAt?: any;
}

interface ContactInfo {
    email: string;
    phone: string;
    location: string;
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
    desc: string;
    createdAt: any;
    read: boolean;
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

const AdminHomePage = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showAddProject, setShowAddProject] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [newProjectData, setNewProjectData] = useState<Partial<Project>>({
        title: '',
        desc: '',
        tags: [],
        projectImages: [],
        githubLink: '',
        projectLink: '',
        totalTeams: '0',
        isWeb: false
    });
    const [loader, setLoader] = useState(false);

    // Editable data states
    const [heroData, setHeroData] = useState({
        title: 'Akash Ameerasd',
        subtitle: 'Senior Developerasd',
        desc: 'Senior Full-Stack Developer specializing in Flutter, Laravel, and React — transforming ideas into stunning realityasdsf',
        image: 'https://thelocalrent.com/link/v.php?t=1762852463&tk=37160f2e00721d906831565829ae1de7',
        btn_name_1: 'View Portfolio',
        btn_link_1: '#',
        btn_name_2: 'View Portfolio',
        btn_link_2: 'asd#',
        card_title_1: '4+adsf',
        card_subtitle_1: 'Yeaadsrs Experience',
        card_title_2: '150+ds',
        card_subtitle_2: 'Projecasdsts Completed',
        card_title_3: '90%ads',
        card_subtitle_3: 'Happadsy Clients',
        card_title_4: '4.9dfv',
        card_subtitle_4: 'Aveadsfrage Rating'
    });

    const [projects, setProjects] = useState<Project[]>([
        {
            id: '1',
            title: 'FinTech Mobile Banking',
            desc: 'Advanced banking platform with AI-powered fraud detection, biometric authentication, and real-time cryptocurrency trading.',
            tags: ['Flutter', 'Dart', 'Firebase', 'TensorFlow'],
            projectLink: '',
            isWeb: true,
            totalTeams: '0',
            githubLink: '',
            projectImages: []
        },
        {
            id: '2',
            title: 'AI Healthcare Platform',
            desc: 'Revolutionary telemedicine app with AI diagnosis, ML-powered health predictions, and secure patient data management.',
            tags: ['Flutter', 'Laravel', 'MySQL', 'AI'],
            projectLink: '',
            isWeb: true,
            totalTeams: '0',
            githubLink: '',
            projectImages: []
        }
    ]);

    const [headerData, setHeaderData] = useState<HeaderData>({
        title: 'DeavBeast',
        subtitle: 'Senio Flutter Developer',
        logo: '',
    });

    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        email: 'devbeast143@gmail.com',
        phone: '+921234567',
        location: 'Lahore Pakistan',
    });

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        { id: '1', platform: 'Github', url: 'github.com', icon: 'github' },
        { id: '2', platform: 'Linkedin', url: 'linkedin.com', icon: 'linkedin' },
        { id: '3', platform: 'Twitter', url: 'twitter.com', icon: 'twitter' },
        { id: '4', platform: 'Instagram', url: 'instagram.com', icon: 'instagram' },
        { id: '5', platform: 'Facebook', url: 'facebook.com', icon: 'facebook' },
        { id: '6', platform: 'Youtube', url: 'youtube.com', icon: 'youtube' },
        { id: '7', platform: 'Tiktok', url: 'tiktok.com', icon: 'tiktok' },
        { id: '8', platform: 'Telegram', url: 'telegram.com', icon: 'telegram' },
        { id: '9', platform: 'Discord', url: 'discord.com', icon: 'discord' },
        { id: '10', platform: 'Snapchat', url: 'snapchat.com', icon: 'snapchat' },
        { id: '12', platform: 'Globe', url: 'globe.com', icon: 'globe' }
    ]);

    const [messages, setMessages] = useState<ContactMessage[]>([
        {
            id: '1',
            phone: '0301234567',
            email: 'john@example.com',
            desc: 'Hi Akash, I loved your AI Healthcare app. Can we discuss a partnership?',
            createdAt: 'Nov 10, 2025',
            read: false
        },
        {
            id: '2',
            phone: '0301234567',
            email: 'sarah@startup.io',
            desc: 'We are hiring senior developers. Your portfolio is impressive!',
            createdAt: 'Nov 9, 2025',
            read: true
        }
    ]);

    const [adminCredentials, setAdminCredentials] = useState({
        currentPassword: '',
        newEmail: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [currentAdminData, setCurrentAdminData] = useState<{ email: string, pass: string } | null>(null);

    // Reviews state
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: '1',
            name: 'Sarah Johnson',
            role: 'CEO, TechStart Inc',
            text: 'Exceptional work! The app exceeded all expectations. Professional, fast, and delivered a product that our users absolutely love.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
        },
        {
            id: '2',
            name: 'Michael Chen',
            role: 'CTO, FinanceHub',
            text: 'Best developer we have worked with. Clean code, great architecture, and outstanding communication throughout the project.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
        },
        {
            id: '3',
            name: 'Emma Davis',
            role: 'Product Lead, Innovate',
            text: 'Transformed our vision into reality. The attention to detail and user experience is phenomenal. Highly recommend!',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
        }
    ]);

    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [showAddReview, setShowAddReview] = useState(false);
    const [newReviewData, setNewReviewData] = useState<Partial<Review>>({
        name: '',
        role: '',
        text: '',
        rating: 5,
        avatar: ''
    });

    // useEffect(() => {
    //     const handleMouseMove = (e: MouseEvent) => {
    //         setMousePosition({
    //             x: (e.clientX / window.innerWidth) * 100,
    //             y: (e.clientY / window.innerHeight) * 100
    //         });
    //     };

    //     window.addEventListener('mousemove', handleMouseMove);
    //     return () => window.removeEventListener('mousemove', handleMouseMove);
    // }, []);

    useEffect(() => {

        // const deviceInfo = getDeviceName();
        // console.log('Device:', deviceInfo.full);

        const loadSocialLinsData = async () => {
            try {
                const docRef = doc(db, 'dev1', 'social_links');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setHeaderData({
                        title: data.title || '',
                        subtitle: data.subtitle || '',
                        logo: data.logo || ''
                    });
                    setContactInfo({
                        email: data.email || '',
                        phone: data.phone || '',
                        location: data.location || ''
                    });
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
            } catch (error) {
                console.error('Error loading admin data:', error);
            } finally {
                setIsLoadingData(false);
            }
        };
        // Load loadHearoData
        const loadHeroData = async () => {
            try {
                const docRef = doc(db, 'dev1', 'hero_section');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setHeroData({
                        title: data.title || 'Akash Ameer',
                        subtitle: data.subtitle || 'Senior Developer',
                        desc: data.desc || 'Senior Full-Stack Developer specializing in Flutter, Laravel, and React — transforming ideas into stunning reality',
                        image: data.image || '',
                        btn_name_1: data.btn_name_1 || 'View Portfolio',
                        btn_link_1: data.btn_link_1 || '#',
                        btn_name_2: data.btn_name_2 || 'View Portfolio',
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
            } catch (error) {
                console.error('Error loading admin data:', error);
            } finally {
                setIsLoadingData(false);
            }
        };
        // Load current admin data
        const loadAdminData = async () => {
            try {
                const docRef = doc(db, 'dev1', 'admin');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCurrentAdminData({
                        email: data.email || '',
                        pass: data.pass || ''
                    });
                }
            } catch (error) {
                console.error('Error loading admin data:', error);
            } finally {
                setIsLoadingData(false);
            }
        };

        const loadProjectsData = async () => {
            try {
                const projectsCollectionRef = collection(db, 'dev1', 'all_projects_id', 'projects');
                const q = query(projectsCollectionRef, orderBy('createdAt', 'desc'));
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
                    } as Project;
                });

                setProjects(fetchedProjects);
                console.log("Projects loaded:", fetchedProjects);
            } catch (error) {
                console.error('Error loading admin data:', error);
            } finally {
                setIsLoadingData(false);
            }
        };

        const loadReviewsData = async () => {
            try {
                const reviewsCollectionRef = collection(db, 'dev1', 'all_reviews_id', 'reviews');
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
                setIsLoadingData(false);
            }
        };
        const loadContactUsMessages = async () => {
            try {
                const contactUsCollectionRef = collection(db, 'dev1', 'contact_us_id', 'contact_us');
                const q = query(contactUsCollectionRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedContactUsMessages: ContactMessage[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        phone: data.phone,
                        email: data.email,
                        desc: data.desc,
                        createdAt: data.createdAt,
                        read: data.read,
                    } as ContactMessage;
                });

                setMessages(fetchedContactUsMessages);
                console.log("Projects loaded:", fetchedContactUsMessages);
            } catch (error) {
                console.error('Error loading admin data:', error);
            } finally {
                setIsLoadingData(false);
            }
        };

        loadAdminData();
        loadHeroData();
        loadSocialLinsData();
        loadProjectsData();
        loadReviewsData();
        loadContactUsMessages();
    }, []);

    const handleSave = async () => {
        try {
            if (activeSection === 'social') {
                setLoader(true);
                let logoToUpdate = headerData.logo;
                if (headerData.logo && headerData.logo.startsWith('data:image/')) {
                    logoToUpdate = await uploadFileByBase64(headerData.logo);
                }

                const updateData: any = {
                    title: headerData.title,
                    subtitle: headerData.subtitle,
                    email: contactInfo.email,
                    phone: contactInfo.phone,
                    location: contactInfo.location,
                    telegram: socialLinks.find(link => link.icon === 'telegram')?.url,
                    snapchat: socialLinks.find(link => link.icon === 'snapchat')?.url,
                    tiktok: socialLinks.find(link => link.icon === 'tiktok')?.url,
                    discord: socialLinks.find(link => link.icon === 'discord')?.url,
                    facebook: socialLinks.find(link => link.icon === 'facebook')?.url,
                    instagram: socialLinks.find(link => link.icon === 'instagram')?.url,
                    twitter: socialLinks.find(link => link.icon === 'twitter')?.url,
                    linkedin: socialLinks.find(link => link.icon === 'linkedin')?.url,
                    github: socialLinks.find(link => link.icon === 'github')?.url,
                    youtube: socialLinks.find(link => link.icon === 'youtube')?.url,
                    globe: socialLinks.find(link => link.icon === 'globe')?.url,
                };

                if (logoToUpdate !== "") {
                    updateData.logo = logoToUpdate;
                }

                const social_links = doc(db, 'dev1', 'social_links');
                await updateDoc(social_links, updateData);
                alert('Social settings saved successfully!');
                setLoader(false);
            } else if (activeSection === 'hero') {
                setLoader(true);
                let imageToUpdate = heroData.image;
                if (heroData.image && heroData.image.startsWith('data:image/')) {
                    imageToUpdate = await uploadFileByBase64(heroData.image);
                }

                const updateData: any = {
                    title: heroData.title,
                    subtitle: heroData.subtitle,
                    desc: heroData.desc,
                    btn_name_1: heroData.btn_name_1,
                    btn_link_1: heroData.btn_link_1,
                    btn_name_2: heroData.btn_name_2,
                    btn_link_2: heroData.btn_link_2,
                    card_title_1: heroData.card_title_1,
                    card_title_2: heroData.card_title_2,
                    card_title_3: heroData.card_title_3,
                    card_title_4: heroData.card_title_4,
                    card_subtitle_1: heroData.card_subtitle_1,
                    card_subtitle_2: heroData.card_subtitle_2,
                    card_subtitle_3: heroData.card_subtitle_3,
                    card_subtitle_4: heroData.card_subtitle_4,
                };

                if (imageToUpdate !== "") {
                    updateData.image = imageToUpdate;
                    heroData.image = imageToUpdate;
                }

                const hero_data = doc(db, 'dev1', 'hero_section');
                await updateDoc(hero_data, updateData);
                alert('Hero section saved successfully!');
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
            console.error('Error saving data:', error);
            alert('Failed to save changes. Please check the console for details.');
        } finally {
            setLoader(false);
        }
    };

    const handleUpdateCredentials = async () => {
        if (!adminCredentials.currentPassword || !adminCredentials.newPassword || !adminCredentials.confirmPassword) {
            alert('Please fill in all password fields');
            return;
        }

        if (adminCredentials.newPassword !== adminCredentials.confirmPassword) {
            alert('New passwords do not match');
            return;
        }

        if (adminCredentials.newPassword.length < 3) {
            alert('Password must be at least 3 characters long');
            return;
        }

        try {
            // First verify current password
            const docRef = doc(db, 'dev1', 'admin');
            setLoader(true);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const adminData = docSnap.data();
                const storedPassword = adminData.pass;

                if (adminCredentials.currentPassword === storedPassword) {
                    // Update password in Firestore
                    await updateDoc(docRef, {
                        pass: adminCredentials.newPassword,
                        email: adminCredentials.newEmail
                    });

                    // Clear form
                    setAdminCredentials({
                        currentPassword: '',
                        newEmail: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                    alert('Password updated successfully! Please log in again with your new password.');
                    // Redirect to login
                    // window.location.href = '/login';
                } else {
                    alert('Current password is incorrect');
                }
                setLoader(false);

            } else {
                setLoader(false);
                alert('Admin credentials not found');
            }
        } catch (error) {
            setLoader(false);
            console.error('Password update error:', error);
            alert('Failed to update password. Please try again.');
        }
    };

    const addProject = async (newProject: Omit<Project, 'id'>) => {
        try {
            setLoader(true);
            const projectsCollectionRef = collection(db, 'dev1', 'all_projects_id', 'projects');

            let uploadedImages: string[] = [];
            if (newProject.projectImages && newProject.projectImages.length > 0) {
                for (const img of newProject.projectImages) {
                    if (img.startsWith('data:image/')) {
                        const uploadedUrl = await uploadFileByBase64(img);
                        if (uploadedUrl) {
                            uploadedImages.push(uploadedUrl);
                        } else {
                            console.log("Failed to upload image:", img);
                        }
                    } else {
                        uploadedImages.push(img); // if already a URL
                    }
                }
            }

            const projectData = {
                title: newProject.title,
                desc: newProject.desc,
                tags: newProject.tags || [],
                projectImages: uploadedImages.length > 0 ? uploadedImages : ["11", "22"], // fallback
                githubLink: newProject.githubLink || '',
                projectLink: newProject.projectLink || '',
                totalTeams: newProject.totalTeams || '1',
                isWeb: newProject.isWeb || false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const docRef = await addDoc(projectsCollectionRef, projectData);

            const fullProject: Project = {
                ...newProject,
                id: docRef.id,
                projectImages: uploadedImages.length > 0 ? uploadedImages : newProject.projectImages || [],
            };

            setProjects(prev => [...prev, fullProject]);
            console.log("Project added successfully:", docRef.id);
            alert('Project added successfully!');
        } catch (error) {
            console.error("Error adding project:", error);
            alert('Failed to add project. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    const updateProjectData = async (updatedProject: Project) => {
        try {
            setLoader(true);
            const projectRef = doc(db, 'dev1', 'all_projects_id', 'projects', updatedProject.id);

            let uploadedImages: string[] = [];
            if (updatedProject.projectImages && updatedProject.projectImages.length > 0) {
                for (const img of updatedProject.projectImages) {
                    if (img.startsWith('data:image/')) {
                        const uploadedUrl = await uploadFileByBase64(img);
                        if (uploadedUrl) {
                            uploadedImages.push(uploadedUrl);
                        } else {
                            console.log("Failed to upload image:", img);
                        }
                    } else {
                        uploadedImages.push(img); // if already a URL
                    }
                }
            }

            const updateData: any = {
                title: updatedProject.title,
                desc: updatedProject.desc,
                tags: updatedProject.tags,
                githubLink: updatedProject.githubLink,
                projectLink: updatedProject.projectLink,
                totalTeams: updatedProject.totalTeams,
                isWeb: updatedProject.isWeb,
                updatedAt: serverTimestamp(),
            };

            if (uploadedImages.length > 0) {
                updateData.projectImages = uploadedImages;
            }

            await updateDoc(projectRef, updateData);

            const updatedProjectWithImages = {
                ...updatedProject,
                projectImages: uploadedImages.length > 0 ? uploadedImages : updatedProject.projectImages,
            };

            setProjects(projects.map(p => p.id === updatedProject.id ? updatedProjectWithImages : p));
            alert('Project updated successfully!');
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Failed to update project. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    /////////
    const uploadFileByBase64 = async (
        base64: string,
        token = '37160f2e00721d906831565829ae1de7',
        folder_name = 'portfolio_react_app',
        // from_device_name = 'react_app',
        is_secret = false
    ) => {
        // Use it
        const deviceInfo = getDeviceName();
        let from_device_name = deviceInfo.full;
        // console.log('Device:', deviceInfo.full);
        // Output: "Samsung Galaxy S23 - Chrome on Android 14"

        try {
            const payload = {
                token,
                folder_name,
                is_secret: is_secret ? "1" : "0",
                from_device_name,
                file_base64: base64.replace(/^data:image\/[a-z]+;base64,/, '') // Clean prefix
            };

            setLoader(true);
            const response = await fetch('https://thelocalrent.com/link/api/upload_base64.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json(); // ← NOW IT WORKS
            console.log('Upload Result:', result);
            console.log('Upload result.data:', result.link);

            if (result.success) {
                if (result.link) {
                    return result.link; // ← contains your public link
                }
                console.log("uploadFileByBase64 failed:");
                return "";
            } else {
                throw new Error(result.message);
            }

        } catch (error: any) {
            console.error('Upload failed:', error.message);
            alert('Upload failed: ' + error.message);
        } finally {
            setLoader(false);
        }
    };

    //////////


    const deleteProject = async (id: string) => {
        try {
            setLoader(true);
            const projectRef = doc(db, 'dev1', 'all_projects_id', 'projects', id);
            await deleteDoc(projectRef);

            setProjects(projects.filter(p => p.id !== id));
            alert('Project deleted successfully!');
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    const addReview = async (newReview: Omit<Review, 'id'>) => {
        try {
            setLoader(true);
            const reviewsCollectionRef = collection(db, 'dev1', 'all_reviews_id', 'reviews');

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

    const updateReviewData = async (updatedReview: Review) => {
        try {
            setLoader(true);

            let avatarToUpdate = updatedReview.avatar;
            if (updatedReview.avatar && updatedReview.avatar.startsWith('data:image/')) {
                avatarToUpdate = await uploadFileByBase64(updatedReview.avatar);
            }

            const reviewRef = doc(db, 'dev1', 'all_reviews_id', 'reviews', updatedReview.id);

            const updateData: any = {
                name: updatedReview.name,
                role: updatedReview.role,
                text: updatedReview.text,
                rating: updatedReview.rating,
                updatedAt: serverTimestamp(),
            };

            if (avatarToUpdate !== "") {
                updateData.avatar = avatarToUpdate;
            }
            await updateDoc(reviewRef, updateData);

            setReviews(reviews.map(r => r.id === updatedReview.id ? updatedReview : r));
            alert('Review updated successfully!');
        } catch (error) {
            console.error('Error updating review:', error);
            alert('Failed to update review. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    const deleteReview = async (id: string) => {
        try {
            setLoader(true);
            const reviewRef = doc(db, 'dev1', 'all_reviews_id', 'reviews', id);
            await deleteDoc(reviewRef);

            setReviews(reviews.filter(r => r.id !== id));
            alert('Review deleted successfully!');
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review. Please try again.');
        } finally {
            setLoader(false);
        }
    };


    const deleteMessage = async (id: string) => {
        try {
            setLoader(true);
            const messageRef = doc(db, 'dev1', 'contact_us_id', 'contact_us', id);
            await deleteDoc(messageRef);

            setMessages(messages.filter(m => m.id !== id));
            alert('Message deleted successfully!');
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    const markMessageAsRead = async (id: string) => {
        try {
            setLoader(true);
            const messageRef = doc(db, 'dev1', 'contact_us_id', 'contact_us', id);
            await updateDoc(messageRef, { read: true });

            setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
            alert('Message marked as read!');
        } catch (error) {
            console.error('Error marking message as read:', error);
            alert('Failed to mark message as read. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    const getDeviceName = () => {
        let device = '';

        if (mobileVendor && mobileModel) {
            device = `${mobileVendor} ${mobileModel}`; // e.g., "Samsung Galaxy S23"
        } else if (deviceType === 'tablet') {
            device = `${osName} Tablet`;
        } else if (deviceType === 'desktop') {
            device = `${osName} ${osVersion} PC`;
        } else {
            device = `${osName} Device`;
        }

        // Full info
        return {
            name: device,
            browser: `${browserName} ${browserVersion}`,
            os: `${osName} ${osVersion}`,
            type: deviceType, // mobile, tablet, desktop
            full: `${device} - ${browserName} on ${osName} ${osVersion}`
        };
    };


    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
                            animationDuration: `${5 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Admin Panel</h2>
                    </div>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                >
                    {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Collapsible Sidebar (Mobile: Top Sheet, Desktop: Fixed Left) */}
            <aside
                className={`fixed inset-x-0 top-16 lg:top-0 lg:left-0 lg:w-80 lg:h-full bg-black/60 backdrop-blur-2xl border-b lg:border-b-0 lg:border-r border-white/10 transition-all duration-300 z-40 ${isSidebarOpen ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'
                    } lg:translate-y-0`}
            >
                {/* Desktop Header */}
                <div className="p-4 lg:p-6 h-full overflow-y-auto pb-20 lg:pb-6">
                    <div className="hidden lg:flex items-center space-x-3 mb-8">
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
                            { id: 'reviews', label: 'Reviews', icon: <Star className="w-5 h-5" /> },
                            { id: 'credentials', label: 'Admin Settings', icon: <Key className="w-5 h-5" /> },
                            {
                                id: 'messages',
                                label: 'Messages',
                                icon: <MessageSquare className="w-5 h-5" />,
                                badge: messages.filter(m => !m.read).length,
                            },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-xl transition-all text-left ${activeSection === item.id
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

                    <div className="mt-6 lg:absolute lg:bottom-6 lg:left-6 lg:right-6">
                        <button
                            onClick={() => (window.location.href = '/')}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                        >
                            <Globe className="w-5 h-5" />
                            <span>View Portfolio</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="pt-20 lg:pt-0 lg:pl-80 min-h-screen">
                <div className="p-4 lg:p-8">
                    {/* Header */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2">
                                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('messages', 'Contact Us')} Management
                            </h1>
                            <p className="text-gray-400 text-sm lg:text-base">Edit and manage your portfolio content</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        disabled={loader}
                                        className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all text-sm lg:text-base"
                                    >
                                        <Save className="w-4 h-4 lg:w-5 lg:h-5" />
                                        {loader ? (
                                            <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <span>Save Changes</span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 transition-all text-sm lg:text-base"
                                    >
                                        <X className="w-4 h-4 lg:w-5 lg:h-5" />
                                        <span>Cancel</span>
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all text-sm lg:text-base"
                                >
                                    <Edit3 className="w-4 h-4 lg:w-5 lg:h-5" />
                                    <span>Edit Content</span>
                                </button>
                            )}
                        </div>
                    </header>

                    {/* Content Sections */}
                    <section className="space-y-6 lg:space-y-8">
                        {/* Overview */}
                        {activeSection === 'overview' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                {[
                                    { label: 'Total Projects', value: projects.length, icon: <Code2 className="w-6 h-6 lg:w-8 lg:h-8" />, color: 'from-blue-500 to-cyan-500' },
                                    { label: 'Social Links', value: socialLinks.length, icon: <Link className="w-6 h-6 lg:w-8 lg:h-8" />, color: 'from-purple-500 to-pink-500' },
                                    { label: 'Unread Messages', value: messages.filter(m => !m.read).length, icon: <MessageSquare className="w-6 h-6 lg:w-8 lg:h-8" />, color: 'from-orange-500 to-red-500' },
                                ].map((stat, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-10 group-hover:opacity-60 transition-all duration-500`} />
                                        <div className="relative p-4 lg:p-6 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all transform hover:scale-105 duration-300">
                                            <div className={`flex justify-center mb-3 lg:mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                                {stat.icon}
                                            </div>
                                            <div className={`text-2xl lg:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 lg:mb-2`}>
                                                {stat.value}
                                            </div>
                                            <div className="text-xs lg:text-sm text-gray-400 font-medium">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Hero Section */}
                        {activeSection === 'hero' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={heroData.title}
                                            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm lg:text-base"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Subtitle</label>
                                        <input
                                            type="text"
                                            value={heroData.subtitle}
                                            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm lg:text-base"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                                    <textarea
                                        value={heroData.desc}
                                        onChange={(e) => setHeroData({ ...heroData, desc: e.target.value })}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 resize-none text-sm lg:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="block text-base lg:text-lg font-bold text-purple-400 mb-2">Statistics</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="flex space-x-2">
                                                <input
                                                    type="text"
                                                    value={heroData[`card_title_${i}` as keyof typeof heroData]}
                                                    onChange={(e) => setHeroData({ ...heroData, [`card_title_${i}`]: e.target.value })}
                                                    disabled={!isEditing}
                                                    placeholder="Number"
                                                    className="flex-1 px-2 lg:px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={heroData[`card_subtitle_${i}` as keyof typeof heroData]}
                                                    onChange={(e) => setHeroData({ ...heroData, [`card_subtitle_${i}`]: e.target.value })}
                                                    disabled={!isEditing}
                                                    placeholder="Label"
                                                    className="flex-1 px-2 lg:px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <h5 className="text-purple-400 font-bold text-lg lg:text-xl">Buttons</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    {[
                                        { name: 'btn_name_1', link: 'btn_link_1' },
                                        { name: 'btn_name_2', link: 'btn_link_2' },
                                    ].map((btn, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-300">Button {idx + 1} Name</label>
                                            <input
                                                type="text"
                                                value={heroData[btn.name as keyof typeof heroData]}
                                                onChange={(e) => setHeroData({ ...heroData, [btn.name]: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm lg:text-base"
                                            />
                                            <label className="block text-sm font-semibold text-gray-300">Link</label>
                                            <input
                                                type="text"
                                                value={heroData[btn.link as keyof typeof heroData]}
                                                onChange={(e) => setHeroData({ ...heroData, [btn.link]: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm lg:text-base"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-base lg:text-lg font-bold text-purple-400 mb-2">Hero Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => setHeroData({ ...heroData, image: event.target?.result as string });
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                    />
                                    {heroData.image && (
                                        <div className="mt-4">
                                            <img src={heroData.image} alt="Hero Preview" className="w-24 h-24 lg:w-32 lg:h-32 object-contain rounded-xl border border-white/20" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {activeSection === 'projects' && (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <h3 className="text-lg lg:text-xl font-bold">Projects ({projects.length})</h3>
                                    <button
                                        onClick={() => {
                                            setNewProjectData({
                                                title: '',
                                                desc: '',
                                                tags: [],
                                                projectImages: [],
                                                githubLink: '',
                                                projectLink: '',
                                                totalTeams: '0',
                                                isWeb: false,
                                            });
                                            setShowAddProject(true);
                                        }}
                                        disabled={loader}
                                        className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
                                    >
                                        {loader ? (
                                            <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Plus className="w-4 h-4" />
                                        )}
                                        <span>Add Project</span>
                                    </button>
                                </div>

                                <div className="space-y-3 lg:space-y-4">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 lg:p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all gap-3"
                                        >
                                            <div className="flex items-center space-x-3 lg:space-x-4 w-full sm:w-auto">
                                                {project.projectImages?.[0] && (
                                                    <img
                                                        src={project.projectImages[0]}
                                                        alt={project.title}
                                                        className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg border border-white/20"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-white text-sm lg:text-base">{project.title}</h4>
                                                    <p className="text-xs lg:text-sm text-gray-400 line-clamp-1">{project.desc}</p>
                                                    <div className="flex flex-wrap items-center gap-x-2 mt-1 text-xs">
                                                        <span className="text-purple-400">{project.tags.length} tags</span>
                                                        <span className="text-cyan-400">{project.totalTeams} team members</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 self-end sm:self-center">
                                                <button
                                                    onClick={() => setEditingProject(project)}
                                                    disabled={loader}
                                                    className="p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg transition-all disabled:opacity-50"
                                                >
                                                    <Edit3 className="w-4 h-4 text-blue-400" />
                                                </button>
                                                <button
                                                    onClick={() => deleteProject(project.id)}
                                                    disabled={loader}
                                                    className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all disabled:opacity-50"
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
                                        <h3 className="text-lg lg:text-xl font-bold text-purple-400 mb-4">Header & Branding</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Header Title</label>
                                                <input
                                                    type="text"
                                                    value={headerData.title}
                                                    onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm lg:text-base"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Header Subtitle</label>
                                                <input
                                                    type="text"
                                                    value={headerData.subtitle}
                                                    onChange={(e) => setHeaderData({ ...headerData, subtitle: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm lg:text-base"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Header Logo</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = (event) => setHeaderData({ ...headerData, logo: event.target?.result as string });
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                                />
                                                {headerData.logo && (
                                                    <div className="mt-4">
                                                        <img src={headerData.logo} alt="Logo Preview" className="w-24 h-24 lg:w-32 lg:h-32 object-contain rounded-xl border border-white/20" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg lg:text-xl font-bold text-cyan-400 mb-4">Contact Details</h3>
                                        <div className="grid grid-cols-1 gap-3 lg:gap-4">
                                            {[
                                                { icon: <Mail className="w-5 h-5 text-purple-400" />, value: contactInfo.email, setter: (v: string) => setContactInfo({ ...contactInfo, email: v }) },
                                                { icon: <Phone className="w-5 h-5 text-cyan-400" />, value: contactInfo.phone, setter: (v: string) => setContactInfo({ ...contactInfo, phone: v }) },
                                                { icon: <MapPin className="w-5 h-5 text-pink-400" />, value: contactInfo.location, setter: (v: string) => setContactInfo({ ...contactInfo, location: v }) },
                                            ].map((field, idx) => (
                                                <div key={idx} className="flex items-center space-x-3">
                                                    {field.icon}
                                                    <input
                                                        type={idx === 0 ? 'email' : idx === 1 ? 'tel' : 'text'}
                                                        value={field.value}
                                                        onChange={(e) => field.setter(e.target.value)}
                                                        disabled={!isEditing}
                                                        className="flex-1 px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm lg:text-base"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-xl lg:text-2xl font-bold">Social Media Links</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
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
                                            globe: Globe,
                                        }[link.icon] || Globe;
                                        return (
                                            <div key={link.id} className="p-4 lg:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                                                <div className="flex items-center space-x-3 lg:space-x-4">
                                                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
                                                        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="text-white font-medium text-sm lg:text-base">{link.platform}</div>
                                                        <input
                                                            type="url"
                                                            value={link.url}
                                                            onChange={(e) => {
                                                                const updated = socialLinks.map((l) => (l.id === link.id ? { ...l, url: e.target.value } : l));
                                                                setSocialLinks(updated);
                                                            }}
                                                            disabled={!isEditing}
                                                            className="w-full px-2 lg:px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500 outline-none text-white disabled:opacity-50 text-xs lg:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Reviews */}
                        {activeSection === 'reviews' && (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <h3 className="text-lg lg:text-xl font-bold">Reviews ({reviews.length})</h3>
                                    <button
                                        onClick={() => {
                                            setNewReviewData({ name: '', role: '', text: '', rating: 5, avatar: '' });
                                            setShowAddReview(true);
                                        }}
                                        disabled={loader}
                                        className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
                                    >
                                        {loader ? (
                                            <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Plus className="w-4 h-4" />
                                        )}
                                        <span>Add Review</span>
                                    </button>
                                </div>

                                <div className="space-y-3 lg:space-y-4">
                                    {reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 lg:p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all gap-3"
                                        >
                                            <div className="flex items-center space-x-3 lg:space-x-4 w-full sm:w-auto">
                                                <img src={review.avatar} alt={review.name} className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg border border-white/20" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-white text-sm lg:text-base">{review.name}</h4>
                                                    <p className="text-xs lg:text-sm text-gray-400">{review.role}</p>
                                                    <div className="flex items-center space-x-1 mt-1">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                    </div>
                                                    <p className="text-xs lg:text-sm text-gray-400 line-clamp-1 mt-1">{review.text}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 self-end sm:self-center">
                                                <button
                                                    onClick={() => setEditingReview(review)}
                                                    disabled={loader}
                                                    className="p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg transition-all disabled:opacity-50"
                                                >
                                                    <Edit3 className="w-4 h-4 text-blue-400" />
                                                </button>
                                                <button
                                                    onClick={() => deleteReview(review.id)}
                                                    disabled={loader}
                                                    className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        {activeSection === 'messages' && (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <h3 className="text-xl lg:text-2xl font-bold">Contact Messages ({messages.length})</h3>
                                    <div className="text-xs lg:text-sm text-gray-400">{messages.filter((m) => !m.read).length} unread</div>
                                </div>

                                <div className="space-y-3 lg:space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="text-center py-10 lg:py-12 text-gray-400">
                                            <MessageSquare className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 opacity-20" />
                                            <p>No messages yet</p>
                                        </div>
                                    ) : (
                                        messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`p-4 lg:p-6 rounded-2xl border ${msg.read ? 'bg-white/5 border-white/10' : 'bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border-purple-500/30'
                                                    } backdrop-blur-xl`}
                                            >
                                                <div className="flex flex-col lg:flex-row justify-between items-start gap-3">
                                                    <div className="flex-1">
                                                        <div className="flex flex-wrap items-center gap-x-2 mb-1 lg:mb-2 text-sm lg:text-base">
                                                            {!msg.read && <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
                                                            <h4 className="font-bold">{msg.phone}</h4>
                                                            <span className="text-gray-400">
                                                                {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : msg.createdAt}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-300 text-sm lg:text-base mb-1 lg:mb-2">{msg.email}</p>
                                                        <p className="text-gray-400 text-xs lg:text-sm line-clamp-2">{msg.desc}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 self-end lg:self-start">
                                                        {loader ? (
                                                            <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                                        ) : (
                                                            <>
                                                                {!msg.read && (
                                                                    <button
                                                                        onClick={() => markMessageAsRead(msg.id)}
                                                                        disabled={loader}
                                                                        className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-all disabled:opacity-50"
                                                                        title="Mark as read"
                                                                    >
                                                                        <Eye className="w-4 h-4 text-green-400" />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => deleteMessage(msg.id)}
                                                                    disabled={loader}
                                                                    className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-all disabled:opacity-50"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Admin Settings */}
                        {activeSection === 'credentials' && (
                            <div className="space-y-6 max-w-lg">
                                <div className="p-4 lg:p-6 rounded-2xl bg-red-500/10 border border-red-500/30">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-red-400" />
                                        <h3 className="text-base lg:text-lg font-bold text-red-400">Security Warning</h3>
                                    </div>
                                    <p className="text-xs lg:text-sm text-gray-300">
                                        Changing admin credentials will update the data in Firestore and require you to log in again.
                                    </p>
                                </div>

                                {isLoadingData ? (
                                    <div className="flex items-center justify-center py-10 lg:py-12">
                                        <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                        <span className="ml-3 text-gray-300 text-sm lg:text-base">Loading current data...</span>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {['newEmail', 'currentPassword', 'newPassword', 'confirmPassword'].map((field, idx) => (
                                            <div key={idx}>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                    {field === 'newEmail' ? 'New Email (Optional)' : field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password (Optional)' : 'Confirm New Password'}
                                                </label>
                                                <input
                                                    type={field.includes('Password') ? 'password' : 'email'}
                                                    placeholder={
                                                        field === 'newEmail'
                                                            ? 'Enter new email address'
                                                            : field === 'currentPassword'
                                                                ? 'Enter current password'
                                                                : field === 'newPassword'
                                                                    ? 'Enter new password'
                                                                    : 'Confirm new password'
                                                    }
                                                    value={adminCredentials[field as keyof typeof adminCredentials] || (field === 'newEmail' ? currentAdminData?.email || '' : '')}
                                                    onChange={(e) => setAdminCredentials({ ...adminCredentials, [field]: e.target.value })}
                                                    disabled={loader}
                                                    className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 text-sm lg:text-base"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            onClick={handleUpdateCredentials}
                                            disabled={loader}
                                            className="w-full flex items-center justify-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
                                        >
                                            {loader ? (
                                                <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <span>Update Credentials</span>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {/* Modals */}
            {(showAddReview || editingReview) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 lg:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 lg:mb-6">
                            <h2 className="text-xl lg:text-2xl font-bold text-white">{editingReview ? 'Edit Review' : 'Add New Review'}</h2>
                            <button
                                onClick={() => {
                                    setShowAddReview(false);
                                    setEditingReview(null);
                                    setNewReviewData({ name: '', role: '', text: '', rating: 5, avatar: '' });
                                }}
                                className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all"
                            >
                                <X className="w-5 h-5 text-red-400" />
                            </button>
                        </div>
                        <div className="space-y-4 lg:space-y-6">
                            {['name', 'role'].map((field) => (
                                <input
                                    key={field}
                                    type="text"
                                    placeholder={`Enter reviewer ${field}`}
                                    value={(editingReview?.[field as keyof typeof editingReview] as string) || (newReviewData[field as keyof typeof newReviewData] as string) || ''}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (editingReview) setEditingReview({ ...editingReview, [field]: val });
                                        else setNewReviewData({ ...newReviewData, [field]: val });
                                    }}
                                    className={`w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white ${field === 'name' ? 'font-bold' : 'text-sm'}`}
                                />
                            ))}
                            <textarea
                                placeholder="Enter review text"
                                value={(editingReview?.text as string) || (newReviewData.text as string) || ''}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (editingReview) setEditingReview({ ...editingReview, text: val });
                                    else setNewReviewData({ ...newReviewData, text: val });
                                }}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white resize-none text-sm"
                            />
                            <div className="flex items-center space-x-3">
                                <label className="text-sm text-gray-300">Rating:</label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => {
                                                const rating = star;
                                                if (editingReview) setEditingReview({ ...editingReview, rating });
                                                else setNewReviewData({ ...newReviewData, rating });
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`w-5 h-5 lg:w-6 lg:h-6 ${star <= ((editingReview?.rating as number) || (newReviewData.rating as number) || 5)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-400'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Avatar Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                const src = event.target?.result as string;
                                                if (editingReview) setEditingReview({ ...editingReview, avatar: src });
                                                else setNewReviewData({ ...newReviewData, avatar: src });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                />
                                {((editingReview?.avatar as string) || (newReviewData.avatar as string))?.startsWith('data:image/') && (
                                    <div className="mt-4">
                                        <img
                                            src={(editingReview?.avatar as string) || (newReviewData.avatar as string)}
                                            alt="Avatar Preview"
                                            className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-full border border-white/20"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end space-x-3 pt-2 lg:pt-4">
                                <button
                                    onClick={() => {
                                        setShowAddReview(false);
                                        setEditingReview(null);
                                        setNewReviewData({ name: '', role: '', text: '', rating: 5, avatar: '' });
                                    }}
                                    className="px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gray-600/20 hover:bg-gray-600/40 border border-gray-500/30 transition-all text-sm lg:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const data = editingReview || newReviewData;
                                        if (data.name && data.role && data.text && data.avatar) {
                                            if (showAddReview) addReview(data as Omit<Review, 'id'>);
                                            else updateReviewData(editingReview!);
                                            setShowAddReview(false);
                                            setEditingReview(null);
                                            setNewReviewData({ name: '', role: '', text: '', rating: 5, avatar: '' });
                                        } else alert('Please fill in all fields');
                                    }}
                                    disabled={loader}
                                    className="px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm lg:text-base"
                                >
                                    {loader && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                    <span>{showAddReview ? 'Add Review' : 'Update Review'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(showAddProject || editingProject) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 lg:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 lg:mb-6">
                            <h2 className="text-xl lg:text-2xl font-bold text-white">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                            <button
                                onClick={() => {
                                    setShowAddProject(false);
                                    setEditingProject(null);
                                    setNewProjectData({
                                        title: '',
                                        desc: '',
                                        tags: [],
                                        projectImages: [],
                                        githubLink: '',
                                        projectLink: '',
                                        totalTeams: '0',
                                        isWeb: false,
                                    });
                                }}
                                className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all"
                            >
                                <X className="w-5 h-5 text-red-400" />
                            </button>
                        </div>
                        <div className="space-y-4 lg:space-y-6">
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Project Images (Gallery)</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        const promises = files.map(
                                            (file) =>
                                                new Promise<string>((resolve) => {
                                                    const reader = new FileReader();
                                                    reader.onload = () => resolve(reader.result as string);
                                                    reader.readAsDataURL(file);
                                                })
                                        );
                                        Promise.all(promises).then((urls) => {
                                            if (editingProject) setEditingProject({ ...editingProject, projectImages: [...editingProject.projectImages, ...urls] });
                                            else setNewProjectData({ ...newProjectData, projectImages: urls });
                                        });
                                    }}
                                    className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                />
                                {((editingProject?.projectImages?.length || 0) > 0 || (newProjectData.projectImages?.length || 0) > 0) && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {(editingProject?.projectImages || newProjectData.projectImages || []).map((img, idx) => (
                                            <div key={idx} className="relative">
                                                <img src={img} alt={`Project ${idx + 1}`} className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg border border-white/20" />
                                                {editingProject && (
                                                    <button
                                                        onClick={() => {
                                                            const newImages = editingProject.projectImages.filter((_, i) => i !== idx);
                                                            setEditingProject({ ...editingProject, projectImages: newImages });
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {['title', 'desc', 'projectLink', 'githubLink', 'totalTeams'].map((field) => {
                                const isTextarea = field === 'desc';
                                const placeholder =
                                    field === 'title'
                                        ? 'Enter project title'
                                        : field === 'desc'
                                            ? 'Enter project description'
                                            : field === 'projectLink'
                                                ? 'Enter project live/demo link'
                                                : field === 'githubLink'
                                                    ? 'Enter GitHub repository link'
                                                    : 'Enter total team members count';
                                return (
                                    <div key={field}>
                                        {isTextarea ? (
                                            <textarea
                                                placeholder={placeholder}
                                                value={(editingProject?.[field as keyof typeof editingProject] as string) || (newProjectData[field as keyof typeof newProjectData] as string) || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (editingProject) setEditingProject({ ...editingProject, [field]: val });
                                                    else setNewProjectData({ ...newProjectData, [field]: val });
                                                }}
                                                rows={3}
                                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white resize-none text-sm"
                                            />
                                        ) : (
                                            <input
                                                type={field.includes('Link') ? 'url' : field === 'totalTeams' ? 'text' : 'text'}
                                                placeholder={placeholder}
                                                value={(editingProject?.[field as keyof typeof editingProject] as string) || (newProjectData[field as keyof typeof newProjectData] as string) || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (editingProject) setEditingProject({ ...editingProject, [field]: val });
                                                    else setNewProjectData({ ...newProjectData, [field]: val });
                                                }}
                                                className={`w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white ${field === 'title' ? 'font-bold' : 'text-sm'}`}
                                            />
                                        )}
                                    </div>
                                );
                            })}

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Tags</label>
                                <div className="space-y-2">
                                    {((editingProject?.tags as string[]) || (newProjectData.tags as string[]) || []).map((tag, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter tag name"
                                                value={tag}
                                                onChange={(e) => {
                                                    const newTags = [...((editingProject?.tags as string[]) || (newProjectData.tags as string[]))];
                                                    newTags[idx] = e.target.value;
                                                    if (editingProject) setEditingProject({ ...editingProject, tags: newTags });
                                                    else setNewProjectData({ ...newProjectData, tags: newTags });
                                                }}
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newTags = ((editingProject?.tags as string[]) || (newProjectData.tags as string[]) || []).filter((_, i) => i !== idx);
                                                    if (editingProject) setEditingProject({ ...editingProject, tags: newTags });
                                                    else setNewProjectData({ ...newProjectData, tags: newTags });
                                                }}
                                                className="px-2 py-1 bg-red-600/20 hover:bg-red-600/40 rounded text-red-400 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newTags = [...((editingProject?.tags as string[]) || (newProjectData.tags as string[]) || []), ''];
                                            if (editingProject) setEditingProject({ ...editingProject, tags: newTags });
                                            else setNewProjectData({ ...newProjectData, tags: newTags });
                                        }}
                                        className="px-3 py-2 bg-green-600/20 hover:bg-green-600/40 rounded text-green-400 text-sm"
                                    >
                                        Add Tag
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <label className="text-sm text-gray-300">Is Web Project?</label>
                                <input
                                    type="checkbox"
                                    checked={(editingProject?.isWeb as boolean) || (newProjectData.isWeb as boolean) || false}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        if (editingProject) setEditingProject({ ...editingProject, isWeb: checked });
                                        else setNewProjectData({ ...newProjectData, isWeb: checked });
                                    }}
                                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-2 lg:pt-4">
                                <button
                                    onClick={() => {
                                        setShowAddProject(false);
                                        setEditingProject(null);
                                        setNewProjectData({
                                            title: '',
                                            desc: '',
                                            tags: [],
                                            projectImages: [],
                                            githubLink: '',
                                            projectLink: '',
                                            totalTeams: '0',
                                            isWeb: false,
                                        });
                                    }}
                                    className="px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gray-600/20 hover:bg-gray-600/40 border border-gray-500/30 transition-all text-sm lg:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const data = editingProject || newProjectData;
                                        if (data.title && data.desc) {
                                            if (showAddProject) addProject(data as Omit<Project, 'id'>);
                                            else updateProjectData(editingProject!);
                                            setShowAddProject(false);
                                            setEditingProject(null);
                                            setNewProjectData({
                                                title: '',
                                                desc: '',
                                                tags: [],
                                                projectImages: [],
                                                githubLink: '',
                                                projectLink: '',
                                                totalTeams: '0',
                                                isWeb: false,
                                            });
                                        } else alert('Please fill in title and description');
                                    }}
                                    disabled={loader}
                                    className="px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm lg:text-base"
                                >
                                    {loader && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                    <span>{showAddProject ? 'Add Project' : 'Update Project'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.1;
              }
              50% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.3;
              }
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



    // return (
    //     <div className="min-h-screen bg-black text-white relative overflow-hidden">
    //         {/* Animated Background */}
    //         <div className="fixed inset-0 z-0">
    //             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
    //             <div
    //                 className="absolute inset-0 opacity-30"
    //                 style={{
    //                     background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`
    //                 }}
    //             />
    //             <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
    //         </div>

    //         {/* Floating Particles */}
    //         <div className="fixed inset-0 z-0 pointer-events-none">
    //             {[...Array(15)].map((_, i) => (
    //                 <div
    //                     key={i}
    //                     className="absolute w-2 h-2 bg-purple-500/20 rounded-full animate-float"
    //                     style={{
    //                         left: `${Math.random() * 100}%`,
    //                         top: `${Math.random() * 100}%`,
    //                         animationDelay: `${Math.random() * 5}s`,
    //                         animationDuration: `${5 + Math.random() * 10}s`
    //                     }}
    //                 />
    //             ))}
    //         </div>

    //         <div className="relative z-10 flex">
    //             {/* Sidebar */}
    //             <div className="w-80 min-h-screen bg-black/60 backdrop-blur-2xl border-r border-white/10 p-6">
    //                 <div className="flex items-center space-x-3 mb-8">
    //                     <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
    //                         <Shield className="w-6 h-6 text-white" />
    //                     </div>
    //                     <div>
    //                         <h2 className="text-xl font-bold">Admin Panel</h2>
    //                         <p className="text-sm text-gray-400">Content Management</p>
    //                     </div>
    //                 </div>

    //                 <nav className="space-y-2">
    //                     {[
    //                         { id: 'overview', label: 'Overview', icon: <Eye className="w-5 h-5" /> },
    //                         { id: 'projects', label: 'Projects', icon: <Code2 className="w-5 h-5" /> },
    //                         { id: 'hero', label: 'Hero Section', icon: <User className="w-5 h-5" /> },
    //                         { id: 'social', label: 'Social Setting', icon: <Link className="w-5 h-5" /> },
    //                         { id: 'reviews', label: 'Reviews', icon: <Star className="w-5 h-5" /> },
    //                         { id: 'credentials', label: 'Admin Settings', icon: <Key className="w-5 h-5" /> },
    //                         { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, badge: messages.filter(m => !m.read).length },
    //                     ].map((item) => (
    //                         <button
    //                             key={item.id}
    //                             onClick={() => setActiveSection(item.id)}
    //                             className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-xl transition-all ${activeSection === item.id
    //                                 ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
    //                                 : 'hover:bg-white/5 text-gray-300'
    //                                 }`}
    //                         >
    //                             <div className="flex items-center space-x-3">
    //                                 {item.icon}
    //                                 <span>{item.label}</span>
    //                             </div>
    //                             {item.badge ? (
    //                                 <span className="px-2 py-1 bg-red-500 text-xs rounded-full">{item.badge}</span>
    //                             ) : null}
    //                         </button>
    //                     ))}
    //                 </nav>

    //                 <div className="absolute bottom-6 left-6 right-6">
    //                     <button
    //                         onClick={() => window.location.href = '/'}
    //                         className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
    //                     >
    //                         <Globe className="w-5 h-5" />
    //                         <span>View Portfolio</span>
    //                     </button>
    //                 </div>
    //             </div>

    //             {/* Main Content */}
    //             <div className="flex-1 p-8">
    //                 {/* Header */}
    //                 <div className="flex justify-between items-center mb-8">
    //                     <div>
    //                         <h1 className="text-3xl font-bold mb-2">
    //                             {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('messages', 'Contact Us')} Management
    //                         </h1>
    //                         <p className="text-gray-400">Edit and manage your portfolio content</p>
    //                     </div>
    //                     <div className="flex space-x-3">
    //                         {isEditing ? (
    //                             <>
    //                                 <button
    //                                     onClick={handleSave}
    //                                     disabled={loader}
    //                                     className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
    //                                 >
    //                                     <Save className="w-5 h-5" />
    //                                     {loader === true ?
    //                                         <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
    //                                         : <span>Save Changes</span>}
    //                                 </button>
    //                                 <button
    //                                     onClick={() => setIsEditing(false)}
    //                                     className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 transition-all"
    //                                 >
    //                                     <X className="w-5 h-5" />
    //                                     <span>Cancel</span>
    //                                 </button>
    //                             </>
    //                         ) : (
    //                             <button
    //                                 onClick={() => setIsEditing(true)}
    //                                 className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all"
    //                             >
    //                                 <Edit3 className="w-5 h-5" />
    //                                 <span>Edit Content</span>
    //                             </button>
    //                         )}
    //                     </div>
    //                 </div>

    //                 {/* Content Sections */}
    //                 <div className="space-y-8">

    //                     {/* Overview */}
    //                     {activeSection === 'overview' && (
    //                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //                             {[
    //                                 { label: 'Total Projects', value: projects.length, icon: <Code2 className="w-8 h-8" />, color: 'from-blue-500 to-cyan-500' },
    //                                 { label: 'Social Links', value: socialLinks.length, icon: <Link className="w-8 h-8" />, color: 'from-purple-500 to-pink-500' },
    //                                 { label: 'Unread Messages', value: messages.filter(m => !m.read).length, icon: <MessageSquare className="w-8 h-8" />, color: 'from-orange-500 to-red-500' }
    //                             ].map((stat, idx) => (
    //                                 <div key={idx} className="relative group">
    //                                     <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-10 group-hover:opacity-60 transition-all duration-500`} />
    //                                     <div className="relative p-6 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all transform hover:scale-105 duration-300">
    //                                         <div className={`flex justify-center mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
    //                                             {stat.icon}
    //                                         </div>
    //                                         <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
    //                                             {stat.value}
    //                                         </div>
    //                                         <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
    //                                     </div>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     )}

    //                     {/* Hero Section */}
    //                     {activeSection === 'hero' && (
    //                         <div className="space-y-6">
    //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                                 <div>
    //                                     <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
    //                                     <input
    //                                         type="text"
    //                                         value={heroData.title}
    //                                         onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
    //                                         disabled={!isEditing}
    //                                         className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label className="block text-sm font-semibold text-gray-300 mb-2">Subtitle</label>
    //                                     <input
    //                                         type="text"
    //                                         value={heroData.subtitle}
    //                                         onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
    //                                         disabled={!isEditing}
    //                                         className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                     />
    //                                 </div>
    //                             </div>

    //                             <div>
    //                                 <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
    //                                 <textarea
    //                                     value={heroData.desc}
    //                                     onChange={(e) => setHeroData({ ...heroData, desc: e.target.value })}
    //                                     disabled={!isEditing}
    //                                     rows={3}
    //                                     className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 resize-none"
    //                                 />
    //                             </div>

    //                             <div>
    //                                 <label className="block text-lg font-bold text-purple-400 mb-2">Statistics</label>
    //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                                     <div className="flex space-x-2">
    //                                         <input
    //                                             type="text"
    //                                             value={heroData.card_title_1}
    //                                             onChange={(e) => setHeroData({ ...heroData, card_title_1: e.target.value })}
    //                                             disabled={!isEditing}
    //                                             placeholder="Number"
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                         />
    //                                         <input
    //                                             type="text"
    //                                             value={heroData.card_subtitle_1}
    //                                             onChange={(e) => setHeroData({ ...heroData, card_subtitle_1: e.target.value })}
    //                                             disabled={!isEditing}
    //                                             placeholder="Label"
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                         />
    //                                     </div>
    //                                     <div className="flex space-x-2">
    //                                         <input
    //                                             type="text"
    //                                             value={heroData.card_title_2}
    //                                             onChange={(e) => setHeroData({ ...heroData, card_title_2: e.target.value })}
    //                                             disabled={!isEditing}
    //                                             placeholder="Number"
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                         />
    //                                         <input
    //                                             type="text"
    //                                             value={heroData.card_subtitle_2}
    //                                             onChange={(e) => setHeroData({ ...heroData, card_subtitle_2: e.target.value })}
    //                                             disabled={!isEditing}
    //                                             placeholder="Label"
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                         />
    //                                     </div>
    //                                     <div className="flex space-x-2">
    //                                         <input
    //                                             type="text"
    //                                             value={heroData.card_title_3}
    //                                             onChange={(e) => setHeroData({ ...heroData, card_title_3: e.target.value })}
    //                                             disabled={!isEditing}
    //                                             placeholder="Number"
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                         />
    //                                         <input
    //                                             type="text"
    //                                             value={heroData.card_subtitle_3}
    //                                             onChange={(e) => setHeroData({ ...heroData, card_subtitle_3: e.target.value })}
    //                                             disabled={!isEditing}
    //                                             placeholder="Label"
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                         />
    //                                     </div>
    //                                     <div className="flex space-x-2">
    //                                         <input
    //                                             type="text"
    //                                             value={heroData.card_title_4}
    //                                             onChange={(e) => setHeroData({ ...heroData, card_title_4: e.target.value })}
    //                                             disabled={!isEditing}
    //                                             placeholder="Number"
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                         />
    //                                         <input
    //                                             type="text"
    //                                             value={heroData.card_subtitle_4}
    //                                             onChange={(e) => setHeroData({ ...heroData, card_subtitle_4: e.target.value })}
    //                                             disabled={!isEditing}
    //                                             placeholder="Label"
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                             <h5 className='text-purple-400 font-bold text-xl'>Buttons</h5>
    //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                                 <div>
    //                                     <label className="block text-sm font-semibold text-gray-300 mb-2">Button 1 Name</label>
    //                                     <input
    //                                         type="text"
    //                                         value={heroData.btn_name_1}
    //                                         onChange={(e) => setHeroData({ ...heroData, btn_name_1: e.target.value })}
    //                                         disabled={!isEditing}
    //                                         className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label className="block text-sm font-semibold text-gray-300 mb-2">Link</label>
    //                                     <input
    //                                         type="text"
    //                                         value={heroData.btn_link_1}
    //                                         onChange={(e) => setHeroData({ ...heroData, btn_link_1: e.target.value })}
    //                                         disabled={!isEditing}
    //                                         className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                     />
    //                                 </div>
    //                             </div>
    //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                                 <div>
    //                                     <label className="block text-sm font-semibold text-gray-300 mb-2">Button 2 Name</label>
    //                                     <input
    //                                         type="text"
    //                                         value={heroData.btn_name_2}
    //                                         onChange={(e) => setHeroData({ ...heroData, btn_name_2: e.target.value })}
    //                                         disabled={!isEditing}
    //                                         className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label className="block text-sm font-semibold text-gray-300 mb-2">Link</label>
    //                                     <input
    //                                         type="text"
    //                                         value={heroData.btn_link_2}
    //                                         onChange={(e) => setHeroData({ ...heroData, btn_link_2: e.target.value })}
    //                                         disabled={!isEditing}
    //                                         className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                     />
    //                                 </div>
    //                             </div>

    //                             <div>
    //                                 <label className="block text-lg font-bold text-purple-400 mb-2">Hero Image</label>
    //                                 <input
    //                                     type='file'
    //                                     accept="image/*"
    //                                     onChange={(e) => {
    //                                         const file = e.target.files?.[0];
    //                                         if (file) {
    //                                             const reader = new FileReader();
    //                                             reader.onload = (event) => {
    //                                                 setHeroData({ ...heroData, image: event.target?.result as string });
    //                                             };
    //                                             reader.readAsDataURL(file);
    //                                         }
    //                                     }}
    //                                     disabled={!isEditing}
    //                                     className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
    //                                 />
    //                                 {heroData.image && (
    //                                     <div className="mt-4">
    //                                         <img
    //                                             src={heroData.image}
    //                                             alt="Hero Preview"
    //                                             className="w-32 h-32 object-contain rounded-xl border border-white/20"
    //                                         />
    //                                     </div>
    //                                 )}
    //                             </div>
    //                         </div>
    //                     )}

    //                     {/* Projects */}
    //                     {activeSection === 'projects' && (
    //                         <div className="space-y-6">
    //                             <div className="flex justify-between items-center">
    //                                 <h3 className="text-xl font-bold">Projects ({projects.length})</h3>
    //                                 <button
    //                                     onClick={() => {
    //                                         setNewProjectData({
    //                                             title: '',
    //                                             desc: '',
    //                                             tags: [],
    //                                             projectImages: [],
    //                                             githubLink: '',
    //                                             projectLink: '',
    //                                             totalTeams: '0',
    //                                             isWeb: false
    //                                         });
    //                                         setShowAddProject(true);
    //                                     }}
    //                                     disabled={loader}
    //                                     className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    //                                 >
    //                                     {loader === true ?
    //                                         <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
    //                                         : <Plus className="w-4 h-4" />}
    //                                     <span>Add Project</span>
    //                                 </button>
    //                             </div>
    //                             <div className="space-y-4">
    //                                 {projects.map((project) => (
    //                                     <div key={project.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all">
    //                                         <div className="flex items-center space-x-4">
    //                                             {project.projectImages && (
    //                                                 <img
    //                                                     src={project.projectImages[0] ?? ""}
    //                                                     alt={project.title}
    //                                                     className="w-16 h-16 object-cover rounded-lg border border-white/20"
    //                                                 />
    //                                             )}
    //                                             <div>
    //                                                 <h4 className="font-bold text-white">{project.title}</h4>
    //                                                 <p className="text-sm text-gray-400 line-clamp-1">{project.desc}</p>
    //                                                 <div className="flex items-center space-x-2 mt-1">
    //                                                     <span className="text-xs text-purple-400">{project.tags.length} tags</span>
    //                                                     <span className="text-xs text-cyan-400">{project.totalTeams} team members</span>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div className="flex items-center space-x-2">
    //                                             <button
    //                                                 onClick={() => setEditingProject(project)}
    //                                                 disabled={loader}
    //                                                 className="p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg transition-all disabled:opacity-50"
    //                                             >
    //                                                 <Edit3 className="w-4 h-4 text-blue-400" />
    //                                             </button>
    //                                             <button
    //                                                 onClick={() => deleteProject(project.id)}
    //                                                 disabled={loader}
    //                                                 className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all disabled:opacity-50"
    //                                             >
    //                                                 <Trash2 className="w-4 h-4 text-red-400" />
    //                                             </button>
    //                                         </div>
    //                                     </div>
    //                                 ))}
    //                             </div>
    //                         </div>
    //                     )}



    //                     {/* Social Links */}
    //                     {activeSection === 'social' && (
    //                         <div className="space-y-6">

    //                             <div className="space-y-6">
    //                                 <div>
    //                                     <h3 className="text-xl font-bold text-purple-400 mb-4">Header & Branding</h3>
    //                                     <div className="space-y-4">
    //                                         <div>
    //                                             <label className="block text-sm font-semibold text-gray-300 mb-2">Header Title</label>
    //                                             <input
    //                                                 type="text"
    //                                                 value={headerData.title}
    //                                                 onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
    //                                                 disabled={!isEditing}
    //                                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>
    //                                         <div>
    //                                             <label className="block text-sm font-semibold text-gray-300 mb-2">Header subtitle</label>
    //                                             <input
    //                                                 type="text"
    //                                                 value={headerData.subtitle}
    //                                                 onChange={(e) => setHeaderData({ ...headerData, subtitle: e.target.value })}
    //                                                 disabled={!isEditing}
    //                                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>


    //                                         <div>
    //                                             <label className="block text-sm font-semibold text-gray-300 mb-2">Header Logo</label>
    //                                             <input
    //                                                 type='file'
    //                                                 accept="image/*"
    //                                                 onChange={(e) => {
    //                                                     const file = e.target.files?.[0];
    //                                                     if (file) {
    //                                                         const reader = new FileReader();
    //                                                         reader.onload = (event) => {
    //                                                             setHeaderData({ ...headerData, logo: event.target?.result as string });
    //                                                             // console.log("base64 check:" + event.target?.result as string);
    //                                                             // upload file by base64 code 
    //                                                         };
    //                                                         reader.readAsDataURL(file);
    //                                                     }
    //                                                 }}
    //                                                 disabled={!isEditing}
    //                                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
    //                                             />
    //                                             {headerData.logo && (
    //                                                 <div className="mt-4">
    //                                                     <img
    //                                                         src={headerData.logo}
    //                                                         alt="Hero Preview"
    //                                                         className="w-32 h-32 object-contain rounded-xl border border-white/20"
    //                                                     />
    //                                                 </div>
    //                                             )}
    //                                         </div>

    //                                     </div>
    //                                 </div>

    //                                 <div>
    //                                     <h3 className="text-xl font-bold text-cyan-400 mb-4">Contact Details</h3>
    //                                     <div className="grid grid-cols-1 gap-4">
    //                                         <div className="flex items-center space-x-3">
    //                                             <Mail className="w-5 h-5 text-purple-400" />
    //                                             <input
    //                                                 type="email"
    //                                                 value={contactInfo.email}
    //                                                 onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
    //                                                 disabled={!isEditing}
    //                                                 className="flex-1 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>
    //                                         <div className="flex items-center space-x-3">
    //                                             <Phone className="w-5 h-5 text-cyan-400" />
    //                                             <input
    //                                                 type="tel"
    //                                                 value={contactInfo.phone}
    //                                                 onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
    //                                                 disabled={!isEditing}
    //                                                 className="flex-1 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>
    //                                         <div className="flex items-center space-x-3">
    //                                             <MapPin className="w-5 h-5 text-pink-400" />
    //                                             <input
    //                                                 type="text"
    //                                                 value={contactInfo.location}
    //                                                 onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
    //                                                 disabled={!isEditing}
    //                                                 className="flex-1 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>

    //                             <div className="flex justify-between items-center">
    //                                 <h3 className="text-2xl font-bold">Social Media Links</h3>
    //                             </div>

    //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                                 {socialLinks.map((link) => {
    //                                     const Icon = {
    //                                         github: Github,
    //                                         linkedin: Linkedin,
    //                                         twitter: Twitter,
    //                                         instagram: Instagram,
    //                                         facebook: Facebook,
    //                                         youtube: Youtube,
    //                                         tiktok: Music2Icon,
    //                                         telegram: Globe,
    //                                         discord: Globe,
    //                                         snapchat: Globe,
    //                                         globe: Globe
    //                                     }[link.icon] || Globe;

    //                                     return (
    //                                         <div key={link.id} className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
    //                                             <div className="flex items-center space-x-4">
    //                                                 <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
    //                                                     <Icon className="w-6 h-6 text-white" />
    //                                                 </div>
    //                                                 <div className="flex-1 space-y-3">
    //                                                     <div className="text-white font-medium">{link.platform}</div>
    //                                                     <input
    //                                                         type="url"
    //                                                         value={link.url}
    //                                                         onChange={(e) => {
    //                                                             const updated = socialLinks.map(l => l.id === link.id ? { ...l, url: e.target.value } : l);
    //                                                             setSocialLinks(updated);
    //                                                         }}
    //                                                         disabled={!isEditing}
    //                                                         className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500 outline-none text-white disabled:opacity-50 text-sm"
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     );
    //                                 })}
    //                             </div>
    //                         </div>
    //                     )}

    //                     {/* Reviews */}
    //                     {activeSection === 'reviews' && (
    //                         <div className="space-y-6">
    //                             <div className="flex justify-between items-center">
    //                                 <h3 className="text-xl font-bold">Reviews ({reviews.length})</h3>
    //                                 <button
    //                                     onClick={() => {
    //                                         setNewReviewData({
    //                                             name: '',
    //                                             role: '',
    //                                             text: '',
    //                                             rating: 5,
    //                                             avatar: ''
    //                                         });
    //                                         setShowAddReview(true);
    //                                     }}
    //                                     disabled={loader}
    //                                     className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    //                                 >
    //                                     {loader === true ?
    //                                         <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
    //                                         : <Plus className="w-4 h-4" />}
    //                                     <span>Add Review</span>
    //                                 </button>
    //                             </div>
    //                             <div className="space-y-4">
    //                                 {reviews.map((review) => (
    //                                     <div key={review.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all">
    //                                         <div className="flex items-center space-x-4">
    //                                             <img
    //                                                 src={review.avatar}
    //                                                 alt={review.name}
    //                                                 className="w-16 h-16 object-cover rounded-lg border border-white/20"
    //                                             />
    //                                             <div>
    //                                                 <h4 className="font-bold text-white">{review.name}</h4>
    //                                                 <p className="text-sm text-gray-400">{review.role}</p>
    //                                                 <div className="flex items-center space-x-1 mt-1">
    //                                                     {[...Array(review.rating)].map((_, i) => (
    //                                                         <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    //                                                     ))}
    //                                                 </div>
    //                                                 <p className="text-sm text-gray-400 line-clamp-1 mt-1">{review.text}</p>
    //                                             </div>
    //                                         </div>
    //                                         <div className="flex items-center space-x-2">
    //                                             <button
    //                                                 onClick={() => setEditingReview(review)}
    //                                                 disabled={loader}
    //                                                 className="p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg transition-all disabled:opacity-50"
    //                                             >
    //                                                 <Edit3 className="w-4 h-4 text-blue-400" />
    //                                             </button>
    //                                             <button
    //                                                 onClick={() => deleteReview(review.id)}
    //                                                 disabled={loader}
    //                                                 className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all disabled:opacity-50"
    //                                             >
    //                                                 <Trash2 className="w-4 h-4 text-red-400" />
    //                                             </button>
    //                                         </div>
    //                                     </div>
    //                                 ))}
    //                             </div>
    //                         </div>
    //                     )}

    //                     {/* Messages (Contact Us) */}
    //                     {activeSection === 'messages' && (
    //                         <div className="space-y-6">
    //                             <div className="flex justify-between items-center">
    //                                 <h3 className="text-2xl font-bold">Contact Messages ({messages.length})</h3>
    //                                 <div className="text-sm text-gray-400">
    //                                     {messages.filter(m => !m.read).length} unread
    //                                 </div>
    //                             </div>

    //                             <div className="space-y-4">
    //                                 {messages.length === 0 ? (
    //                                     <div className="text-center py-12 text-gray-400">
    //                                         <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
    //                                         <p>No messages yet</p>
    //                                     </div>
    //                                 ) : (
    //                                     messages.map((msg) => (
    //                                         <div key={msg.id} className={`p-6 rounded-2xl border ${msg.read ? 'bg-white/5 border-white/10' : 'bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border-purple-500/30'} backdrop-blur-xl`}>
    //                                             <div className="flex justify-between items-start">
    //                                                 <div className="flex-1">
    //                                                     <div className="flex items-center space-x-3 mb-2">
    //                                                         {!msg.read && <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
    //                                                         <h4 className="font-bold text-lg">{msg.phone}</h4>
    //                                                         <span className="text-sm text-gray-400">{msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : msg.createdAt}</span>
    //                                                     </div>
    //                                                     <p className="text-gray-300 mb-2">{msg.email}</p>
    //                                                     <p className="text-gray-400 mt-2 line-clamp-2">{msg.desc}</p>
    //                                                 </div>
    //                                                 {loader === true ?
    //                                                     <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
    //                                                     : <div className="flex items-center space-x-2 ml-4">
    //                                                         {!msg.read && (
    //                                                             <button
    //                                                                 onClick={() => markMessageAsRead(msg.id)}
    //                                                                 disabled={loader}
    //                                                                 className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-all disabled:opacity-50"
    //                                                                 title="Mark as read"
    //                                                             >
    //                                                                 <Eye className="w-4 h-4 text-green-400" />
    //                                                             </button>
    //                                                         )}
    //                                                         <button
    //                                                             onClick={() => deleteMessage(msg.id)}
    //                                                             disabled={loader}
    //                                                             className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-all disabled:opacity-50"
    //                                                             title="Delete message"
    //                                                         >
    //                                                             <Trash2 className="w-4 h-4 text-red-400" />
    //                                                         </button>
    //                                                     </div>}
    //                                             </div>
    //                                         </div>
    //                                     ))
    //                                 )}
    //                             </div>
    //                         </div>
    //                     )}

    //                     {/* Admin Settings */}
    //                     {activeSection === 'credentials' && (
    //                         <div className="space-y-6">
    //                             <div className="max-w-md">
    //                                 <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 mb-6">
    //                                     <div className="flex items-center space-x-3 mb-3">
    //                                         <Shield className="w-6 h-6 text-red-400" />
    //                                         <h3 className="text-lg font-bold text-red-400">Security Warning</h3>
    //                                     </div>
    //                                     <p className="text-sm text-gray-300">
    //                                         Changing admin credentials will update the data in Firestore and require you to log in again.
    //                                     </p>
    //                                 </div>

    //                                 {isLoadingData ? (
    //                                     <div className="flex items-center justify-center py-12">
    //                                         <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    //                                         <span className="ml-3 text-gray-300">Loading current data...</span>
    //                                     </div>
    //                                 ) : (
    //                                     <div className="space-y-4">
    //                                         <div>
    //                                             <label className="block text-sm font-semibold text-gray-300 mb-2">New Email (Optional)</label>
    //                                             <input
    //                                                 type="email"
    //                                                 placeholder="Enter new email address"
    //                                                 value={adminCredentials.newEmail || currentAdminData?.email || ''}
    //                                                 onChange={(e) => setAdminCredentials({ ...adminCredentials, newEmail: e.target.value })}
    //                                                 disabled={loader}
    //                                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>
    //                                         <div>
    //                                             <label className="block text-sm font-semibold text-gray-300 mb-2">Current Password</label>
    //                                             <input
    //                                                 type="password"
    //                                                 placeholder="Enter current password"
    //                                                 value={adminCredentials.currentPassword}
    //                                                 onChange={(e) => setAdminCredentials({ ...adminCredentials, currentPassword: e.target.value })}
    //                                                 disabled={loader}
    //                                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>

    //                                         <div>
    //                                             <label className="block text-sm font-semibold text-gray-300 mb-2">New Password (Optional)</label>
    //                                             <input
    //                                                 type="password"
    //                                                 placeholder="Enter new password"
    //                                                 value={adminCredentials.newPassword}
    //                                                 onChange={(e) => setAdminCredentials({ ...adminCredentials, newPassword: e.target.value })}
    //                                                 disabled={loader}
    //                                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>
    //                                         <div>
    //                                             <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm New Password</label>
    //                                             <input
    //                                                 type="password"
    //                                                 placeholder="Confirm new password"
    //                                                 value={adminCredentials.confirmPassword}
    //                                                 onChange={(e) => setAdminCredentials({ ...adminCredentials, confirmPassword: e.target.value })}
    //                                                 disabled={loader}
    //                                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
    //                                             />
    //                                         </div>

    //                                         <button
    //                                             onClick={handleUpdateCredentials}
    //                                             disabled={loader}
    //                                             className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
    //                                         >
    //                                             {loader === true ?
    //                                                 <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
    //                                                 : <span>Update Credentials</span>}
    //                                         </button>

    //                                     </div>
    //                                 )}
    //                             </div>
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>

    //         {/* Add/Edit Review Modal */}
    //         {(showAddReview || editingReview) && (
    //             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    //                 <div className="bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
    //                     <div className="flex justify-between items-center mb-6">
    //                         <h2 className="text-2xl font-bold text-white">
    //                             {editingReview ? 'Edit Review' : 'Add New Review'}
    //                         </h2>
    //                         <button
    //                             onClick={() => {
    //                                 setShowAddReview(false);
    //                                 setEditingReview(null);
    //                                 setNewReviewData({
    //                                     name: '',
    //                                     role: '',
    //                                     text: '',
    //                                     rating: 5,
    //                                     avatar: ''
    //                                 });
    //                             }}
    //                             className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all"
    //                         >
    //                             <X className="w-5 h-5 text-red-400" />
    //                         </button>
    //                     </div>

    //                     <div className="space-y-6">
    //                         <input
    //                             type="text"
    //                             placeholder="Enter reviewer name"
    //                             value={editingReview?.name || newReviewData.name || ''}
    //                             onChange={(e) => {
    //                                 if (editingReview) {
    //                                     setEditingReview({ ...editingReview, name: e.target.value });
    //                                 } else {
    //                                     setNewReviewData({ ...newReviewData, name: e.target.value });
    //                                 }
    //                             }}
    //                             className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white font-bold"
    //                         />

    //                         <input
    //                             type="text"
    //                             placeholder="Enter reviewer role/company"
    //                             value={editingReview?.role || newReviewData.role || ''}
    //                             onChange={(e) => {
    //                                 if (editingReview) {
    //                                     setEditingReview({ ...editingReview, role: e.target.value });
    //                                 } else {
    //                                     setNewReviewData({ ...newReviewData, role: e.target.value });
    //                                 }
    //                             }}
    //                             className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
    //                         />

    //                         <textarea
    //                             placeholder="Enter review text"
    //                             value={editingReview?.text || newReviewData.text || ''}
    //                             onChange={(e) => {
    //                                 if (editingReview) {
    //                                     setEditingReview({ ...editingReview, text: e.target.value });
    //                                 } else {
    //                                     setNewReviewData({ ...newReviewData, text: e.target.value });
    //                                 }
    //                             }}
    //                             rows={3}
    //                             className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white resize-none text-sm"
    //                         />

    //                         <div className="flex items-center space-x-3">
    //                             <label className="text-sm text-gray-300">Rating:</label>
    //                             <div className="flex space-x-1">
    //                                 {[1, 2, 3, 4, 5].map((star) => (
    //                                     <button
    //                                         key={star}
    //                                         onClick={() => {
    //                                             if (editingReview) {
    //                                                 setEditingReview({ ...editingReview, rating: star });
    //                                             } else {
    //                                                 setNewReviewData({ ...newReviewData, rating: star });
    //                                             }
    //                                         }}
    //                                         className="focus:outline-none"
    //                                     >
    //                                         <Star
    //                                             className={`w-6 h-6 ${star <= (editingReview?.rating || newReviewData.rating || 5)
    //                                                 ? 'fill-yellow-400 text-yellow-400'
    //                                                 : 'text-gray-400'
    //                                                 }`}
    //                                         />
    //                                     </button>
    //                                 ))}
    //                             </div>
    //                         </div>

    //                         <div>
    //                             <label className="block text-sm text-gray-300 mb-2">Avatar Image</label>
    //                             <input
    //                                 type='file'
    //                                 accept="image/*"
    //                                 onChange={(e) => {
    //                                     const file = e.target.files?.[0];
    //                                     if (file) {
    //                                         const reader = new FileReader();
    //                                         reader.onload = (event) => {
    //                                             if (editingReview) {
    //                                                 setEditingReview({ ...editingReview, avatar: event.target?.result as string });
    //                                             } else {
    //                                                 setNewReviewData({ ...newReviewData, avatar: event.target?.result as string });
    //                                             }
    //                                         };
    //                                         reader.readAsDataURL(file);
    //                                     }
    //                                 }}
    //                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
    //                             />
    //                             {((editingReview?.avatar && editingReview.avatar.startsWith('data:image/')) || (newReviewData.avatar && newReviewData.avatar.startsWith('data:image/'))) && (
    //                                 <div className="mt-4">
    //                                     <img
    //                                         src={editingReview?.avatar || newReviewData.avatar}
    //                                         alt="Avatar Preview"
    //                                         className="w-16 h-16 object-cover rounded-full border border-white/20"
    //                                     />
    //                                 </div>
    //                             )}
    //                         </div>

    //                         <div className="flex justify-end space-x-3 pt-4">
    //                             <button
    //                                 onClick={() => {
    //                                     setShowAddReview(false);
    //                                     setEditingReview(null);
    //                                     setNewReviewData({
    //                                         name: '',
    //                                         role: '',
    //                                         text: '',
    //                                         rating: 5,
    //                                         avatar: ''
    //                                     });
    //                                 }}
    //                                 className="px-6 py-3 rounded-xl bg-gray-600/20 hover:bg-gray-600/40 border border-gray-500/30 transition-all"
    //                             >
    //                                 Cancel
    //                             </button>
    //                             <button
    //                                 onClick={() => {
    //                                     const reviewData = editingReview || newReviewData;
    //                                     if (reviewData.name && reviewData.role && reviewData.text && reviewData.avatar) {
    //                                         if (showAddReview) {
    //                                             // Adding new review
    //                                             addReview(reviewData as Omit<Review, 'id'>);
    //                                         } else {
    //                                             // Updating existing review
    //                                             updateReviewData(editingReview!);
    //                                         }
    //                                         setShowAddReview(false);
    //                                         setEditingReview(null);
    //                                         setNewReviewData({
    //                                             name: '',
    //                                             role: '',
    //                                             text: '',
    //                                             rating: 5,
    //                                             avatar: ''
    //                                         });
    //                                     } else {
    //                                         alert('Please fill in all fields');
    //                                     }
    //                                 }}
    //                                 disabled={loader}
    //                                 className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
    //                             >
    //                                 {loader ? (
    //                                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    //                                 ) : null}
    //                                 <span>{showAddReview ? 'Add Review' : 'Update Review'}</span>
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}

    //         {/* Add/Edit Project Modal */}
    //         {(showAddProject || editingProject) && (
    //             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    //                 <div className="bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
    //                     <div className="flex justify-between items-center mb-6">
    //                         <h2 className="text-2xl font-bold text-white">
    //                             {editingProject ? 'Edit Project' : 'Add New Project'}
    //                         </h2>
    //                         <button
    //                             onClick={() => {
    //                                 setShowAddProject(false);
    //                                 setEditingProject(null);
    //                                 setNewProjectData({
    //                                     title: '',
    //                                     desc: '',
    //                                     tags: [],
    //                                     projectImages: [],
    //                                     githubLink: '',
    //                                     projectLink: '',
    //                                     totalTeams: '0',
    //                                     isWeb: false
    //                                 });
    //                             }}
    //                             className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all"
    //                         >
    //                             <X className="w-5 h-5 text-red-400" />
    //                         </button>
    //                     </div>

    //                     <div className="space-y-6">
    //                         <div>
    //                             <label className="block text-sm text-gray-300 mb-2">Project Images (Gallery)</label>
    //                             <input
    //                                 type="file"
    //                                 multiple
    //                                 accept="image/*"
    //                                 onChange={(e) => {
    //                                     const files = Array.from(e.target.files || []);
    //                                     const imageUrls = files.map(file => {
    //                                         const reader = new FileReader();
    //                                         reader.readAsDataURL(file);
    //                                         return new Promise<string>((resolve) => {
    //                                             reader.onload = () => resolve(reader.result as string);
    //                                         });
    //                                     });
    //                                     Promise.all(imageUrls).then(urls => {
    //                                         if (editingProject) {
    //                                             setEditingProject({ ...editingProject, projectImages: [...editingProject.projectImages, ...urls] });
    //                                         } else {
    //                                             setNewProjectData({ ...newProjectData, projectImages: urls });
    //                                         }
    //                                     });
    //                                 }}
    //                                 className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
    //                             />
    //                             {((editingProject?.projectImages.length || 0) > 0 || (newProjectData.projectImages?.length || 0) > 0) && (
    //                                 <div className="mt-4 flex flex-wrap gap-2">
    //                                     {(editingProject?.projectImages || newProjectData.projectImages || []).map((img, idx) => (
    //                                         <div key={idx} className="relative">
    //                                             <img
    //                                                 src={img}
    //                                                 alt={`Project ${idx + 1}`}
    //                                                 className="w-16 h-16 object-cover rounded-lg border border-white/20"
    //                                             />
    //                                             {editingProject && (
    //                                                 <button
    //                                                     onClick={() => {
    //                                                         const currentImages = editingProject.projectImages;
    //                                                         const newImages = currentImages.filter((_, i) => i !== idx);
    //                                                         setEditingProject({ ...editingProject, projectImages: newImages });
    //                                                     }}
    //                                                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
    //                                                     title="Remove image"
    //                                                 >
    //                                                     ×
    //                                                 </button>
    //                                             )}
    //                                         </div>
    //                                     ))}
    //                                 </div>
    //                             )}
    //                         </div>

    //                         <input
    //                             type="text"
    //                             placeholder="Enter project title"
    //                             value={editingProject?.title || newProjectData.title || ''}
    //                             onChange={(e) => {
    //                                 if (editingProject) {
    //                                     setEditingProject({ ...editingProject, title: e.target.value });
    //                                 } else {
    //                                     setNewProjectData({ ...newProjectData, title: e.target.value });
    //                                 }
    //                             }}
    //                             className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white font-bold"
    //                         />

    //                         <textarea
    //                             placeholder="Enter project description"
    //                             value={editingProject?.desc || newProjectData.desc || ''}
    //                             onChange={(e) => {
    //                                 if (editingProject) {
    //                                     setEditingProject({ ...editingProject, desc: e.target.value });
    //                                 } else {
    //                                     setNewProjectData({ ...newProjectData, desc: e.target.value });
    //                                 }
    //                             }}
    //                             rows={3}
    //                             className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white resize-none text-sm"
    //                         />

    //                         <div>
    //                             <label className="block text-sm text-gray-300 mb-2">Tags</label>
    //                             <div className="space-y-2">
    //                                 {((editingProject?.tags || newProjectData.tags) || []).map((tag, tagIdx) => (
    //                                     <div key={tagIdx} className="flex items-center gap-2">
    //                                         <input
    //                                             type="text"
    //                                             placeholder="Enter tag name"
    //                                             value={tag}
    //                                             onChange={(e) => {
    //                                                 const currentTags = editingProject?.tags || newProjectData.tags || [];
    //                                                 const newTags = [...currentTags];
    //                                                 newTags[tagIdx] = e.target.value;
    //                                                 if (editingProject) {
    //                                                     setEditingProject({ ...editingProject, tags: newTags });
    //                                                 } else {
    //                                                     setNewProjectData({ ...newProjectData, tags: newTags });
    //                                                 }
    //                                             }}
    //                                             className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
    //                                         />
    //                                         <button
    //                                             onClick={() => {
    //                                                 const currentTags = editingProject?.tags || newProjectData.tags || [];
    //                                                 const newTags = currentTags.filter((_, idx) => idx !== tagIdx);
    //                                                 if (editingProject) {
    //                                                     setEditingProject({ ...editingProject, tags: newTags });
    //                                                 } else {
    //                                                     setNewProjectData({ ...newProjectData, tags: newTags });
    //                                                 }
    //                                             }}
    //                                             className="px-2 py-1 bg-red-600/20 hover:bg-red-600/40 rounded text-red-400 text-sm"
    //                                         >
    //                                             Remove
    //                                         </button>
    //                                     </div>
    //                                 ))}
    //                                 <button
    //                                     onClick={() => {
    //                                         const currentTags = editingProject?.tags || newProjectData.tags || [];
    //                                         const newTags = [...currentTags, ''];
    //                                         if (editingProject) {
    //                                             setEditingProject({ ...editingProject, tags: newTags });
    //                                         } else {
    //                                             setNewProjectData({ ...newProjectData, tags: newTags });
    //                                         }
    //                                     }}
    //                                     className="px-3 py-2 bg-green-600/20 hover:bg-green-600/40 rounded text-green-400 text-sm"
    //                                 >
    //                                     Add Tag
    //                                 </button>
    //                             </div>
    //                         </div>

    //                         <input
    //                             type="url"
    //                             placeholder="Enter project live/demo link"
    //                             value={editingProject?.projectLink || newProjectData.projectLink || ''}
    //                             onChange={(e) => {
    //                                 if (editingProject) {
    //                                     setEditingProject({ ...editingProject, projectLink: e.target.value });
    //                                 } else {
    //                                     setNewProjectData({ ...newProjectData, projectLink: e.target.value });
    //                                 }
    //                             }}
    //                             className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
    //                         />

    //                         <input
    //                             type="text"
    //                             placeholder="Enter total team members count"
    //                             value={editingProject?.totalTeams || newProjectData.totalTeams || '0'}
    //                             onChange={(e) => {
    //                                 if (editingProject) {
    //                                     setEditingProject({ ...editingProject, totalTeams: e.target.value || '0' });
    //                                 } else {
    //                                     setNewProjectData({ ...newProjectData, totalTeams: e.target.value || '0' });
    //                                 }
    //                             }}
    //                             className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
    //                         />

    //                         <input
    //                             type="url"
    //                             placeholder="Enter GitHub repository link"
    //                             value={editingProject?.githubLink || newProjectData.githubLink || ''}
    //                             onChange={(e) => {
    //                                 if (editingProject) {
    //                                     setEditingProject({ ...editingProject, githubLink: e.target.value });
    //                                 } else {
    //                                     setNewProjectData({ ...newProjectData, githubLink: e.target.value });
    //                                 }
    //                             }}
    //                             className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
    //                         />

    //                         <div className="flex items-center space-x-3">
    //                             <label className="text-sm text-gray-300">Is Web Project?</label>
    //                             <input
    //                                 type="checkbox"
    //                                 checked={editingProject?.isWeb || newProjectData.isWeb || false}
    //                                 onChange={(e) => {
    //                                     if (editingProject) {
    //                                         setEditingProject({ ...editingProject, isWeb: e.target.checked });
    //                                     } else {
    //                                         setNewProjectData({ ...newProjectData, isWeb: e.target.checked });
    //                                     }
    //                                 }}
    //                                 className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
    //                             />
    //                         </div>

    //                         <div className="flex justify-end space-x-3 pt-4">
    //                             <button
    //                                 onClick={() => {
    //                                     setShowAddProject(false);
    //                                     setEditingProject(null);
    //                                     setNewProjectData({
    //                                         title: '',
    //                                         desc: '',
    //                                         tags: [],
    //                                         projectImages: [],
    //                                         githubLink: '',
    //                                         projectLink: '',
    //                                         totalTeams: '0'
    //                                     });
    //                                 }}
    //                                 className="px-6 py-3 rounded-xl bg-gray-600/20 hover:bg-gray-600/40 border border-gray-500/30 transition-all"
    //                             >
    //                                 Cancel
    //                             </button>
    //                             <button
    //                                 onClick={() => {
    //                                     const projectData = editingProject || newProjectData;
    //                                     if (projectData.title && projectData.desc) {
    //                                         if (showAddProject) {
    //                                             // Adding new project
    //                                             addProject(projectData as Omit<Project, 'id'>);
    //                                         } else {
    //                                             // Updating existing project
    //                                             updateProjectData(editingProject!);
    //                                         }
    //                                         setShowAddProject(false);
    //                                         setEditingProject(null);
    //                                         setNewProjectData({
    //                                             title: '',
    //                                             desc: '',
    //                                             tags: [],
    //                                             projectImages: [],
    //                                             githubLink: '',
    //                                             projectLink: '',
    //                                             totalTeams: '0'
    //                                         });
    //                                     } else {
    //                                         alert('Please fill in title and description');
    //                                     }
    //                                 }}
    //                                 disabled={loader}
    //                                 className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
    //                             >
    //                                 {loader ? (
    //                                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    //                                 ) : null}
    //                                 <span>{showAddProject ? 'Add Project' : 'Update Project'}</span>
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}

    //         <style>{`
    //             @keyframes float {
    //                 0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
    //                 50% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
    //             }
    //             .animate-float {
    //                 animation: float 6s ease-in-out infinite;
    //             }
    //             .line-clamp-2 {
    //                 display: -webkit-box;
    //                 -webkit-line-clamp: 2;
    //                 -webkit-box-orient: vertical;
    //                 overflow: hidden;
    //             }
    //         `}</style>
    //     </div>
    // );
};

export default AdminHomePage;
