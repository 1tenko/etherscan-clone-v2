import React from 'react';
import Web3 from 'web3';

interface TxDetailsProps {
  hash: string;
  nodeKey: string | undefined;
}

const TxDetails: React.FC<TxDetailsProps> = ({ hash, nodeKey }) => {
  const web3 = new Web3(`${nodeKey}`);
  const test = () => {
    web3.eth.getBlockNumber().then((result) => {
      console.log('Latest Ethereum Block is ', result);
    });
  };

  return (
    <div>
      <h1>{hash}</h1>
      <button onClick={test}>Test</button>
    </div>
  );
};

export default TxDetails;
