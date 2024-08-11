"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HowItWorks from "@/components/HowItWorks";
import LaunchButton from "@/components/LaunchButton";

const Home = () => {
  return (
    <div className="text-black bg-gradient-to-r from-blue-200 via-white to-yellow-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center mb-20 mt-4"
      >
        <Image
          src="/logo.png"
          width={200}
          height={200}
          alt="StarSeal Logo"
          className="mx-auto"
        />
      </motion.header>

      <main className="w-full max-w-6xl mx-auto">
        <section className="flex flex-col md:flex-row items-center justify-between mb-20">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h1 className="text-4xl text-[#1b577f] tracking-wide font-bold mb-10 font-poppins">
              <span className="font-pacifico text-6xl text-gray-900">Sign</span>{" "}
              any NFT
            </h1>
            <p className="text-xl mb-10 font-poppins pr-24 text-gray-500">
              StarSeal allows celebrities, influencers, and creators to
              digitally autograph NFTs, adding a layer of authenticity and
              personal connection to digital collectibles.
            </p>
            <LaunchButton href="/app">Launch App</LaunchButton>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img src="/signing.gif" className="rounded-md" />
            </div>
          </motion.div>
        </section>

        <HowItWorks />
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="w-full text-center py-4"
      >
        <p className="text-gray-400">
          &copy; 2024 StarSeal. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
};

export default Home;
