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
    <div className="absolute h-[94px] w-[70vw] flex justify-between border-b-2 p-[8px]">
      <div className="flex items-center font-bold text-[64px] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
        <Link to="/">EBE.</Link>
      </div>
      <div className="flex items-center font-bold">
        Current ETH Price is ${ethPrice}
      </div>
    </div>
  );
};

export default Nav;
