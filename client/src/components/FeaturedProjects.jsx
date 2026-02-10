import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFeaturedProjects } from '../hooks/useData';
import ProjectCard from './ProjectCard';
import { ArrowRight, Sparkles } from 'lucide-react';

const FeaturedProjects = () => {
    const { projects, loading } = useFeaturedProjects();

    if (loading) {
        return (
            <section className="py-20 relative">
                <div className="container-custom mx-auto px-4 md:px-8">
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-green"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (!projects.length) return null;

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 -right-32 w-72 h-72 bg-accent-green/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-accent-green/5 rounded-full blur-3xl" />
            </div>

            <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center mb-14"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles size={20} className="text-accent-green" />
                        <span className="text-accent-green font-semibold text-sm uppercase tracking-widest">
                            Showcase
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-text-light max-w-xl mx-auto">
                        A selection of projects I'm most proud of
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={project._id} project={project} index={index} />
                    ))}
                </motion.div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/portfolio"
                        className="group inline-flex items-center gap-3 px-8 py-3.5 bg-dark-card border border-dark-border rounded-xl text-white font-semibold hover:border-accent-green/50 hover:bg-dark-card/80 transition-all duration-300"
                    >
                        View All Projects
                        <ArrowRight
                            size={18}
                            className="text-accent-green transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
