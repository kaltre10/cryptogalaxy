import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import Web3 from 'web3'
import bnbLogo from '../img/assets/bnb.svg'
import gem from '../img/gems.svg'
import logo from '../img/logo-planet.svg'
import arrow from '../img/arrow.svg'
import Modal from 'react-bootstrap/Modal'

const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

const web3 = new Web3(provider)

function Sidebar(props) {
    //const [modalX, setModal] = useState(true)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const [gemBalance, setGemBalance] = useState(0)

    const [wallet, setWallet] = useState('')

    function handleShow() {
        setShow(true)
    }
   /*  function handleShow2() {
        setShow(true)
        setModal(false)
    } */


    /* function changeModalState(s) {
        return
    }
    function gem1() {
        alert("Coming soon... ;)")
    } */


    function buy3000Gm(){
        alert("buy 3000")
    }

    async function buy1000Gm() {

       // onChargeX()

        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        setWallet(accounts[0])
        console.log(wallet)
        window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: wallet,
                        to: '0x7daF5a75C7B3f6d8c5c2b53117850a5d09006168',
                        value: web3.utils.toHex(web3.utils.toWei('0.03', 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('8', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('21000', 'wei')),
                    },
                ],
            })
            .then((txHash) => console.log("Transaction hash:"+txHash))
            .catch((error) => console.log(error));
    }



    return (
        <div className="sidebar">
            <div className="flex-column text-white sidebar-w">
                <div className="w-market">
                    <Link to="/market" className="btn btn-wallet form-control">Market</Link>
                </div>
                <ul className="nav nav-pills flex-column mb-auto">
                <li>
                        <Link to="/inventory" className="nav-button">
                            ► Inventory
                        </Link>
                    </li>
                    <li>
                        <Link to="/planets" className="nav-button">
                            ► Planets
                        </Link>
                    </li>
                    <li>
                        <Link to="/expeditions" className="nav-button">
                            ► Expeditions
                        </Link>
                    </li>
                    <li>
                        <Link to="/factory" className="nav-button">
                            ► Factory
                        </Link>
                    </li>
                    <li>
                        <Link to="/refinery" className="nav-button">
                            ► Refinery
                        </Link>
                    </li>
                    <li>
                        <Link to="/transactions" className="nav-button">
                            ► Transactions
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-balance pb-3">
                    <ul className="nav flex-column">
                        <li>
                            <img className="logo-sidebar" src={bnbLogo} />
                            {props.bnbBalance}
                        </li>
                        <li>
                            <img className="logo-sidebar" src={logo} />
                            {props.glxBalance}
                        </li>
                        <li>
                            <img className="logo-sidebar" src={gem} />
                            {props.gemBalance}
                        </li>
                        <li>
                          {/*   <button onClick={props.mas}>+</button>
                            <button onClick={props.menos}>-</button> */}


                        </li>
                        <div className="w-gems mt-4">
                            <h4 className="text-white text-center">Exchange</h4>

                            <div onClick={handleShow} className="gems-exchange d-flex justify-content-between">

                                <div className="d-inline-block">
                                    <img className="img-gem" src={bnbLogo} />
                                </div>
                                <div className="d-inline-block">
                                    <img className="img-gem" src={arrow} />
                                </div>
                                <div className="d-inline-block">
                                    <img className="img-gem" src={gem} />
                                </div>
                            </div>

                            <Modal className="bg-modal" show={show} onHide={handleClose}>
                                <Modal.Header className="modal-w text-white hr-modal" closeButton>
                                    <Modal.Title>
                                        <div className="d-flex justify-content-between w-100">
                                            {/* {modalX ?
                                                <div>
                                                    <div className="d-inline-block">
                                                        <img className="img-gem" src={gem} />
                                                    </div>
                                                    <div className="d-inline-block mx-3">
                                                        <img className="img-gem" src={arrow} />
                                                    </div>
                                                    <div className="d-inline-block">
                                                        <img className="img-gem" src={logo} />
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <div className="d-inline-block">
                                                        <img className="img-gem" src={logo} />
                                                    </div>
                                                    <div className="d-inline-block mx-3">
                                                        <img className="img-gem" src={arrow} />
                                                    </div>
                                                    <div className="d-inline-block">
                                                        <img className="img-gem" src={gem} />
                                                    </div>
                                                </div>
                                            } */}
                                            <div>
                                                <div className="d-inline-block">
                                                    <img className="img-gem" src={bnbLogo} />
                                                </div>
                                                <div className="d-inline-block mx-3">
                                                    <img className="img-gem" src={arrow} />
                                                </div>
                                                <div className="d-inline-block">
                                                    <img className="img-gem" src={gem} />
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="modal-w text-center">


                                    {/*   {modalX ?
                                        <h4 className="text-white"> 1 GLX = 1 GM</h4>
                                    } */}

                                    <h4 className="text-white">1000 GM = 0.03 BNB</h4>
                                    <div className="modal-w py-4 d-flex justify-content-center">
                                    <div className="border p-3 m-2">
                                            <div className="text-center">
                                                <img height="50px" src={gem} alt="" />
                                            </div>
                                            <div className="text-white text-center mb-3">
                                                Gem Pack (1000 GM)
                                            </div>
                                            <button className="btn btn-success px-4" onClick={buy1000Gm}>
                                            Buy 1000 GM
                                        </button>
                                        </div>
                                        <div className="border p-3 m-2">
                                            <div className="text-center">
                                                <img height="50px" src={gem} alt="" />
                                            </div>
                                            <div className="text-white text-center mb-3">
                                                Gem Pack (3000 GM)
                                            </div>
                                            <button className="btn btn-success px-4" onClick={buy3000Gm}>
                                            Buy 3000 GM
                                        </button>
                                        </div>
                                    </div>

                                    {/* <div className="row mt-3">
                                        <div className="col-2 text-center">
                                            {modalX ?
                                                <img className="logo-modal" src={gem} /> : <img className="logo-modal" src={logo} />
                                            }

                                        </div>
                                        <div className="col-10">
                                            <input className="form-control input-modal" placeholder="0" type="number" />
                                            <p className="text-danger">! Error message...</p>
                                        </div>
                                    </div>
                                    <div className="row mt-1">
                                        <div className="col-12 text-center" >
                                            <h3 className="text-white">↓</h3>
                                        </div>
                                    </div>
                                    <div className="row mt-1">
                                        <div className="col-2 text-center">
                                            {modalX ?
                                                <img className="logo-modal" src={logo} /> : <img className="logo-modal" src={gem} />
                                            }
                                        </div>
                                        <div className="col-10">
                                            <input className="form-control input-modal" placeholder="0" type="number" />
                                        </div>
                                    </div> */}

                                </Modal.Body>
                                <Modal.Footer className="modal-w text-center">
                                    <div className="text-center w-100">
                                        
                                    </div>
                                </Modal.Footer>
                            </Modal>



                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar