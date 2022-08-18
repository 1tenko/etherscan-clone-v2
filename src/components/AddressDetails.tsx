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
      <div className="mt-[128px]">
        <Search web3={web3} />
        <h2 className=" text-[24px] text-lg m-[24px] ml-0">Address Details</h2>
        <div className="bg-gradient-to-r p-[4px] from-[#FC466B] to-[#3F5EFB]/50 rounded-[16px] shadow-2xl">
          <div className="flex-row gap-5 p-[24px] rounded-[16px]  bg-gray-200/50  text-[20px]">
            <div className="font-bold">Overview</div>
            <hr className="my-4 border-black" />
            <div className="flex p-[12px]">
              <div className="w-[10vw]"> Balance: </div>
              {balance} ETH
            </div>
            <hr className="my-4 border-black" />
            <div className="flex p-[12px]">
              <div className="w-[10vw]">Ether Value: </div>
              {Number(value).toLocaleString('en-US')} USD
            </div>
            <hr className="my-4 border-black" />
            <div>
              for more details about this address,{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://debank.com/profile/${id}`}
                className="cursor-pointer underline decoration-1 underline-offset-4"
              >
                click here.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
