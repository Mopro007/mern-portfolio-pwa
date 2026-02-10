import { useProfile } from '../hooks/useData';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import ServicesGrid from '../components/ServicesGrid';
import FeaturedProjects from '../components/FeaturedProjects';

const Home = () => {
    const { profile, loading } = useProfile();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-green"></div>
            </div>
        );
    }

    return (
        <>
            <Hero profile={profile} />
            <StatsStrip stats={profile?.stats} />
            <ServicesGrid services={profile?.services} />
            <FeaturedProjects />
        </>
    );
};

export default Home;
