import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = React.useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    return (
        <div className="searchbar-container">
            <h1 className="searchbar-heading">PolicyHub</h1>
            <form className="searchbar-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="searchbar-input"
                    placeholder="Search policies..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit" className="searchbar-button">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
