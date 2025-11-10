import { useState, useEffect } from 'react';
import { db } from '../config/fbconfig';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import {
    Lock,
    Mail,
    Eye,
    EyeOff,
    ArrowRight,
    Shield,
    Sparkles,
    AlertCircle,
    CheckCircle2,
    Loader2
} from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    const handleSubmit = async (e: any) => {
        if (e && e.preventDefault) e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            // Get admin credentials from Firestore
            const docRef = doc(db, 'dev1', 'admin');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const adminData = docSnap.data();
                const storedEmail = adminData.email;
                const storedPassword = adminData.pass;

                // console.log('storedEmail: ' + storedEmail);
                // console.log('storedPassword: ' + storedPassword);
                // console.log('adminData: ' + adminData);
                // for each loop adminData
                // for (const key in adminData) {
                //     console.log(key + ': ' + adminData[key]);
                // }

                // Check if credentials match
                if (formData.email === storedEmail && formData.password === storedPassword) {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate('/home');
                    }, 1500);
                } else {
                    setError('Invalid credentials. Please try again.');
                    setIsLoading(false);
                }
            } else {
                setError('Admin credentials not found.');
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)`
                    }}
                />
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

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Logo/Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-block relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-2xl opacity-50 animate-pulse" />
                        <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl mx-auto">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        Admin Login
                    </h1>
                    <p className="text-gray-400 flex items-center justify-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Secure Admin Portal</span>
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative p-8 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10">
                        {success ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Welcome Back!</h3>
                                <p className="text-gray-400">Redirecting to dashboard...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="admin@devpro.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                            className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="flex items-start space-x-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-red-400">{error}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center space-x-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-2 focus:ring-purple-500/20"
                                        />
                                        <span className="text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                                    </label>
                                    <button
                                        type="button"
                                        className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="group relative w-full py-4 rounded-xl font-bold overflow-hidden transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    <span className="relative flex items-center justify-center space-x-2 text-white">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Signing In...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Sign In</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </button>

                                {/* Demo Credentials */}
                                {/* <div className="pt-4 border-t border-white/10">
                                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                                        <Sparkles className="w-3 h-3" />
                                        <span>Demo Credentials</span>
                                    </div>
                                    <div className="space-y-1 text-xs">
                                        <p className="text-gray-400">
                                            <span className="text-purple-400 font-semibold">Email:</span> admin@devpro.com
                                        </p>
                                        <p className="text-gray-400">
                                            <span className="text-purple-400 font-semibold">Password:</span> admin123
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Protected by advanced security measures
                    </p>
                    <div className="flex items-center justify-center space-x-4 mt-4">
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Lock className="w-3 h-3" />
                            <span>SSL Encrypted</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Shield className="w-3 h-3" />
                            <span>2FA Protected</span>
                        </div>
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

export default AdminLogin;