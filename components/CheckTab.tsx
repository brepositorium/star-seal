import { useState, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { Chain, OpenSeaSDK } from "opensea-js";
import { validateInputs } from "../utils/validation";
import NFTForm from "./NFTForm";
import CheckResult from "./CheckResult";
import toast from "react-hot-toast";

const GET_NFT_ATTESTATIONS = gql`
  query NFTAttestations(
    $schemaId: String!
    $nftAddress: String!
    $attester: String!
  ) {
    attestations(
      where: {
        schemaId: { equals: $schemaId }
        attester: { equals: $attester }
        decodedDataJson: { contains: $nftAddress }
      }
      orderBy: { time: desc }
    ) {
      id
      attester
      recipient
      time
      decodedDataJson
    }
  }
`;

interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  time: number;
  decodedDataJson: string;
}

interface CheckResult {
  found: boolean;
  message?: string;
  time?: string;
  nftImage?: string;
  nftName?: string;
}

export default function CheckTab() {
  const [nftAddress, setNftAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [signersAddress, setSignersAddress] = useState<string>("");
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string>("");

  const schemaUID = process.env.NEXT_PUBLIC_SCHEMA_UID;

  const { refetch } = useQuery(GET_NFT_ATTESTATIONS, {
    skip: true,
    variables: {
      schemaId: schemaUID,
      nftAddress: "",
      attester: "",
    },
  });

  const handleCheck = useCallback(async () => {
    if (!validateInputs(nftAddress, tokenId, setError)) return;

    try {
      toast.loading("Checking attestation...");
      const { data } = await refetch({
        schemaId: schemaUID,
        nftAddress,
        attester: signersAddress,
      });
      console.log(data);
      if (data && data.attestations) {
        const filteredAttestations = data.attestations.filter(
          (attestation: Attestation) => {
            const decodedData = JSON.parse(attestation.decodedDataJson);
            const nftAddressMatch = decodedData.some(
              (field: { name: string; value: { value: string } }) =>
                field.name === "nftAddress" && field.value.value === nftAddress
            );
            const tokenIdMatch = decodedData.some(
              (field: { name: string; value: { value: { hex: string } } }) => {
                if (field.name !== "tokenId") return false;
                const attestationTokenId = BigInt(
                  field.value.value.hex
                ).toString();
                return attestationTokenId === tokenId;
              }
            );

            return nftAddressMatch && tokenIdMatch;
          }
        );

        if (filteredAttestations.length > 0) {
          const attestation = filteredAttestations[0];
          const decodedData = JSON.parse(attestation.decodedDataJson);
          const message = decodedData.find(
            (field: { name: string }) => field.name === "message"
          ).value.value;
          const provider = new ethers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_BASE_RPC_URL
          );
          const openseaSDK = new OpenSeaSDK(provider, {
            chain: Chain.Base,
            apiKey: process.env.NEXT_PUBLIC_OPEN_SEA_API_KEY,
          });
          const asset = await openseaSDK.api.getNFT(
            nftAddress,
            tokenId,
            Chain.Base
          );
          setCheckResult({
            found: true,
            message: message,
            time: new Date(attestation.time * 1000).toLocaleString(),
            nftImage: asset.nft.image_url,
            nftName: asset.nft.name,
          });
          toast.dismiss();
          toast.success("Attestation found!");
        } else {
          setCheckResult({ found: false });
          toast.dismiss();
          toast.error("No attestation found for this NFT and signer.");
        }
      } else {
        setCheckResult({ found: false });
        toast.dismiss();
        toast.error("No attestation found for this NFT and signer.");
      }
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to check attestation. Check console for details.");
      setError("Failed to check attestation. Check console for details.");
    }
  }, [nftAddress, tokenId, signersAddress, refetch]);

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
          htmlFor="signers-address"
          className="block text-md font-medium text-gray-700 mb-1 font-poppins"
        >
          Signer's Address
        </label>
        <input
          type="text"
          id="signers-address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          value={signersAddress}
          onChange={(e) => setSignersAddress(e.target.value)}
        />
      </div>
      <button
        className="w-full font-medium shadow-md text-lg text-white py-1 mb-2 rounded-md hover:bg-opacity-90 transition-colors font-poppins bg-primary"
        onClick={handleCheck}
      >
        Check
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {checkResult && <CheckResult result={checkResult} />}
    </>
  );
}
