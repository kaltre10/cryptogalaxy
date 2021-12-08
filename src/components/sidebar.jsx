import React from 'react';
import { Link } from 'react-router-dom';
import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import logo from '../img/logo-planet.svg';
import arrow from '../img/arrow.svg';
import Modal from 'react-bootstrap/Modal';
import { Accordion } from 'react-bootstrap';

function Sidebar(props) {

    return (
        <div className="sidebar">
            
            

            <div className="flex-column text-white sidebar-w">

                <div className="">

                   {/*  <Accordion className="acord d-block d-md-none">
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
                                            <img className="logo-sidebar" src={gem} /> {user.gm}
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
                    </Accordion> */}

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
                                    <img className="logo-sidebar" src={bnbLogo} alt="" />
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

                                <div className="gems-exchange d-flex justify-content-between">

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
            {/* <Modal className="bg-modal" show={show} onHide={handleClose}>
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
            </Modal> */}


        </div>
    )
}

export default Sidebar