import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import logo from '../img/logo-planet.svg';
import arrow from '../img/arrow.svg';
import Modal from 'react-bootstrap/Modal';
import Web3 from 'web3'
import axios from 'axios';
import urlApi from '../urlApi';
const contractOuner = "0x7daF5a75C7B3f6d8c5c2b53117850a5d09006168"
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(provider)
const eth = window.ethereum;

function Sidebar(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    async function buyGm(id) {

        props.stateLoading(true)

        if (id == 1) {
            var price = "0.01"
            var amount = 1000
        } else if (id == 2) {
            var price = "0.028"
            var amount = 3000
        }

        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })

        await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: accounts[0],
                        to: contractOuner,
                        value: web3.utils.toHex(web3.utils.toWei(price, 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                    },
                ],
            })
            .then(async (txHash) => {
                /* console.log("Este el el Hash de la transaccion: " + txHash)
                getInfoToasText("Transaction hash: " + txHash)
                console.log("Cantidad de Gemas: " + amount) */

                const hash = txHash
                const account = accounts[0]
                const wallet = account
                const getGm = await axios.put(urlApi + "/api/v1/buygm", { wallet, amount, hash })
                
                console.log("Buy gm: "+getGm.data);

                console.log("Transaction hash:" + hash);
                setShow(false)
                props.stateLoading(false);
                props.connectOrRegister()

            })
            .catch((error) => {
                props.stateLoading(false);
                console.log("Ocurrio el siguiente error: " + error.message)
            })
    }

    return (
        <div className="sidebar">
            <div className="flex-column text-white sidebar-w">
                <div className="">
                    <div className="d-none d-md-block">
                        <div className="w-market">
                            <Link to="/market" className="btn btn-wallet form-control">Market</Link>
                        </div>
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
                        </ul>
                        <div className="sidebar-balance pb-3">
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <img className="logo-sidebar" src={bnbLogo} alt="" /> {props.bnb}
                                </div>
                                <div className="">
                                    <img className="logo-sidebar" src={logo} alt="" />
                                </div>
                                <div className="">
                                    <img className="logo-sidebar" src={gem} alt="" /> {props.user.gm}
                                </div>
                            </div>
                            <div className="w-gems mt-4">
                                <h4 className="text-white text-center">Exchange </h4>

                                <div onClick={() => { setShow(true) }} className="gems-exchange d-flex justify-content-between">

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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="bg-modal" show={show} onHide={handleClose}>
                <Modal.Header className="modal-w text-white hr-modal" closeButton>
                    <Modal.Title>
                        <div className="d-flex justify-content-between">
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
                <Modal.Body className="text-center">

                    <div className="py-4 d-flex justify-content-center">
                        <div className="p-4 w-buy-gm m-2">
                            <div className="text-center">
                                <img height="50px" src={gem} alt="" />
                            </div>
                            <div className="mb-2">
                                1000 GM - 0.01 BNB
                            </div>
                            {props.loading ? <>
                                <button className="btn btn-secondary px-4" >
                                    <div class="spinner-border" role="status"></div>
                                </button>
                            </> : <>
                                <button onClick={() => buyGm(1)} className="btn btn-success px-4" >
                                    Buy
                                </button>
                            </>}
                        </div>

                        <div className="p-4 w-buy-gm m-2">
                            <div className="text-center">
                                <img height="50px" src={gem} alt="" />
                            </div>
                            <div className="mb-2">
                                3000 gm - 0.028 BNB
                            </div>
                            {props.loading ? <>
                                <button className="btn btn-secondary px-4" >
                                    <div class="spinner-border" role="status"></div>
                                </button>
                            </> : <>
                                <button onClick={() => buyGm(2)} className="btn btn-success px-4" >
                                    Buy
                                </button>
                            </>}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Sidebar