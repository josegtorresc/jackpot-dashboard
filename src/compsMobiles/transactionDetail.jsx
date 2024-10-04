import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TransactionDetail() {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/transactions/${transactionId}`,
        );
        console.log('Transaction data:', response.data);
        setTransaction(response.data);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        setError('Error fetching transaction details');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [transactionId]);

  if (loading) {
    return <p>Loading transaction details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!transaction) {
    return <p>Transaction not found.</p>;
  }

  return (
    <div className="transaction-detail">
      <h2>Transaction Details</h2>
      <p>
        <strong>Transaction ID:</strong> {transaction.transactionId}
      </p>
      <p>
        <strong>Date:</strong> {transaction.timestamp}
      </p>
      <p>
        <strong>Player ID:</strong> {transaction.playerId}
      </p>
      <p>
        <strong>Machine ID:</strong> {transaction.machineId}
      </p>
      <p>
        <strong>Jackpot Gold:</strong> {transaction.jackpotsWon.oro}
      </p>
      <p>
        <strong>Jackpot Silver:</strong> {transaction.jackpotsWon.plata}
      </p>
      <p>
        <strong>Jackpot Bronze:</strong> {transaction.jackpotsWon.bronce}
      </p>
      <p>
        <strong>Location:</strong> {transaction.location}
      </p>
      <p>
        <strong>Total Won:</strong> ${transaction.totalAmountWon}
      </p>
      <p>
        <strong>Bet Amount:</strong> ${transaction.betAmount}
      </p>
    </div>
  );
}

export default TransactionDetail;
