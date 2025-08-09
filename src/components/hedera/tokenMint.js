import { TokenMintTransaction, AccountId } from '@hashgraph/sdk'

async function tokenMintFcn(walletData, accountId, tId) {
  console.log(`\n=======================================`)
  const amount = 100
  console.log(`- Minting ${amount} tokens...`)

  const hashconnect = walletData[0]
  const saveData = walletData[1]

  // Get signer using the new HashConnect v3 method
  const signer = hashconnect.getSigner(AccountId.fromString(accountId))

  // Create and execute token mint transaction
  const tokenMintTx = await new TokenMintTransaction()
    .setTokenId(tId)
    .setAmount(amount)
    .freezeWithSigner(signer)

  const tokenMintSubmit = await tokenMintTx.executeWithSigner(signer)

  // Get receipt with signer (HashConnect v3 method)
  const tokenMintRx = await tokenMintSubmit.getReceiptWithSigner(signer)

  const supply = tokenMintRx.totalSupply
  console.log(`- Tokens minted. New supply is ${supply}`)

  return [supply, tokenMintSubmit.transactionId]
}

export default tokenMintFcn
