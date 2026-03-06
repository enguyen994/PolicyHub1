import React from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

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
            <form className="searchbar-form" onSubmit={handleSubmit}>
                <div className="searchbar-input-wrapper">
                    <input
                        type="text"
                        className="searchbar-input"
                        placeholder="What are you looking for?"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                    />
                    <span className="searchbar-icon"><FaSearch /></span>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
