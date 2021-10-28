import React, { useState } from 'react';
import Web3 from 'web3'
import nft2 from '../img/nft/scout.png'
import nft3 from '../img/nft/thrasher.png'

const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const myAddress = '0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da'
const web3 = new Web3(provider)

const Market = () => {

   
    

    const nft = 'https://raw.githubusercontent.com/manuelperez0000/miningtown-node/master/public/img/catt1.png'

    return (
        
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="row p-4">
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="nft">
                                    <div className="nft-roi">
                                        Gm 33/24
                                    </div>
                                    <div className="img">
                                        <img className="nft-image w-100" src={nft} />
                                    </div>
                                    <div className="row pt-1 gx-1">
                                        <div className="col-12">
                                            <h4>Cat-Miner</h4>
                                        </div>
                                        <div className="col-6">
                                            <div className="border p-1 rounded w-100" >00012535</div>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-sm bg-success text-white form-control">Get In</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="nft">
                                    <div className="nft-roi">
                                        Gm 70/48
                                    </div>
                                    <div className="img">
                                        <img className="nft-image w-100" src={nft2} />
                                    </div>
                                    <div className="row pt-1 gx-1">
                                        <div className="col-12">
                                            <h4>Explorer</h4>
                                        </div>
                                        <div className="col-6">
                                            <div className="border p-1 rounded w-100" >00012535</div>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-sm bg-success text-white form-control">Get In</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="nft">
                                    <div className="nft-roi">
                                        Gm 580/96
                                    </div>
                                    <div className="img">
                                        <img className="nft-image w-100" src={nft3} />
                                    </div>
                                    <div className="row pt-1 gx-1">
                                        <div className="col-12">
                                            <h4>Thrasher</h4>
                                        </div>
                                        <div className="col-6">
                                            <div className="border p-1 rounded w-100" >00012535</div>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-sm bg-success text-white form-control">Get In</button>
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