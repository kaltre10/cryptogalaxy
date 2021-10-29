import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import Web3 from 'web3'
import bnbLogo from '../img/assets/bnb.svg'
import gem from '../img/gems.svg'
import logo from '../img/logo-planet.svg'
import close from '../img/assets/close-btn.svg'
import arrow from '../img/arrow.svg'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

//const myAddress = '0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da'
const web3 = new Web3(provider)

function Sidebar(props) {
    const [modalX, setModal] = useState(true)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    function handleShow1() {
        setShow(true)
        setModal(true)
    }
    function handleShow2() {
        setShow(true)
        setModal(false)
    }


    function changeModalState(s) {
        return
    }
    function gem1() {
        alert("Coming soon... ;)")
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
                            Inventory
                        </Link>
                    </li>
                    <li>
                        <Link to="/expeditions" className="nav-button">
                            Expeditions
                        </Link>
                    </li>
                    <li>
                        <Link to="/crafting" className="nav-button">
                            Crafting
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-balance">
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
                        <div className="w-gems mt-4">
                            <h4 className="text-white text-center">Exchange</h4>
                   
                            <div onClick={handleShow1} className="gems-exchange d-flex justify-content-between">
                                <div className="d-inline-block">
                                    <img className="img-gem" src={gem} />
                                </div>
                                <div className="d-inline-block">
                                    <img className="img-gem" src={arrow} />
                                </div>
                                <div className="d-inline-block">
                                    <img className="img-gem" src={logo} />
                                </div>
                            </div>
                            <div onClick={handleShow2} className="gems-exchange d-flex justify-content-between">

                                <div className="d-inline-block">
                                    <img className="img-gem" src={logo} />
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
                                            {modalX ?
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
                                            }

                                        </div>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="modal-w">


                                    {modalX ?
                                        <h4 className="text-white">1 GM = 1 GLX </h4> :
                                        <h4 className="text-white"> 1 GLX = 1 GM</h4>
                                    }


                                    <div className="row mt-3">
                                        <div className="col-2 text-center">
                                            {modalX ? 
                                            <img className="logo-modal" src={gem} />:<img className="logo-modal" src={logo} /> 
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
                                            <img className="logo-modal" src={logo} />:<img className="logo-modal" src={gem} /> 
                                            }
                                        </div>
                                        <div className="col-10">
                                            <input className="form-control input-modal" placeholder="0" type="number" />
                                        </div>
                                    </div>

                                </Modal.Body>
                                <Modal.Footer className="modal-w text-center">
                                    <div className="text-center w-100">
                                        <button className="btn btn-success px-4" onClick={handleClose}>
                                            Confirm
                                        </button>
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