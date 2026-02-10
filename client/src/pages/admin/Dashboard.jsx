import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import ProfileManager from './ProfileManager';
import ProjectManager from './ProjectManager';
import {
    LayoutDashboard,
    User,
    FolderOpen,
    LogOut,
    Menu,
    X,
    Code2
} from 'lucide-react';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
        { path: '/dashboard/profile', icon: User, label: 'Profile' },
        { path: '/dashboard/projects', icon: FolderOpen, label: 'Projects' }
    ];

    return (
        <div className="min-h-screen bg-dark-bg flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -280 }}
                animate={{ x: sidebarOpen ? 0 : -280 }}
                className={`fixed lg:static inset-y-0 left-0 w-64 bg-dark-card border-r border-dark-border z-50 flex flex-col transition-transform lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-dark-border">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-green flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-dark-bg" />
                        </div>
                        <span className="text-xl font-bold text-white">
                            Admin<span className="text-accent-green">Panel</span>
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-accent-green/10 text-accent-green border-l-2 border-accent-green'
                                    : 'text-text-light hover:bg-dark-bg hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-dark-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-white hover:text-accent-green transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <NavLink
                            to="/"
                            target="_blank"
                            className="text-text-light hover:text-accent-green transition-colors text-sm"
                        >
                            View Site →
                        </NavLink>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-auto">
                    <Routes>
                        <Route path="/" element={<DashboardOverview />} />
                        <Route path="/profile" element={<ProfileManager />} />
                        <Route path="/projects" element={<ProjectManager />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

// Dashboard Overview Component
const DashboardOverview = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
                <p className="text-text-light">Manage your portfolio content from here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NavLink to="/dashboard/profile" className="card card-glow p-6 hover-lift">
                    <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center mb-4">
                        <User className="w-6 h-6 text-accent-green" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">Edit Profile</h2>
                    <p className="text-text-light text-sm">Update your bio, skills, services, and contact information.</p>
                </NavLink>

                <NavLink to="/dashboard/projects" className="card card-glow p-6 hover-lift">
                    <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center mb-4">
                        <FolderOpen className="w-6 h-6 text-accent-green" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">Manage Projects</h2>
                    <p className="text-text-light text-sm">Add, edit, or remove projects from your portfolio.</p>
                </NavLink>
            </div>
        </motion.div>
    );
};

export default Dashboard;
