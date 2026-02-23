import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './Dashboard.css';

const Dashboard = () => {
    const handleSearch = (query) => {
        console.log('Searching for:', query);
    };

    return (
        <div className="Dashboard" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '2.5rem' }}>
            <NavBar />
            <h1 className="searchbar-heading">Welcome to PolicyHub!👋</h1>
            <p className="searchbar-subheading">An internal search engine for Lewer!</p>
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }}>
                <SearchBar onSearch={handleSearch} />
            </main>
            <Footer />
        </div>
    )
};

export default Dashboard;