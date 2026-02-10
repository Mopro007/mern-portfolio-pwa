import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useProfile } from '../hooks/useData';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { profile } = useProfile();

    const getIcon = (iconName) => {
        const Icon = Icons[iconName] || Icons.Link;
        return Icon;
    };

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <footer className="bg-dark-card border-t border-dark-border">
            <div className="container-custom mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-text-light hover:text-accent-green transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            {profile?.social_links?.map((social, index) => {
                                const Icon = getIcon(social.icon);
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-text-light hover:text-accent-green hover:border-accent-green transition-all duration-300"
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-sm">
                        © {currentYear} All rights reserved.
                    </p>
                    <p className="text-text-muted text-sm flex items-center gap-1">
                        Made with <Heart size={14} className="text-accent-green" fill="currentColor" /> and lots of coffee
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
