import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useData';
import * as Icons from 'lucide-react';

const Contact = () => {
    const { profile } = useProfile();

    const getIcon = (iconName) => {
        return Icons[iconName] || Icons.MessageSquare;
    };

    const getHref = (type, value) => {
        switch (type?.toLowerCase()) {
            case 'email': return `mailto:${value}`;
            case 'phone': return `tel:${value}`;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20">
            {/* Background Elements - Grid only */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,153,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Get In <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-text-light max-w-2xl mx-auto">
                        Have a project in mind? Let's work together to bring your ideas to life.
                    </p>
                </motion.div>

                {/* Contact Info - Centered */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">Contact Information</h2>
                            <p className="text-text-light mb-8 text-center">
                                Feel free to reach out through any of the following channels.
                                I'm always open to discussing new projects, creative ideas, or opportunities.
                            </p>
                        </div>

                        {/* Contact Details - Stacked cards with more padding */}
                        <div className="flex flex-col gap-4">
                            {profile?.contact_info?.map((item, index) => {
                                const Icon = getIcon(item.icon);
                                const href = getHref(item.type, item.value);

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="card p-6 flex items-center gap-4"
                                    >
                                        <div className="w-14 h-14 rounded-lg bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-7 h-7 text-accent-green" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-text-muted text-sm">{item.type}</p>
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="text-white font-medium hover:text-accent-green transition-colors break-all"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-white font-medium">{item.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        {profile?.social_links?.length > 0 && (
                            <div className="text-center pt-8">
                                <h3 className="text-white font-semibold mb-4">Follow Me</h3>
                                <div className="flex gap-4 justify-center">
                                    {profile.social_links.map((social, index) => {
                                        const Icon = getIcon(social.icon);
                                        return (
                                            <motion.a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 + index * 0.1 }}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-12 h-12 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-text-light hover:text-accent-green hover:border-accent-green transition-all duration-300"
                                            >
                                                <Icon size={20} />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
