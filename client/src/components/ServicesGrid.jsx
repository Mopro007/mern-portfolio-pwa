import { motion } from 'framer-motion';
import { Code, Brain, Smartphone, Bot, Database, Shield } from 'lucide-react';

const iconMap = {
    code: Code,
    brain: Brain,
    smartphone: Smartphone,
    robot: Bot,
    database: Database,
    shield: Shield
};

const ServicesGrid = ({ services }) => {
    const defaultServices = services || [
        {
            icon: 'code',
            title: 'Web Development',
            description: 'Modern, responsive websites and web applications built with cutting-edge technologies.'
        },
        {
            icon: 'brain',
            title: 'AI Solutions',
            description: 'Intelligent systems powered by machine learning and artificial intelligence.'
        },
        {
            icon: 'smartphone',
            title: 'PWA Development',
            description: 'Progressive Web Apps that work offline and feel like native applications.'
        }
    ];

    // Filter out Robotics service
    const filteredServices = defaultServices.filter(
        service => service.title?.toLowerCase() !== 'robotics'
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="section-padding">
            <div className="container-custom mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        What I <span className="text-gradient">Offer</span>
                    </h2>
                    <p className="text-text-light max-w-2xl mx-auto">
                        Specialized services to bring your ideas to life with modern technology and innovative solutions.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredServices.map((service, index) => {
                        const IconComponent = iconMap[service.icon] || Code;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="card card-glow group cursor-pointer hover-lift"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-accent-green/10 flex items-center justify-center mb-4 group-hover:bg-accent-green/20 transition-colors duration-300">
                                    <IconComponent className="w-7 h-7 text-accent-green" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent-green transition-colors duration-300">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-text-light text-sm leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Hover Line */}
                                <div className="mt-4 h-0.5 bg-dark-border rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-accent-green"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesGrid;
