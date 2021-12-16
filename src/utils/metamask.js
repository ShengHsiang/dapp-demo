import detectEthereumProvider from '@metamask/detect-provider'

const isExtensionIntstalled = async () => {
  const provider = await detectEthereumProvider()

  if (provider) {
    return true
  } else {
    return false
  }
}

export const getSelectedAddress = async () => {
  const provider = await detectEthereumProvider()
  return isExtensionIntstalled() ? await provider.selectedAddress : null
}

export const connect = async () => {
  const provider = await detectEthereumProvider()

  if (!isExtensionIntstalled()) return alert('Please install MetaMask!')

  // await provider.request({
  //   method: 'wallet_requestPermissions',
  //   params: [{ eth_accounts: {} }],
  // })
  await provider.request({
    method: 'eth_requestAccounts',
    params: [{ eth_accounts: {} }]
  })

  return provider
}
