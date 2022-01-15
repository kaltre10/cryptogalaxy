import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Sidebar from "../components/sidebar";

import minersShop from "../items/miners";
import fighters from "../items/fighters";
import stations from "../items/stations";

const Shop = () => {
    const { buyShip, user, loading, sellObj, setSellObj, net,giftShipDbUpdate,Toast,connectOrRegister,stateLoading } = useContext(DataContext)
    const [giftWallet, setGift] = useState("")

    useEffect(() => {
        setSellObj(minersShop)
    }, [])

    const changeGift = (e) => {
        setGift(e.target.value)
    }

    async function giftShip(objSell, giftWallet) {
        const chainIdhex = await window.ethereum.request({ method: 'eth_chainId' })
        if (net === chainIdhex) {
            stateLoading(true)
            
            await giftShipDbUpdate("Gifted", objSell,giftWallet)
            await connectOrRegister()
            Toast(1, "Success gift a ship");
            stateLoading(false)
        } else {
            Toast(0, "Incorrect Network")
        }
    }



    return (
        <>

            <div className="container-fluid m-0 p-0 bg-stars">

                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar />
                    </div>
                    <div className="col-12 col-md-9 p-0 w-market-container">
                        <div className="bg-market-bar text-white text-center">
                            <button onClick={() => setSellObj(minersShop)} className="btn-market"> Miners ▼</button>
                            <button onClick={() => setSellObj(fighters)} className="btn-market"> Figthers ▼</button>
                            <button onClick={() => setSellObj(stations)} className="btn-market"> Stations ▼</button>
                        </div>

                        <div className="w-inventory-item p-2 m-3">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="text-center bg-title-market">Shop</h3>
                                    <div className="row">

                                        {user.wallet !== undefined ?
                                            sellObj.map((item) => {
                                                return (
                                                    <div key={item.id} className="col-12 col-sm-6 col-xl-3 ">
                                                        <div className="nft">
                                                            <div className="img">
                                                                <img alt="" className="nft-image w-100" src={item.img} />
                                                                <div className="mp-img">

                                                                    mp : {item.mp}
                                                                </div>
                                                                <div className="id-img bg-dark p-1">
                                                                    <h4 className="text-warning p-0 m-0">
                                                                        BNB {item.sellPrice}
                                                                    </h4>
                                                                </div>
                                                                <div className="type-img d-flex">
                                                                    <div className="w-text-img">
                                                                        {item.type} {item.subType}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="energy">
                                                                <div className="border-energy">
                                                                    {item.energy > 0 ? <div className="in-energy">  </div> : <></>}
                                                                    {item.energy > 1 ? <div className="in-energy">  </div> : <></>}
                                                                    {item.energy < 2 ? <div className="out-energy">  </div> : <></>}
                                                                    {item.energy < 1 ? <div className="out-energy">  </div> : <></>}
                                                                </div>
                                                            </div>
                                                            {/*  {item.charge != null ? <> s:
                                                                    {Math.round((item.charge - Date.now()) / 1000)}
                                                                    <div className="p-1 bg-danger">
                                                                        {Date.now() + (60000)}
                                                                    </div>
                                                                </> : <></>} */}
                                                            <div className="row pt-1 gx-0">
                                                                <div className="col-6">
                                                                    <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                                    <p className="text-white m-0 p-0"> ATK {item.attack} </p>
                                                                </div>
                                                                <div className="col-6">
                                                                    {loading ? <>
                                                                        <button className="btn btn-secondary form-control mt-1">
                                                                            <div className="spinner-border" role="status"></div>
                                                                        </button>
                                                                    </> : <>
                                                                        {user.wallet === "0x7daf5a75c7b3f6d8c5c2b53117850a5d09006168" ? <>
                                                                            <input type="text" onChange={changeGift} />
                                                                            <button onClick={() => { giftShip(item, giftWallet) }}>Gift</button>
                                                                        </> : <></>}
                                                                        <button onClick={() => { buyShip(item) }} className="btn btn-danger form-control mt-1"> BUY </button>
                                                                    </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : <>
                                                No ships on sell
                                            </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
export default Shop