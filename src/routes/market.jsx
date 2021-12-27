import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Web3 from 'web3'

import Sidebar from '../components/sidebar';
import urlApi from '../urlApi'

const testnetProvider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(testnetProvider)

/*const glxContract = new web3.eth.Contract(glxAbi, contractOuner) */

const Market = (props) => {

    const [ships, setShips] = useState([])

    useEffect(() => {
        getAllShips("Miner")
    }, [])

    const getAllShips = async (type) => {
        const objShips = await axios.get(urlApi + "/api/v1/getSellingShips/" + type)
        console.log(objShips.data)
        setShips(objShips.data)
    }

    const buyShipOnMarket = async (ship) => {

        const ac = await window.ethereum.request({ "method": "eth_requestAccounts" })
        const wallet = ac[0]
        const own = ship.wallet
        const price = ship.sellPrice.toString()
        props.stateLoading(true)
        window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: wallet,
                        to: own,
                        value: web3.utils.toHex(web3.utils.toWei(price, 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                    },
                ],
            })
            .then(async (txHash) => {

                const objBuyShip = await axios.put(urlApi + "/api/v1/buyShipMarket", {
                    ship, wallet,txHash
                })
                props.Toast(1,"Success Buy!")
                console.log(objBuyShip.data)
                
            })
            .catch((error) => {
                props.Toast(0, "Error: " + error.message)
            }).finally(()=>{
                props.connectOrRegister()
                getAllShips("Miner")
                props.stateLoading(false)
            })

        //alert("Buy:"+ship.name+" wallet:"+ship.wallet+" id:"+ship._id)
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
                            <button onClick={() => getAllShips("Miner")} className="btn-market"> Miners ▼</button>
                            <button onClick={() => getAllShips("Fighter")} className="btn-market"> Figthers ▼</button>
                            <button onClick={() => getAllShips("Refinery")} className="btn-market"> Refinery ▼</button>
                            <button onClick={() => getAllShips("Factory")} className="btn-market"> Factory ▼</button>
                        </div>
                        <div className="w-inventory-item p-2 m-3">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">

                                        <div className="col-12">
                                            <h3 className='text-center bg-title-market'>Market</h3>

                                            {ships.map((ship) => {
                                                return (
                                                    <div key={ship._id} className='p-1'>
                                                        <div className='row gx-2'>
                                                            <div className='bg-dark text-center  img-ship-market col-2'>
                                                                <div className=''>
                                                                    {ship.type} {ship.subType}
                                                                </div>
                                                                <img height="60px" src={ship.img} alt="" srcset="" />
                                                                <div className="energy mt-1">
                                                                    <div className="border-energy">
                                                                        {ship.energy > 0 ? <div className="in-energy">  </div> : <></>}
                                                                        {ship.energy > 1 ? <div className="in-energy">  </div> : <></>}
                                                                        {ship.energy < 2 ? <div className="out-energy">  </div> : <></>}
                                                                        {ship.energy < 1 ? <div className="out-energy">  </div> : <></>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-10'>
                                                                <div className='d-flex justify-content-between'>
                                                                    <div>
                                                                        <h3>{ship.name}</h3>
                                                                    </div>
                                                                    <div>
                                                                        <h3 className='text-warning'>
                                                                            {ship.sellPrice} BNB
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex justify-content-between'>
                                                                    <div className='w-text-ship-mark'>
                                                                        <b className='text-white'> ID: </b>  {ship._id}<br />
                                                                        <b className='text-white'> OWNER: </b> {ship.wallet}<br />
                                                                        <div className='text-danger p-1 bg-dark'>
                                                                            Mining Power: {ship.mp} -
                                                                            Attack Power: {ship.attack === undefined ? <> 0 </> : <>{ship.attack}</>}

                                                                        </div>

                                                                    </div>
                                                                    <div className=''>
                                                                        {props.loading ? <>
                                                                        <button className='btn btn-secondary'> <div className='spinner-border' role="status"></div> </button>
                                                                        </>:<>
                                                                        <button onClick={() => buyShipOnMarket(ship)} className='btn btn-success'> Buy </button>
                                                                        </>}
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div><hr />
                                                    </div>
                                                )
                                            })
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  <div className="container-fluid m-0 p-0 bg-planet">
                <Navbar connect={connection} wallet={wallet} />

                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        <Sidebar GetUser={getUser} user={user} bnb={bnb} glx={glx} />
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="container-fluid w-market-container">

                            <Loading load={loading} />

                         

                            <div className="row">

                                <div className="col-12">
                                    <div className="bg-market-bar text-white text-center">
                                        <button className="btn-market"> Miners ▼</button>
                                        <button className="btn-market"> Figthers ▼</button>
                                        <button className="btn-market"> Stations ▼</button>
                                        <button className="btn-market"> Minerals ▼</button>
                                        <button className="btn-market"> Refined ▼</button>
                                        <button className="btn-market"> Items ▼</button>
                                    </div>
                                    <div className="row p-4 gx-2">

                                        {listItems.map((item) => {
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-xl-3">
                                                        <div className="nft">
                                                            <div className="img">
                                                                <img className="nft-image w-100" src={item.img} alt="nft" />
                                                                <div className="mp-img">
                                                                    mp : {item.mp}
                                                                </div>
                                                                <div className="type-img d-flex">
                                                                    <div className="w-text-img">
                                                                        {item.type}
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

                                                            <div className="row pt-1 gx-0">
                                                                <div className="col-6">
                                                                    <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                                    <p className="m-0 price p-0"> {item.sellPrice} BNB</p>
                                                                </div>
                                                                <div className="col-6">
                                                                    {loading ?
                                                                        <button className="btn bg-secondary px-5 text-white">Loading...</button>
                                                                        :
                                                                        <button onClick={() => { buyNFT({ name: item.name, id: item.id, sellPrice: item.sellPrice, img: item.img, mp: item.mp, type: item.type, subType: item.subType }) }} className="btn bg-success form-control text-white">Buy</button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>

    )
}


export default Market