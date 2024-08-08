import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-white text-black flex flex-col items-center justify-center p-4">
        <Head>
          <title>StarSeal - Sign NFTs Onchain</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center text-xl font-bold">
                <Image
                  src="/logo.png"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                ></Image>
              </div>
            </div>
            <p className="text-lg mb-4">
              Sign NFTs onchain lorem ipsum sit dolor amet bla bla bla
            </p>
            <div className="mb-8">Login</div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">How it works</h2>
          </div>
        </main>
      </div>
    </>
  );
}
