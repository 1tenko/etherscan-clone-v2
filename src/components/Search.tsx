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
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Search by Txn Hash / Block / Address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 w-[50vw] border-[1px] outline-0 border-gray-500 text-[24px] rounded-l-[16px] shadow-lg"
        />
        <button className="p-2 font-bold px-[32px] border-[1px] border-l-0 rounded-r-[16px] border-gray-500  bg-gray-500 text-white shadow-xl text-[16px] hover:bg-gray-600 ">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
