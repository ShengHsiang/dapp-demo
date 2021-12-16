<template>
  <div class="h-screen bg-gray-800">
    <header class="h-14 bg-gray-900 flex justify-between items-center px-8">
      <h1 class="text-white text-2xl">Dapp</h1>
      <button
        @click="handleConnectWallet"
        class="rounded bg-blue-500 px-4 py-2"
      >
        connect wallet
      </button>
    </header>
    <section class="text-white p-8">
      <p>{{ `account: ${selectedAddress}` }}</p>
      <p>{{ `balance: ${balance}` }}</p>

      <button @click="apporve" class="rounded bg-blue-500 px-4 py-2 mt-8">
        buy NFT
      </button>
    </section>
  </div>
</template>

<script>
import Web3 from 'web3'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState({
      selectedAddress: (state) => state.selectedAddress,
      balance: (state) => state.balance,
      contract: (state) => state.contractInstance
    })
  },
  async beforeCreate () {
    await this.$store.dispatch('initialize')
  },
  methods: {
    handleConnectWallet () {
      this.$store.dispatch('connectToMetamask')
    },
    async apporve () {
      'use strict'
      try {
        if (!this.selectedAddress) return
        const web3 = new Web3(window.ethereum)
        const price = web3.utils.toWei('0.01', 'ether')
        const contract = await this.contract()

        const result = await contract.methods
          .mintNFTOnSecondPhase(web3.utils.toBN('1'))
          .send({
            from: this.selectedAddress,
            value: price
          })

        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
