
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import LoginButton from './components/LoginButton/LoginButton';
import Footer from './components/Footer/Footer';

function App() {
  // Example search handler
  const handleSearch = (query) => {
    // Implement search logic here
    console.log('Searching for:', query);
  };

  return (
    <div className="App" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '2.5rem' }}>
      <LoginButton />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
        <SearchBar onSearch={handleSearch} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
