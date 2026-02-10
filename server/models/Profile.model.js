const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    // Personal Information
    name: {
        type: String,
        default: 'Your Name'
    },
    title: {
        type: String,
        default: 'Full-Stack Developer & AI Engineer'
    },
    subtitle: {
        type: String,
        default: 'Building intelligent web solutions and robotics systems.'
    },
    bio: {
        type: String,
        default: 'A passionate developer...'
    },
    about_me_text: {
        type: String,
        default: 'Write your about me text here...'
    },

    // Contact Information
    contact_info: [{
        type: { type: String, enum: ['Email', 'Phone', 'Location'] },
        value: { type: String },
        icon: { type: String }
    }],

    // Social Links
    social_links: [{
        platform: { type: String },
        url: { type: String },
        icon: { type: String }
    }],

    // Media URLs
    profile_image_url: {
        type: String,
        default: '/placeholder-profile.png'
    },
    resume_url: {
        type: String,
        default: ''
    },

    // Statistics
    stats: {
        years_experience: { type: Number, default: 5 },
        projects_completed: { type: Number, default: 50 },
        happy_clients: { type: Number, default: 30 }
    },

    // Skills with proficiency levels (0-100)
    skills: [{
        name: { type: String },
        level: { type: Number, min: 0, max: 100 }
    }],

    // Services offered
    services: [{
        icon: { type: String },
        title: { type: String },
        description: { type: String }
    }],

    // Education
    education: [{
        institution: { type: String },
        degree: { type: String },
        year: { type: String },
        description: { type: String }
    }],

    // Experience
    experience: [{
        company: { type: String },
        role: { type: String },
        duration: { type: String },
        description: { type: String }
    }]
}, {
    timestamps: true
});

// Ensure only one profile document exists (singleton pattern)
profileSchema.statics.getProfile = async function () {
    let profile = await this.findOne();
    if (!profile) {
        // Create default profile with initial data
        profile = await this.create({
            contact_info: [
                { type: 'Email', value: 'email@example.com', icon: 'Mail' },
                { type: 'Phone', value: '+1234567890', icon: 'Phone' },
                { type: 'Location', value: 'Remote / Worldwide', icon: 'MapPin' }
            ],
            social_links: [
                { platform: 'GitHub', url: 'https://github.com', icon: 'Github' },
                { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' }
            ],
            skills: [
                { name: 'MongoDB', level: 90 },
                { name: 'Express.js', level: 85 },
                { name: 'React.js', level: 95 },
                { name: 'Node.js', level: 90 },
                { name: 'Python/AI', level: 80 },
                { name: 'Robotics', level: 75 }
            ],
            services: [
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
                },
                {
                    icon: 'robot',
                    title: 'Robotics',
                    description: 'Embedded systems and robotics solutions for automation and IoT.'
                }
            ],
            education: [
                {
                    institution: 'University Name',
                    degree: 'Bachelor of Science in Computer Science',
                    year: '2020 - 2024',
                    description: 'Focused on Software Engineering and Artificial Intelligence.'
                }
            ],
            experience: [
                {
                    company: 'Tech Company',
                    role: 'Full Stack Developer',
                    duration: '2024 - Present',
                    description: 'Developing scalable web applications using the MERN stack.'
                }
            ]
        });
    }
    return profile;
};

module.exports = mongoose.model('Profile', profileSchema);
