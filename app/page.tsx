"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import SignTab from "../components/SignTab";
import CheckTab from "../components/CheckTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"sign" | "check">("sign");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { isConnected: wagmiIsConnected } = useAccount();

  useEffect(() => {
    setIsConnected(wagmiIsConnected);
  }, [wagmiIsConnected]);

  return (
    <div className="bg-gradient-to-r from-blue-200 via-white to-yellow-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      {isConnected && (
        <div className="absolute top-10 right-12">
          <ConnectButton />
        </div>
      )}

      <div>
        <Image
          className="mx-auto mb-8 -mt-8"
          src="/logo.png"
          width={200}
          height={200}
          alt="StarSeal Logo"
        />
      </div>

      {isConnected ? (
        <>
          <div className="mb-6 inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-md font-medium rounded-l-lg font-poppins w-28
              ${
                activeTab === "sign"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("sign")}
            >
              Sign 🖊️
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-md font-medium rounded-r-lg font-poppins w-28
              ${
                activeTab === "check"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("check")}
            >
              Check 🔎
            </button>
          </div>

          <div className="bg-white rounded-large shadow-md p-6 px-10 w-full max-w-sm">
            {activeTab === "sign" ? <SignTab /> : <CheckTab />}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-large shadow-md p-6 px-10 w-full max-w-sm flex justify-center">
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
