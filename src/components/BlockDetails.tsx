import React, { useState } from 'react';
import Web3 from 'web3';

interface BlockDetailsProps {
  web3: Web3;
  input: string;
}

const BlockDetails: React.FC<BlockDetailsProps> = ({ web3, input }) => {
  const [blockNum, setBlockNum] = useState<number>();
  const [blockTimestamp, setBlockTimestamp] = useState('');
  const [blockTxLength, setBlockTxLength] = useState<number>();
  const [blockMiner, setBlockMiner] = useState('');
  const [difficulty, setDifficulty] = useState<number>();
  const [totalDifficulty, setTotalDifficulty] = useState<number>();

  const getBlock = async () => {
    const res = await web3.eth.getBlock(input);
    console.log(res);
    setBlockNum(res.number);
    setBlockTxLength(res.transactions.length);
    setBlockMiner(res.miner);
    setDifficulty(Number(res.difficulty));
    setTotalDifficulty(Number(res.totalDifficulty));

    const blockTimestamp = res.timestamp;
    // @ts-ignore
    const timestamp = new Date(parseInt(blockTimestamp) * 1000);
    setBlockTimestamp(timestamp.toUTCString());
  };
  getBlock();
  return (
    <div>
      <h2 className="font-bold text-lg m-4 ml-0">Block Details</h2>
      <div className="flex-row gap-5 border-2 border-black p-4">
        <div className="flex">
          <div className="w-[10vw]">Block Number: </div> {blockNum}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Timestamp: </div> {blockTimestamp}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Transactions: </div> {blockTxLength}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Mined by: </div> {blockMiner}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Difficulty: </div>{' '}
          {difficulty?.toLocaleString('en-US')}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Total Difficulty: </div>{' '}
          {totalDifficulty?.toLocaleString('en-US')}
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
