import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle, CheckCircle } from 'lucide-react';

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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
        <section id="contact" className="py-16 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h3 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        Let's Create Together
                    </h3>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        Have an exciting project? Let's bring your vision to life
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Left Side - Contact Info (2 columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-300`} />
                                    <div className="relative flex items-center space-x-4 p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                                            <p className="font-semibold text-white text-sm truncate">{item.value}</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-4">
                            <h5 className="text-lg font-bold mb-4 text-white">Connect With Me</h5>
                            <div className="flex gap-3">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex-1"
                                        title={social.label}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-all`} />
                                        <div className={`relative h-12 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center transition-all hover:scale-105`}>
                                            {social.icon}
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

                    {/* Right Side - Contact Form (3 columns) */}
                    <div className="lg:col-span-3">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="relative p-6 md:p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
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
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-3.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Your Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-5 py-3.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Your Message
                                            </label>
                                            <textarea
                                                placeholder="Tell me about your project..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={5}
                                                className="w-full px-5 py-3.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none text-white placeholder-gray-500"
                                            />
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="group relative w-full py-4 rounded-xl font-bold overflow-hidden transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <span className="relative flex items-center justify-center space-x-2 text-white">
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Sending...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        <span>Send Message</span>
                                                    </>
                                                )}
                                            </span>
                                        </button>

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
