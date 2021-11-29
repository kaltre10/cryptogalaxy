import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import nft from '../img/nft/cat-miner.svg'
import nft2 from '../img/nft/explorer.svg'
import nft4 from '../img/nft/factory.svg'
import nft5 from '../img/nft/refinery.svg'
import Loading from '../components/loading';
import axios from 'axios';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import glxAbi from '../token/glxAbi'

const mainnetProvider = ""
const testnetProvider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const contractOuner = "0x7daf5a75c7b3f6d8c5c2b53117850a5d09006168"
const web3 = new Web3(testnetProvider)
const glxContract = new web3.eth.Contract(glxAbi, contractOuner)

const Market = () => {

    const [wallet, setWallet] = useState('')
    const [user, setUser] = useState({})
    const [bnb, setBnb] = useState(10)
    const [glx, setGlx] = useState(10)

    //Loading, alerts and errors
    const [loading, setLoading] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const [errorToasText, setErrorToastText] = useState("")
    const [infoToast, setInfoToast] = useState(false)
    const [infoToasText, setInfoToastText] = useState("")
    function getErrorToast(bool, message) { setErrorToast(bool); setErrorToastText(message) }
    function getInfoToasText(val) { setInfoToastText(val); setInfoToast(true) }
    function closeAlert() { setErrorToast(false) }
    function closeInfo() { setInfoToast(false) }
    //end Loading, alerts and errors

    window.ethereum.on('chainChanged', async (chainId) => {
        switchChain()
    }
        //window.location.href = './login'
    );

    useEffect(() => {
        switchChain()
        connection()
        getUser()
        getBnb()
        getGlx()
    }, [])

    async function getGlx() {
        glxContract.methods.balanceOf(contractOuner).call().then((res) => {
            setGlx(web3.utils.fromWei(res, 'ether'))
        })
    }

    async function getBnb() {
        const accounts = await window.ethereum.request({ "method": "eth_requestAccount" })
        const account = accounts[0]
        setBnb(456)
    }

    async function getUser() {
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0].toLowerCase()
        const user = await axios.get("http://localhost:4000/api/v1/user/" + account)
        //console.log("user: +"+user.data[0].wallet)
        setUser(user.data[0])
    }

    async function switchChain() {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x61" }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function buyNFTDbUpdate(txHash, num) {
        //alert(num + " " + txHash)
        const hash = txHash
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0]
        const wallet = account.toLowerCase()
        const buyShip = await axios.put("http://localhost:4000/api/v1/buyship", { wallet, hash })
        console.log(buyShip.data)
        //console.log("Transaction hash:" + hash)
        getUser()
        setLoading(false)
    }

    async function buyNFT(num) {

        switchChain()
        setLoading(true)

        console.log("Transfer from: " + wallet + " to:" + contractOuner)

        //getWallet
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0]

        await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: account,
                        to: contractOuner,
                        value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                    },
                ],
            })
            .then((txHash) => {
                setLoading(false)
                buyNFTDbUpdate(txHash, num)
                getInfoToasText("Transaction hash: " + txHash)
                console.log("Transaction hash: " + txHash)
            })
            .catch((error) => {
                setLoading(false)
                getErrorToast(true, error.message)
                alert("Error: " + error.message)
            })
    }

    async function connection() {
        try {

            const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
            const account = accounts[0]
            var uper = account.toLowerCase()
            setWallet(account)
            //console.log("Account: "+uper)
            const walletObj = { wallet: uper }
            //console.log(walletObj)
            axios.post("http://localhost:4000/api/v1/auth", walletObj).then((res) => {
                //console.log("Res data: "+res.data.user.wallet)
            }).catch(err => alert(err.message))

        } catch (error) {
            alert("Connection error: " + error.message)
            window.location.href = "./login"
        }
    }

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-planet">
                <Navbar connect={connection} wallet={wallet} />

                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        <Sidebar GetUser={getUser} user={user} bnb={bnb} glx={glx} />
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="container-fluid w-market-container">

                            <Loading load={loading} />

                            {errorToast ?
                                <div className="alert alert-warning alert-dismissible d-flex justify-content-between">
                                    <div>
                                        <strong>Error! </strong> {errorToasText}
                                    </div>
                                    <button onClick={closeAlert} className="btn btn-warning" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                : <div></div>

                            }
                            {infoToast ?
                                <div className="alert alert-success alert-dismissible d-flex justify-content-between">
                                    <div>
                                        <strong>Success! </strong>{infoToasText}
                                    </div>
                                    <button onClick={closeInfo} className="btn btn-success" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                : <div></div>
                            }

                            <div className="row">
                                <div className="col-12">
                                    <div className="row p-4 gx-2">

                                        <div className="col-12 col-sm-6 col-xl-3 ">
                                            <div className="nft">
                                                <div className="img">
                                                    <img className="nft-image w-100" src={nft} />
                                                </div>
                                                <div className="row pt-1 gx-0">
                                                    <div className="col-6">
                                                        <h4 className="name-nft m-0 p-0">Cat-Miner</h4>
                                                        <p className="m-0 price p-0"> 0.01 BNB</p>
                                                    </div>
                                                    <div className="col-6">
                                                        {loading ?
                                                            <button className="btn bg-secondary px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => { buyNFT(0) }} className="btn bg-success form-control text-white">Buy</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-xl-3">
                                            <div className="nft">
                                                <div className="img">
                                                    <img className="nft-image w-100" src={nft2} />
                                                </div>
                                                <div className="row pt-1 gx-1">
                                                    <div className="col-6">
                                                        <h4 className="name-nft m-0 p-0">Explorer</h4>
                                                        <p className="m-0 price p-0"> 0.01 BNB</p>
                                                    </div>
                                                    <div className="col-6 ">
                                                        <button className="btn bg-secondary form-control text-white">Buy</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-xl-3">
                                            <div className="nft">
                                                <div className="img">
                                                    <img className="nft-image w-100" src={nft4} />
                                                </div>
                                                <div className="row pt-1 gx-1">
                                                    <div className="col-6">
                                                        <h4 className="name-nft m-0 p-0">Factory</h4>
                                                        <p className="m-0 price p-0"> 0.01 BNB</p>
                                                    </div>
                                                    <div className="col-6 ">
                                                        <button className="btn bg-secondary form-control text-white">Buy</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-xl-3">
                                            <div className="nft">
                                                <div className="img">
                                                    <img className="nft-image w-100" src={nft5} />
                                                </div>
                                                <div className="row pt-1 gx-1">
                                                    <div className="col-6">
                                                        <h4 className="name-nft m-0 p-0">Refinery</h4>
                                                        <p className="m-0 price p-0"> 0.01 BNB</p>
                                                    </div>
                                                    <div className="col-6 ">
                                                        <button className="btn bg-secondary form-control text-white">Buy</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}


export default Market