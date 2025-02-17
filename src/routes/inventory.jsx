import React, { useState, useContext } from 'react'
import { DataContext } from '../context/DataContext';

import Sidebar from '../components/sidebar'
import RecTimer from '../components/recTimer';
import axios from 'axios'
import urlApi from '../urlApi'
import Web3 from 'web3'

import iron_bar from '../img/meterials/refined/iron_bar.webp';
import silver_bar from '../img/meterials/refined/silver_bar.webp';
import gold_bar from '../img/meterials/refined/gold_bar.webp';
import cut_diamond from '../img/meterials/refined/cut_diamond.webp';
import ice_bar from '../img/meterials/refined/ice_bar.webp';
import oil from '../img/meterials/refined/oil.webp';

import iron from '../img/meterials/crud/iron.webp';
import silver from '../img/meterials/crud/silver.webp';
import gold from '../img/meterials/crud/gold.webp';
import diamond from '../img/meterials/crud/diamond.webp';
import ice from '../img/meterials/crud/ice.webp';
import petroleum from '../img/meterials/crud/petroleum.webp';
import envioVentaAlBackend from '../services/ventaMaterials'

const testnetProvider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(testnetProvider)

function Inventory() {

    const { ships, connectOrRegister, user, loading, stateLoading, Toast, net, contractSales } = useContext(DataContext)

    const [sellPrice, setSellPrice] = useState(0);
    const [selling, setSelling] = useState(false);
    const [ship, setShip] = useState({})
    const [isSellinMaterial, setisSellinMaterial] = useState(false)
    const [mat, setMat] = useState("")
    const [ammount, setAmmount] = useState(0)
    const [gemPrice, setGemPrice] = useState(0)

    const salesRate = "0.0009"

    const reset = () => {
        setSellPrice(0)
        setShip({})
        setSelling(false)
    }

    async function sellShip(ship) {
        setShip(ship)
    }

    const changePrice = (e) => {
        setSellPrice(e.target.value)
    }

    const recover = async (ship) => {
        const wallet = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const headers = { headers: { "Content-Type": "application/json" } }
        const res = await axios.put(urlApi + "/api/v1/recoverShip", {
            ship,
            wallet
        }, headers)
        if (res.data.error) {
            Toast(0, res.data.message);
        } else {
            Toast(1, res.data.message)
        }
        connectOrRegister()
    }

    const sell = async (objSell) => {
        //validar chain
        const chainIdhex = await window.ethereum.request({ method: 'eth_chainId' })
        if (chainIdhex == net) {
            if (sellPrice <= 0) {
                alert("Incorrect price, not sellin in 0 bnb")
            } else {
                stateLoading(true)
                const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
                const account = accounts[0]
                await window.ethereum
                    .request({
                        method: 'eth_sendTransaction',
                        params: [
                            {
                                from: account,
                                to: contractSales,
                                value: web3.utils.toHex(web3.utils.toWei(salesRate, 'ether')),
                                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                                gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                            },
                        ],
                    })
                    .then(async (txHash) => {

                        const wallet = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
                        const headers = { headers: { "Content-Type": "application/json" } }
                        const res = await axios.put(urlApi + "/api/v1/sellShip", {
                            ship,
                            wallet,
                            txHash,
                            sellPrice
                        }, headers)
                        if (res.data.error) {
                            Toast(0, res.data.message);
                        } else {
                            Toast(1, res.data.message)
                        }

                    })
                    .catch((error) => {
                        //getErrorToast(true, error.message)
                        console.log(error.message)
                        Toast(0, error.message)
                    }).finally(() => {
                        connectOrRegister()
                        stateLoading(false)
                        reset()
                    })
                console.log(objSell)
            }
        } else {
            Toast(0, "incorect Network")
        }
    }

    const sellMaterial = async (material) => {
        setMat(material)
        console.log(material)
    }

    const aproveSellMaterial = async (material) => {

        const res = await envioVentaAlBackend(material, ammount, user.wallet, gemPrice, Toast)
        connectOrRegister()
        if (res) {
            setisSellinMaterial(false)
        }
        stateLoading(false)
    }

    const changeGemPrice = (e) => {
        setGemPrice(e.target.value)
    }
    const changeAmmount = (e) => {
        setAmmount(e.target.value)
    }



    return (
        <>
            {selling ? <>
                <div className='sellModal'>

                    <div className='in-content-sell'>
                        <div className='d-flex justify-content-between'>
                            <div className='mb-3'>
                                <div className='fee'>Selling</div>
                                {ship.name !== undefined ? <h3 className='m-0 p-0'>{ship.name}</h3> : <>Select Ship</>}
                                <div className='fee'> ID: {ship._id} </div>
                            </div>
                            <div>
                                <button onClick={() => { reset() }} className='close-button'>
                                    x
                                </button>
                            </div>
                        </div>
                        <div>
                            Sell Price
                        </div>
                        <div>
                            <input name="price" type="number" value={sellPrice} onChange={changePrice} />
                        </div>
                        <div className='text-warning fee'>
                            sales rate {salesRate} BNB
                        </div>
                        <div>
                            <h3 className='text-warning text-center my-2'>
                                {sellPrice} BNB
                            </h3>
                        </div>
                        <div className='mt-2'>
                            {loading ? <>
                                <button className='btn btn-secondary form-control'> <div className="spinner-border" role="status"></div> </button>
                            </> : <>
                                <button onClick={() => { sell(ship) }} className='btn btn-primary form-control'> Sell </button>
                            </>}
                        </div>
                    </div>
                </div>
            </> : <></>
            }
            {isSellinMaterial ? <>
                <div className='sellModal'>
                    <div className='in-content-sell'>
                        <div className='d-flex justify-content-between'>
                            <div className=''>
                                <div className='fee'>Selling</div>
                                <h4>
                                    {mat}
                                </h4>
                            </div>
                            <div>
                                <button onClick={() => { setisSellinMaterial(false); setGemPrice(0); setAmmount(0) }} className='close-button' >
                                    x
                                </button>
                            </div>
                        </div>

                        <div className='mt-2 d-flex justify-content-between'>
                            <div>
                                Amount
                            </div>
                            <div>
                                {mat}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <input onChange={changeAmmount} type="number" className='form-control' />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div>
                                Sell Price
                            </div>
                            <div>
                                GM
                            </div>
                        </div>
                        <div>
                            <input onChange={changeGemPrice} type="number" className='form-control' />
                        </div>
                        <div className='my-2'>
                            {ammount} {mat} → {gemPrice} GM
                        </div>
                        <div className='fee text-warning'>Sales rate 10 Gm </div>
                        <hr />
                        <div className='mt-3'>
                            {loading ? <>
                                <button className='disabled btn btn-secondary form-control'> <div className="spinner-border"></div> </button>
                            </> : <>
                                <button onClick={() => { aproveSellMaterial(mat); stateLoading(true) }} className='btn btn-success form-control'> Aprove </button>
                            </>}
                        </div>
                    </div>
                </div>
            </> : <></>

            }

            <div className="container-fluid m-0 p-0 bg-stars">

                <div className="row gx-0">
                    <div className="col-3 bg-danger d-none d-md-block">
                        < Sidebar />
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="w-market-container p-3">
                            
                            {<div className=''>
                                <RecTimer />
                            </div>}
                            <div className="w-inventory-item p-2">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="text-center bg-title-market"> Ships </h3>

                                    </div>
                                    {loading ? <div className='w-100 text-center'>
                                        <div className="spinner-border" role="status"></div>
                                    </div> : <>
                                        {user.wallet !== undefined && user.wallet !== "" ?
                                            ships.map((item) => {
                                                return (
                                                    <div key={item._id} className="col-12 col-sm-6 col-xl-3 ">
                                                        <div className="nft">
                                                            <div className="img">

                                                                {item.onSell ?
                                                                    <div className='text-center onsell'>
                                                                        <div className='text-dark'>
                                                                            On Sell
                                                                        </div>
                                                                        <b className='text-dark'>
                                                                            Price: {item.sellPrice} BNB
                                                                        </b>
                                                                    </div>
                                                                    : <></>
                                                                }

                                                                <img alt="" className="nft-image w-100" src={item.img} />
                                                                <div className="mp-img">
                                                                    mp : {item.mp}
                                                                </div>
                                                                {/* <div className="id-img">
                                                                    {item._id}
                                                                </div> */}
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

                                                            <div className="row pt-1 gx-0">
                                                                <div className="col-6">
                                                                    <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                                    <p className="text-white m-0 p-0"> ATK {item.attack !== undefined ? <>{item.attack}</> : <>0</>} </p>
                                                                </div>
                                                                <div className="col-6">
                                                                    {item.onSell ? <>
                                                                        <button onClick={() => { recover(item) }} className='btn btn-warning form-control'> Remove </button>
                                                                    </> : <>

                                                                        <button onClick={() => { sellShip(item); setSelling(true) }} className='form-control btn btn-primary'> Sell </button>
                                                                    </>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : <>
                                                No ships in inventory
                                            </>
                                        }
                                    </>}
                                </div>
                            </div>

                            <div className="w-inventory-item p-3">
                                <h3 className="text-center bg-title-market"> Materials </h3>

                                {user.wallet !== undefined && user.wallet !== "" ? <>
                                    <div className="row">
                                        {user.materials.iron > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Iron</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={iron} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.materials.iron}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Iron") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {user.materials.silver > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Silver</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={silver} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.materials.silver}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Silver") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}

                                        {user.materials.gold > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Gold</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={gold} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.materials.gold}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Gold") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>
                                        }
                                        {user.materials.diamond > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Diamond</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={diamond} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.materials.diamond}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Diamond") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {user.materials.ice > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Ice</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={ice} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.materials.ice}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Ice") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {user.materials.petroleum > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Petroleum</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={petroleum} />
                                                    </div>
                                                    <div className="text-white">
                                                        {user.materials.petroleum}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Petroleum") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                    </div>
                                </> : <></>}

                            </div>

                            <div className="w-inventory-item p-3">
                                <h3 className="text-center bg-title-market"> Refined Materials </h3>

                                {user.wallet !== undefined && user.wallet !== "" ? <>
                                    <div className="row">
                                        {user.refined.ironbar > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Iron Bar</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={iron_bar} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.refined.ironbar}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Ironbar") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {user.refined.silverbar > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Silver Bar</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={silver_bar} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.refined.silverbar}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Silverbar") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {user.refined.goldbar > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Gold Bar</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={gold_bar} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.refined.goldbar}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Goldbar") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {user.refined.cutdiamond > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <b className="text-white m-0 p-0">Cut Diamond</b>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={cut_diamond} />
                                                    </div>
                                                    <div className="text-white">
                                                        {user.refined.cutdiamond}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Cutdiamond") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {user.refined.icebar > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Ice</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={ice_bar} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.refined.icebar}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Icebar") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {user.refined.oil > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Oil</h4>
                                                    </div>
                                                    <div>
                                                        <img alt="" height="50px" className="" src={oil} />

                                                    </div>
                                                    <div className="text-white">
                                                        {user.refined.oil}
                                                    </div>
                                                    <button onClick={() => { setisSellinMaterial(true); sellMaterial("Oil") }} className='form-control btn btn-primary' >Sell</button>
                                                </div>
                                            </div>
                                        </> : <></>}

                                    </div>
                                </> : <></>}

                            </div>

                            <div className="w-inventory-item p-3">
                                <h3 className="text-center bg-title-market"> Items </h3>
                                <div className="p-2 ">
                                    Coming soon...
                                </div>
                            </div>

                            <div className="w-inventory-item p-2">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className='text-center bg-title-market'>Account XP</h3>
                                        {user.wallet !== undefined && user.wallet !== "" ? <>
                                            Minery: {user.xp.minery}
                                        </> : <></>}
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
export default Inventory