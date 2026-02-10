import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDownCircle, Download, Sparkles } from 'lucide-react';
import CodeBackground from './CodeBackground';

const Hero = ({ profile }) => {
    const name = profile?.name || 'Your Name';
    const title = profile?.title || 'Full-Stack Developer & AI Engineer';
    const subtitle = profile?.subtitle || 'Building intelligent web solutions and robotics systems.';
    const profileImage = profile?.profile_image_url || '/Profile Picture - Transparent Background.png';

    return (
        <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            {/* Code Background with Mouse Spotlight */}
            <CodeBackground />

            <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="order-2 lg:order-1"
                    >
                        {/* Greeting */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <Sparkles className="w-5 h-5 text-accent-green" />
                            <span className="text-accent-green font-medium">Hello, I am</span>
                        </motion.div>

                        {/* Name */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl md:text-3xl font-semibold text-white mb-2"
                        >
                            {name}
                        </motion.h2>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                        >
                            <span className="text-gradient">{title.split('&')[0]}</span>
                            {title.includes('&') && (
                                <>
                                    <br />
                                    <span className="text-white">&{title.split('&')[1]}</span>
                                </>
                            )}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-text-light text-lg md:text-xl mb-8 max-w-xl"
                        >
                            {subtitle}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/contact" className="btn-primary flex items-center gap-2">
                                Hire Me
                                <ArrowDownCircle className="w-5 h-5" />
                            </Link>
                            <a
                                href={profile?.resume_url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline flex items-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Resume
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="order-1 lg:order-2 flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-accent-green/20 rounded-full blur-3xl scale-75" />

                            {/* Image Container - Organic Shape */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]"
                            >
                                {/* Border Ring */}
                                <div className="absolute inset-0 rounded-full border-2 border-accent-green/30 animate-pulse" />
                                <div className="absolute inset-2 rounded-full border border-accent-green/20" />

                                {/* Profile Image with transparent background support */}
                                <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-dark-card to-dark-bg">
                                    <img
                                        src={profileImage}
                                        alt={`${name} - Developer`}
                                        className="w-full h-full object-cover object-center"
                                        style={{ background: 'transparent' }}
                                    />
                                </div>

                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-accent-green"
                    >
                        <ArrowDownCircle className="w-8 h-8" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
