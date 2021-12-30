import React, { useContext } from "react";
import Sidebar from "../components/sidebar";
import { DataContext } from "../context/DataContext";
import energy from '../img/assets/energy.svg'
import { useState } from "react";
import { useEffect } from "react";
import minersBuild from '../items/miners'
import fightersBuild from '../items/fighters'
import stationsBuild from '../items/stations'
import urlApi from "../urlApi";
import axios from "axios";

import iron_bar from '../img/meterials/refined/iron_bar.webp';
import silver_bar from '../img/meterials/refined/silver_bar.webp';
import gold_bar from '../img/meterials/refined/gold_bar.webp';
import cut_diamond from '../img/meterials/refined/cut_diamond.webp';
import ice_bar from '../img/meterials/refined/ice_bar.webp';
import oil_ from '../img/meterials/refined/oil.webp';


const Factory = () => {

    const {
        user,
        Toast,
        loading,
        stateLoading,
        connectOrRegister,
        factorys } = useContext(DataContext)

    const [buildShips, setBuidShips] = useState([])
    const [resultShip, setResultShip] = useState({})
    const [materialsNeeded, setmaterialsNeeded] = useState([])
    const [build, setBuild] = useState(false)

    useEffect(() => {
        setBuidShips(minersBuild)
    }, [factorys])

    const changeRecipe = async (recipe) => {
        const obj = []

        const { ironbar, silverbar, goldbar, cutdiamond, icebar, oil } = user.refined
        setBuild(true)

        recipe.map((recipe) => {
            let border = "1px solid green"
            let color = "green"

            if (recipe.item == "Ironbar") {
                if (ironbar < recipe.cant) {
                    border = "1px solid gray"
                    color = "gray"
                    setBuild(false)
                }
                obj.push({ ...recipe, have: ironbar, img: iron_bar, style: { border, color } })
            }

            if (recipe.item == "Silverbar") {
                if (silverbar < recipe.cant) {
                    border = "1px solid gray"
                    color = "gray"
                    setBuild(false)
                }
                obj.push({ ...recipe, have: silverbar, img: silver_bar, style: { border, color } })
            }

            if (recipe.item == "Goldbar") {
                if (goldbar < recipe.cant) {
                    border = "1px solid gray"
                    color = "gray"
                    setBuild(false)
                }
                obj.push({ ...recipe, have: goldbar, img: gold_bar, style: { border, color } })
            }

            if (recipe.item == "Icebar") {
                if (icebar < recipe.cant) {
                    border = "1px solid gray"
                    color = "gray"
                    setBuild(false)
                }
                obj.push({ ...recipe, have: icebar, img: ice_bar, style: { border, color } })
            }

            if (recipe.item == "Cutdiamond") {
                if (cutdiamond < recipe.cant) {
                    border = "1px solid gray"
                    color = "gray"
                    setBuild(false)
                }
                obj.push({ ...recipe, have: cutdiamond, img: cut_diamond, style: { border, color } })
            }

            if (recipe.item == "Oil") {
                if (oil < recipe.cant) {
                    border = "1px solid gray"
                    color = "gray"
                    setBuild(false)
                }
                obj.push({ ...recipe, have: oil, img: oil_, style: { border, color } })
            }

        })

        setmaterialsNeeded(obj)
    }

    const changeBuilding = (e) => {
        const target = e.target.value
        if (target == "miners")
            setBuidShips(minersBuild)

        if (target == "fighters")
            setBuidShips(fightersBuild)

        if (target === "stations")
            setBuidShips(stationsBuild)
    }

    const buildShip = async(ship)=>{
        stateLoading(true)
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const wallet = await accounts[0]
        const headers  = { headers: { "Content-Type": "application/json" } }
        axios.put(urlApi+"/api/v1/buildShip",{
            ship,wallet
        },headers).then((res)=>{
            
                Toast(1,res.data.msg)
                setmaterialsNeeded([])
                connectOrRegister()
            
        }).catch((error)=>{
            Toast(0,error.message)
        }).finally(()=>{
            stateLoading(false)
        } )
    }

    return (
        <>

            <div className="container-fluid m-0 p-0 bg-ref">

                <div className="row gx-0">
                    <div className="col-3 bg-danger d-none d-md-block">
                        < Sidebar />
                    </div>

                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">

                        <div className="row">
                            <div className="col-12 bg-refinery mb-4 text-center">
                                <h1>Factory</h1>

                            </div>
                        </div>
                        {loading ?
                            <div className="text-center">
                                <div className="spinner-border" role="status"></div>
                            </div> : <>
                                <div>
                                    {factorys.map((item) => {
                                        return (
                                            <div key={item._id}>
                                                <div className="row">
                                                    <div className="col-12 bg-refinery mb-4">
                                                        <div className="px-3">
                                                            ID: {item._id}
                                                        </div>
                                                        <div className="row gx-4 p-3">
                                                            <div className="col-2 text-center">
                                                                {item.type} {item.subType}
                                                                <img src={item.img} alt="" className="img-fluid img-factory" />
                                                                <div>
                                                                    <img height="20px" src={energy} alt="" />
                                                                    {item.energy}
                                                                </div>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="p-2 bg-dark">
                                                                    <div className="d-block">What do you want to build?
                                                                        <select onChange={changeBuilding} name="type" id="" className="form-control select-factory">
                                                                            <option value="miners">Miner</option>
                                                                            <option value="fighters">Fighter</option>
                                                                            <option value="stations">Refinery</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="row my-2">

                                                                    {buildShips.map((item) => {
                                                                        return (
                                                                            <div key={item._id} onClick={() => { setResultShip(item); changeRecipe(item.recipe) }} className="col-3 gx-2">
                                                                                <div className="bg-const bg-constx p-1">
                                                                                    <div className="text-center w-it-build">
                                                                                        <div>
                                                                                            {item.type} {item.subType}
                                                                                        </div>
                                                                                        <div className="d-flex align-items-center img-build">
                                                                                            <img src={item.img} className="img-fluid" alt="" />
                                                                                        </div>
                                                                                        <div className="name-item-build">
                                                                                            {item.name}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>)
                                                                    })}
                                                                </div>
                                                                <div className="">
                                                                    <div className="bg-dark p-2 ">

                                                                        <div className="p-2 bg-refined mt-3">
                                                                            <div>Materials you need</div><hr />
                                                                            <div className="row gx-0">
                                                                                {materialsNeeded.map((item) => {
                                                                                    return (
                                                                                        <div className="col-3">
                                                                                            <div style={item.style} className="p-1 border-radius text-center m-1">
                                                                                                <div> <img height="40px" src={item.img} alt="" /> </div>
                                                                                                <div className="he-1" style={item.style}>
                                                                                                    {item.item} {item.have} / {item.cant}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-3 bg-dark pt-3">
                                                                {resultShip.img !== undefined ?
                                                                    <div className="materials-to-build p-2">
                                                                        <div className="text-center">
                                                                            {resultShip.type} {resultShip.subType}
                                                                        </div>
                                                                        <img src={resultShip.img} className="w-100 " alt="" />
                                                                        <div className="text-center">
                                                                            {resultShip.name}
                                                                        </div>
                                                                    </div> : <>
                                                                        <h1 className="text-center materials-to-build d-flex align-items-center justify-content-center">?</h1>
                                                                    </>}
                                                                <div className="fee text-warning text-left m-2"> Sales rate 0.003 BNB  </div>
                                                                {build ? <>
                                                                    <button onClick={()=>{ buildShip(resultShip) }} className="btn btn-success form-control"> BUILD </button>
                                                                </> : <>
                                                                    <button className="btn btn-secondary form-control"> BUILD </button>
                                                                </>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>
        </>
    )

}

export default Factory