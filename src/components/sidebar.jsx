import React from 'react'
import { Link } from 'react-router-dom'
import Web3 from 'web3'
import bnbLogo from '../img/assets/bnb.svg'
import gem from '../img/gems.svg'
import logo from '../img/logo-planet.svg'
import arrow from '../img/arrow.svg'
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
//const myAddress = '0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da'
const web3 = new Web3(provider)

function Sidebar(props) {

    function gem1(){
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
                            <p>1Gm = 1GLX</p>
                            <div onClick={gem1} className="gems-exchange d-flex justify-content-between">
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
                            <div onClick={gem1} className="gems-exchange d-flex justify-content-between">
                                
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
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar