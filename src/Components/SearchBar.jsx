import React, { useState } from 'react';
import { Search } from 'lucide-react'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center mb-10"
    >
      <div className="flex items-center bg-white/60 backdrop-blur-md shadow-lg rounded-full overflow-hidden w-[320px] md:w-[400px]">
        <input
          type="text"
          placeholder="Search your favorite recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-3 text-gray-700 bg-transparent focus:outline-none placeholder-gray-500"
        />
        <button
          type="submit"
          className="flex items-center justify-center p-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 transition duration-300"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
