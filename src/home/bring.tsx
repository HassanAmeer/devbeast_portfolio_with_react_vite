import React from 'react';
import { Smartphone, Code2, Database, Brain, Globe, Cloud } from 'lucide-react';

const BringSection = () => {
    const features = [
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: 'Cross-Platform Magic',
            desc: 'Beautiful native experiences across iOS, Android, and Web from a single codebase with 60fps animations',
            color: 'from-blue-500 to-cyan-400',
            delay: '0'
        },
        {
            icon: <Code2 className="w-8 h-8" />,
            title: 'Clean Architecture',
            desc: 'Enterprise-grade code following SOLID principles, DDD patterns, and microservices architecture',
            color: 'from-purple-500 to-pink-400',
            delay: '100'
        },
        {
            icon: <Database className="w-8 h-8" />,
            title: 'Backend Mastery',
            desc: 'Scalable APIs with Laravel, GraphQL, WebSockets, and real-time data synchronization',
            color: 'from-green-500 to-teal-400',
            delay: '200'
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: 'AI/ML Integration',
            desc: 'Cutting-edge machine learning with TensorFlow, computer vision, and predictive analytics',
            color: 'from-orange-500 to-red-400',
            delay: '300'
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: 'Modern Web Apps',
            desc: 'Lightning-fast React applications with Next.js, SSR, ISR, and edge computing',
            color: 'from-cyan-500 to-blue-400',
            delay: '400'
        },
        {
            icon: <Cloud className="w-8 h-8" />,
            title: 'Cloud Native',
            desc: 'DevOps excellence with Docker, Kubernetes, CI/CD pipelines, and multi-cloud deployment',
            color: 'from-indigo-500 to-purple-400',
            delay: '500'
        }
    ];

    {/* Skills 3D Cards */ }
    return <section id="skills" className="py-1 container mx-auto px-4 pt-20">
        <div className="text-center mb-16">
            {/* <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full text-sm font-bold text-purple-300 border border-purple-500/30 mb-6">
           EXPERTISE
       </div> */}
            <h3 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                What I Bring
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Full-stack expertise with cutting-edge technologies
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
                <div
                    key={idx}
                    className="group relative"
                    style={{ animationDelay: `${feature.delay}ms` }}
                >
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                    <div className="relative p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 hover:-translate-y-2 duration-500">
                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            {feature.icon}
                        </div>
                        <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                            {feature.title}
                        </h4>
                        <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
    return <>

    </>

};

export default BringSection;