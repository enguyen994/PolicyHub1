import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import GeneratedResponse from '../GeneratedResponse/GeneratedResponse';
import RelatedDocs from '../RelatedDocs/RelatedDocs';
import { searchDoc } from '../../api/searchDoc';
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Vite env vars must use VITE_ prefix
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const res = await searchDoc(accessToken, query);
            setResponse(res);
        } catch (err) {
            setError('Failed to fetch search results');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '2.5rem' }}>
            <NavBar />
            <h1 className="searchbar-heading">Welcome to PolicyHub!👋</h1>
            <p className="searchbar-subheading">An internal search engine for Lewer!</p>
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }}>
                <SearchBar onSearch={handleSearch} />
                {loading && <div>Loading...</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {response && (
                    <>
                        <GeneratedResponse summary={response.summary} />
                        <RelatedDocs documents={response.unique_documents} />
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;