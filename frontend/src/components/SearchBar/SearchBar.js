import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  }

  return (
    <div className="searchbar-container">
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <div className="searchbar-input-wrapper">
          <input
            type="text"
            className="searchbar-input"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="searchbar-icon-button" aria-label="Search">
            <FaSearch className="searchbar-icon" />
          </button>
        </div>
      </form>
    </div>
  );
}
