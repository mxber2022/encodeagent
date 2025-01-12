import React, { useState } from "react";
import { WalletCard } from "./components/WalletCard";
import { ChatInterface } from "./components/ChatInterface";
import { TransactionList } from "./components/TransactionList";
import { TokenNewsFeed } from "./components/TokenNewsFeed";
import { TokenHoldings } from "./components/TokenHoldings";
import { CharacterBuilder } from "./components/CharacterBuilder";
import {
    WalletBalance,
    ChatMessage,
    Transaction,
    TokenNews,
    TokenHolding,
} from "./types";
import {
    Activity,
    Settings,
    Bell,
    Menu,
    Github,
    Twitter,
    Bot,
} from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
    const [currentView, setCurrentView] = useState<
        "main" | "character-builder"
    >("main");

    const [balance] = useState<WalletBalance>({
        currency: "ETH",
        amount: 0.01067,
        usdValue: 34.8,
        change24h: 2.5,
        chartData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: Date.now() - (23 - i) * 3600000,
            value: Math.random() * 100,
        })),
    });

    const [holdings] = useState<TokenHolding[]>([
        {
            id: "1",
            token: "Ethereum",
            symbol: "ETH",
            amount: 0.01067,
            usdValue: 34.8,
            change24h: 2.5,
            icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        },
        {
            id: "2",
            token: "Starknet",
            symbol: "STRK",
            amount: 1,
            usdValue: 0.43,
            change24h: -1.2,
            icon: "https://pbs.twimg.com/profile_images/1834202903189618688/N4J8emeY_400x400.png",
        },
    ]);

    const [transactions] = useState<Transaction[]>([
        {
            id: "1",
            type: "send",
            amount: 0.5,
            currency: "ETH",
            timestamp: new Date(),
            status: "completed",
            from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44f",
            hash: "0x123...456",
            fee: 0.002,
        },
    ]);

    const [tokenNews] = useState<TokenNews[]>([
        {
            id: "1",
            token: "@StarkWareLtd",
            title: "Ethereum Update",
            content: "From OGs to escape velocity.2025 will be exciting.",
            author: "@StarkWareLtd",
            timestamp: new Date(),
            tweetUrl: "https://twitter.com",
            likes: 142,
            retweets: 52,
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900 to-black text-white">
                {/* Navigation */}
                <nav className="bg-black/40 backdrop-blur-xl border-b border-white/10 z-50">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-50"></div>
                                <div className="relative">
                                    <h1 className="text-2xl font-black tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                        AgentStark
                                    </h1>
                                    <p className="text-xs font-medium text-gray-400 tracking-wider">
                                        POWERED BY AI
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex items-center gap-4">
                                <button
                                    onClick={() =>
                                        setCurrentView(
                                            currentView === "main"
                                                ? "character-builder"
                                                : "main"
                                        )
                                    }
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    <Bot className="w-4 h-4" />
                                    <span>
                                        {currentView === "main"
                                            ? "Build Character"
                                            : "Dashboard"}
                                    </span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    <Bell className="w-4 h-4" />
                                    <span>Alerts</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </button>
                            </div>
                            <button className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors md:hidden">
                                <Menu className="w-5 h-5" />
                            </button>
                            <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg font-medium transition-all border border-white/10">
                                <span>Welcome MX</span>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                {currentView === "main" ? (
                    <div className="flex flex-1 overflow-hidden">
                        {/* Left Panel - Scrollable */}
                        <div className="w-[45%] overflow-y-auto">
                            <div className="p-8 space-y-8">
                                <WalletCard
                                    balance={balance}
                                    address="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                                />

                                <TokenHoldings holdings={holdings} />

                                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <Activity className="w-5 h-5 text-indigo-400" />
                                            <h2 className="text-xl font-bold text-white">
                                                Activity Feed
                                            </h2>
                                        </div>
                                        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                                            View All
                                        </button>
                                    </div>
                                    <TransactionList
                                        transactions={transactions}
                                    />
                                </div>

                                <TokenNewsFeed news={tokenNews} />
                            </div>
                        </div>

                        {/* Right Panel - Chat Interface */}
                        <div className="flex-1 overflow-hidden">
                            <ChatInterface />
                        </div>
                    </div>
                ) : (
                    <CharacterBuilder />
                )}

                {/* Footer */}
                <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-4">
                    <div className="container mx-auto px-6 flex items-center justify-between">
                        <p className="text-sm text-gray-400">
                            © 2024 AgentStark. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </QueryClientProvider>
    );
}
