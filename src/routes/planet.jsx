import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Navbar from "../components/navbar";
import Terrat from '../img/planets/Terrat.webp';
import Elion from '../img/planets/Elion.webp';
import Argon from '../img/planets/Argon.webp';
import Loading from "../components/loading";
import gm from '../img/gems.svg';

import iron from '../img/meterials/crud/iron.webp';
import silver from '../img/meterials/crud/silver.webp';
import gold from '../img/meterials/crud/gold.webp';

import urlApi from "../urlApi";

const Planet = () => {

    useEffect(() => {
        getUser()
    }, [])

    const [wallet, setWallet] = useState('')

    //Loading, alerts and errors
    const [loading, setLoading] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const [errorToasText, setErrorToastText] = useState("")
    const [infoToast, setInfoToast] = useState(false)
    const [infoToasText, setInfoToastText] = useState("")
    function getErrorToast(bool, message) { setErrorToast(bool); setErrorToastText(message) }
    function getInfoToasText(val) { setInfoToastText(val); setInfoToast(true) }
    function closeAlert() { setErrorToast(false) }
    function closeInfo() { setInfoToast(false) }
    //end Loading, alerts and errors

    const [user, setUser] = useState({})
    const [planets, setPlanets] = useState([0,0,0,0,0,0])
    const [materials, setMaterials] = useState({})
    const [bnb, setBnb] = useState(10)
    const [glx, setGlx] = useState(10)

    async function getUser() {
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0].toLowerCase()
        const user = await axios.get(urlApi + "/api/v1/user/" + account)
        setMaterials(user.data[0].materials)
        setUser(user.data[0])
        setPlanets(user.data[0].planets)
    }

    async function connection() {
        try {

            const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
            const account = accounts[0]
            var uper = account.toLowerCase()
            setWallet(account)
            //console.log("Account: "+uper)
            const walletObj = { wallet: uper }
            //console.log(walletObj)
            axios.post("http://localhost:4000/api/v1/auth", walletObj).then((res) => {
                //console.log("Res data: "+res.data.user.wallet)
            }).catch(err => alert("Error in planet: "+err.message))

        } catch (error) {
            alert("Connection error: " + error.message)
            window.location.href = "./login"
        }
    }

    async function mine(material, mp) {

        setLoading(true)
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const wallet = accounts[0].toLowerCase()
        const user = await axios.get(urlApi + "/api/v1/user/" + wallet)
        const balance = user.data[0].gm
        if (balance > 20) {
            const mine = await axios.put(urlApi + "/api/v1/mine", { mp, wallet, material })
            alert("you have mined some materials")
            console.log(mine)
            setLoading(false)
            getUser()
        } else {
            alert("Insuficient balance GM")
            setLoading(false)
            getUser()
        }

        //alert("Minando: "+user.data.mine+" Iron")
    }

    async function unlockPlanet(planet, amount) {
        //alert(planet)

        setLoading(true)
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const wallet = accounts[0].toLowerCase()
        const user = await axios.get(urlApi + "/api/v1/user/" + wallet)
        const balance = user.data[0].gm
        if (balance > amount) {
            const unlock = await axios.put(urlApi + "/api/v1/unlockPlanet", { planet, wallet, amount })
            alert("Planet Unlocked: ")
            console.log(unlock)
            setLoading(false)
            getUser()
        } else {
            alert("Insuficient balance GM")
            setLoading(false)
            getUser()
        }
    }

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">
                <Navbar />

                <Loading load={loading} />
                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">
                        <div className="row">

                            <div className="col-12 p-3 bg-dark text-white mb-3 bg-materials-planet">
                                <div className="row">
                                    <div className="col-2 ">
                                        Iron: {materials.iron}<br />
                                    </div>
                                    <div className="col-2 ">
                                        Silver: {materials.silver}<br />
                                    </div>
                                    <div className="col-2 ">
                                        Gold: {materials.gold}<br />
                                    </div>
                                    <div className="col-2 ">
                                        Diamond: {materials.diamond}<br />
                                    </div>
                                    <div className="col-2 ">
                                        Ice: {materials.ice}<br />
                                    </div>
                                    <div className="col-2 ">
                                        Petroleum: {materials.petroleum}<br />
                                    </div>
                                </div>


                            </div>
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Terrat} alt="planet"/>
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">
                                            <div className="d-flex justify-content-between">
                                                <div >
                                                    <h2 className="text-white m-0 p-0">Terrat</h2>
                                                    <p className="m-0 p-0 text-white"> LVL 1</p>
                                                    <p className="m-0 price p-0 mb-1"> Iron planet</p>
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.8</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" alt="planet" src={iron} />
                                                        <div className="name-mineral">IRON</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                planets[0] !== 0 ?
                                                    <div>
                                                        {loading ?
                                                            <button className="btn form-control mt-2 bg-secondary px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => mine("iron", 3)} className="btn bg-danger form-control text-white mt-2">
                                                                Mine 20
                                                                <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                            </button>
                                                        }
                                                    </div> :
                                                    <div>
                                                        {loading ?
                                                            <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => { unlockPlanet(0, 600) }} className="btn bg-success form-control mt-2 text-white ">
                                                                Unlock 600
                                                                <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                            </button>
                                                        }
                                                    </div>
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-md-2"></div>
                            <div className="col-12 col-md-2"></div>
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Elion} alt="planet"/>
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">
                                            <div className="d-flex justify-content-between">
                                                <div >
                                                    <h2 className="text-white m-0 p-0">Elion</h2>
                                                    <p className="m-0 p-0 text-white"> LVL 2</p>
                                                    <p className="m-0 price p-0 mb-1"> Silver planet</p>
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.6</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={silver} alt="planet" />
                                                        <div className="name-mineral">Silver</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                {
                                                    planets[1] !== 0 ?
                                                        <div>
                                                            {loading ?
                                                                <button className="btn form-control mt-2 bg-secondary px-5 text-white">Loading...</button>
                                                                :
                                                                <button onClick={() => mine("silver", 2)} className="btn bg-danger form-control text-white mt-2">
                                                                    Mine 40
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            }
                                                        </div> :
                                                        <div>
                                                            {loading ?
                                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                                :
                                                                <button onClick={() => { unlockPlanet(1, 1000) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 1000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            }
                                                        </div>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Argon} alt="planet"/>
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">
                                                
                                        <div className="d-flex justify-content-between">
                                                <div >
                                                    <h2 className="text-white m-0 p-0">Galion</h2>
                                                    <p className="m-0 p-0 text-white"> LVL 3</p>
                                                    <p className="m-0 price p-0 mb-1"> Gold planet</p>
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.4</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={gold} alt="planet" />
                                                        <div className="name-mineral">Gold</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                planets[2] !== 0 ?
                                                    <div>
                                                        {loading ?
                                                            <button className="btn form-control mt-2 bg-secondary px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => mine("gold", 1)} className="btn bg-danger form-control text-white mt-2">
                                                                Mine 90
                                                                <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                            </button>
                                                        }
                                                    </div> :
                                                    <div>
                                                        {loading ?
                                                            <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => { unlockPlanet(2, 3000) }} className="btn bg-success form-control mt-2 text-white ">
                                                                Unlock 3000
                                                                <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                            </button>
                                                        }
                                                    </div>
                                            }
                                        </div>
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

export default Planet