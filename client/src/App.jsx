import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import SecretLogin from './pages/admin/SecretLogin';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-dark-bg flex flex-col">
                    <Routes>
                        {/* Admin Routes - No Navbar/Footer */}
                        <Route path="/secret-admin-login" element={<SecretLogin />} />
                        <Route
                            path="/dashboard/*"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Public Routes - With Navbar/Footer */}
                        <Route
                            path="/*"
                            element={
                                <>
                                    <Navbar />
                                    <main className="flex-grow">
                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                            <Route path="/about" element={<About />} />
                                            <Route path="/portfolio" element={<Portfolio />} />
                                            <Route path="/contact" element={<Contact />} />
                                        </Routes>
                                    </main>
                                    <Footer />
                                </>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
