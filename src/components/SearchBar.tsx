import React, { useState } from 'react';
import TxDetails from './TxDetails';
import Web3 from 'web3';

const SearchBar = () => {
  const QUICKNODE_API_KEY_URL = process.env.REACT_APP_QUICKNODE_API_KEY_URL;
  const [hash, setHash] = useState('');
  const web3 = new Web3(`${QUICKNODE_API_KEY_URL}`);

  const [isTransaction, setIsTransaction] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await web3.eth.getTransaction(hash);
      setIsTransaction(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-base"></div>
      <h2 className="font-bold text-lg">Ethereum Blockchain Explorer</h2>
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
      {isTransaction && <TxDetails web3={web3} hash={hash} />}
    </>
  );
};

export default SearchBar;
