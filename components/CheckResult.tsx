export default function CheckResult({ result }: { result: any }) {
  if (!result.found) {
    return null;
  }

  return (
    <div className="mt-4">
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
