import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';

interface AddressDetailsProps {
  web3: Web3;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({ web3 }) => {
  const { id } = useParams();

  const [balance, setBalance] = useState('');

  const getAddressDetails = async () => {
    const res = await web3.eth.getBalance(id!);
    setBalance(web3.utils.fromWei(res, 'ether'));
  };

  useEffect(() => {
    getAddressDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>Account balance: {balance} ETH</div>
      <div>
        for more details about this address,{' '}
        <a href={`https://debank.com/profile/${id}`}>click here.</a>
      </div>
    </div>
  );
};

export default AddressDetails;
