import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Calendar, FolderCheck, Users } from 'lucide-react';

const CountUp = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration, isInView]);

    return <span ref={ref}>{count}</span>;
};

const StatsStrip = ({ stats }) => {
    const defaultStats = {
        years_experience: stats?.years_experience || 5,
        projects_completed: stats?.projects_completed || 50,
        happy_clients: stats?.happy_clients || 30
    };

    const statItems = [
        {
            icon: Calendar,
            value: defaultStats.years_experience,
            suffix: '+',
            label: 'Years Experience'
        },
        {
            icon: FolderCheck,
            value: defaultStats.projects_completed,
            suffix: '+',
            label: 'Projects Completed'
        },
        {
            icon: Users,
            value: defaultStats.happy_clients,
            suffix: '+',
            label: 'Happy Clients'
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12"
        >
            <div className="container-custom mx-auto px-4 md:px-8">
                <div className="glass p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {statItems.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-center gap-4 justify-center md:justify-start"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                                    <stat.icon className="w-7 h-7 text-accent-green" />
                                </div>

                                {/* Text */}
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold text-white">
                                        <CountUp end={stat.value} />
                                        <span className="text-accent-green">{stat.suffix}</span>
                                    </div>
                                    <p className="text-text-light text-sm">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default StatsStrip;
