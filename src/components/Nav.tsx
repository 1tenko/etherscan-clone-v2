import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEthPrice } from '../utils/getEthPrice';

const Nav: React.FC = () => {
  const [ethPrice, setEthPrice] = useState<number>();

  const EthPriceFetch = async () => {
    const res = await getEthPrice();
    setEthPrice(res);
  };

  useEffect(() => {
    EthPriceFetch();
  });

  return (
    <div className="bg-gradient-to-tr from-gray-300 to-gray-400 fixed w-[100vw] top-0 left-0 border-b-[1px] border-gray-500 shadow-md flex justify-center">
      <div className=" h-[94px] w-[70vw] flex justify-between  p-[8px]">
        <div className="flex items-center font-bold text-[64px] text-transparent bg-clip-text bg-gradient-to-r from-[#FC466B] to-[#3F5EFB]">
          <Link to="/">EBE.</Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex-row items-center border-l-[1px] pl-[48px] border-gray-500 drop-shadow-md">
            <div className="flex justify-center">ETHER PRICE</div>
            <div className="flex justify-center  text-[24px]">
              ${Number(ethPrice?.toFixed(2)).toLocaleString('en-US')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
