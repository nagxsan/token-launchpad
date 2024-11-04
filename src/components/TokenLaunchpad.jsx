import { useWallet } from "@solana/wallet-adapter-react"

// import { createMint } from "@solana/spl-token"

export function TokenLaunchpad() {
  // const { connection } = useConnection()
  const wallet = useWallet()

  function createToken() {
    if (!wallet.wallet) {
      alert('Please connect wallet first!')
      return
    }
  }

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-black text-xl font-bold">
        Solana Token Launchpad
      </h1>
      <div className="flex flex-col gap-y-2">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Symbol" />
        <input type="text" placeholder="Image URL" />
        <input type="text" placeholder="Initial Supply" />
      </div>
      <div>
        <button
          className="bg-black text-white p-3 rounded-md flex justify-center items-center w-full hover:bg-gray-200 hover:text-black duration-200"
          onClick={createToken}
        >
          Create token
        </button>
      </div>
    </div>
  )
}
