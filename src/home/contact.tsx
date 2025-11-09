import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle, CheckCircle, Sparkles, Zap, Star } from 'lucide-react';

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

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

    const handleSubmit = async () => {
        if (formData.name && formData.email && formData.message) {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
            }, 3000);
        } else {
            alert('⚠️ Please fill in all fields.');
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            label: 'Email',
            value: 'hello@devprostudio.com',
            color: 'from-purple-500 to-pink-500',
            href: 'mailto:hello@devprostudio.com'
        },
        {
            icon: <Phone className="w-5 h-5" />,
            label: 'Phone',
            value: '+1 (555) 123-4567',
            color: 'from-blue-500 to-cyan-500',
            href: 'tel:+15551234567'
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: 'Location',
            value: 'San Francisco, CA',
            color: 'from-green-500 to-emerald-500',
            href: 'https://maps.google.com'
        }
    ];

    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, color: 'from-gray-600 to-gray-800', href: 'https://github.com', label: 'GitHub' },
        { icon: <Linkedin className="w-5 h-5" />, color: 'from-blue-600 to-blue-800', href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: <Twitter className="w-5 h-5" />, color: 'from-cyan-500 to-blue-600', href: 'https://twitter.com', label: 'Twitter' },
        { icon: <MessageCircle className="w-5 h-5" />, color: 'from-purple-600 to-pink-600', href: 'https://wa.me/15551234567', label: 'WhatsApp' }
    ];

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Enhanced 3D Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

            {/* Dynamic Mouse-following Gradient */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.2) 25%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)`
                }}
            />

            {/* Floating 3D Orbs */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-32 h-32 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-2xl animate-float-3d"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 8}s`,
                            animationDuration: `${8 + Math.random() * 12}s`,
                            transform: `translateZ(${Math.random() * 100}px)`
                        }}
                    />
                ))}
            </div>

            {/* Geometric Shapes */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute border border-purple-500/20 animate-spin-slow"
                        style={{
                            width: `${50 + Math.random() * 100}px`,
                            height: `${50 + Math.random() * 100}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            transform: `rotate(${Math.random() * 360}deg) translateZ(${Math.random() * 50}px)`
                        }}
                    />
                ))}
            </div>

            {/* Central 3D Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-purple-600/20 via-cyan-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse-slow" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                {/* Enhanced 3D Header */}
                <div className="text-center mb-16 relative">
                    {/* Floating Icons */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl transform hover:scale-110 transition-all">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl transform hover:scale-110 transition-all" style={{ animationDelay: '0.5s' }}>
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl transform hover:scale-110 transition-all" style={{ animationDelay: '1s' }}>
                            <Star className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-pink-600/20 blur-3xl transform scale-150" />
                        <h3 className="relative text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-3d transform hover:scale-105 transition-all duration-500">
                            Let's Create Together
                        </h3>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-all duration-300">
                        Have an exciting project? Let's bring your vision to life with cutting-edge technology and creative innovation
                    </p>

                    {/* Animated Underline */}
                    <div className="mt-8 flex justify-center">
                        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-full animate-pulse-glow" />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Left Side - Enhanced 3D Contact Info (2 columns) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 3D Contact Cards */}
                        <div className="space-y-6">
                            {contactInfo.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group relative block transform hover:scale-105 transition-all duration-500"
                                    style={{ transformStyle: 'preserve-3d' }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {/* 3D Shadow Layers */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-500 transform translate-x-2 translate-y-2`} />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500 transform translate-x-1 translate-y-1`} />

                                    {/* Main Card */}
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative block"
                                    >
                                        <div className="relative p-6 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-all duration-500 transform group-hover:translate-z-8 group-hover:rotate-y-2">
                                            {/* Inner Glow */}
                                            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-all duration-500`} />

                                            <div className="relative flex items-center space-x-5">
                                                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-gray-400 text-sm mb-1 font-medium">{item.label}</p>
                                                    <p className="font-bold text-white text-lg truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">{item.value}</p>
                                                </div>
                                            </div>

                                            {/* Animated Border */}
                                            <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${item.color} bg-clip-border opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-flow`} />
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced 3D Social Links */}
                        <div className="pt-6">
                            <h5 className="text-xl font-bold mb-6 text-white flex items-center space-x-2">
                                <span>Connect With Me</span>
                                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                            </h5>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative block transform hover:scale-110 transition-all duration-500"
                                        title={social.label}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        {/* 3D Layers */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 transform translate-x-1 translate-y-1`} />
                                        <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500 transform translate-x-0.5 translate-y-0.5`} />

                                        <div className={`relative h-16 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transform group-hover:-translate-y-1 group-hover:rotate-x-12`}>
                                            <div className="absolute inset-0 bg-black/20 rounded-xl backdrop-blur-sm" />
                                            <div className="relative transform group-hover:scale-110 transition-all duration-300">
                                                {social.icon}
                                            </div>

                                            {/* Hover Glow Effect */}
                                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 transition-all duration-500 animate-pulse`} />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="hidden lg:block pt-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 backdrop-blur-xl">
                                    <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24/7</div>
                                    <div className="text-xs text-gray-400">Available</div>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 backdrop-blur-xl">
                                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">2h</div>
                                    <div className="text-xs text-gray-400">Response</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Enhanced 3D Contact Form (3 columns) */}
                    <div className="lg:col-span-3">
                        <div className="relative group transform hover:scale-[1.02] transition-all duration-500" style={{ transformStyle: 'preserve-3d' }}>
                            {/* 3D Shadow Layers */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500 transform translate-x-4 translate-y-4" />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/15 to-cyan-600/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 transform translate-x-2 translate-y-2" />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500 transform translate-x-1 translate-y-1" />

                            <div className="relative p-8 md:p-10 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all duration-500 transform group-hover:translate-z-12">
                                {/* Inner Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-600/5 rounded-3xl" />
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                            <CheckCircle className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                                        <p className="text-gray-400">I'll get back to you soon.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        <div className="relative group">
                                            <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                                                <span>Your Name</span>
                                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500 transform hover:scale-[1.02] focus:scale-[1.02] duration-300"
                                                />
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-cyan-600/0 opacity-0 group-focus-within:opacity-100 transition-all duration-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                                                <span>Your Email</span>
                                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white placeholder-gray-500 transform hover:scale-[1.02] focus:scale-[1.02] duration-300"
                                                />
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-600/0 via-cyan-600/5 to-purple-600/0 opacity-0 group-focus-within:opacity-100 transition-all duration-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                                                <span>Your Message</span>
                                                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    placeholder="Tell me about your project..."
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    rows={6}
                                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all resize-none text-white placeholder-gray-500 transform hover:scale-[1.02] focus:scale-[1.02] duration-300"
                                                />
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-600/0 via-pink-600/5 to-purple-600/0 opacity-0 group-focus-within:opacity-100 transition-all duration-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className="group relative w-full py-5 rounded-2xl font-bold overflow-hidden transform hover:scale-[1.05] active:scale-[0.95] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/50"
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                {/* 3D Layers */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl transform translate-z-2" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl transform translate-z-1" />
                                                <div className="absolute inset-0 bg-black/20 rounded-2xl backdrop-blur-sm" />

                                                {/* Animated Border */}
                                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 bg-clip-border opacity-0 group-hover:opacity-100 transition-all duration-500 animate-border-flow" />

                                                <span className="relative flex items-center justify-center space-x-3 text-white transform group-hover:translate-z-4 transition-all duration-300">
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            <span className="text-lg">Sending...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-300" />
                                                            <span className="text-lg">Send Message</span>
                                                            <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                                                        </>
                                                    )}
                                                </span>

                                                {/* Hover Glow */}
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10" />
                                            </button>
                                        </div>

                                        <p className="text-xs text-center text-gray-500">
                                            By sending a message, you agree to our privacy policy
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

// Custom CSS for 3D animations
const styles = `
@keyframes float-3d {
  0%, 100% {
    transform: translateY(0px) translateX(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
    opacity: 0.1;
  }
  25% {
    transform: translateY(-20px) translateX(10px) translateZ(20px) rotateX(5deg) rotateY(5deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-40px) translateX(-10px) translateZ(40px) rotateX(-5deg) rotateY(-5deg);
    opacity: 0.2;
  }
  75% {
    transform: translateY(-20px) translateX(5px) translateZ(20px) rotateX(3deg) rotateY(-3deg);
    opacity: 0.25;
  }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes bounce-slow {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scaleX(0.8); }
  50% { opacity: 1; transform: scaleX(1.2); }
}

@keyframes gradient-3d {
  0%, 100% { background-position: 0% 50%; filter: hue-rotate(0deg); }
  25% { background-position: 100% 0%; filter: hue-rotate(90deg); }
  50% { background-position: 100% 100%; filter: hue-rotate(180deg); }
  75% { background-position: 0% 100%; filter: hue-rotate(270deg); }
}

@keyframes border-flow {
  0% { background-position: 0% 0%; }
  100% { background-position: 400% 0%; }
}

.animate-float-3d {
  animation: float-3d 8s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-gradient-3d {
  animation: gradient-3d 6s ease infinite;
  background-size: 200% 200%;
}

.animate-border-flow {
  animation: border-flow 3s linear infinite;
  background-size: 400% 400%;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}