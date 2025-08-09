import axios from 'axios'
import { TokenCreateTransaction, PublicKey, AccountId } from '@hashgraph/sdk'

async function tokenCreateFcn(walletData, accountId) {
  console.log(`\n=======================================`)
  console.log(`- Creating HTS token...`)

  const hashconnect = walletData[0]
  const saveData = walletData[1]

  // Get signer using the new HashConnect v3 method
  const signer = hashconnect.getSigner(AccountId.fromString(accountId))

  // Get account public key from mirror node
  const url = `https://testnet.mirrornode.hedera.com/api/v1/accounts?account.id=${accountId}`
  const mirrorQuery = await axios(url)
  const supplyKey = PublicKey.fromString(mirrorQuery.data.accounts[0].key.key)

  // Create and execute token creation transaction
  const tokenCreateTx = await new TokenCreateTransaction()
    .setTokenName('dAppDayToken')
    .setTokenSymbol('DDT')
    .setTreasuryAccountId(accountId)
    .setAutoRenewAccountId(accountId)
    .setAutoRenewPeriod(7776000)
    .setInitialSupply(400)
    .setDecimals(0)
    .setSupplyKey(supplyKey)
    .freezeWithSigner(signer)

  // Execute transaction with signer
  const tokenCreateSubmit = await tokenCreateTx.executeWithSigner(signer)

  // Get receipt with signer (HashConnect v3 method)
  const tokenCreateRx = await tokenCreateSubmit.getReceiptWithSigner(signer)

  const tId = tokenCreateRx.tokenId
  const supply = tokenCreateTx._initialSupply.low
  console.log(`- Created HTS token with ID: ${tId}`)

  return [tId, supply, tokenCreateSubmit.transactionId]
}

export default tokenCreateFcn
