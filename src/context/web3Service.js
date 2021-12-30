import Web3 from 'web3'
import glxAbi from '../token/glxAbi';

export const testnetProvider = "https://data-seed-prebsc-1-s1.binance.org:8545/"
export const mainnetContractAbiGlx = "0x78f959923Ed10Af70729fa020C16Bd66AEE10083"
export const mainnetProvider = 'https://bsc-dataseed.binance.org/'
export const web3 = new Web3(mainnetProvider)
export const eth = window.ethereum;
export const mycontract = new web3.eth.Contract(glxAbi, mainnetContractAbiGlx)
export const contractOwner = "0x7daf5a75c7b3f6d8c5c2b53117850a5d09006168"