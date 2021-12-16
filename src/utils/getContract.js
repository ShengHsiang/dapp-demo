import Web3 from 'web3'

export const getContract = async (address, abi) => {
  try {
    const web3 = await new Web3(window.ethereum)
    const nftContract = await new web3.eth.Contract(abi, address)

    return nftContract
  } catch (error) {
    console.log(error)
  }
}
