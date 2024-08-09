"use client";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BrowserProvider, ethers } from "ethers";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";

export default function Home() {
  const [activeTab, setActiveTab] = useState("sign");
  const [isConnected, setIsConnected] = useState(false);
  const { isConnected: wagmiIsConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [nftAddress, setNftAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!ethers.isAddress(nftAddress)) {
      setError("Invalid NFT Address");
      return false;
    }
    if (isNaN(parseInt(tokenId)) || parseInt(tokenId) < 0) {
      setError("Token ID must be a positive number");
      return false;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    setIsConnected(wagmiIsConnected);
  }, [wagmiIsConnected]);

  const easContractAddress = "0x4200000000000000000000000000000000000021";
  const schemaUID =
    "0xea0fa1ad2ffcc34874c5a338bdf898df6c112e9b56aa39d62456436e6751a070";

  const handleSign = useCallback(async () => {
    if (!validateInputs() || !walletClient) return;

    try {
      const eas = new EAS(easContractAddress);

      const provider = new BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();

      await eas.connect(signer);

      const schemaEncoder = new SchemaEncoder(
        "address nftAddress,uint256 tokenId,string message"
      );
      const encodedData = schemaEncoder.encodeData([
        { name: "nftAddress", value: nftAddress, type: "address" },
        { name: "tokenId", value: tokenId, type: "uint256" },
        { name: "message", value: message, type: "string" },
      ]);

      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: "0x0000000000000000000000000000000000000000",
          expirationTime: BigInt(0),
          revocable: false,
          data: encodedData,
        },
      });

      const newAttestationUID = await tx.wait();
      console.log("New attestation UID:", newAttestationUID);
      setError("Attestation created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create attestation. Check console for details.");
    }
  }, [nftAddress, tokenId, message, walletClient]);

  const handleCheck = () => {
    // Implement check functionality here
    console.log("Checking NFT signature...");
  };

  {
    error && <p className="text-red-500 mb-4">{error}</p>;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-200 via-white to-yellow-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
        {isConnected && (
          <div className="absolute top-10 right-12">
            <ConnectButton />
          </div>
        )}

        <div>
          <Image
            className="mx-auto mb-8"
            src="/logo.png"
            width={120}
            height={120}
            alt="StarSeal Logo"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-black font-poppins">
          Sign any NFT with StarSeal!
        </h2>

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
              <div className="mb-4">
                <label
                  htmlFor="nft-address"
                  className="block text-md font-medium text-gray-700 mb-1 font-poppins"
                >
                  NFT Address
                </label>
                <input
                  type="text"
                  id="nft-address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  value={nftAddress}
                  onChange={(e) => setNftAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="token-id"
                  className="block text-md font-medium text-gray-700 mb-1 font-poppins"
                >
                  Token ID
                </label>
                <input
                  type="number"
                  id="token-id"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                />
              </div>
              {activeTab === "sign" ? (
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-md font-medium text-gray-700 mb-1 font-poppins"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              ) : (
                <div className="mb-4">
                  <label
                    htmlFor="signers-address"
                    className="block text-md font-medium text-gray-700 mb-1 font-poppins"
                  >
                    Signer's Address
                  </label>
                  <input
                    type="text"
                    id="signers-address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
              )}

              <button
                className={`w-full font-medium shadow-md text-lg text-white
                py-1 mb-2 rounded-md hover:bg-opacity-90 transition-colors font-poppins
                ${activeTab === "sign" ? "bg-secondary" : "bg-primary"}`}
                onClick={activeTab === "sign" ? handleSign : handleCheck}
              >
                {activeTab === "sign" ? "Sign" : "Check"}
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-large shadow-md p-6 px-10 w-full max-w-sm flex justify-center">
            <ConnectButton />
          </div>
        )}

        <p className="mt-8 text-2xl font-extrabold text-black font-poppins">
          How it works?
        </p>
      </div>
    </>
  );
}
