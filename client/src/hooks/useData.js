import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/profile');
            if (response.data.success) {
                setProfile(response.data.data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { profile, loading, error, refetch: fetchProfile };
};

export const useProjects = (category = 'All') => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, [category]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const url = category === 'All' ? '/projects' : `/projects?category=${category}`;
            const response = await api.get(url);
            if (response.data.success) {
                setProjects(response.data.data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { projects, loading, error, refetch: fetchProjects };
};
