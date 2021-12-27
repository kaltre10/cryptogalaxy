import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import miners from "../items/miners";
import fighters from "../items/fighters";
import stations from "../items/stations";
import Web3 from 'web3'
import urlApi from "../urlApi";
import axios from "axios";

const testnetProvider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(testnetProvider)
const contractOuner = "0x7daf5a75c7b3f6d8c5c2b53117850a5d09006168"

const Shop = (props) => {

    const [sellObj, setSellObj] = useState(miners)

    useEffect(() => {
        setSellObj(miners)

        //console.log(miners)
    }, [])

    async function buyShipDbUpdate(txHash, objSell) {
        //alert(num + " " + txHash)
        const hash = txHash
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0]
        const wallet = account.toLowerCase()
        const buyShip = await axios.put(urlApi + "/api/v1/buyship", { wallet, hash, objSell })
        console.log(buyShip.data)
        props.connectOrRegister()
        //console.log(buyShip.data)
        //console.log("Transaction hash:" + hash)
        //getUser()
        //setLoading(false)
    }

    async function buyShip(objSell) {

        props.stateLoading(true)
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0]
        const price = objSell.sellPrice;
        await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: account,
                        to: contractOuner,
                        value: web3.utils.toHex(web3.utils.toWei(price, 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                    },
                ],
            })
            .then(async (txHash) => {
                await buyShipDbUpdate(txHash, objSell)
                props.connectOrRegister()

                props.stateLoading(false)
                props.Toast(1, "Success Buy a ship");
                console.log("Transaction hash: " + txHash);
            })
            .catch((error) => {
                props.stateLoading(false)
                //getErrorToast(true, error.message)
                console.log(error.message)
                props.Toast(0,error.message)
            })
    }

    return (
        <>

            <div className="container-fluid m-0 p-0 bg-stars">

                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar connectOrRegister={props.connectOrRegister} user={props.user} bnb={props.bnb} loading={props.loading} stateLoading={props.stateLoading} />
                    </div>
                    <div className="col-12 col-md-9 p-0 w-market-container">
                        <div className="bg-market-bar text-white text-center">
                            <button onClick={() => setSellObj(miners)} className="btn-market"> Miners ▼</button>
                            <button onClick={() => setSellObj(fighters)} className="btn-market"> Figthers ▼</button>
                            <button onClick={() => setSellObj(stations)} className="btn-market"> Stations ▼</button>
                        </div>

                        <div className="w-inventory-item p-2 m-3">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="text-center bg-title-market">Shop</h3>
                                    <div className="row">

                                            {props.user.wallet != null ?
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
                                                                        <p className="text-white m-0 p-0"> ATK { item.attack } </p>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        {props.loading ? <>
                                                                            <button className="btn btn-secondary form-control mt-1">
                                                                                <div className="spinner-border" role="status"></div>
                                                                            </button>
                                                                        </> : <>
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