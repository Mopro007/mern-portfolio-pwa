import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillBars = ({ skills }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const defaultSkills = skills || [
        { name: 'MongoDB', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'React.js', level: 95 },
        { name: 'Node.js', level: 90 },
        { name: 'Python/AI', level: 80 },
        { name: 'Robotics', level: 75 }
    ];

    return (
        <div ref={ref} className="space-y-6">
            {defaultSkills.map((skill, index) => (
                <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    {/* Skill Header */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-accent-green font-semibold">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar">
                        <motion.div
                            className="progress-bar-fill"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default SkillBars;
