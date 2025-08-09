import { TopicMessageSubmitTransaction, AccountId } from '@hashgraph/sdk'

async function submitTopicMessageFcn(walletData, accountId, topicId) {
  console.log(`\n=======================================`)
  console.log(`- Submitting message to HCS topic...`)

  const hashconnect = walletData[0]
  const saveData = walletData[1]

  // Get signer using the new HashConnect v3 method
  // Handle accountId whether it's a string or AccountId object
  const accountIdObj =
    typeof accountId === 'string' ? AccountId.fromString(accountId) : accountId
  const signer = hashconnect.getSigner(accountIdObj)

  // Create and execute topic message submission transaction
  const submitMessageTx = await new TopicMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage('Hello, HCS!')
    .freezeWithSigner(signer)

  const messageSubmit = await submitMessageTx.executeWithSigner(signer)

  // Get receipt with signer (HashConnect v3 method)
  const submitMessageRx = await messageSubmit.getReceiptWithSigner(signer)

  console.log(
    `- Submitted message to topic ${topicId.toString()}: ${
      submitMessageRx.status
    }`
  )

  return [messageSubmit.transactionId]
}

export default submitTopicMessageFcn
