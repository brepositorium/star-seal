# StarSeal

StarSeal is a Web3 application that enables digital autographs for NFTs using Ethereum Attestation Service (EAS) on the Base Mainnet. It bridges the gap between traditional autographs and the digital collectibles space.

## Project Description

StarSeal allows celebrities to digitally autograph fans' NFTs, creating a new form of fan-celebrity interaction in the digital world. It's also a platform for friends to leave their mark on each other's digital collectibles.

Key features:

- Digital autographing of NFTs
- Verification of autographs
- Integration with OpenSea for NFT display

## How It Works

1. **Autographing**: Users input an NFT's address and token ID, along with a personal message.
2. **Verification**: The app creates a blockchain record (attestation) using EAS.
3. **Checking**: Fans can verify autographs by entering NFT details and the signer's wallet address.

## Technologies Used

- Frontend: Next.js, Framer Motion, React Hot Toast
- Blockchain Interaction: ethers.js, wagmi, viem
- Wallet Connection: RainbowKit
- Data Querying: Apollo Client, GraphQL
- NFT Integration: OpenSea SDK
- Core Technology: Ethereum Attestation Service (EAS) SDK

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/brepositorium/star-seal
   ```
2. Navigate to the project directory:
   ```
   cd star-seal
   ```
3. Install dependencies:
   ```
   yarn install
   ```

## Usage

1. Start the development server:
   ```
   yarn dev
   ```
2. Open your browser and navigate to `http://localhost:3000`

## Learn More

For a detailed explanation of how StarSeal was built and how to use EAS, check out our [tutorial blog post](https://mirror.xyz/0xF00CE1f047b5347C03A28DaD1a084396a2EA71fa/_9k_anA5giY3yVjMUzzuN7bOzX8lov-f6cq179zrVpk).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
