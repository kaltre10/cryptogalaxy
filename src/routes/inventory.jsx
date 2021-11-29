import React, { useEffect, useState } from 'react'
import cat from '../img/nft/cat-miner.svg'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import axios from 'axios'
import iron from '../img/meterials/iron.svg'
import silver from '../img/meterials/silver.svg'

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
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const account = accounts[0]
        const user = await axios.get("http://localhost:4000/api/v1/user/" + account)
        setItems(user.data[0].items)
        setMaterials(user.data[0].materials)
        setUser(user.data[0])
        setShips(user.data[0].ships)
    }


    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">
                <Navbar />

                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="container-fluid w-market-container p-3">

                            <div className="w-inventory-item p-2">
                                <h3 className="text-white"> Ships </h3>
                                <hr />
                                {ships.length == 0 ?
                                    <p className="text-white">No ships</p> : <></>}
                                <div className="row">
                                    {ships.map((item) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-xl-3 ">
                                                <div className="nft">
                                                    <div className="img">
                                                        <img className="nft-image w-100" src={cat} />
                                                    </div>
                                                    <div className="row pt-1 gx-0">
                                                        <div className="col-6">
                                                            <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                            <p className="text-white m-0 p-0"> MP 100 </p>

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
                            </div>
                            <div className="w-inventory-item p-2">
                                <div>
                                    <h3 className="text-white"> Materials </h3>
                                    <hr />

                                </div>
                                <div className="container">

                                    {materials.iron > 0 ?
                                        <div className="p-2 col-6 col-md-2 material-bg text-center">
                                            <div>
                                                <h3 className="text-white m-0 p-0">Iron</h3>
                                            </div>
                                            <div>
                                                <img height="50px" className="" src={iron} />

                                            </div>
                                            <div className="text-white">
                                                {materials.iron}

                                            </div>

                                        </div> : <>
                                            No Materials in inventory

                                        </>}

                                    {materials.silver > 0 ?
                                        <div className="p-2 col-6 col-md-2 material-bg text-center">
                                            <div>
                                                <h3 className="text-white m-0 p-0">Iron</h3>
                                            </div>
                                            <div>
                                                <img height="50px" className="" src={silver} />

                                            </div>
                                            <div className="text-white">
                                                {materials.silver}

                                            </div>

                                        </div> : <>
                                            No Materials in inventory

                                        </>}
                                </div>
                            </div>
                            <div className="w-inventory-item p-2">
                                <h3 className="text-white"> Items </h3>
                                <hr />
                                <p className="text-white">
                                    No Items in inventory
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inventory