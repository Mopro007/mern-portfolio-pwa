const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required']
    },
    description: {
        type: String,
        required: [true, 'Project description is required']
    },
    category: {
        type: String,
        enum: ['Web App', 'AI/Robotics', 'PWA', 'Other'],
        default: 'Web App'
    },
    tech_stack: [{
        type: String
    }],
    image_url: {
        type: String,
        default: '/placeholder-project.png'
    },
    live_link: {
        type: String,
        default: ''
    },
    repo_link: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for sorting by order and date
projectSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
