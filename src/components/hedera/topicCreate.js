import { TopicCreateTransaction, AccountId } from '@hashgraph/sdk'

async function createTopicFcn(walletData, accountId) {
  console.log(`\n=======================================`)
  console.log(`- Creating new HCS topic...`)

  const hashconnect = walletData[0]
  const saveData = walletData[1]

  // Get signer using the new HashConnect v3 method
  // Handle accountId whether it's a string or AccountId object
  const accountIdObj =
    typeof accountId === 'string' ? AccountId.fromString(accountId) : accountId
  const signer = hashconnect.getSigner(accountIdObj)

  // Create and execute topic creation transaction
  const topicCreateTx = await new TopicCreateTransaction()
    .setAutoRenewAccountId(accountIdObj)
    .freezeWithSigner(signer)

  const topicCreateSubmit = await topicCreateTx.executeWithSigner(signer)

  // Get receipt with signer (HashConnect v3 method)
  const topicCreateRx = await topicCreateSubmit.getReceiptWithSigner(signer)

  const topicId = topicCreateRx.topicId

  console.log(`- Created topic with ID: ${topicId.toString()}`)

  return [topicId, topicCreateSubmit.transactionId]
}

export default createTopicFcn
