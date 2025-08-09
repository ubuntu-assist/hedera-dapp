import { HashConnect, HashConnectConnectionState } from 'hashconnect'
import { LedgerId } from '@hashgraph/sdk'

async function walletConnectFcn() {
  console.log(`\n=======================================`)
  console.log('- Connecting wallet...')

  let saveData = {
    pairingData: null,
    pairedAccounts: [],
    connectionState: HashConnectConnectionState.Disconnected,
  }

  const appMetadata = {
    name: 'RentChain',
    description: 'Rent Without Stress, Pay With Progress',
    icons: [''],
    url: 'https:rentchain.xyz',
  }

  const hashconnect = new HashConnect(
    LedgerId.TESTNET,
    import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    appMetadata,
    true
  )

  // Set up event listeners before initialization
  setUpHashConnectEvents(hashconnect, saveData)

  // Initialize HashConnect
  const initData = await hashconnect.init()
  console.log('- HashConnect initialized')

  // Open pairing modal to connect with wallets
  hashconnect.openPairingModal()
  console.log('- Pairing modal opened')

  return [hashconnect, saveData]
}

function setUpHashConnectEvents(hashconnect, saveData) {
  // Handle successful pairing
  hashconnect.pairingEvent.on((newPairing) => {
    console.log('- Wallet paired successfully!')
    console.log('- Paired accounts:', newPairing.accountIds)
    saveData.pairingData = newPairing
    saveData.pairedAccounts = newPairing.accountIds
  })

  // Handle disconnection
  hashconnect.disconnectionEvent.on((data) => {
    console.log('- Wallet disconnected')
    saveData.pairingData = null
    saveData.pairedAccounts = []
  })

  // Handle connection status changes
  hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
    console.log('- Connection status:', connectionStatus)
    saveData.connectionState = connectionStatus
  })
}

export default walletConnectFcn
