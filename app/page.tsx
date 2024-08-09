"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("sign");

  return (
    <>
      <div className="bg-gradient-to-r from-blue-200 via-white to-yellow-100 flex flex-col items-center justify-center p-4">
        <div className="mx-auto mb-8">
          <Image
            src="/logo.png"
            width={120}
            height={120}
            alt="Picture of the author"
          ></Image>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-black font-poppins">
          Sign any NFT with StarSeal!
        </h2>

        <div className="mb-6 inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-md font-medium rounded-l-lg font-poppins w-28
            ${
              activeTab === "sign"
                ? "bg-blue-500 text-white"
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
                ? "bg-blue-500 text-white"
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
            />
          </div>

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
            ></textarea>
          </div>

          <button
            className="w-full font-medium shadow-md text-lg bg-yellow-500 text-white 
          py-1 mb-2 rounded-md hover:bg-yellow-600 transition-colors font-poppins"
          >
            Sign
          </button>
        </div>

        <p className="mt-8 text-2xl font-extrabold text-black">How it works?</p>
      </div>
    </>
  );
}
