import React from "react";
import { TokenNews } from "../types";
import { Twitter, MessageCircle, Repeat2, Heart } from "lucide-react";

interface TokenNewsFeedProps {
    news: TokenNews[];
}

export const TokenNewsFeed: React.FC<TokenNewsFeedProps> = ({ news }) => {
    return (
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-400/10">
                        <Twitter className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Token News</h2>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {news.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-700/40 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-blue-400">
                                {item.token}
                            </span>
                            <span className="text-xs text-gray-400">
                                {new Date(item.timestamp).toLocaleDateString()}{" "}
                                at{" "}
                                {new Date(item.timestamp).toLocaleTimeString()}
                            </span>
                        </div>

                        <p className="text-gray-100 mb-3">{item.content}</p>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Reply</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors cursor-pointer">
                                    <Repeat2 className="w-4 h-4" />
                                    <span>{item.retweets}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                                    <Heart className="w-4 h-4" />
                                    <span>{item.likes}</span>
                                </div>
                            </div>
                            <a
                                href={item.tweetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                View Tweet
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
