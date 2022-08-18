import React from 'react';
import Web3 from 'web3';
import Search from './Search';

interface ErrorPageProps {
  web3: Web3;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ web3 }) => {
  return (
    <div>
      <div className="mt-[128px]">
        <Search web3={web3} />
        <h2 className=" text-[24px] text-lg m-[24px] ml-0 drop-shadow-md">
          Error
        </h2>
        <div className="bg-gradient-to-r p-[4px] from-[#FC466B] to-[#3F5EFB]/50 rounded-[16px] shadow-2xl">
          <div className="flex-row gap-5 p-[24px] rounded-[16px]  bg-gray-200/50  text-[20px]">
            <h1>
              The transaction, block number or address you're trying to find
              doesn't exist!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
