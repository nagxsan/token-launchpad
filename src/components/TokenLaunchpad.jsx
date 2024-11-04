import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { useState } from "react"

export function TokenLaunchpad() {
  const { connection } = useConnection()
  const wallet = useWallet()

  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [decimals, setDecimals] = useState('')
  const [initialSupply, setInitialSupply] = useState('')

  const [tokenAddress, setTokenAddress] = useState('')

  async function createToken() {
    if (!wallet.wallet) {
      alert('Please connect wallet first!')
      return
    }

    setTokenAddress('')

    const keypair = Keypair.generate()
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const programId = TOKEN_PROGRAM_ID

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId,
        }),
        createInitializeMint2Instruction(keypair.publicKey, isNaN(Number(decimals)) || decimals === '' ? 5 : Number(decimals), wallet.publicKey, wallet.publicKey, programId),
    );

    const recentBlockhash = await connection.getLatestBlockhash()
    transaction.recentBlockhash = recentBlockhash.blockhash
    transaction.feePayer = wallet.publicKey
    transaction.partialSign(keypair)

    const response = await wallet.sendTransaction(transaction, connection)
    setTokenAddress(response)
  }

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-black text-xl font-bold">
        Solana Token Launchpad
      </h1>
      <div className="flex flex-col gap-y-2">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <input type="text" placeholder="Decimals" value={decimals} onChange={(e) => setDecimals(e.target.value)} />
        <input type="text" placeholder="Initial Supply" value={initialSupply} onChange={(e) => setInitialSupply(e.target.value)} />
      </div>
      <div>
        <button
          className="bg-black text-white p-3 rounded-md flex justify-center items-center w-full hover:bg-gray-200 hover:text-black duration-200"
          onClick={createToken}
        >
          Create token
        </button>
      </div>
      <div>
        {tokenAddress !== '' && `Your token address: ${tokenAddress}`}
      </div>
    </div>
  )
}
