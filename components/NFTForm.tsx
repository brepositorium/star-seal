interface NFTFormProps {
  nftAddress: string;
  setNftAddress: (value: string) => void;
  tokenId: string;
  setTokenId: (value: string) => void;
}

export default function NFTForm({
  nftAddress,
  setNftAddress,
  tokenId,
  setTokenId,
}: NFTFormProps) {
  return (
    <>
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
    </>
  );
}
