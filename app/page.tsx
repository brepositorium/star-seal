"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="text-black bg-gradient-to-r from-blue-200 via-white to-yellow-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center mb-12"
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
        <section className="flex flex-col md:flex-row items-center justify-between mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h1 className="text-4xl font-bold mb-4">
              Authenticate Your Digital Collectibles
            </h1>
            <p className="text-xl mb-6">
              StarSeal allows celebrities, influencers, and creators to
              digitally sign NFTs, adding a layer of authenticity and personal
              connection to digital collectibles.
            </p>
            <Link href="/app" passHref>
              <motion.button
                className="relative bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary transition duration-300 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Launch App</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2"
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/your-video-id"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </motion.div>
        </section>

        <section className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-3xl font-bold mb-8"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Connect",
                description:
                  "Connect your wallet to the StarSeal app using Web3 technology.",
              },
              {
                title: "2. Sign",
                description:
                  "Enter the NFT details and your personal message to create a unique attestation.",
              },
              {
                title: "3. Verify",
                description:
                  "Anyone can easily verify the authenticity of the signed NFT using our app.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="w-full text-center py-4"
      >
        <p>&copy; 2024 StarSeal. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default Home;
