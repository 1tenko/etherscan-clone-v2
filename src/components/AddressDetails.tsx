import React from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';

interface AddressDetailsProps {
  web3: Web3;
}

const AddressDetails: React.FC<AddressDetailsProps> = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default AddressDetails;
