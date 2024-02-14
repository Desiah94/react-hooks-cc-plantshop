import React from 'react';

function Search({ onSearch }) {
  const handleChange = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm); // Call the onSearch function with the search term
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={handleChange} // Call handleChange on input change
      />
    </div>
  );
}

export default Search;
