import React, { useEffect, useState } from 'react';
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
    <div>
      <div>Current ETH Price is ${ethPrice}</div>
    </div>
  );
};

export default Nav;
