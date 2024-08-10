import { ethers } from "ethers";
import { SetStateAction } from "react";

export function validateInputs(
  nftAddress: string,
  tokenId: string,
  setError: {
    (value: SetStateAction<string>): void;
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  }
) {
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
}
