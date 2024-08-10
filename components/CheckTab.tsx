import { useState, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { Chain, OpenSeaSDK } from "opensea-js";
import { validateInputs } from "../utils/validation";
import NFTForm from "./NFTForm";
import CheckResult from "./CheckResult";

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

  const schemaUID =
    "0xea0fa1ad2ffcc34874c5a338bdf898df6c112e9b56aa39d62456436e6751a070";

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
      const { data } = await refetch({
        schemaId: schemaUID,
        nftAddress,
        attester: signersAddress,
      });
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
            "https://mainnet.base.org"
          );
          const openseaSDK = new OpenSeaSDK(provider, {
            chain: Chain.Base,
            apiKey: "913dbf5f6097430fa790e0aec86702d6",
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
        } else {
          setCheckResult({ found: false });
        }
      } else {
        setCheckResult({ found: false });
      }
    } catch (err) {
      console.error(err);
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
