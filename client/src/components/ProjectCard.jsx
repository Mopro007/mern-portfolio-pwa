import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
    // Determine card size variant based on index for collage effect
    const isLarge = index % 5 === 0;   // Every 5th card is large
    const isMedium = index % 5 === 1 || index % 5 === 3; // 2nd and 4th are medium

    const sizeClass = isLarge
        ? 'md:col-span-2 md:row-span-2'
        : isMedium
            ? 'md:col-span-1 md:row-span-2'
            : 'md:col-span-1 md:row-span-1';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
            className={`project-card group relative overflow-hidden rounded-2xl bg-dark-card border border-dark-border hover:border-accent-green/40 transition-all duration-500 ${sizeClass}`}
        >
            {/* Project Image */}
            <div className={`relative overflow-hidden ${isLarge ? 'h-64 md:h-80' : isMedium ? 'h-48 md:h-56' : 'h-44 md:h-48'}`}>
                <img
                    src={project.image_url || '/placeholder-project.png'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/20 to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-dark-bg/80 backdrop-blur-md text-accent-green text-xs font-semibold rounded-full border border-accent-green/20">
                    {project.category}
                </span>

                {/* Featured Badge */}
                {project.featured && (
                    <span className="absolute top-4 right-4 px-3 py-1.5 bg-accent-green/90 text-dark-bg text-xs font-bold rounded-full">
                        ★ Featured
                    </span>
                )}
            </div>

            {/* Content — Always Visible */}
            <div className="p-5 md:p-6 flex flex-col gap-3">
                {/* Title */}
                <h3 className={`font-bold text-white leading-tight group-hover:text-accent-green transition-colors duration-300 ${isLarge ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                    {project.title}
                </h3>

                {/* Description */}
                <p className={`text-text-light text-sm leading-relaxed ${isLarge ? 'line-clamp-4' : 'line-clamp-3'}`}>
                    {project.description}
                </p>

                {/* Tech Stack */}
                {project.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {project.tech_stack.map((tech, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 bg-accent-green/8 text-accent-green/80 text-xs font-medium rounded-md border border-accent-green/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action Links */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-dark-border/50">
                    {project.live_link && (
                        <a
                            href={project.live_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-accent-green text-dark-bg font-semibold rounded-lg hover:bg-accent-green-bright transition-all duration-300 text-sm hover:shadow-lg hover:shadow-accent-green/20"
                        >
                            <ExternalLink size={14} />
                            Live Demo
                        </a>
                    )}
                    {project.repo_link && (
                        <a
                            href={project.repo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-dark-bg/60 border border-dark-border text-text-light rounded-lg hover:border-accent-green/50 hover:text-white transition-all duration-300 text-sm"
                        >
                            <Github size={14} />
                            Code
                        </a>
                    )}
                    {!project.live_link && !project.repo_link && (
                        <span className="text-text-muted text-xs italic">No links available</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
