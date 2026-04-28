import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import GeneratedResponse from '../GeneratedResponse/GeneratedResponse';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../PdfViewerDialog/PdfViewerDialog.css';
import RelatedDocs from '../RelatedDocs/RelatedDocs';
import { searchDoc } from '../../api/searchDoc';
import { fetchCurrentUser } from '../../api/fetchCurrentUser';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('');
    const latestRequestId = React.useRef(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        let isMounted = true;

        const loadCurrentUser = async () => {
            try {
                const user = await fetchCurrentUser();
                if (isMounted && user) {
                    setCurrentUser(user);
                }
            } catch (error) {
                if (isMounted) {
                    setCurrentUser('');
                }
            }
        };

        loadCurrentUser();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleSearch = async (query) => {
        const requestId = latestRequestId.current + 1;
        latestRequestId.current = requestId;

        setLoading(true);
        setResponse(null);

        try {
            const res = await searchDoc(query);
            if (latestRequestId.current === requestId) {
                setResponse(res);
            }
        } catch (err) {
            if (latestRequestId.current === requestId) {
                navigate('/not-found');
            }
        } finally {
            if (latestRequestId.current === requestId) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="dashboard-container" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '2.5rem' }}>
            <NavBar />
            <h1 className="searchbar-heading">Hello, {currentUser ? `${currentUser}` : ''}!👋</h1>
            <p className="searchbar-subheading">An internal search engine for Lewer!</p>
            <p className="searchbar-disclaimer">Disclaimer: AI-generated responses may not be accurate. Please verify with official documents.</p>
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                <SearchBar onSearch={handleSearch} />
                {loading && (
                    <div className="generated-response">
                        <div style={{ width: 800 }}>
                            <Skeleton count={5} height={20} />
                        </div>
                    </div>
                )}
                {response && (
                    <>
                        <GeneratedResponse summary={response.summary} />
                        <RelatedDocs documents={response.unique_documents} matchWords={response.match_words} />

                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;