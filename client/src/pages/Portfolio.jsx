import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../hooks/useData';
import ProjectCard from '../components/ProjectCard';
import { Folder } from 'lucide-react';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const { projects, loading } = useProjects(activeCategory);

    const categories = ['All', 'Web App', 'AI/Robotics', 'PWA'];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-green"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-40 w-80 h-80 bg-accent-green/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
            </div>

            <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        My <span className="text-gradient">Portfolio</span>
                    </h1>
                    <p className="text-text-light max-w-2xl mx-auto">
                        A showcase of projects I've built with passion and dedication
                    </p>
                </motion.div>

                {/* Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${activeCategory === category
                                ? 'bg-accent-green text-dark-bg'
                                : 'bg-dark-card border border-dark-border text-white hover:border-accent-green'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={project._id} project={project} index={index} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 rounded-full bg-dark-card flex items-center justify-center mx-auto mb-4">
                            <Folder className="w-10 h-10 text-text-muted" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
                        <p className="text-text-light">
                            {activeCategory === 'All'
                                ? 'Projects will appear here once added.'
                                : `No projects in the "${activeCategory}" category yet.`}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
