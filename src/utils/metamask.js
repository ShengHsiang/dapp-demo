import detectEthereumProvider from '@metamask/detect-provider'

export const getSelectedAddress = async () => {
  try {
    const provider = await detectEthereumProvider()
    return provider ? await provider.selectedAddress : null
  } catch (error) {
    return null
  }
}

export const connect = async () => {
  const provider = await detectEthereumProvider()

  // await provider.request({
  //   method: 'wallet_requestPermissions',
  //   params: [{ eth_accounts: {} }],
  // })
  if (provider) {
    await provider.request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {} }]
    })
    return provider
  } else {
    alert('Please install MetaMask!')
    throw new Error('No provider found')
  }
}
