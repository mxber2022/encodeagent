import React from 'react';
import { TokenHolding } from '../types';
import { Coins, TrendingUp, TrendingDown } from 'lucide-react';

interface TokenHoldingsProps {
  holdings: TokenHolding[];
}

export const TokenHoldings: React.FC<TokenHoldingsProps> = ({ holdings }) => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.usdValue, 0);
  const totalChange = holdings.reduce((sum, holding) => sum + (holding.usdValue * holding.change24h / 100), 0);
  const totalChangePercentage = (totalChange / (totalValue - totalChange)) * 100;

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-yellow-400/10">
            <Coins className="w-5 h-5 text-yellow-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Token Holdings</h2>
        </div>
        <div className="flex items-center gap-2">
          {totalChangePercentage >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={totalChangePercentage >= 0 ? 'text-green-400' : 'text-red-400'}>
            {totalChangePercentage >= 0 ? '+' : ''}{totalChangePercentage.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {holdings.map((holding) => (
          <div key={holding.id} className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-700/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={holding.icon}
                  alt={holding.token}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-white">{holding.token}</h3>
                  <p className="text-sm text-gray-400">{holding.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  {holding.amount.toFixed(4)} {holding.symbol}
                </p>
                <p className="text-sm text-gray-400">
                  ${holding.usdValue.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-end gap-2">
              {holding.change24h >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={holding.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                {holding.change24h >= 0 ? '+' : ''}{holding.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}