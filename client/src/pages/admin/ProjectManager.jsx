import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import {
    Plus, Edit2, Trash2, Save, X, Loader2,
    CheckCircle, AlertCircle, ExternalLink, Github
} from 'lucide-react';

const ProjectManager = () => {
    const { getToken } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });

    const emptyProject = {
        title: '',
        description: '',
        category: 'Web App',
        tech_stack: [],
        image_url: '',
        live_link: '',
        repo_link: '',
        featured: false,
        order: 0
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/api/projects');
            if (response.data.success) {
                setProjects(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (project = null) => {
        setEditingProject(project ? { ...project, tech_stack: project.tech_stack || [] } : { ...emptyProject });
        setModalOpen(true);
        setStatus({ type: '', message: '' });
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProject(null);
    };

    const handleChange = (field, value) => {
        setEditingProject(prev => ({ ...prev, [field]: value }));
    };

    const handleTechStack = (value) => {
        const techs = value.split(',').map(t => t.trim()).filter(t => t);
        setEditingProject(prev => ({ ...prev, tech_stack: techs }));
    };

    const handleSave = async () => {
        setSaving(true);
        setStatus({ type: '', message: '' });

        try {
            if (editingProject._id) {
                // Update existing
                await api.put(`/api/projects/${editingProject._id}`, editingProject);
                setStatus({ type: 'success', message: 'Project updated successfully!' });
            } else {
                // Create new
                await api.post('/api/projects', editingProject);
                setStatus({ type: 'success', message: 'Project created successfully!' });
            }

            await fetchProjects();
            setTimeout(closeModal, 1000);
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to save project'
            });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        setDeleting(id);
        try {
            await api.delete(`/api/projects/${id}`);
            await fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-green"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Manage Projects</h1>
                    <p className="text-text-light">Add, edit, or remove portfolio projects</p>
                </div>
                <motion.button
                    onClick={() => openModal()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Project
                </motion.button>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <motion.div
                        key={project._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="card overflow-hidden group"
                    >
                        {/* Thumbnail */}
                        <div className="aspect-video bg-dark-bg overflow-hidden">
                            <img
                                src={project.image_url || '/placeholder-project.png'}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-white line-clamp-1">{project.title}</h3>
                                <span className="text-xs px-2 py-1 bg-accent-green/10 text-accent-green rounded">
                                    {project.category}
                                </span>
                            </div>

                            <p className="text-text-light text-sm mb-4 line-clamp-2">{project.description}</p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {project.tech_stack?.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="text-xs px-2 py-0.5 bg-dark-bg text-text-muted rounded">
                                        {tech}
                                    </span>
                                ))}
                                {project.tech_stack?.length > 3 && (
                                    <span className="text-xs px-2 py-0.5 bg-dark-bg text-text-muted rounded">
                                        +{project.tech_stack.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-dark-border">
                                <div className="flex gap-2">
                                    {project.live_link && (
                                        <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="p-2 text-text-muted hover:text-accent-green transition-colors">
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                    {project.repo_link && (
                                        <a href={project.repo_link} target="_blank" rel="noopener noreferrer" className="p-2 text-text-muted hover:text-accent-green transition-colors">
                                            <Github size={16} />
                                        </a>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openModal(project)}
                                        className="p-2 text-text-muted hover:text-accent-green transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        disabled={deleting === project._id}
                                        className="p-2 text-text-muted hover:text-red-400 transition-colors"
                                    >
                                        {deleting === project._id ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {projects.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <p className="text-text-muted">No projects yet. Add your first project!</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-dark-card border border-dark-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-dark-border">
                                <h2 className="text-xl font-bold text-white">
                                    {editingProject?._id ? 'Edit Project' : 'Add New Project'}
                                </h2>
                                <button onClick={closeModal} className="p-2 text-text-muted hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-4">
                                {/* Status Message */}
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex items-center gap-2 p-4 rounded-lg ${status.type === 'success'
                                            ? 'bg-accent-green/10 text-accent-green border border-accent-green/30'
                                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                                            }`}
                                    >
                                        {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                        <span>{status.message}</span>
                                    </motion.div>
                                )}

                                <div>
                                    <label className="block text-white font-medium mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={editingProject?.title || ''}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Description *</label>
                                    <textarea
                                        value={editingProject?.description || ''}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        rows={3}
                                        className="input-field resize-none"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white font-medium mb-2">Category</label>
                                        <select
                                            value={editingProject?.category || 'Web App'}
                                            onChange={(e) => handleChange('category', e.target.value)}
                                            className="input-field"
                                        >
                                            <option value="Web App">Web App</option>
                                            <option value="AI/Robotics">AI/Robotics</option>
                                            <option value="PWA">PWA</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">Order</label>
                                        <input
                                            type="number"
                                            value={editingProject?.order || 0}
                                            onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Tech Stack (comma separated)</label>
                                    <input
                                        type="text"
                                        value={editingProject?.tech_stack?.join(', ') || ''}
                                        onChange={(e) => handleTechStack(e.target.value)}
                                        placeholder="React, Node.js, MongoDB"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        value={editingProject?.image_url || ''}
                                        onChange={(e) => handleChange('image_url', e.target.value)}
                                        placeholder="/project-image.png"
                                        className="input-field"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white font-medium mb-2">Live Demo URL</label>
                                        <input
                                            type="text"
                                            value={editingProject?.live_link || ''}
                                            onChange={(e) => handleChange('live_link', e.target.value)}
                                            placeholder="https://..."
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">GitHub Repo URL</label>
                                        <input
                                            type="text"
                                            value={editingProject?.repo_link || ''}
                                            onChange={(e) => handleChange('repo_link', e.target.value)}
                                            placeholder="https://github.com/..."
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={editingProject?.featured || false}
                                        onChange={(e) => handleChange('featured', e.target.checked)}
                                        className="w-4 h-4 accent-accent-green"
                                    />
                                    <label htmlFor="featured" className="text-white">Featured Project</label>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t border-dark-border">
                                <button onClick={closeModal} className="btn-outline">Cancel</button>
                                <motion.button
                                    onClick={handleSave}
                                    disabled={saving || !editingProject?.title || !editingProject?.description}
                                    whileHover={{ scale: saving ? 1 : 1.02 }}
                                    whileTap={{ scale: saving ? 1 : 0.98 }}
                                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                    {saving ? 'Saving...' : 'Save Project'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProjectManager;
