import bytecode from './bytecode.js'
import {
  FileCreateTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters,
  AccountId,
} from '@hashgraph/sdk'

async function contractDeployFcn(walletData, accountId, tokenId) {
  console.log(`\n=======================================`)
  console.log(`- Deploying smart contract on Hedera...`)

  const hashconnect = walletData[0]

  const accountIdObj =
    typeof accountId === 'string' ? AccountId.fromString(accountId) : accountId
  const signer = hashconnect.getSigner(accountIdObj)

  //Create a file on Hedera and store the hex-encoded bytecode
  const fileCreateTx = await new FileCreateTransaction()
    .setContents(bytecode)
    .freezeWithSigner(signer)

  const fileSubmit = await fileCreateTx.executeWithSigner(signer)

  // Get receipt with signer (HashConnect v3 method)
  const fileCreateRx = await fileSubmit.getReceiptWithSigner(signer)

  const bytecodeFileId = fileCreateRx.fileId
  console.log(`- The smart contract bytecode file ID is: ${bytecodeFileId}`)

  // Create the smart contract
  const contractCreateTx = await new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setGas(3000000)
    .setConstructorParameters(
      new ContractFunctionParameters().addAddress(tokenId.toSolidityAddress())
    )
    .freezeWithSigner(signer)

  const contractCreateSubmit = await contractCreateTx.executeWithSigner(signer)

  // Get receipt with signer (HashConnect v3 method)
  const contractCreateRx = await contractCreateSubmit.getReceiptWithSigner(
    signer
  )

  const cId = contractCreateRx.contractId
  const contractAddress = cId.toSolidityAddress()
  console.log(`- The smart contract ID is: ${cId}`)
  console.log(
    `- The smart contract ID in Solidity format is: ${contractAddress} \n`
  )

  return [cId, contractCreateSubmit.transactionId]
}
export default contractDeployFcn
