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

const AdminHomePage = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showAddProject, setShowAddProject] = useState(false);
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
                                        disabled={loader}
                                        className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
                                    >
                                        <Save className="w-5 h-5" />
                                        {loader === true ?
                                            <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                            : <span>Save Changes</span>}
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
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={heroData.title}
                                            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Subtitle</label>
                                        <input
                                            type="text"
                                            value={heroData.subtitle}
                                            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
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
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-purple-400 mb-2">Statistics</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={heroData.card_title_1}
                                                onChange={(e) => setHeroData({ ...heroData, card_title_1: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Number"
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                            <input
                                                type="text"
                                                value={heroData.card_subtitle_1}
                                                onChange={(e) => setHeroData({ ...heroData, card_subtitle_1: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Label"
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={heroData.card_title_2}
                                                onChange={(e) => setHeroData({ ...heroData, card_title_2: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Number"
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                            <input
                                                type="text"
                                                value={heroData.card_subtitle_2}
                                                onChange={(e) => setHeroData({ ...heroData, card_subtitle_2: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Label"
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={heroData.card_title_3}
                                                onChange={(e) => setHeroData({ ...heroData, card_title_3: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Number"
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                            <input
                                                type="text"
                                                value={heroData.card_subtitle_3}
                                                onChange={(e) => setHeroData({ ...heroData, card_subtitle_3: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Label"
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={heroData.card_title_4}
                                                onChange={(e) => setHeroData({ ...heroData, card_title_4: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Number"
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                            <input
                                                type="text"
                                                value={heroData.card_subtitle_4}
                                                onChange={(e) => setHeroData({ ...heroData, card_subtitle_4: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Label"
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h5 className='text-purple-400 font-bold text-xl'>Buttons</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Button 1 Name</label>
                                        <input
                                            type="text"
                                            value={heroData.btn_name_1}
                                            onChange={(e) => setHeroData({ ...heroData, btn_name_1: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Link</label>
                                        <input
                                            type="text"
                                            value={heroData.btn_link_1}
                                            onChange={(e) => setHeroData({ ...heroData, btn_link_1: e.target.value })}
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
                                            value={heroData.btn_name_2}
                                            onChange={(e) => setHeroData({ ...heroData, btn_name_2: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Link</label>
                                        <input
                                            type="text"
                                            value={heroData.btn_link_2}
                                            onChange={(e) => setHeroData({ ...heroData, btn_link_2: e.target.value })}
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
                                        onClick={() => {
                                            setNewProjectData({
                                                title: '',
                                                desc: '',
                                                tags: [],
                                                projectImages: [],
                                                githubLink: '',
                                                projectLink: '',
                                                totalTeams: '0',
                                                isWeb: false
                                            });
                                            setShowAddProject(true);
                                        }}
                                        disabled={loader}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loader === true ?
                                            <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                            : <Plus className="w-4 h-4" />}
                                        <span>Add Project</span>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {projects.map((project) => (
                                        <div key={project.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all">
                                            <div className="flex items-center space-x-4">
                                                {project.projectImages && (
                                                    <img
                                                        src={project.projectImages[0] ?? ""}
                                                        alt={project.title}
                                                        className="w-16 h-16 object-cover rounded-lg border border-white/20"
                                                    />
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-white">{project.title}</h4>
                                                    <p className="text-sm text-gray-400 line-clamp-1">{project.desc}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs text-purple-400">{project.tags.length} tags</span>
                                                        <span className="text-xs text-cyan-400">{project.totalTeams} team members</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
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
                                        <h3 className="text-xl font-bold text-purple-400 mb-4">Header & Branding</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Header Title</label>
                                                <input
                                                    type="text"
                                                    value={headerData.title}
                                                    onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Header subtitle</label>
                                                <input
                                                    type="text"
                                                    value={headerData.subtitle}
                                                    onChange={(e) => setHeaderData({ ...headerData, subtitle: e.target.value })}
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
                                                                setHeaderData({ ...headerData, logo: event.target?.result as string });
                                                                // console.log("base64 check:" + event.target?.result as string);
                                                                // upload file by base64 code 
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                                />
                                                {headerData.logo && (
                                                    <div className="mt-4">
                                                        <img
                                                            src={headerData.logo}
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
                                                            <span className="text-sm text-gray-400">{msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : msg.createdAt}</span>
                                                        </div>
                                                        <p className="text-gray-300 mb-2">{msg.email}</p>
                                                        <p className="text-gray-400 mt-2 line-clamp-2">{msg.desc}</p>
                                                    </div>
                                                    {loader === true ?
                                                        <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                                        : <div className="flex items-center space-x-2 ml-4">
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
                                                                title="Delete message"
                                                            >
                                                                <Trash2 className="w-4 h-4 text-red-400" />
                                                            </button>
                                                        </div>}
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
                                            Changing admin credentials will update the data in Firestore and require you to log in again.
                                        </p>
                                    </div>

                                    {isLoadingData ? (
                                        <div className="flex items-center justify-center py-12">
                                            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="ml-3 text-gray-300">Loading current data...</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">New Email (Optional)</label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter new email address"
                                                    value={adminCredentials.newEmail || currentAdminData?.email || ''}
                                                    onChange={(e) => setAdminCredentials({ ...adminCredentials, newEmail: e.target.value })}
                                                    disabled={loader}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Current Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter current password"
                                                    value={adminCredentials.currentPassword}
                                                    onChange={(e) => setAdminCredentials({ ...adminCredentials, currentPassword: e.target.value })}
                                                    disabled={loader}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">New Password (Optional)</label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    value={adminCredentials.newPassword}
                                                    onChange={(e) => setAdminCredentials({ ...adminCredentials, newPassword: e.target.value })}
                                                    disabled={loader}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    value={adminCredentials.confirmPassword}
                                                    onChange={(e) => setAdminCredentials({ ...adminCredentials, confirmPassword: e.target.value })}
                                                    disabled={loader}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white disabled:opacity-50"
                                                />
                                            </div>

                                            <button
                                                onClick={handleUpdateCredentials}
                                                disabled={loader}
                                                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                            >
                                                {loader === true ?
                                                    <div className="w-8 h-8 border-4 border-purple-200 border-t-transparent rounded-full animate-spin" />
                                                    : <span>Update Credentials</span>}
                                            </button>

                                        </div>
                                    )}
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
                                    setNewProjectData({
                                        title: '',
                                        desc: '',
                                        tags: [],
                                        projectImages: [],
                                        githubLink: '',
                                        projectLink: '',
                                        totalTeams: '0',
                                        isWeb: false
                                    });
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
                                                setEditingProject({ ...editingProject, projectImages: [...editingProject.projectImages, ...urls] });
                                            } else {
                                                setNewProjectData({ ...newProjectData, projectImages: urls });
                                            }
                                        });
                                    }}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                />
                                {((editingProject?.projectImages.length || 0) > 0 || (newProjectData.projectImages?.length || 0) > 0) && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {(editingProject?.projectImages || newProjectData.projectImages || []).map((img, idx) => (
                                            <div key={idx} className="relative">
                                                <img
                                                    src={img}
                                                    alt={`Project ${idx + 1}`}
                                                    className="w-16 h-16 object-cover rounded-lg border border-white/20"
                                                />
                                                {editingProject && (
                                                    <button
                                                        onClick={() => {
                                                            const currentImages = editingProject.projectImages;
                                                            const newImages = currentImages.filter((_, i) => i !== idx);
                                                            setEditingProject({ ...editingProject, projectImages: newImages });
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                                        title="Remove image"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <input
                                type="text"
                                placeholder="Enter project title"
                                value={editingProject?.title || newProjectData.title || ''}
                                onChange={(e) => {
                                    if (editingProject) {
                                        setEditingProject({ ...editingProject, title: e.target.value });
                                    } else {
                                        setNewProjectData({ ...newProjectData, title: e.target.value });
                                    }
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white font-bold"
                            />

                            <textarea
                                placeholder="Enter project description"
                                value={editingProject?.desc || newProjectData.desc || ''}
                                onChange={(e) => {
                                    if (editingProject) {
                                        setEditingProject({ ...editingProject, desc: e.target.value });
                                    } else {
                                        setNewProjectData({ ...newProjectData, desc: e.target.value });
                                    }
                                }}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white resize-none text-sm"
                            />

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Tags</label>
                                <div className="space-y-2">
                                    {((editingProject?.tags || newProjectData.tags) || []).map((tag, tagIdx) => (
                                        <div key={tagIdx} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter tag name"
                                                value={tag}
                                                onChange={(e) => {
                                                    const currentTags = editingProject?.tags || newProjectData.tags || [];
                                                    const newTags = [...currentTags];
                                                    newTags[tagIdx] = e.target.value;
                                                    if (editingProject) {
                                                        setEditingProject({ ...editingProject, tags: newTags });
                                                    } else {
                                                        setNewProjectData({ ...newProjectData, tags: newTags });
                                                    }
                                                }}
                                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                                            />
                                            <button
                                                onClick={() => {
                                                    const currentTags = editingProject?.tags || newProjectData.tags || [];
                                                    const newTags = currentTags.filter((_, idx) => idx !== tagIdx);
                                                    if (editingProject) {
                                                        setEditingProject({ ...editingProject, tags: newTags });
                                                    } else {
                                                        setNewProjectData({ ...newProjectData, tags: newTags });
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
                                            const currentTags = editingProject?.tags || newProjectData.tags || [];
                                            const newTags = [...currentTags, ''];
                                            if (editingProject) {
                                                setEditingProject({ ...editingProject, tags: newTags });
                                            } else {
                                                setNewProjectData({ ...newProjectData, tags: newTags });
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
                                value={editingProject?.projectLink || newProjectData.projectLink || ''}
                                onChange={(e) => {
                                    if (editingProject) {
                                        setEditingProject({ ...editingProject, projectLink: e.target.value });
                                    } else {
                                        setNewProjectData({ ...newProjectData, projectLink: e.target.value });
                                    }
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                            />

                            <input
                                type="text"
                                placeholder="Enter total team members count"
                                value={editingProject?.totalTeams || newProjectData.totalTeams || '0'}
                                onChange={(e) => {
                                    if (editingProject) {
                                        setEditingProject({ ...editingProject, totalTeams: e.target.value || '0' });
                                    } else {
                                        setNewProjectData({ ...newProjectData, totalTeams: e.target.value || '0' });
                                    }
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                            />

                            <input
                                type="url"
                                placeholder="Enter GitHub repository link"
                                value={editingProject?.githubLink || newProjectData.githubLink || ''}
                                onChange={(e) => {
                                    if (editingProject) {
                                        setEditingProject({ ...editingProject, githubLink: e.target.value });
                                    } else {
                                        setNewProjectData({ ...newProjectData, githubLink: e.target.value });
                                    }
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 outline-none transition-all text-white text-sm"
                            />

                            <div className="flex items-center space-x-3">
                                <label className="text-sm text-gray-300">Is Web Project?</label>
                                <input
                                    type="checkbox"
                                    checked={editingProject?.isWeb || newProjectData.isWeb || false}
                                    onChange={(e) => {
                                        if (editingProject) {
                                            setEditingProject({ ...editingProject, isWeb: e.target.checked });
                                        } else {
                                            setNewProjectData({ ...newProjectData, isWeb: e.target.checked });
                                        }
                                    }}
                                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
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
                                            totalTeams: '0'
                                        });
                                    }}
                                    className="px-6 py-3 rounded-xl bg-gray-600/20 hover:bg-gray-600/40 border border-gray-500/30 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const projectData = editingProject || newProjectData;
                                        if (projectData.title && projectData.desc) {
                                            if (showAddProject) {
                                                // Adding new project
                                                addProject(projectData as Omit<Project, 'id'>);
                                            } else {
                                                // Updating existing project
                                                updateProjectData(editingProject!);
                                            }
                                            setShowAddProject(false);
                                            setEditingProject(null);
                                            setNewProjectData({
                                                title: '',
                                                desc: '',
                                                tags: [],
                                                projectImages: [],
                                                githubLink: '',
                                                projectLink: '',
                                                totalTeams: '0'
                                            });
                                        } else {
                                            alert('Please fill in title and description');
                                        }
                                    }}
                                    disabled={loader}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {loader ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : null}
                                    <span>{showAddProject ? 'Add Project' : 'Update Project'}</span>
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
