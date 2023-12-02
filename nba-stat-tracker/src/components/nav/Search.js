import { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div>
            <input
            type='text'
            placeholder='Search for a team'
            value={query}
            onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;