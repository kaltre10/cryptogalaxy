import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import logo from '../img/logoglx.svg';
import arrow from '../img/arrow.svg';
import Modal from 'react-bootstrap/Modal';
import Web3 from 'web3'
import axios from 'axios';
import urlApi from '../urlApi';
import { DataContext } from '../context/DataContext';

const contractOuner = "0x7daF5a75C7B3f6d8c5c2b53117850a5d09006168"
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(provider)

const LinksN = ()=>{

    const { Toast, glx, connectOrRegister, bnb, user, loading, stateLoading } = useContext(DataContext)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const [bnbBalance, setBnbBalance] = useState(0)
    const [gmBalance, setGmBalance] = useState(0)

    const [stateSwapBtn, setStateSwapBtn] = useState(false)
    const [minimun, setMinimun] = useState(false)

    async function buyGm() {
        stateLoading(true)
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        await window.ethereum
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
                /* console.log("Este el el Hash de la transaccion: " + txHash)
                getInfoToasText("Transaction hash: " + txHash)
                console.log("Cantidad de Gemas: " + amount) /*/
                const amount = bnbBalance*100000
                const hash = txHash
                const account = accounts[0]
                const wallet = account.toLowerCase()
                const getGm = await axios.put(urlApi + "/api/v1/buygm", { wallet, amount, hash })

                console.log("Buy gm: " + getGm.data);

                console.log("Transaction hash:" + hash);
                setShow(false)
                stateLoading(false);
                connectOrRegister()

            })
            .catch((error) => {
                stateLoading(false);
                console.log("Ocurrio el siguiente error: " + error.message)
            }) 
    }

    const roundBnb = (bnb) => {
        return (Math.round(bnb * 10000)) / 10000
    }

    const calcBNBToGM = (e) => {
        const bnbC = e.target.value
        const gmC = bnbC * 100000
        setBnbBalance(bnbC)
        setGmBalance(gmC)

        compareSwapBtn(bnbC)

        //console.log(e.target.value)
    }

    const compareSwapBtn = (bnb) => {
        console.log(bnb)
        if (bnb >= 0.005) {
            setStateSwapBtn(true)
            setMinimun(false)
        } else {
            setMinimun(true)
            setStateSwapBtn(false)
        }

    }

    return(
        <>
        <ul className="nav nav-pills flex-column mb-auto">
                            
                            <li>
                                <Link to="/inventory" className="nav-button">
                                    • Inventory
                                </Link>
                            </li>
                            <li>
                                <Link to="/planet" className="nav-button">
                                    • Planets
                                </Link>
                            </li>
                            <li>
                                <Link to="/invaders" className="nav-button ">
                                    • Invaders
                                </Link>
                            </li>
                            <li>
                                <Link to="/refinery" className="nav-button ">
                                    • Refinery
                                </Link>
                            </li>
                            <li>
                                <Link to="/factory" className="nav-button ">
                                    • Factory
                                </Link>
                            </li>
                        </ul>
                        <div className="sidebar-balance pb-3">
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <img className="logo-sidebar" src={bnbLogo} alt="" /> {roundBnb(bnb)}
                                </div>
                                <div className="">
                                    <img className="logo-sidebar" src={logo} alt="" /> {glx}
                                </div>
                                <div className="">
                                    <img className="logo-sidebar" src={gem} alt="" /> {user.gm}
                                </div>
                            </div>
                            <div className="w-gems mt-4">
                                <h4 className="text-white text-center">Swap </h4>

                                <div onClick={() => { setShow(true) }} className="gems-exchange d-flex justify-content-between">

                                    <div className="d-inline-block">
                                        <img alt="" className="img-gem" src={bnbLogo} />
                                    </div>
                                    <div className="d-inline-block">
                                        <img alt="" className="img-gem" src={arrow} />
                                    </div>
                                    <div className="d-inline-block">
                                        <img alt="" className="img-gem" src={gem} />
                                    </div>
                                </div>

                            </div>
                        </div>






                        <Modal className="bg-modal" show={show} onHide={handleClose}>
                <Modal.Header className="modal-w text-white hr-modal" closeButton>
                    <Modal.Title className='w-100'>
                        <div className='text-center'>
                            <h3 className='text-white'>Swap</h3>
                            <div className='fee text-gray'>
                                Buy GM with bnb
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="">

                    <div className="py-4">
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
                            <div>
                                Balance: {bnb}
                            </div>
                        </div>
                        <div className='swap'>
                            <input onChange={calcBNBToGM} type="text" className='inputSwap' placeholder={bnb} name="" id="" />
                        </div>
                        <div className='text-center'>
                            {minimun ? <div className='text-danger'>Minimun 0.005 BNB</div> : <></>}
                        </div>
                    </div>
                    <div className='d-flex  justify-content-center'>
                        <div className='flechita '>
                            ↓
                        </div>
                    </div>
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
                            Balance: {user.gm}
                        </div>
                    </div>
                    <div className='swap'>
                        <input value={gmBalance} type="text" className='inputSwap' placeholder='1333' name="" id="" />
                    </div>
                    <div className='text-center mt-2'>
                        0.00001 BNB per GM
                    </div>
                    {loading ? <button className='swapBtn-dis'>
                        <div className="spinner-border"></div>
                    </button> : <>
                        {stateSwapBtn ? <>
                            <button onClick={buyGm} className='swapBtn'> Swap </button>
                        </> : <>
                            <button className='swapBtn-dis'> Swap </button>
                        </>}
                    </>
                    }

                    {/* <div className="p-4 w-buy-gm m-2">
                            <div className="text-center">
                                <img height="50px" src={gem} alt="" />
                            </div>
                            <div className="mb-2">
                                1000 GM - 0.01 BNB
                            </div>
                            {loading ? <>
                                <button className="btn btn-secondary px-4" >
                                    <div class="spinner-border" role="status"></div>
                                </button>
                            </> : <>
                                <button onClick={() => buyGm(1)} className="btn btn-success px-4" >
                                    Buy
                                </button>
                            </>}
                        </div> */}

                    {/* <div className="p-4 w-buy-gm m-2">
                            <div className="text-center">
                                <img height="50px" src={gem} alt="" />
                            </div>
                            <div className="mb-2">
                                3000 gm - 0.028 BNB
                            </div>
                            {loading ? <>
                                <button className="btn btn-secondary px-4" >
                                    <div class="spinner-border" role="status"></div>
                                </button>
                            </> : <>
                                <button onClick={() => buyGm(2)} className="btn btn-success px-4" >
                                    Buy
                                </button>
                            </>}
                        </div> */}

                </Modal.Body>
            </Modal>
        </>
    )
}
export default LinksN