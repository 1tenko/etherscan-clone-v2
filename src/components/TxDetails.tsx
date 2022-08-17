import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Web3 from 'web3';
import { Transaction } from 'web3-eth';
import { getEthPrice } from '../utils/getEthPrice';
import Search from './Search';

interface TxDetailsProps {
  web3: Web3;
}

// TODO: CREATE INTERFACE FOR TRANSACTION AND OVERRIDE VALUE TYPES FOR PARSING
// interface TransactionDetails extends Transaction {

// }

const TxDetails: React.FC<TxDetailsProps> = ({ web3 }) => {
  const [transaction, setTransaction] = useState<Transaction | null>();

  const [ethPrice, setEthPrice] = useState<number>();

  const EthPriceFetch = async () => {
    const res = await getEthPrice();
    setEthPrice(res);
  };

  const [txnValue, setTxnValue] = useState('');
  const [blockConfirmations, setBlockConfirmations] = useState<number>();
  const [txFee, setTxFee] = useState('');
  const [txTimestamp, setTxTimestamp] = useState('');

  const { id } = useParams();

  const parseEther = (v: string): string => {
    return web3.utils.fromWei(v, 'ether');
  };

  const getTransaction = async () => {
    const res = await web3.eth.getTransaction(web3.utils.toHex(id!));

    // console.log(res);
    setTransaction(res);

    setTxFee(
      web3.utils.fromWei((res.gas * parseInt(res.gasPrice)).toString(), 'ether')
    );

    setTxnValue(res.value);
    const block = await web3.eth.getBlock(res.blockNumber!);
    const currentBlock = await web3.eth.getBlockNumber();
    setBlockConfirmations(currentBlock - res.blockNumber!);

    const blockTimestamp = block.timestamp;
    // @ts-ignore
    const timestamp = new Date(parseInt(blockTimestamp) * 1000);
    setTxTimestamp(timestamp.toUTCString());
  };

  const value = (ethPrice! * Number(parseEther(txnValue))).toFixed(2);
  const txFeeValue = (ethPrice! * Number(txFee)).toFixed(2);

  const navigate = useNavigate();

  useEffect(() => {
    getTransaction();
    EthPriceFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Search web3={web3} />
      <h2 className="font-bold text-lg m-4 ml-0">Transaction Details</h2>
      <div className="flex-row gap-5 border-2 border-black p-4">
        <div className="flex">
          <div className="w-[10vw]">Transaction Hash:</div>
          {transaction?.hash}
        </div>
        <div className="flex">
          <div className="w-[10vw]">Block:</div>
          <div>{transaction?.blockNumber}</div>
          <div className="bg-gray-200 ml-4">
            {blockConfirmations} block confirmations
          </div>
        </div>
        <div className="flex">
          <div className="w-[10vw]">Timestamp:</div>
          {txTimestamp}
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">From:</div>
          <div
            onClick={() => navigate(`/address/${transaction?.from}`)}
            className="cursor-pointer"
          >
            {transaction?.from}
          </div>
        </div>
        <div className="flex">
          <div className="w-[10vw]">To:</div>
          <div
            onClick={() => navigate(`/address/${transaction?.to}`)}
            className="cursor-pointer"
          >
            {transaction?.to}
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Value:</div>
          {parseEther(txnValue)} ETH ({Number(value).toLocaleString('en-US')}{' '}
          USD)
        </div>
        <div className="flex">
          <div className="w-[10vw]">Transaction Fee:</div>
          {txFee} ETH ({Number(txFeeValue).toLocaleString('en-US')} USD)
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-[10vw]">Gas Price:</div>
          {transaction?.gasPrice && parseEther(transaction?.gasPrice!)} ETH
        </div>
      </div>
    </div>
  );
};

export default TxDetails;
