import { useEffect, useRef, useState } from 'react';

// Long code snippet lines - each fills the full viewport width
const codeSnippets = [
    `import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';  //  Building modern web applications with React hooks and functional components for optimal performance`,
    `const express = require('express'); const app = express(); app.use(cors()); app.use(express.json());  //  Server initialization with middleware configuration for API endpoints`,
    `mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB'));  //  Database connection established`,
    `const [state, setState] = useState({ loading: true, data: null, error: null });  useEffect(() => { fetchData(); }, []);  //  State management with React hooks pattern`,
    `router.get('/api/users/:id', authenticate, authorize, async (req, res) => { const user = await User.findById(req.params.id); res.json({ success: true, data: user }); });`,
    `const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });  res.cookie('token', token, { httpOnly: true, secure: true });`,
    `async function handleSubmit(e) { e.preventDefault(); try { const response = await axios.post('/api/submit', formData); setSuccess(true); } catch (err) { setError(err.message); } }`,
    `docker build -t myapp:latest . && docker run -d -p 3000:3000 --env-file .env --name myapp-container myapp:latest  #  Containerized deployment with Docker`,
    `kubectl apply -f deployment.yaml && kubectl rollout status deployment/myapp && kubectl get pods -l app=myapp  #  Kubernetes orchestration for scalable infrastructure`,
    `SELECT u.*, p.title, p.created_at FROM users u LEFT JOIN projects p ON u.id = p.user_id WHERE u.active = true ORDER BY p.created_at DESC LIMIT 50;  --  Optimized SQL query`,
    `const { data, loading, error, refetch } = useQuery(GET_USER_QUERY, { variables: { id }, fetchPolicy: 'cache-and-network', pollInterval: 30000 });  //  GraphQL data fetching`,
    `export const reducer = (state, action) => { switch(action.type) { case 'SET_DATA': return { ...state, data: action.payload }; case 'SET_ERROR': return { ...state, error: action.payload }; } };`,
    `const memoizedValue = useMemo(() => computeExpensiveValue(data), [data]);  const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);  //  Performance optimization`,
    `bcrypt.hash(password, 12).then(hash => User.create({ email, password: hash })).then(user => generateToken(user)).catch(err => handleError(err));  //  Secure authentication flow`,
    `Promise.all([fetchUsers(), fetchProjects(), fetchSettings()]).then(([users, projects, settings]) => { dispatch({ type: 'INIT', payload: { users, projects, settings } }); });`,
    `const WebSocket = require('ws'); const wss = new WebSocket.Server({ port: 8080 }); wss.on('connection', (ws) => { ws.on('message', (msg) => broadcast(msg)); });  //  Real-time communication`,
    `interface IUser { id: string; name: string; email: string; role: 'admin' | 'user'; createdAt: Date; }  type UserResponse = ApiResponse<IUser>;  //  TypeScript type definitions`,
    `git checkout -b feature/new-component && git add . && git commit -m "feat: implement new dashboard component with analytics" && git push origin feature/new-component`,
    `const cache = new Map(); const memoize = (fn) => (...args) => { const key = JSON.stringify(args); if (!cache.has(key)) cache.set(key, fn(...args)); return cache.get(key); };`,
    `npm install @tensorflow/tfjs && python -m pip install tensorflow numpy pandas scikit-learn matplotlib seaborn  #  Machine learning dependencies for AI-powered features`,
];

const TypewriterLine = ({ text, delay, speed }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const startDelay = setTimeout(() => {
            const interval = setInterval(() => {
                setCurrentIndex(prev => {
                    if (prev >= text.length) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(startDelay);
    }, [text, delay, speed]);

    useEffect(() => {
        setDisplayText(text.substring(0, currentIndex));
    }, [currentIndex, text]);

    return (
        <span>
            {displayText}
            {currentIndex < text.length && <span className="animate-pulse">|</span>}
        </span>
    );
};

const CodeBackground = () => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [rows, setRows] = useState([]);

    useEffect(() => {
        // Create rows of code that scroll vertically
        const numRows = 30;
        const newRows = [];

        for (let i = 0; i < numRows; i++) {
            newRows.push({
                id: i,
                text: codeSnippets[i % codeSnippets.length],
                speed: 30 + Math.random() * 20,
                delay: i * 800,
                typingSpeed: 15 + Math.random() * 15,
            });
        }

        setRows(newRows);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,153,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Scrolling Code Rows - Full Width */}
            <div className="absolute inset-0 flex flex-col">
                <div
                    className="flex flex-col gap-8"
                    style={{
                        animation: 'scroll-up 60s linear infinite',
                    }}
                >
                    {/* First set of rows */}
                    {rows.map((row) => (
                        <div
                            key={row.id}
                            className="w-full whitespace-nowrap font-mono text-xs md:text-sm px-4"
                            style={{
                                color: 'rgba(0, 255, 153, 0.08)',
                            }}
                        >
                            <TypewriterLine
                                text={row.text}
                                delay={row.delay}
                                speed={row.typingSpeed}
                            />
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {rows.map((row) => (
                        <div
                            key={`dup-${row.id}`}
                            className="w-full whitespace-nowrap font-mono text-xs md:text-sm px-4"
                            style={{
                                color: 'rgba(0, 255, 153, 0.08)',
                            }}
                        >
                            {row.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mouse Aura Spotlight - Makes code visible on hover */}
            <div
                className="fixed pointer-events-none transition-opacity duration-200"
                style={{
                    left: mousePos.x - 250,
                    top: mousePos.y - 250,
                    width: 500,
                    height: 500,
                    background: `radial-gradient(circle, rgba(0,255,153,0.25) 0%, rgba(0,255,153,0.1) 35%, transparent 70%)`,
                    borderRadius: '50%',
                    mixBlendMode: 'screen',
                    opacity: mousePos.x > 0 ? 1 : 0,
                }}
            />

            {/* CSS for animation */}
            <style>{`
                @keyframes scroll-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
            `}</style>
        </div>
    );
};

export default CodeBackground;
