import React from 'react';
import { Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div key={tx.id} className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${
                tx.type === 'send' ? 'bg-red-400/10' : 'bg-green-400/10'
              }`}>
                {tx.type === 'send' ? (
                  <ArrowUpRight className={`w-5 h-5 ${
                    tx.type === 'send' ? 'text-red-400' : 'text-green-400'
                  }`} />
                ) : (
                  <ArrowDownLeft className={`w-5 h-5 ${
                    tx.type === 'send' ? 'text-red-400' : 'text-green-400'
                  }`} />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-200">
                  {tx.type === 'send' ? 'Sent to' : 'Received from'}{' '}
                  <span className="text-gray-400">
                    {tx.type === 'send' ? formatAddress(tx.to) : formatAddress(tx.from)}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                tx.type === 'send' ? 'text-red-400' : 'text-green-400'
              }`}>
                {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.currency}
              </p>
              <p className="text-sm text-gray-500">
                Fee: {tx.fee} {tx.currency}
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              {getStatusIcon(tx.status)}
              <span className="capitalize">{tx.status}</span>
            </div>
            <a
              href={`https://etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              View on Explorer
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}