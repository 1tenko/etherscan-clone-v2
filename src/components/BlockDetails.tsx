import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { BlockTransactionString } from 'web3-eth';
import Search from './Search';

interface BlockDetailsProps {
  web3: Web3;
}

const BlockDetails: React.FC<BlockDetailsProps> = ({ web3 }) => {
  const [block, setBlock] = useState<BlockTransactionString>();

  const [blockTimestamp, setBlockTimestamp] = useState('');
  const [baseFeePerGas, setBaseFeePerGas] = useState('');

  const { id } = useParams();

  const getBlock = async () => {
    const res = await web3.eth.getBlock(id!);

    setBlock(res);

    if (!res.baseFeePerGas) {
      setBaseFeePerGas('Unavailable');
    } else {
      setBaseFeePerGas(
        web3.utils.fromWei(String(res.baseFeePerGas), 'ether') + ' ETH'
      );
    }

    const blockTimestamp = res.timestamp;
    // @ts-ignore
    const timestamp = new Date(parseInt(blockTimestamp) * 1000);
    setBlockTimestamp(timestamp.toUTCString());
  };

  useEffect(() => {
    getBlock();
  });

  return (
    <div>
      <Search web3={web3} />
      <h2 className="font-bold text-lg m-4 ml-0">Block Details</h2>
      <div className="flex-row gap-5 border-2 border-black p-4">
        <div className="flex">
          <div className="w-[15vw]">Block Number: </div> {block?.number}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Timestamp: </div> {blockTimestamp}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Transactions: </div>
          {block?.transactions.length}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Mined by: </div> {block?.miner}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Difficulty: </div>
          {Number(block?.difficulty).toLocaleString('en-US')}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Total Difficulty: </div>
          {Number(block?.totalDifficulty).toLocaleString('en-US')}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Size: </div>
          {Number(block?.size).toLocaleString('en-US')} bytes
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Gas Used: </div>
          {block?.gasUsed.toLocaleString('en-US')} {/* @ts-ignore */}(
          {((block?.gasUsed / block?.gasLimit) * 100).toFixed(2)}% of gas limit)
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Gas Limit: </div>
          {block?.gasLimit?.toLocaleString('en-US')}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[15vw]">Base Fee Per Gas: </div>
          {baseFeePerGas}
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
