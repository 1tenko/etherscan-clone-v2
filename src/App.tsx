import React, { useState } from 'react';
import TxDetails from './components/TxDetails';
import Web3 from 'web3';
import BlockDetails from './components/BlockDetails';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import AddressDetails from './components/AddressDetails';
import Nav from './components/Nav';
import Search from './components/Search';
// import logo from '/ethLogo.png';

function App() {
  const ALCHEMY_API_KEY_URL = process.env.REACT_APP_ALCHEMY_API_KEY_URL;

  const web3 = new Web3(`${ALCHEMY_API_KEY_URL}`);

  return (
    <div className="bg-gray-200 bg-gradient-to-r from-gray-200 to-gray-400 flex justify-center h-[100vh]">
      <div className="w-[70vw] flex-row bg-[url('../public/ethLogo.png')] bg-no-repeat bg-left-bottom bg-[length:auto_640px] mb-[48px] ">
        <Nav />
        <Routes>
          <Route path="/" element={<Home web3={web3} />} />
          <Route path="/tx">
            <Route index element={<ErrorPage />} />
            <Route path="/tx/:id" element={<TxDetails web3={web3} />} />
          </Route>
          <Route path="/block">
            <Route index element={<ErrorPage />} />
            <Route path="/block/:id" element={<BlockDetails web3={web3} />} />
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
  );
}

export default App;
