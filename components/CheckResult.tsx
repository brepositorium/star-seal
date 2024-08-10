interface CheckResultProps {
  result: {
    found: boolean;
    message?: string;
    time?: string;
    nftImage?: string;
    nftName?: string;
  };
}

export default function CheckResult({ result }: CheckResultProps) {
  if (!result.found) {
    return (
      <p className="text-red-600">
        No attestation found for this NFT and signer.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-green-600 text-center mb-2 font-poppins">
        The NFT was signed!
      </p>
      <div className="bg-white rounded-large shadow-md w-full max-w-sm">
        {result.nftImage && (
          <img
            className="rounded-xl mb-2"
            src={result.nftImage}
            alt={result.nftName || "NFT"}
          />
        )}
        {result.nftName && (
          <p className="text-black text-center font-poppins mb-2">
            {result.nftName}
          </p>
        )}
        <p className="text-black text-center font-pacifico py-2 text-xl">
          {result.message}
        </p>
        <p className="text-black font-poppins text-right mr-6 py-4">
          🖊️{result.time}
        </p>
      </div>
    </div>
  );
}
