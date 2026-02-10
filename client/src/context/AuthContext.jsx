import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            try {
                await api.get('/auth/verify');
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('adminToken');
                setIsAuthenticated(false);
            }
        }
        setLoading(false);
    };

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
    };

    const getToken = () => localStorage.getItem('adminToken');

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};
