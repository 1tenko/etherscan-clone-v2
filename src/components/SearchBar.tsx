import React, { useState } from 'react';
import TxDetails from './TxDetails';
import * as dotenv from 'dotenv';

const SearchBar = () => {
  const QUICKNODE_API_KEY_URL = process.env.REACT_APP_QUICKNODE_API_KEY_URL;
  const [hash, setHash] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(hash);
  };

  return (
    <>
      <div className="text-base"></div>
      <h2 className="p-2 font-bold text-lg">Ethereum Blockchain Explorer</h2>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Search by Address / Txn Hash / Block"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          className="p-2 w-[50vw] border-2 border-black"
        />
        <button className="p-2 font-bold border-2 border-l-0 border-black">
          Search
        </button>
      </form>
      <TxDetails nodeKey={QUICKNODE_API_KEY_URL} hash={hash} />
    </>
  );
};

export default SearchBar;
