import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import logo from '../img/logo-planet.svg';
import arrow from '../img/arrow.svg';
import Modal from 'react-bootstrap/Modal';
import { Accordion } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../components/loading';
import urlApi from '../urlApi';
//import glxAbi from '../token/glxAbi';

function Sidebar() {

    //const MainnetProvider = "https://bsc-dataseed.binance.org/";
    const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    const web3 = new Web3(provider)
    const contractOuner = "0x7daf5a75c7b3f6d8c5c2b53117850a5d09006168"
    //const glxContract = new web3.eth.Contract(glxAbi, contractOuner)

    async function getBnbBalance() {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const account = accounts[0]
        web3.eth.getBalance(account).then((res) => {
            const bnb = web3.utils.fromWei(res, 'ether')
            setBnbBalance(bnb)
        })

    }

    /*async function getGlxBalance(){
        //alert("Llamando banlance")
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0]
        const bal = await glxContract.methods.balanceOf(account).call()
        console.log(bal)
        
        glxContract.methods.totalSupply().call().then((res) => {
            alert("res")
            setGlxBalance( res )
        }).catch(err => con sole.log(err))
    }*/

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [user, setUser] = useState({})
    const [bnb, setBnbBalance] = useState(0)
    const [glx, setGlxBalance] = useState(0)

    const [loading, setLoading] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const [errorToasText, setErrorToastText] = useState("")
    const [infoToast, setInfoToast] = useState(false)
    const [infoToasText, setInfoToastText] = useState("")
    function closeAlert() { setErrorToast(false) }
    function closeInfo() { setInfoToast(false) }
    function getErrorToast(bool, message) {
        setErrorToast(bool)
        setErrorToastText(message)
    }
    function getInfoToasText(val) {
        setInfoToastText(val)
        setInfoToast(true)
    }
    function getInfoToasText(val) {
        setInfoToastText(val)
        setInfoToast(true)
    }

    async function isConnected() {
        let wall = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        if (wall[0] != "") getUser()
    }

    async function getUser() {
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0].toLowerCase()
        const user = await axios.get(urlApi + "/api/v1/user/" + account)
        //console.log("user: +"+user.data[0].wallet)
        setUser(user.data[0])
    }

    function handleShow() {
        setShow(true)
    }

    async function buyGm(amount, price) {
        setLoading(true)
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
                console.log("Este el el Hash de la transaccion: " + txHash)
                getInfoToasText("Transaction hash: " + txHash)
                console.log("Cantidad de Gemas: " + amount)

                const hash = txHash
                const account = accounts[0]
                const wallet = account.toLowerCase()
                const getGm = await axios.put(urlApi + "/api/v1/buygm", { wallet, amount, hash })
                console.log(getGm.data)
                console.log("Transaction hash:" + hash)
                getUser()
                setShow(false)
                setLoading(false)
                //window.location.reload()

            })
            .catch((error) => {
                setLoading(false)
                getErrorToast(true, error.message)
                console.log("Ocurrio el siguiente error: " + error.message)
            })
    }

    useEffect(() => {
        isConnected()
        getBnbBalance()
        //getGlxBalance()
    }, [])
    return (
        <div className="sidebar">
            <Loading load={loading} />
            {errorToast ?
                <div className="toast-fixed alert alert-warning alert-dismissible d-flex justify-content-between">
                    <div className="text-dark">
                        <strong>Error! </strong> {errorToasText}
                    </div>
                    <button onClick={closeAlert} className="btn btn-warning" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                : <div></div>

            }
            {infoToast ?
                <div className="toast-fixed alert alert-success alert-dismissible d-flex justify-content-between">
                    <div className="px-3 text-success">
                        <strong>Success! </strong> {infoToasText}
                    </div>
                    <button onClick={closeInfo} className="btn btn-success" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                : <div></div>
            }

            <div className="flex-column text-white sidebar-w">

                <div className="">

                    <Accordion className="acord d-block d-md-none">
                        <Accordion.Item eventKey="0" className="bg-acorderon">
                            <Accordion.Header className="ac-head">=</Accordion.Header>
                            <Accordion.Body className="ac-body">

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
                                            • Planets x
                                        </Link>
                                    </li>

                                </ul>

                                <div className="sidebar-balance pb-3">


                                    <div className="d-flex justify-content-between">
                                        <div className="">
                                            <img className="logo-sidebar" src={bnbLogo} />  {bnb}
                                        </div>
                                        <div className="">
                                            <img className="logo-sidebar" src={logo} /> {glx}
                                        </div>
                                        <div className="">
                                            <img className="logo-sidebar" src={gem} /> {user.gm} xxx
                                        </div>
                                    </div>
                                </div>

                                <div className="w-gems mt-4">
                                <h4 className="text-white text-center">Exchange </h4>

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

                            </div>


                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <div className="d-none d-md-block">
                        <div className="w-market">
                            <Link to="/market" className="btn btn-wallet form-control">Market</Link>

                        </div>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li>
                                <Link to="/inventory" className="nav-button">
                                    • Inventory x
                                </Link>
                            </li>
                            <li>
                                <Link to="/planet" className="nav-button">
                                    • Planets
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/expeditions" className="nav-button">
                                    • Expeditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/factory" className="nav-button">
                                    • Factory
                                </Link>
                            </li>
                            <li>
                                <Link to="/refinery" className="nav-button">
                                    • Refinery
                                </Link>
                            </li>
                            <li>
                                <Link to="/transactions" className="nav-button">
                                    • Transactions
                                </Link>
                            </li> */}
                        </ul>
                        <div className="sidebar-balance pb-3">
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <img className="logo-sidebar" src={bnbLogo} />  {bnb}
                                </div>
                                <div className="">
                                    <img className="logo-sidebar" src={logo} /> {glx}
                                </div>
                                <div className="">
                                    <img className="logo-sidebar" src={gem} /> {user.gm}
                                </div>
                            </div>
                            <div className="w-gems mt-4">
                                <h4 className="text-white text-center">Exchange </h4>

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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="bg-modal" show={show} onHide={handleClose}>
                <Modal.Header className="modal-w text-white hr-modal" closeButton>
                    <Modal.Title>
                        <div className="d-flex justify-content-between w-100">
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

                    <h4 className="text-white">1000 GM = 0.01 BNB</h4>
                    <h4 className="text-white">3000 GM = 0.025 BNB</h4>
                    <div className="modal-w py-4 d-flex justify-content-center">
                        <div className="border p-3 m-2">
                            <div className="text-center">
                                <img height="50px" src={gem} alt="" />
                            </div>
                            <div className="text-white text-center mb-3">
                                Gem Pack (1000 GM)
                            </div>
                            <button className="btn btn-success px-4" onClick={() => buyGm(1000, "0.01")}>
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
                            <button className="btn btn-success px-4" onClick={() => buyGm(3000, "0.025")}>
                                Buy 3000 GM
                            </button>
                        </div>
                    </div>



                </Modal.Body>
                <Modal.Footer className="modal-w text-center">
                    <div className="text-center w-100">

                    </div>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default Sidebar