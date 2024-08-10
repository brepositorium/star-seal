import { useState, useCallback } from "react";
import { useWalletClient } from "wagmi";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { BrowserProvider } from "ethers";
import { validateInputs } from "../utils/validation";
import NFTForm from "./NFTForm";
import toast from "react-hot-toast";

export default function SignTab() {
  const [nftAddress, setNftAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const { data: walletClient } = useWalletClient();

  const easContractAddress = "0x4200000000000000000000000000000000000021";
  const schemaUID =
    "0xea0fa1ad2ffcc34874c5a338bdf898df6c112e9b56aa39d62456436e6751a070";

  const handleSign = useCallback(async () => {
    if (!validateInputs(nftAddress, tokenId, setError) || !walletClient) return;

    try {
      toast.loading("Creating attestation...");
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
      toast.dismiss();
      toast.success("Attestation created successfully!");
      setError("");
      setNftAddress("");
      setTokenId("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to create attestation. Check console for details.");
      setError("Failed to create attestation. Check console for details.");
    }
  }, [nftAddress, tokenId, message, walletClient]);

  return (
    <>
      <NFTForm
        nftAddress={nftAddress}
        setNftAddress={setNftAddress}
        tokenId={tokenId}
        setTokenId={setTokenId}
      />
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
      <button
        className="w-full font-medium shadow-md text-lg text-white py-1 mb-2 rounded-md hover:bg-opacity-90 transition-colors font-poppins bg-secondary"
        onClick={handleSign}
      >
        Sign
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
    </>
  );
}
