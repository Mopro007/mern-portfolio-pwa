import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-xl bg-dark-card border border-dark-border hover:border-accent-green/50 transition-all duration-300"
        >
            {/* Project Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={project.image_url || '/placeholder-project.png'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-accent-green/20 text-accent-green text-xs font-medium rounded-full border border-accent-green/30">
                        {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>

                    {/* Description */}
                    <p className="text-text-light text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech_stack?.slice(0, 4).map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-dark-card/80 text-text-light text-xs rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                        {project.live_link && (
                            <a
                                href={project.live_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-accent-green text-dark-bg font-medium rounded-lg hover:bg-accent-green-bright transition-colors text-sm"
                            >
                                <ExternalLink size={16} />
                                Live Demo
                            </a>
                        )}
                        {project.repo_link && (
                            <a
                                href={project.repo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg hover:border-accent-green transition-colors text-sm"
                            >
                                <Github size={16} />
                                Code
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Info (Always visible) */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-accent-green transition-colors">
                    {project.title}
                </h3>
                <p className="text-text-muted text-sm">{project.category}</p>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
