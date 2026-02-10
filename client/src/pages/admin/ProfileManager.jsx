import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { Save, Loader2, CheckCircle, AlertCircle, Plus, Trash2, Upload, X } from 'lucide-react';
import * as Icons from 'lucide-react';

const DynamicList = ({ title, items, onAdd, onRemove, onChange, fields, iconPicker = false }) => {
    return (
        <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <button onClick={onAdd} className="btn-outline text-sm py-2 flex items-center gap-2">
                    <Plus size={16} /> Add {title.slice(0, -1)}
                </button>
            </div>

            <div className="space-y-4">
                {items?.map((item, index) => (
                    <div key={index} className="p-4 bg-dark-bg rounded-lg space-y-3 relative group">
                        <button
                            onClick={() => onRemove(index)}
                            className="absolute top-2 right-2 p-2 text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-8">
                            {fields.map((field) => (
                                <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                                    <label className="block text-text-muted text-xs mb-1 uppercase">{field.label}</label>
                                    {field.type === 'select' ? (
                                        <select
                                            value={item[field.name]}
                                            onChange={(e) => onChange(index, field.name, e.target.value)}
                                            className="input-field w-full"
                                        >
                                            {field.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'textarea' ? (
                                        <textarea
                                            value={item[field.name]}
                                            onChange={(e) => onChange(index, field.name, e.target.value)}
                                            rows={3}
                                            className="input-field w-full resize-none"
                                        />
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            value={item[field.name]}
                                            onChange={(e) => onChange(index, field.name, e.target.value)}
                                            className="input-field w-full"
                                            placeholder={field.placeholder}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FileUpload = ({ label, value, onChange }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const response = await api.post('/api/profile/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                onChange(response.data.url);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Check console for details.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label className="block text-white font-medium mb-2">{label}</label>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    value={value || ''}
                    readOnly
                    className="input-field flex-1 bg-dark-bg/50"
                    placeholder="No file uploaded"
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="hidden"
                    accept={label.includes('Image') ? "image/*" : ".pdf"}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="btn-outline flex items-center gap-2"
                >
                    {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
            {value && label.includes('Image') && (
                <img src={value} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg border border-dark-border" />
            )}
        </div>
    );
};

const ProfileManager = () => {
    const { getToken } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/api/profile');
            if (response.data.success) {
                // Ensure arrays exist
                const data = response.data.data;
                data.contact_info = data.contact_info || [];
                data.social_links = data.social_links || [];
                data.education = data.education || [];
                data.experience = data.experience || [];
                setProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent, field, value) => {
        setProfile(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        const newArray = [...profile[arrayName]];
        newArray[index][field] = value;
        setProfile(prev => ({ ...prev, [arrayName]: newArray }));
    };

    const addItem = (arrayName, initialItem) => {
        setProfile(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], initialItem]
        }));
    };

    const removeItem = (arrayName, index) => {
        setProfile(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await api.put('/api/profile', profile);

            if (response.data.success) {
                setStatus({ type: 'success', message: 'Profile updated successfully!' });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setSaving(false);
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
            className="space-y-8 pb-20"
        >
            <div className="flex items-center justify-between sticky top-0 bg-dark-bg/95 backdrop-blur z-10 py-4 border-b border-dark-border/50">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
                    <p className="text-text-light">Update your portfolio information</p>
                </div>
                <motion.button
                    onClick={handleSave}
                    disabled={saving}
                    whileHover={{ scale: saving ? 1 : 1.02 }}
                    whileTap={{ scale: saving ? 1 : 0.98 }}
                    className="btn-primary flex items-center gap-2"
                >
                    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </motion.button>
            </div>

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

            {/* Personal Information */}
            <div className="card p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white font-medium mb-2">Name</label>
                        <input
                            type="text"
                            value={profile?.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={profile?.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-white font-medium mb-2">Subtitle</label>
                    <input
                        type="text"
                        value={profile?.subtitle || ''}
                        onChange={(e) => handleChange('subtitle', e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-white font-medium mb-2">About Me Text</label>
                    <textarea
                        value={profile?.about_me_text || ''}
                        onChange={(e) => handleChange('about_me_text', e.target.value)}
                        rows={5}
                        className="input-field resize-none"
                    />
                </div>
                <FileUpload
                    label="Profile Image"
                    value={profile?.profile_image_url}
                    onChange={(url) => handleChange('profile_image_url', url)}
                />
                <FileUpload
                    label="Resume (PDF)"
                    value={profile?.resume_url}
                    onChange={(url) => handleChange('resume_url', url)}
                />
            </div>

            {/* Dynamic Lists */}
            <DynamicList
                title="Contact Information"
                items={profile?.contact_info}
                onAdd={() => addItem('contact_info', { type: 'Email', value: '', icon: 'Mail' })}
                onRemove={(index) => removeItem('contact_info', index)}
                onChange={(index, field, value) => handleArrayChange('contact_info', index, field, value)}
                fields={[
                    { name: 'type', label: 'Type', type: 'select', options: ['Email', 'Phone', 'Location'] },
                    { name: 'value', label: 'Value' },
                    { name: 'icon', label: 'Icon (Lucide Name)' }
                ]}
            />

            <DynamicList
                title="Social Links"
                items={profile?.social_links}
                onAdd={() => addItem('social_links', { platform: '', url: '', icon: 'Github' })}
                onRemove={(index) => removeItem('social_links', index)}
                onChange={(index, field, value) => handleArrayChange('social_links', index, field, value)}
                fields={[
                    { name: 'platform', label: 'Platform' },
                    { name: 'url', label: 'URL' },
                    { name: 'icon', label: 'Icon (Lucide Name)' }
                ]}
            />

            <DynamicList
                title="Education"
                items={profile?.education}
                onAdd={() => addItem('education', { institution: '', degree: '', year: '', description: '' })}
                onRemove={(index) => removeItem('education', index)}
                onChange={(index, field, value) => handleArrayChange('education', index, field, value)}
                fields={[
                    { name: 'institution', label: 'Institution' },
                    { name: 'degree', label: 'Degree' },
                    { name: 'year', label: 'Year' },
                    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true }
                ]}
            />

            <DynamicList
                title="Experience"
                items={profile?.experience}
                onAdd={() => addItem('experience', { company: '', role: '', duration: '', description: '' })}
                onRemove={(index) => removeItem('experience', index)}
                onChange={(index, field, value) => handleArrayChange('experience', index, field, value)}
                fields={[
                    { name: 'company', label: 'Company' },
                    { name: 'role', label: 'Role' },
                    { name: 'duration', label: 'Duration' },
                    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true }
                ]}
            />

            {/* Skills - Custom Implementation for Range */}
            <div className="card p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Skills</h2>
                    <button onClick={() => addItem('skills', { name: '', level: 50 })} className="btn-outline text-sm py-2 flex items-center gap-2">
                        <Plus size={16} /> Add Skill
                    </button>
                </div>
                <div className="space-y-3">
                    {profile?.skills?.map((skill, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-dark-bg rounded-lg">
                            <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                                placeholder="Skill name"
                                className="input-field flex-1"
                            />
                            <input
                                type="number"
                                value={skill.level}
                                onChange={(e) => handleArrayChange('skills', index, 'level', parseInt(e.target.value) || 0)}
                                min="0"
                                max="100"
                                className="input-field w-24"
                            />
                            <span className="text-text-muted">%</span>
                            <button
                                onClick={() => removeItem('skills', index)}
                                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services */}
            <DynamicList
                title="Services"
                items={profile?.services}
                onAdd={() => addItem('services', { icon: 'code', title: '', description: '' })}
                onRemove={(index) => removeItem('services', index)}
                onChange={(index, field, value) => handleArrayChange('services', index, field, value)}
                fields={[
                    { name: 'title', label: 'Title' },
                    { name: 'icon', label: 'Icon (Lucide Name)' },
                    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true }
                ]}
            />

            {/* Statistics */}
            <div className="card p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-white font-medium mb-2">Years Experience</label>
                        <input
                            type="number"
                            value={profile?.stats?.years_experience || 0}
                            onChange={(e) => handleNestedChange('stats', 'years_experience', parseInt(e.target.value) || 0)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-2">Projects Completed</label>
                        <input
                            type="number"
                            value={profile?.stats?.projects_completed || 0}
                            onChange={(e) => handleNestedChange('stats', 'projects_completed', parseInt(e.target.value) || 0)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-2">Happy Clients</label>
                        <input
                            type="number"
                            value={profile?.stats?.happy_clients || 0}
                            onChange={(e) => handleNestedChange('stats', 'happy_clients', parseInt(e.target.value) || 0)}
                            className="input-field"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileManager;
