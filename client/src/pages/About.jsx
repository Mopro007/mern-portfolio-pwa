import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useData';
import SkillBars from '../components/SkillBars';
import { GraduationCap, Briefcase, MapPin, Award } from 'lucide-react';

const About = () => {
    const { profile, loading } = useProfile();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-green"></div>
            </div>
        );
    }

    const name = profile?.name || 'Your Name';
    const aboutText = profile?.about_me_text || 'Write your about me text here...';
    const profileImage = profile?.profile_image_url || '/placeholder-profile.png';

    const highlights = [
        { icon: GraduationCap, text: 'AI & Robotics Engineering Student at AUIS' },
        { icon: Briefcase, text: 'Experienced Freelance Developer' },
        { icon: MapPin, text: 'Based in Iraq' },
        { icon: Award, text: 'MERN Stack & PWA Specialist' }
    ];

    return (
        <div className="min-h-screen pt-28 pb-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 -right-40 w-80 h-80 bg-accent-green/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
            </div>

            <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        About <span className="text-gradient">Me</span>
                    </h1>
                    <p className="text-text-light max-w-2xl mx-auto">
                        Get to know the developer behind the code
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Photo and Quick Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Photo with Grayscale to Color Effect */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-accent-green/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative overflow-hidden rounded-2xl border border-dark-border">
                                <img
                                    src={profileImage}
                                    alt={`${name} - Developer`}
                                    className="w-full aspect-square object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
                            </div>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="card p-4 flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-accent-green" />
                                    </div>
                                    <span className="text-text-light text-sm">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Bio and Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Bio */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Who I Am</h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-text-light leading-relaxed whitespace-pre-line">
                                    {aboutText}
                                </p>
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">My Skills</h2>
                            <SkillBars skills={profile?.skills} />
                        </div>

                        {/* Experience */}
                        {profile?.experience?.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>
                                <div className="space-y-6">
                                    {profile.experience.map((exp, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-3 h-3 rounded-full bg-accent-green mt-2" />
                                                <div className="w-0.5 flex-1 bg-dark-border mt-2" />
                                            </div>
                                            <div className="pb-8">
                                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                                <p className="text-accent-green mb-1">{exp.company}</p>
                                                <p className="text-text-muted text-sm mb-2">{exp.duration}</p>
                                                <p className="text-text-light">{exp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {profile?.education?.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
                                <div className="space-y-6">
                                    {profile.education.map((edu, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-3 h-3 rounded-full bg-accent-green mt-2" />
                                                <div className="w-0.5 flex-1 bg-dark-border mt-2" />
                                            </div>
                                            <div className="pb-8">
                                                <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                                                <p className="text-accent-green mb-1">{edu.degree}</p>
                                                <p className="text-text-muted text-sm mb-2">{edu.year}</p>
                                                <p className="text-text-light">{edu.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
