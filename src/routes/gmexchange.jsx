import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import logo from '../img/logoglx.svg';
import arrow from '../img/arrow.svg';
import Modal from 'react-bootstrap/Modal';
import Web3 from 'web3'
import axios from 'axios';
import urlApi from '../urlApi';

const Gmexchange = () => {

    const contractOuner = "0x7daF5a75C7B3f6d8c5c2b53117850a5d09006168"
    const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    const web3 = new Web3(provider)

    const { Toast, sendTransaction, connectOrRegister, user, loading, stateLoading } = useContext(DataContext)

    const [bnbBal, setBnbBal] = useState(0)
    const [gm, setGm] = useState(0)

    const [gmOnSell, setgmOnSell] = useState([])

    const getGmOnSell = async (x) => {
        stateLoading(true)
        const arrayGm = await axios.get(urlApi + '/api/v1/getGmOnSell/' + x)
        stateLoading(false)
        setgmOnSell(arrayGm.data)
    }

    /* const getMyGMSells = ()=>{

    } */

    useEffect(() => {
        getGmOnSell("")
    }, [])


    const flor = num => Math.floor(num * 100000) / 100000

    async function buyGm() {
        stateLoading(true)
        const to = "0x20a4dabc7c80c1139ffc84c291af4d80397413da"
        const value = "0.0012"
        sendTransaction({ to, value }).then((res) => {
            console.log(res)
        }).finally(() => {
            Toast(1, 123123)
            stateLoading(false)
        })
        /*  await window.ethereum
             .request({
                 method: 'eth_sendTransaction',
                 params: [
                     {
                         from: accounts[0],
                         to: contractOuner,
                         value: web3.utils.toHex(web3.utils.toWei(bnbBalance, 'ether')),
                         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                         gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                     },
                 ],
             })
             .then(async (txHash) => {
 
                 const amount = bnbBalance * 100000
                 const hash = txHash
                 const account = accounts[0]
                 const wallet = account.toLowerCase()
                 const getGm = await axios.put(urlApi + "/api/v1/buygm", { wallet, amount, hash })
 
                 console.log("Buy gm: " + getGm.data);
 
                 console.log("Transaction hash:" + hash);
               
                 stateLoading(false);
                 connectOrRegister()
 
             })
             .catch((error) => {
                 stateLoading(false);
                 console.log("Ocurrio el siguiente error: " + error.message)
             }) */
    }

    const calcGm = (e) => {
        const gmC = e.target.value
        setGm(gmC)
    }

    const calcBnb = (e) => {
        const bnb = e.target.value
        setBnbBal(bnb)
    }

    const sellGm = async () => {
        if (user.gm < gm) {
            Toast(0, "Insuficient GM Balance!")
        } else {
            stateLoading(true)
            const price = (Math.floor((bnbBal / gm) * 10000000)) / 10000000
            axios.post(urlApi + "/api/v1/sellGm", {
                gm,
                bnb: bnbBal,
                wallet: user.wallet,
                timeSell: Date.now(),
                price
            }).then((res) => {
                Toast(1, "Success!")
                console.log(res.data)
            }).catch((err) => {
                Toast(0, err.message)
                console.log(err.message)
            }).finally(() => {
                stateLoading(false)
                connectOrRegister()
                getGmOnSell("")
            })
        }
    }

    const removeSellGm = (item) => {
        stateLoading(true)
        console.log(item)
        axios.put(urlApi + "/api/v1/removeSellGm", item)
            .then((res) => {
                Toast(1, res.data.msg)
            }).catch(err => console.log(err.message))
            .finally(_ => {
                stateLoading(false)
                connectOrRegister()
                getGmOnSell("")
            })
            
    }

    const directBuy = async (item) => {
        stateLoading(true)
        //console.log(item)
        //consulto si existe la venta
        const consult = await axios.put(urlApi + "/api/v1/gmdisponible/", item)
        if (consult.data.res) {
            //envio mi formulario de compra
            const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
            const from = await accounts[0]
            const to = item.wallet
            const ammount = item.bnb.toString()

            await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from,
                            to,
                            value: web3.utils.toHex(web3.utils.toWei(ammount, 'ether')),
                            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                            gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                        }
                    ]
                })
                .then(async (txHash) => {
                    axios.put(urlApi + "/api/v1/aproveGm", {
                        txHash, item,buyer:from
                    })
                        .then((res) => {
                            Toast(1, res.data.msg)
                            console.log(res.data.txHash)
                        }).catch((error) => {
                            console.log(error)
                            Toast(0, error.message)
                        }).finally(_=>{
                            connectOrRegister()
                            getGmOnSell("")
                        })
                })
                .catch((err) => {
                    console.log(err.message)
                }).finally(async () => {
                    await connectOrRegister()
                    getGmOnSell("")
                    stateLoading(false)
                })

        } else {
            Toast(0, "No disponoible")
        }
    }


    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">
                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar />
                    </div>
                    <div className="col-12 col-md-9 p-0 w-market-container">
                        <div className="bg-exchange bg-dark m-2 rad-8">
                            <div className="rad-8">
                                <div className="bg-black p-2 d-flex justify-content-between">
                                    <div className="">
                                        <h4 className="">Gems Exchange </h4>
                                    </div>
                                    <div className="">
                                        <button onClick={() => getGmOnSell("")} className="btn btn-success mx-2" > All Posts </button>
                                        <button onClick={() => getGmOnSell(user.wallet)} className="btn btn-primary "> My Posts </button>
                                    </div>
                                </div>
                                <div className="m-2">
                                    <div className="row gx-2" >
                                        <div className="col-12 col-md-5">
                                            <div className="bg-dark-trans rad-8 py-1 px-3 mb-2">
                                                <div className="">
                                                    <div className="mb-3">
                                                        <h3 className="text-center p-0 mb-2 " >Sell Gems</h3><hr></hr>
                                                    </div>

                                                </div>
                                                <div className="">
                                                    <div className='d-flex justify-content-between align-items-end mb-1'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='logo-bnb'>
                                                                <img height="28px" alt="" className="" src={gem} />
                                                            </div>
                                                            <div className=' mx-1'>
                                                                <h3>
                                                                    GM
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            Balance: {Math.floor(user.gm)}
                                                        </div>
                                                    </div>
                                                    <div className='swap'>
                                                        <input onChange={calcGm} type="text" className='inputSwap' placeholder='0' name="" id="" />
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-center mt-3'>
                                                    <div className='flechita '>
                                                        ↓
                                                    </div>
                                                </div>
                                                <div className="pb-4 ">
                                                    <div className='d-flex justify-content-between align-items-end mb-1'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='logo-bnb'>
                                                                <img height="28px" alt="" className="" src={bnbLogo} />
                                                            </div>
                                                            <div className=' mx-1'>
                                                                <h3>
                                                                    BNB
                                                                </h3>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='swap'>
                                                        <input onChange={calcBnb} type="text" className='inputSwap' name="" id="" />
                                                    </div>

                                                </div>
                                                <div className='text-center mt-2'>
                                                    {(Math.floor((bnbBal / gm) * 10000000)) / 10000000} BNB per GM
                                                </div>
                                                {loading ? <button className='swapBtn-dis'>
                                                    <div className="spinner-border"></div>
                                                </button> : <>
                                                    {bnbBal / gm !== Infinity && bnbBal / gm > 0 ? <>
                                                        <button onClick={sellGm} className='swapBtn'> Sell </button>
                                                    </> : <>
                                                        <button className='swapBtn-dis'> Sell </button>
                                                    </>}
                                                </>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-7">
                                            <div className="">
                                                <div className="bg-dark-trans rad-8 p-2 mb-2">
                                                    <h3 className="text-center">Direct Buy</h3>
                                                </div>

                                                {loading ? <>
                                                    <div className="text-center">
                                                        <div className="spinner-border"></div>
                                                    </div>
                                                </> : <>
                                                    {gmOnSell.map((item) => {
                                                        return (
                                                            < div key={item._id}>
                                                                {<div className="p-2 bg-trans-light mb-1 d-flex justify-content-between">
                                                                    <div className="">
                                                                        <div className="fee">
                                                                            {item.wallet}
                                                                        </div>
                                                                        <div className="">
                                                                            {item.gm}
                                                                            <img height="20px" src={gem} alt="" className="mx-2" />
                                                                            →
                                                                            <img height="20px" src={bnbLogo} alt="" className="mx-2" />
                                                                            {item.bnb}
                                                                            <div className="fee text-gray"> {item.price} BNB per GM </div>

                                                                        </div>
                                                                    </div>
                                                                    <div >
                                                                        {item.wallet === user.wallet ? <>
                                                                            <button onClick={() => removeSellGm(item)} className="btn btn-danger"> Remove - 3% </button>
                                                                        </> : <>
                                                                            <button onClick={() => directBuy(item)} className="btn btn-success"> Buy </button>
                                                                        </>}
                                                                    </div>
                                                                </div>}

                                                            </div>)
                                                    })
                                                    }
                                                </>}


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

export default Gmexchange