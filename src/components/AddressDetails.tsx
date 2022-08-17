import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { getEthPrice } from '../utils/getEthPrice';
import Search from './Search';

interface AddressDetailsProps {
  web3: Web3;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ web3 }) => {
  const { id } = useParams();

  const [balance, setBalance] = useState('');
  const [ethPrice, setEthPrice] = useState<number>();

  const EthPriceFetch = async () => {
    const res = await getEthPrice();
    setEthPrice(res);
  };

  const getAddressDetails = async () => {
    const res = await web3.eth.getBalance(id!);
    setBalance(web3.utils.fromWei(res, 'ether'));
  };

  const value = (Number(balance) * ethPrice!).toFixed(2);

  useEffect(() => {
    getAddressDetails();
    EthPriceFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Search web3={web3} />
      <h2 className="font-bold text-lg m-4 ml-0">Address Details</h2>
      <div className="flex-row gap-5 border-2 border-black p-4">
        <div className="font-bold">Overview</div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]"> Balance: </div>
          {balance} ETH
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Ether Value: </div>
          {Number(value).toLocaleString('en-US')} USD
        </div>
        <hr className="my-4" />
        <div>
          for more details about this address,{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`https://debank.com/profile/${id}`}
          >
            click here.
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
