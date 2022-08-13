import React, { useState } from 'react';
import TxDetails from './TxDetails';
import Web3 from 'web3';
import BlockDetails from './BlockDetails';

const SearchBar = () => {
  const QUICKNODE_API_KEY_URL = process.env.REACT_APP_QUICKNODE_API_KEY_URL;
  const [input, setInput] = useState('');
  const web3 = new Web3(`${QUICKNODE_API_KEY_URL}`);

  const [isTransaction, setIsTransaction] = useState(false);
  const [isBlock, setIsBlock] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await web3.eth.getTransaction(input);
      setIsTransaction(true);
    } catch (err) {
      try {
        await web3.eth.getBlock(input);
        setIsBlock(true);
        setIsTransaction(false);
      } catch (err) {}
    }
  };

  return (
    <>
      <div className="m-4 ml-0">
        <h2 className="font-bold text-lg">Ethereum Blockchain Explorer</h2>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="Search by Address / Txn Hash / Block"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 w-[35vw] border-2 border-black"
          />
          <button className="p-2 font-bold border-2 border-l-0 border-black">
            Search
          </button>
        </form>
      </div>
      {isTransaction && <TxDetails web3={web3} hash={input} />}

      {isBlock && <BlockDetails web3={web3} input={input} />}
    </>
  );
};

export default SearchBar;
