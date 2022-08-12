import React from 'react';

interface TxDetailsProps {
  hash: string;
}

const TxDetails: React.FC<TxDetailsProps> = ({ hash }) => {
  return (
    <div>
      <h1>{hash}</h1>
    </div>
  );
};

export default TxDetails;
