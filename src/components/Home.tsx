import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Search from './Search';

interface HomeProps {
  web3: Web3;
}

const Home: React.FC<HomeProps> = ({ web3 }) => {
  // const subscription = web3.eth.subscribe('newBlockHeaders', (err, result) => {
  //   if (!err) {
  //     console.log(result);
  //   }
  //   console.error(err);
  // });

  return (
    <div className="h-[100%] flex justify-center items-center">
      <div className="">
        <h2 className="font-bold text-[64px] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
          <Link to="/">Ethereum Blockchain Explorer</Link>
        </h2>
        <Search web3={web3} />
      </div>
    </div>
  );
};

export default Home;
