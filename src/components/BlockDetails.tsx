import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

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
      <div className="mt-[128px]">
        <Search web3={web3} />
        <h2 className=" text-[24px] text-lg m-[24px] ml-0">Block Details</h2>
        <div className="bg-gradient-to-r p-[4px] from-[#FC466B] to-[#3F5EFB]/50 rounded-[16px] shadow-2xl">
          <div className="flex-row gap-5 p-[24px] rounded-[16px]  bg-gray-200/50  text-[20px]">
            <div className="flex">
              <div className="w-[20vw]">Block Number: </div> {block?.number}
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Timestamp: </div> {blockTimestamp}
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Transactions: </div>
              {block?.transactions.length}
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Mined by: </div>
              <div
                onClick={() => navigate(`/address/${block?.miner}`)}
                className="cursor-pointer underline decoration-1 underline-offset-4"
              >
                {block?.miner}
              </div>
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Difficulty: </div>
              {Number(block?.difficulty).toLocaleString('en-US')}
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Total Difficulty: </div>
              {Number(block?.totalDifficulty).toLocaleString('en-US')}
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Size: </div>
              {Number(block?.size).toLocaleString('en-US')} bytes
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Gas Used: </div>
              {block?.gasUsed.toLocaleString('en-US')} {/* @ts-ignore */}(
              {((block?.gasUsed / block?.gasLimit) * 100).toFixed(2)}% of gas
              limit)
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Gas Limit: </div>
              {block?.gasLimit?.toLocaleString('en-US')}
            </div>
            <hr className="my-4 border-black" />
            <div className="flex">
              <div className="w-[20vw]">Base Fee Per Gas: </div>
              {baseFeePerGas}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
