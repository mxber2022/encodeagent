import React from 'react';
import { WalletBalance } from '../types';
import { Wallet, TrendingUp, TrendingDown, Copy, ExternalLink } from 'lucide-react';

interface WalletCardProps {
  balance: WalletBalance;
  address: string;
}

export const WalletCard: React.FC<WalletCardProps> = ({ balance, address }) => {
  const isPositiveChange = balance.change24h >= 0;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  const openExplorer = () => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
      <div className="absolute top-0 right-0 p-4 flex gap-2">
        <button 
          onClick={copyAddress}
          className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
          title="Copy Address"
        >
          <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
        <button 
          onClick={openExplorer}
          className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
          title="View on Explorer"
        >
          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">{balance.currency} Balance</h3>
        </div>
        <div className="flex items-center gap-2">
          {isPositiveChange ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={isPositiveChange ? 'text-green-400' : 'text-red-400'}>
            {isPositiveChange ? '+' : ''}{balance.change24h.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          {balance.amount.toFixed(8)} {balance.currency}
        </p>
        <p className="text-xl text-gray-400">${balance.usdValue.toFixed(2)} USD</p>
      </div>

      <div className="mt-4 text-sm text-gray-400 truncate">
        {address.slice(0, 6)}...{address.slice(-4)}
      </div>

      <div className="mt-6 h-20">
        <div className="relative h-full">
          {balance.chartData.map((point, index, array) => {
            if (index === 0) return null;
            const x1 = (index - 1) * (100 / (array.length - 1));
            const x2 = index * (100 / (array.length - 1));
            const y1 = 100 - ((array[index - 1].value - Math.min(...array.map(p => p.value))) / 
                     (Math.max(...array.map(p => p.value)) - Math.min(...array.map(p => p.value))) * 100);
            const y2 = 100 - ((point.value - Math.min(...array.map(p => p.value))) / 
                     (Math.max(...array.map(p => p.value)) - Math.min(...array.map(p => p.value))) * 100);
            
            return (
              <svg
                key={index}
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <line
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeOpacity="0.5"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
            );
          })}
        </div>
      </div>
    </div>
  );
}