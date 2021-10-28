import React from 'react'
import nft2 from '../img/nft/scout.png'
import nft3 from '../img/nft/thrasher.png'

function Inventory() {
    const nft = 'https://raw.githubusercontent.com/manuelperez0000/miningtown-node/master/public/img/catt1.png'
    return (
        <>
            <div className="container-fluid pt-3">
                <div className="row">

                    <div className="col-12">
                        <h3 className="text-white">Ships</h3>
                        <div className="inventory-wrap">

                            <div className="col-12">
                                <div className="row p-4">
                                    <div className="col-12 col-md-6 col-xl-4">
                                        <div className="nft">
                                            <div className="nft-roi">
                                                Gm 420/24
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
                                                Gm 0/0
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
                                                Gm 20/24
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

                    <div className="col-12 mt-3">
                        <h3 className="text-white">Materials</h3>
                        <div className="inventory-wrap">
                            <p className="text-white">No Materials availible...</p>
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        <h3 className="text-white">Items</h3>
                        <div className="inventory-wrap">
                            <p className="text-white">No items availible...</p>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Inventory