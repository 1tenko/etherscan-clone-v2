import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { BlockTransactionString } from 'web3-eth';

interface BlockDetailsProps {
  web3: Web3;
}

const BlockDetails: React.FC<BlockDetailsProps> = ({ web3 }) => {
  const [block, setBlock] = useState<BlockTransactionString>();

  const [blockNum, setBlockNum] = useState<number>();
  const [blockTimestamp, setBlockTimestamp] = useState('');
  const [blockTxLength, setBlockTxLength] = useState<number>();
  const [blockMiner, setBlockMiner] = useState('');
  const [difficulty, setDifficulty] = useState<number>();
  const [totalDifficulty, setTotalDifficulty] = useState<number>();
  const [blockSize, setBlockSize] = useState<number>();
  const [gasUsed, setGasUsed] = useState<number>();
  const [gasLimit, setGasLimit] = useState<number>();
  const [baseFeePerGas, setBaseFeePerGas] = useState('');

  const { id } = useParams();

  const getBlock = async () => {
    const res = await web3.eth.getBlock(id!);

    setBlock(res);

    setBlockNum(res.number);
    setBlockTxLength(res.transactions.length);
    setBlockMiner(res.miner);
    setDifficulty(Number(res.difficulty));
    setTotalDifficulty(Number(res.totalDifficulty));
    setBlockSize(res.size);
    setGasUsed(res.gasUsed);
    setGasLimit(res.gasLimit);
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
      <h2 className="font-bold text-lg m-4 ml-0">Block Details</h2>
      <div className="flex-row gap-5 border-2 border-black p-4">
        <div className="flex">
          <div className="w-[10vw]">Block Number: </div> {block?.number}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Timestamp: </div> {blockTimestamp}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Transactions: </div>{' '}
          {block?.transactions.length}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Mined by: </div> {blockMiner}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Difficulty: </div>
          {difficulty?.toLocaleString('en-US')}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Total Difficulty: </div>
          {totalDifficulty?.toLocaleString('en-US')}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Size: </div>
          {blockSize?.toLocaleString('en-US')} bytes
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Gas Used: </div>
          {gasUsed?.toLocaleString('en-US')} {/* @ts-ignore */}(
          {((gasUsed / gasLimit) * 100).toFixed(2)}% of gas limit)
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Gas Limit: </div>
          {gasLimit?.toLocaleString('en-US')}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Base Fee Per Gas: </div>
          {baseFeePerGas}
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
