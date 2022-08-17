import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

interface SearchProps {
  web3: Web3;
}

const Search: React.FC<SearchProps> = ({ web3 }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!web3.utils.isHexStrict(input)) {
      const blockNum = Number(input);
      try {
        const res = await web3.eth.getBlock(blockNum);
        if (!res) {
          navigate('/block');
        } else {
          navigate(`/block/${blockNum}`);
        }
      } catch {
        navigate('/block');
      }
    } else if (web3.utils.isHexStrict(input)) {
      try {
        await web3.eth.getTransaction(input);
        navigate(`/tx/${input}`);
      } catch {
        const address = await web3.eth.getBalance(input);
        if (address) {
          navigate(`/address/${input}`);
        } else {
          navigate('/address');
        }
      }
    }
  };
  return (
    <div className="mt-[24px]">
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
  );
};

export default Search;
