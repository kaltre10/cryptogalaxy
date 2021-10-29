import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Web3 from 'web3'
import nft from '../img/nft/cat-miner.svg'
import nft2 from '../img/nft/explorer.svg'
import nft3 from '../img/nft/thrasher.svg'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'


const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const myAddress = '0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da'
const web3 = new Web3(provider)

const Market = () => {

    return (

        <div className="container-fluid   w-market-container">

            <div className="w-nav-market p-3">
                <Form.Select className="select-form-market">
                    
                    <option value="1">Ships</option>
                    <option value="2">Items</option>
                    <option value="3">Materials</option>
                </Form.Select>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="row p-4">
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="nft">
                                <div className="img">
                                    <img className="nft-image w-100" src={nft} />
                                </div>
                                <div className="row pt-1 gx-1">
                                    <div className="col-12 text-center">
                                        <h4>Cat-Miner</h4>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="btn bg-success px-5 text-white">Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="nft">
                                
                                <div className="img">
                                    <img className="nft-image w-100" src={nft2} />
                                </div>
                                <div className="row pt-1 gx-1">
                                    <div className="col-12 text-center">
                                        <h4>Explorer</h4>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="btn bg-success px-5 text-white">Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="nft">
                               
                                <div className="img">
                                    <img className="nft-image w-100" src={nft3} />
                                </div>
                                <div className="row pt-1 gx-1">
                                    <div className="col-12 text-center">
                                        <h4>Thrasher</h4>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="btn bg-success px-5 text-white">Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Market