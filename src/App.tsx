import React from 'react';

import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[60vw] flex-row">
          <SearchBar />
        </div>
      </div>
    </>
  );
}

export default App;
