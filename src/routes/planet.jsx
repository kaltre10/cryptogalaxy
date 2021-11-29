import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Navbar from "../components/navbar";
import Terrat from '../img/planets/Terrat.webp';
import Elion from '../img/planets/Elion.webp';
import Argon from '../img/planets/Argon.webp';
import Loading from "../components/loading";
import gm from '../img/gems.svg'
import iron from '../img/items/iron.svg'
import silver from '../img/items/silver.svg'
import gold from '../img/items/gold.svg'

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

    const [user, setUser] = useState([])
    const [planets, setPlanets] = useState([])
    const [bnb, setBnb] = useState(10)
    const [glx, setGlx] = useState(10)

    async function getUser() {
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0].toLowerCase()
        const user = await axios.get("http://localhost:4000/api/v1/user/" + account)
        //console.log("user: +"+user.data[0].wallet)
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
            }).catch(err => alert(err.message))

        } catch (error) {
            alert("Connection error: " + error.message)
            window.location.href = "./login"
        }
    }

    async function mine(material, mp) {
        //alert(process.env.REACT_APP_SERVER)
        setLoading(true)
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const wallet = accounts[0].toLowerCase()
        const mine = await axios.put("http://localhost:4000/api/v1/mine", { mp, wallet, material })
        console.log("mine Iron: " + mine.data)
        setLoading(false)
        getUser()
        //alert("Minando: "+user.data.mine+" Iron")
    }

    async function unlockPlanet(planet) {
        setLoading(true)
        const unlock = await axios.put("http://localhos:4000/api/v1/unlockPlanet", { planet, wallet })
        setLoading(false)
        alert(unlock)
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

                            <div className="col-12 p-3 bg-dark text-white">
                                terrat: {planets[0]}<br />
                                Elion: {planets[1]}<br />

                            </div>
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Terrat} />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">

                                            <h2 className="text-white m-0 p-0">Terrat</h2>
                                            <p className="m-0 p-0 text-white"> LVL 1</p>
                                            <p className="m-0 price p-0 mb-1"> Iron planet</p>
                                            <img height="60px" src={iron} />

                                            {loading ?
                                                <button className="btn form-control mt-2 bg-secondary px-5 text-white">Loading...</button>
                                                :
                                                <button onClick={() => mine("iron", 3)} className="btn bg-danger form-control text-white mt-2">
                                                    Mine 20
                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                </button>
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
                                            <img className="planet-image w-100" src={Elion} />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">

                                            <h2 className="text-white m-0 p-0">Elion</h2>
                                            <p className="m-0 p-0 text-white"> LVL 2</p>
                                            <p className="m-0 price p-0 mb-1"> Silver planet</p>
                                            <img height="60px" src={silver} alt="" />
                                            {loading ?
                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                :
                                                <button onClick={() => { unlockPlanet(1) }} className="btn bg-success form-control mt-2 text-white ">
                                                    Unlock 1000
                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                </button>
                                            }
                                            {loading ?
                                                <button className="btn bg-secondaryform-control mt-2 px-5 text-white">Loading...</button>
                                                :
                                                <button className="btn bg-secondary form-control text-white mt-2">
                                                    Mine 40
                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                </button>
                                            }

                                            {/* { user.planets[0] != 0 ? <div>Unlocked</div> :<></>  } */}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Argon} />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">

                                            <h2 className="text-white m-0 p-0">Argon</h2>
                                            <p className="m-0 p-0 text-white"> LVL 3</p>
                                            <p className="m-0 price p-0 mb-1"> Gold planet</p>
                                            <img height="60px" src={gold} alt="" />
                                            {loading ?
                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                :
                                                <button className="btn bg-secondary form-control text-white mt-2">
                                                    Unlock 2000
                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                </button>
                                            }
                                            {loading ?
                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                :
                                                <button className="btn bg-secondary form-control text-white mt-2">
                                                    Mine 80
                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                </button>
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