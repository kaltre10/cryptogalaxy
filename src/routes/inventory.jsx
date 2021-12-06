import React, { useEffect, useState } from 'react'
/* import cat from '../img/nft/cat-miner.svg' */
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import axios from 'axios'
import urlApi from '../urlApi'

import iron from '../img/meterials/crud/iron.webp';
import silver from '../img/meterials/crud/silver.webp';
import gold from '../img/meterials/crud/gold.webp';

import diamond from '../img/meterials/crud/diamond.webp';
import ice from '../img/meterials/crud/ice.webp';
import petroleum from '../img/meterials/crud/petroleum.webp';

import shipsObj from '../items/ships'

function Inventory() {
    const [loading, setLoading] = useState(false)
    const [ships, setShips] = useState([])
    const [user, setUser] = useState({})
    const [items, setItems] = useState({})
    const [materials, setMaterials] = useState({})

    useEffect(() => {
        //getShips()
        getUser()

    }, [])

    async function getUser() {
        setLoading(true)
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const account = accounts[0]
        const user = await axios.get(urlApi + "/api/v1/user/" + account)
        setItems(user.data[0].items)
        setMaterials(user.data[0].materials)
        setUser(user.data[0])
        setShips(user.data[0].ships)
        setLoading(false)
    }

    // const nowDate = Date.now()

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">

                {/*  <div className="text-white border bg-danger p-4">
                    { shipsObj[0].img }
                    <img src={ shipsObj[0].img } alt="" srcset="" />
                </div> */}
                <Navbar />

                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="w-market-container p-3">

                            <div className="w-inventory-item p-2">
                                <h3 className="text-white"> Ships </h3>
                                <hr />
                                {loading ? <>
                                    <div class="spinner-border" role="status"></div>
                                </>
                                    :
                                    <>

                                        {ships.length == 0 ?
                                            <p className="text-white">No ships </p>

                                            : <></>}

                                        <div className="row">
                                            {ships.map((item) => {
                                                return (
                                                    <div key={item.id} className="col-12 col-sm-6 col-xl-3 ">
                                                        <div className="nft">
                                                            <div className="img">
                                                                <img className="nft-image w-100" src={item.img} />
                                                                <div className="mp-img">
                                                                    mp : {item.mp}
                                                                </div>
                                                                <div className="id-img">
                                                                    {item.id}
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
                                                                    <p className="text-white m-0 p-0"> mp : {item.mp}</p>

                                                                </div>
                                                                <div className="col-6">
                                                                    {loading ?
                                                                        <button className="btn bg-secondary px-5 text-white">Loading...</button>
                                                                        :
                                                                        <button className="btn bg-success form-control text-white">Sell</button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </>}
                            </div>
                            <div className="w-inventory-item p-2">

                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="text-white"> Materials </h3>
                                        <hr />
                                    </div>
                                </div>
                                <div className="p-2">


                                    <div className="row">


                                        {
                                            materials.iron + materials.silver + materials.gold + materials.ice + materials.petroleum + materials.diamond < 1 ? <div>No materials in inventory</div>
                                                : <>


                                                    {materials.iron > 0 ?
                                                        <div className="px-2 col-6 col-md-2  ">
                                                            <div className="p-2 material-bg text-center ">
                                                                <div>
                                                                    <h4 className="text-white m-0 p-0">Iron</h4>
                                                                </div>
                                                                <div>
                                                                    <img height="50px" className="" src={iron} />
                                                                </div>
                                                                <div className="text-white">
                                                                    {materials.iron}
                                                                </div>
                                                            </div>
                                                        </div> : <></>}

                                                    {materials.silver > 0 ?
                                                        <div className="px-2 col-6 col-md-2  ">
                                                            <div className="p-2 material-bg text-center ">
                                                                <div>
                                                                    <h4 className="text-white m-0 p-0">Silver</h4>
                                                                </div>
                                                                <div>
                                                                    <img height="50px" className="" src={silver} />

                                                                </div>
                                                                <div className="text-white">
                                                                    {materials.silver}
                                                                </div>
                                                            </div>
                                                        </div> : <></>}

                                                    {materials.gold > 0 ?
                                                        <div className="px-2 col-6 col-md-2  ">
                                                            <div className="p-2 material-bg text-center ">
                                                                <div>
                                                                    <h4 className="text-white m-0 p-0">Gold</h4>
                                                                </div>
                                                                <div>
                                                                    <img height="50px" className="" src={gold} />

                                                                </div>
                                                                <div className="text-white">
                                                                    {materials.gold}
                                                                </div>
                                                            </div>
                                                        </div> : <></>}

                                                    {materials.diamond > 0 ?
                                                        <div className="px-2 col-6 col-md-2  ">
                                                            <div className="p-2 material-bg text-center ">
                                                                <div>
                                                                    <h4 className="text-white m-0 p-0">Diamond</h4>
                                                                </div>
                                                                <div>
                                                                    <img height="50px" className="" src={diamond} />

                                                                </div>
                                                                <div className="text-white">
                                                                    {materials.diamond}
                                                                </div>
                                                            </div>
                                                        </div> : <></>}

                                                    {materials.ice > 0 ?
                                                        <div className="px-2 col-6 col-md-2  ">
                                                            <div className="p-2 material-bg text-center ">
                                                                <div>
                                                                    <h4 className="text-white m-0 p-0">Ice</h4>
                                                                </div>
                                                                <div>
                                                                    <img height="50px" className="" src={ice} />

                                                                </div>
                                                                <div className="text-white">
                                                                    {materials.ice}
                                                                </div>
                                                            </div>
                                                        </div> : <></>}

                                                    {materials.petroleum > 0 ?
                                                        <div className="px-2 col-6 col-md-2  ">
                                                            <div className="p-2 material-bg text-center ">
                                                                <div>
                                                                    <h4 className="text-white m-0 p-0">Petroleum</h4>
                                                                </div>
                                                                <div>
                                                                    <img height="50px" className="" src={petroleum} />

                                                                </div>
                                                                <div className="text-white">
                                                                    {materials.petroleum}
                                                                </div>
                                                            </div>
                                                        </div> : <></>}

                                                </>}

                                    </div>
                                </div>
                            </div>
                            <div className="w-inventory-item p-3">
                                <h3 className="text-white"> Items </h3>
                                <hr />
                                <div className="p-2 ">
                                    No item in inventory
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