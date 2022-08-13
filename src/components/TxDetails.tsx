import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

interface TxDetailsProps {
  hash: string;
  // nodeKey: string | undefined;
  web3: Web3;
}

const TxDetails: React.FC<TxDetailsProps> = ({ hash, web3 }) => {
  const [txHash, setTxHash] = useState('');
  const [txBlock, setTxBlock] = useState<number | null>();
  const [txFrom, setTxFrom] = useState<string | null>();
  const [txTo, setTxTo] = useState<string | null>();
  const [txValue, setTxValue] = useState('');
  const [txGasPrice, setTxGasPrice] = useState('');
  const [txFee, setTxFee] = useState('');
  const [txTimestamp, setTxTimestamp] = useState('');

  const getTransaction = async () => {
    const res = await web3.eth.getTransaction(hash);
    // console.log(res);
    setTxHash(res.hash);
    setTxBlock(res.blockNumber);
    setTxFrom(res.from);
    setTxTo(res.to);
    setTxValue(web3.utils.fromWei(res.value, 'ether'));
    setTxGasPrice(web3.utils.fromWei(res.gasPrice, 'ether'));
    setTxFee(
      web3.utils.fromWei((res.gas * parseInt(res.gasPrice)).toString(), 'ether')
    );

    // @ts-ignore
    const block = await web3.eth.getBlock(txBlock);
    const blockTimestamp = block.timestamp;
    // @ts-ignore
    const timestamp = new Date(parseInt(blockTimestamp) * 1000);
    setTxTimestamp(timestamp.toUTCString());
    console.log(res);
  };
  useEffect(() => {
    getTransaction();
  });

  return (
    <div>
      <h2 className="font-bold text-lg m-4 ml-0">Transaction details</h2>
      <div className="flex-row gap-5 border-2 border-black p-4">
        <div className="flex">
          <div className="w-[10vw]">Transaction Hash:</div>
          {txHash}
        </div>
        <div className="flex">
          <div className="w-[10vw]">Block:</div>
          {txBlock}
        </div>
        <div className="flex">
          <div className="w-[10vw]">Timestamp:</div>
          {txTimestamp}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">From:</div>
          {txFrom}
        </div>
        <div className="flex">
          <div className="w-[10vw]">To:</div>
          {txTo}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Value:</div>
          {txValue} ETH
        </div>
        <div className="flex">
          <div className="w-[10vw]">Transaction Fee:</div>
          {txFee} ETH
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Gas Price:</div>
          {txGasPrice} ETH
        </div>
      </div>
    </div>
  );
};

export default TxDetails;
