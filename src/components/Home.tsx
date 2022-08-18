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
    <div className="flex justify-center mt-[192px] ">
      <div className="">
        <div className="font-bold text-[96px] text-transparent bg-clip-text bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] leading-[96px] pb-[48px] drop-shadow-lg">
          <Link to="/">
            <div className="flex justify-start ">Ethereum</div>
            <div className="flex justify-center underline">Blockchain</div>
            <div className="flex justify-end underline">Explorer.</div>
          </Link>
        </div>
        <Search web3={web3} />
      </div>
    </div>
  );
};

export default Home;
