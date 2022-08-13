import React, { useState } from 'react';
import Web3 from 'web3';

interface BlockDetailsProps {
  web3: Web3;
  input: string;
}

const BlockDetails: React.FC<BlockDetailsProps> = ({ web3, input }) => {
  const [blockNum, setBlockNum] = useState<number>();

  const getBlock = async () => {
    const res = await web3.eth.getBlock(input);
    console.log(res);
    setBlockNum(res.number);
  };
  getBlock();
  return (
    <div>
      <h2 className="font-bold text-lg m-4 ml-0">Block Details</h2>
    </div>
  );
};

export default BlockDetails;
