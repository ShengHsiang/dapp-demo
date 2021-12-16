import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import { connect, getSelectedAddress } from '@/utils/metamask'
import { getContract } from '@/utils/getContract'
import { address, ABI } from '@/utils/constants/nftContract'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    selectedAddress: null,
    balance: null,
    contractInstance: null
  },
  getters: {
    getSelectedAddress: state => {
      return state.selectedAddress
    }
  },
  mutations: {
    setSelectedAddress (state, selectedAddress) {
      state.selectedAddress = selectedAddress
    },
    setBalance (state, balance) {
      state.balance = balance
    },
    registerContractInstance (state, contractInstance) {
      state.contractInstance = contractInstance
    }
  },
  actions: {
    async initialize ({ dispatch, commit }) {
      try {
        const selectedAddress = await dispatch('setSelectedAddress')
        if (selectedAddress) {
          dispatch('initialWallet')
          dispatch('getContractInstance')
        }
      } catch (error) {
        console.error(error)
      }
    },
    async connectToMetamask ({ dispatch, commit }) {
      try {
        await connect()
        await dispatch('setSelectedAddress')
        await dispatch('initialWallet')
        await dispatch('getContractInstance')
      } catch (error) {
        console.log(error)
      }
    },
    async setSelectedAddress ({ commit }) {
      const selectedAddress = await getSelectedAddress()
      commit('setSelectedAddress', selectedAddress)
      return selectedAddress
    },
    async initialWallet ({ commit, state }) {
      const web3 = await new Web3(window.ethereum)
      const balance = await web3.eth.getBalance(state.selectedAddress)
      const balanceInEther = await web3.utils.fromWei(balance, 'ether')
      commit('setBalance', balanceInEther)
    },
    getContractInstance ({ commit }) {
      const contractfunc = () => getContract(address, ABI)
      commit('registerContractInstance', contractfunc)
    }
  }
})
