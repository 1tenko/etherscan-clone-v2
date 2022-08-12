import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

interface TxDetailsProps {
  hash: string;
  // nodeKey: string | undefined;
  web3: Web3;
}

const TxDetails: React.FC<TxDetailsProps> = ({ hash, web3 }) => {
  const [txBlock, setTxBlock] = useState<number | null>();
  const [txFrom, setTxFrom] = useState<string | null>();
  const [txTo, setTxTo] = useState<string | null>();
  const [txValue, setTxValue] = useState('');
  const [txGasPrice, setTxGasPrice] = useState('');
  const [txFee, setTxFee] = useState('');

  const getTransaction = async () => {
    const res = await web3.eth.getTransaction(hash);
    // console.log(res);
    setTxBlock(res.blockNumber);
    setTxFrom(res.from);
    setTxTo(res.to);
    setTxValue(web3.utils.fromWei(res.value, 'ether'));
    setTxGasPrice(web3.utils.fromWei(res.gasPrice, 'ether'));
    setTxFee(
      web3.utils.fromWei((res.gas * parseInt(res.gasPrice)).toString(), 'ether')
    );
    // const block = await web3.eth.getBlock(res.blockNumber);
  };
  useEffect(() => {
    getTransaction();
  });

  return (
    <div>
      <h2 className="font-bold text-lg">Transaction details</h2>
      <div>
        <div>Transaction Hash: {hash}</div>
        <div>Block: {txBlock}</div>
        <br />
        <div>From: {txFrom}</div>
        <div>To: {txTo}</div>
        <br />
        <div>Value: {txValue} ETH</div>
        <div>Transaction Fee: {txFee} ETH</div>
        <br />
        <div>Gas Price: {txGasPrice} ETH</div>
      </div>
    </div>
  );
};

export default TxDetails;
