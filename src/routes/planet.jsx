import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Navbar from "../components/topNav";

import Ares from '../img/planets/Ares.webp';
import Argon from '../img/planets/Argon.webp';
import Elion from '../img/planets/Elion.webp';
import Fiz from '../img/planets/Fiz.webp';
import Seea from '../img/planets/Seea.webp';
import Terrat from '../img/planets/Terrat.webp';

import Loading from "../components/loading";
import SelectShip from "../components/SelectShip";
import gm from '../img/gems.svg';

import iron from '../img/meterials/crud/iron.webp';
import silver from '../img/meterials/crud/silver.webp';
import gold from '../img/meterials/crud/gold.webp';

import ice from '../img/meterials/crud/ice.webp';
import diamond from '../img/meterials/crud/diamond.webp';
import petroleum from '../img/meterials/crud/petroleum.webp';

import urlApi from "../urlApi";

const Planet = (props) => {


    const [wallet, setWallet] = useState('')
    const [selectship, setSelectship] = useState(false);
    /*   
      const [planet, setPlanet] = useState({}); */

    //Loading, alerts and errors
    /*     const [loading, setLoading] = useState(false)
        const [errorToast, setErrorToast] = useState(false)
        const [errorToasText, setErrorToastText] = useState("")
        const [infoToast, setInfoToast] = useState(false)
        const [infoToasText, setInfoToastText] = useState("")
        function getErrorToast(bool, message) { setErrorToast(bool); setErrorToastText(message) }
        function getInfoToasText(val) { setInfoToastText(val); setInfoToast(true) }
        function closeAlert() { setErrorToast(false) }
        function closeInfo() { setInfoToast(false) } */
    //end Loading, alerts and errors

    /*   const [user, setUser] = useState({})
      const [planets, setPlanets] = useState([0, 0, 0, 0, 0, 0])
      const [materials, setMaterials] = useState({})
      const [bnb, setBnb] = useState(10)
      const [glx, setGlx] = useState(10); */

    /* const [ships, setShips] = useState([]);

    async function getUser() {
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0].toLowerCase()
        const user = await axios.get(urlApi + "/api/v1/user/" + account)
        setMaterials(user.data[0].materials)
        setUser(user.data[0])
        setShips(user.data[0].ships)
        setPlanets(user.data[0].planets)
    } */

    /* async function connection() {
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
    } */

    async function mine(material, mp) {
        props.setLoading(true);
        const balance = props.user.gm

        if (balance > mp) {
            const mine = await axios.put(urlApi + "/api/v1/mine", { mp, wallet, material })
            alert("you have mined some materials")
            console.log(mine.data)
            props.setLoading(false);
            props.connectOrRegister()
        } else {
            alert("Insuficient balance GM")
            props.setLoading(false);
        }

    }
    /* 
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
        } */

    function closeShips() {
        setSelectship(false);
    }

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">

                {/*  <SelectShip selectship={selectship} closeShips={closeShips} ships={ships} planet={planet} /> */}
                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar connectOrRegister={props.connectOrRegister} user={props.user} bnb={props.bnb} loading={props.loading} stateLoading={props.stateLoading} />
                    </div>
                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">
                        <div className="row">

                            <div className="col-12 p-3 bg-dark text-white mb-3 bg-materials-planet">
                                <div className="row">
                                    <div className="col-2 text-center">
                                        Iron:<br />
                                        {props.user.wallet != null ? <>
                                            {props.user.materials.iron}
                                        </> : <></>
                                        }

                                    </div>
                                    <div className="col-2 text-center">
                                        Silver:<br />
                                        {props.user.wallet != null ? <>
                                            {props.user.materials.silver}
                                        </> : <></>
                                        }
                                    </div>
                                    <div className="col-2 text-center">
                                        Gold: <br />
                                        {props.user.wallet != null ? <>
                                            {props.user.materials.gold}
                                        </> : <></>
                                        }
                                    </div>
                                    <div className="col-2 text-center">
                                        Diamond: <br />
                                        {props.user.wallet != null ? <>
                                            {props.user.materials.diamond}
                                        </> : <></>
                                        }
                                    </div>
                                    <div className="col-2 text-center">
                                        Ice: <br />
                                        {props.user.wallet != null ? <>
                                            {props.user.materials.ice}
                                        </> : <></>
                                        }
                                    </div>
                                    <div className="col-2 text-center">
                                        Petroleum:<br />
                                        {props.user.wallet != null ? <>
                                            {props.user.materials.petroleum}
                                        </> : <></>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Terrat 1*/}
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Terrat} alt="planet" />
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
                                            {/* {
                                                planets[0] !== 0 ?
                                                    <div>
                                                        <button onClick={() => {
                                                            setSelectship(true);
                                                            setPlanet({ name: "Terrat", mine: "Iron", id: 0, lvl: 1, dif: 0.8, cost: 20 })
                                                        }}
                                                            className="btn bg-danger form-control text-white mt-2">
                                                            Mine
                                                        </button>
                                                    </div>
                                                    :
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
                                            } */}

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-md-2"></div>
                            <div className="col-12 col-md-2"></div>

                            {/* Argon 2*/}
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Argon} alt="planet" />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">
                                            <div className="d-flex justify-content-between">
                                                <div >
                                                    <h2 className="text-white m-0 p-0">Argon</h2>
                                                    <p className="m-0 p-0 text-white"> LVL 2</p>
                                                    <p className="m-0 price p-0 mb-1"> Silver Planet</p>
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.4</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={silver} alt="planet" />
                                                        <div className="name-mineral">Silver</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                {/* {
                                                    planets[1] !== 0 ?
                                                        <div>
                                                            <button onClick={() => {
                                                                setSelectship(true);
                                                                setPlanet({ name: "Argon", mine: "silver", id: 1, lvl: 2, dif: 0.4, cost: 30 })
                                                            }}
                                                                className="btn bg-danger form-control text-white mt-2">
                                                                Mine
                                                            </button>
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
                                                } */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* Elion 3*/}
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Elion} alt="planet" />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">

                                            <div className="d-flex justify-content-between">
                                                <div >
                                                    <h2 className="text-white m-0 p-0">Elion</h2>
                                                    <p className="m-0 p-0 text-white"> LVL 3</p>
                                                    <p className="m-0 price p-0 mb-1"> Gold planet</p>
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.02</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={gold} alt="planet" />
                                                        <div className="name-mineral">Gold</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {
                                                planets[2] !== 0 ?
                                                    <div>
                                                        <button onClick={() => {
                                                            setSelectship(true);
                                                            setPlanet({ name: "Elion", mine: "gold", id: 2, lvl: 3, dif: 0.2, cost: 50 })
                                                        }}
                                                            className="btn bg-danger form-control text-white mt-2">
                                                            Mine
                                                        </button>
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
                                            } */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-md-2"></div>
                            <div className="col-12 col-md-2"></div>
                            {/* Fiz 4*/}
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Fiz} alt="planet" />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">

                                            <div className="d-flex justify-content-between">
                                                <div >
                                                    <h2 className="text-white m-0 p-0">Fiz</h2>
                                                    <p className="m-0 p-0 text-white"> LVL 4</p>
                                                    <p className="m-0 price p-0 mb-1"> Diamond planet</p>
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.1</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={diamond} alt="planet" />
                                                        <div className="name-mineral">Diamond</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {
                                                planets[3] !== 0 ?
                                                    <div>
                                                        <button onClick={() => {
                                                            setSelectship(true);
                                                            setPlanet({ name: "fiz", mine: "diamond", id: 3, lvl: 4, dif: 0.1, cost: 70 })
                                                        }}
                                                            className="btn bg-danger form-control text-white mt-2">
                                                            Mine
                                                        </button>
                                                    </div> :
                                                    <div>
                                                        {loading ?
                                                            <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => { unlockPlanet(3, 3000) }} className="btn bg-success form-control mt-2 text-white ">
                                                                Unlock 3000
                                                                <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                            </button>
                                                        }
                                                    </div>
                                            } */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* Seea 5*/}
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Seea} alt="planet" />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">

                                            <div className="d-flex justify-content-between">
                                                <div >
                                                    <h2 className="text-white m-0 p-0">Seea</h2>
                                                    <p className="m-0 p-0 text-white"> LVL 5</p>
                                                    <p className="m-0 price p-0 mb-1"> Ice planet</p>
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.08</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={ice} alt="planet" />
                                                        <div className="name-mineral">Ice</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {
                                                planets[4] !== 0 ?
                                                    <div>
                                                         <button onClick={() => {
                                                            setSelectship(true);
                                                            setPlanet({ name: "seea", mine: "ice", id: 4, lvl: 5, dif: 0.08, cost: 90 })
                                                        }}
                                                            className="btn bg-danger form-control text-white mt-2">
                                                            Mine
                                                        </button>
                                                    </div> :
                                                    <div>
                                                        {loading ?
                                                            <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => { unlockPlanet(4, 3000) }} className="btn bg-success form-control mt-2 text-white ">
                                                                Unlock 3000
                                                                <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                            </button>
                                                        }
                                                    </div>
                                            } */}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-12 col-md-2"></div>
                            <div className="col-12 col-md-2"></div>
                            {/* Ares 6 */}
                            <div className="col-12 col-md-10 bg-w-planet">
                                <div className="row gx-0">
                                    <div className="col-4 col-md-5 px-2 py-3">
                                        <div className="w-img-planet p-3">
                                            <img className="planet-image w-100" src={Ares} alt="planet" />
                                        </div>
                                    </div>
                                    <div className="col-8 col-md-7 p-3 ">
                                        <div className="inplanet">

                                            <div className="d-flex justify-content-between">
                                                <div >
                                                    <h2 className="text-white m-0 p-0">Ares</h2>
                                                    <p className="m-0 p-0 text-white"> LVL 6</p>
                                                    <p className="m-0 price p-0 mb-1"> Petroleum planet</p>
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.05</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={petroleum} alt="planet" />
                                                        <div className="name-mineral">Petroleum</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {
                                                planets[5] !== 0 ?
                                                    <div>
                                                        <button onClick={() => {
                                                            setSelectship(true);
                                                            setPlanet({ name: "ares", mine: "petroleum", id: 5, lvl: 6, dif: 0.05, cost: 120 })
                                                        }}
                                                            className="btn bg-danger form-control text-white mt-2">
                                                            Mine
                                                        </button>
                                                    </div> :
                                                    <div>
                                                        {loading ?
                                                            <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => { unlockPlanet(5, 3000) }} className="btn bg-success form-control mt-2 text-white ">
                                                                Unlock 3000
                                                                <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                            </button>
                                                        }
                                                    </div>
                                            } */}
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