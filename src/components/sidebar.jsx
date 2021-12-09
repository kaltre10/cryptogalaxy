import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import logo from '../img/logo-planet.svg';
import arrow from '../img/arrow.svg';
import Modal from 'react-bootstrap/Modal';

function Sidebar(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

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

                                <div onClick={()=>{ setShow(true) }} className="gems-exchange d-flex justify-content-between">

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
                            <button className="btn btn-success px-4" >
                                Buy
                            </button>
                        </div>

                        <div className="p-4 w-buy-gm m-2">
                            <div className="text-center">
                                <img height="50px" src={gem} alt="" />
                            </div>
                            <div className="mb-2">
                                3000 gm - 0.025 BNB
                            </div>
                            <button className="btn btn-success px-4">
                                Buy
                            </button>
                            {/* onClick={() => buyGm(1000, "0.01")} */}
                        </div>
                    </div>
                </Modal.Body>
         
            </Modal>


        </div>
    )
}

export default Sidebar