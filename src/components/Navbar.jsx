import '../styles/Navbar.css'

function Navbar({
  accountId,
  connectTextSt,
  connectLinkSt,
  onConnectWallet,
  onDisconnectWallet,
}) {
  const isConnected = accountId !== undefined

  const handleDisconnect = () => {
    if (onDisconnectWallet) {
      onDisconnectWallet()
    }
  }

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <div className='logo'>
          <div className='symbol'>
            <svg
              id='Layer_1'
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 40 40'
            >
              <path
                d='M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0'
                className='circle'
              ></path>
              <path
                d='M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z'
                className='h'
              ></path>
            </svg>
          </div>
          <span>RentChain</span>
        </div>
      </div>

      <div className='navbar-actions'>
        {isConnected ? (
          <div className='wallet-connected'>
            <div className='account-info'>
              <span className='account-text'>
                🔌 Account {accountId} connected ⚡ ✅
              </span>
              {connectLinkSt && (
                <a
                  href={connectLinkSt}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='account-link'
                >
                  View on HashScan
                </a>
              )}
            </div>
            <button className='disconnect-btn' onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className='connect-btn' onClick={onConnectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
