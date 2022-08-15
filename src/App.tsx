import React, { useState } from 'react';
import TxDetails from './components/TxDetails';
import Web3 from 'web3';
import BlockDetails from './components/BlockDetails';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import AddressDetails from './components/AddressDetails';
import Nav from './components/Nav';

function App() {
  const QUICKNODE_API_KEY_URL = process.env.REACT_APP_QUICKNODE_API_KEY_URL;
  const [input, setInput] = useState('');
  const web3 = new Web3(`${QUICKNODE_API_KEY_URL}`);

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
    <>
      <div className="flex justify-center">
        <div className="w-[70vw] flex-row">
          <Nav />
          <div className="m-4 ml-0">
            <h2 className="font-bold text-lg">
              <Link to="/">Ethereum Blockchain Explorer</Link>
            </h2>
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tx">
                <Route index element={<ErrorPage />} />
                <Route path="/tx/:id" element={<TxDetails web3={web3} />} />
              </Route>
              <Route path="/block">
                <Route index element={<ErrorPage />} />
                <Route
                  path="/block/:id"
                  element={<BlockDetails web3={web3} />}
                />
              </Route>
              <Route path="/address">
                <Route index element={<ErrorPage />} />
                <Route
                  path="/address/:id"
                  element={<AddressDetails web3={web3} />}
                />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
