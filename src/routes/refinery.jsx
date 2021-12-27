import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/sidebar";

import iron from '../img/meterials/crud/iron.webp'
import silver from '../img/meterials/crud/silver.webp'
import gold from '../img/meterials/crud/gold.webp'
import diamond from '../img/meterials/crud/diamond.webp'
import ice from '../img/meterials/crud/ice.webp'
import petroleum from '../img/meterials/crud/petroleum.webp'

import iron_bar from '../img/meterials/refined/iron_bar.webp'
import silver_bar from '../img/meterials/refined/silver_bar.webp'
import gold_bar from '../img/meterials/refined/gold_bar.webp'
import cut_diamond from '../img/meterials/refined/cut_diamond.webp'
import ice_bar from '../img/meterials/refined/ice_bar.webp'
import oil from '../img/meterials/refined/oil.webp'

import axios from "axios";
import urlApi from "../urlApi";
import energy from '../img/assets/energy.svg'
import RecTimer from "../components/recTimer";
const Refinery = (props) => {

    const [refinerys, setRefinerys] = useState([])

    useEffect(() => {
        park()
    }, [props.ships])

    function park() {
        var stationsPark = []
        props.ships.map((ship) => {
            if (ship.type === "Refinery") {
                stationsPark.push({
                    ...ship,
                    prepare: false
                })
            }
        })
        setRefinerys(stationsPark)
    }

    async function prepareMaterial(station, material, cant) {
        if (cant < 5) {
            props.Toast(0, "Insuficient materials")
        } else {

            const newStationsState = []
            refinerys.forEach(async (e) => {
                if (station._id === e._id) {
                    e.prepare = true
                    e.material = material

                    e.result = switchMaterial(material)
                    e.cost = switchCost(material)

                    newStationsState.push(e)
                } else {
                    newStationsState.push(e)
                }
            });
            setRefinerys(newStationsState)
        }


    }

    const switchCost = material => {
        if (material === "iron")
            return 5
        if (material === "silver")
            return 10
        if (material === "gold")
            return 15
        if (material === "diamond")
            return 20
        if (material === "ice")
            return 25
        if (material === "petroleum")
            return 30
    }

    const switchMaterial = material => {
        if (material === "iron")
            return "Iron Bar"
        if (material === "silver")
            return "Silver Bar"
        if (material === "gold")
            return "Gold Bar"
        if (material === "diamond")
            return "Cut Diamond"
        if (material === "ice")
            return "Ice Bar"
        if (material === "petroleum")
            return "Oil"
    }

    function changeMaterialForImg(material) {
        if (material === "iron")
            return iron_bar
        if (material === "silver")
            return silver_bar
        if (material === "gold")
            return gold_bar
        if (material === "diamond")
            return cut_diamond
        if (material === "ice")
            return ice_bar
        if (material === "petroleum")
            return oil
    }
    async function refine(station) {

        if (station.energy > 0) {

            if (station.material === undefined) {
                props.Toast(0, "Select Material ")
            } else {
                const Headers = { headers: { "Content-Type": "application/json", } }
                props.stateLoading(true)
                await axios.put(urlApi + "/api/v1/refine", {
                    station,
                    wallet: props.user.wallet
                }, Headers)
                    .then(res => {
                        console.log(res.data)
                        if (!res.data.error) {
                            props.Toast(1, res.data.msg)
                        } else {
                            alert("Error!: " + res.data.msg)
                        }
                    })
                    .catch(err => alert(err))
                    .finally(() => {
                        props.connectOrRegister()
                        props.stateLoading(false)
                    })
            }
        } else {
            props.Toast(0, "No Energy!")
        }

    }

    const energyTozero = (energy) => {
        if (energy < 1) {
            return 0
        } else {
            return energy
        }
    }

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-ref">
                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar connectOrRegister={props.connectOrRegister} user={props.user} bnb={props.bnb} loading={props.loading} stateLoading={props.stateLoading} />
                    </div>
                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">
                        <div className=''>
                            <RecTimer user={props.user} upEnergy={props.upEnergy} />
                        </div>
                        <div className="row">
                            <div className="col-12 bg-refinery mb-4 text-center">
                                <h1>Refinery</h1>
                            </div>
                        </div>

                        {props.user.wallet != null ? <>
                            {refinerys.map((item) => {
                                return (
                                    <div key={item._id}>
                                        {item.type === "Refinery" ? <>
                                            <div className="row bg-refinery mb-4">
                                                {props.loading ?
                                                    <div className="d-flex justify-content-center align-items-center load-ref">
                                                        <div className="text-center">
                                                            <div className="spinner-border" role="status"></div>
                                                            <div className="">Loading</div>
                                                        </div>
                                                    </div> : <></>
                                                }

                                                <div className="col-12 col-md-5 mb-3">
                                                    <h4 className="text-center">{item.name} {item.subType} </h4>
                                                    <div className="park">
                                                        <div className="text-center">
                                                            <div className="p-1 d-inline-flex energy-w">
                                                                <div className="d-flex align-items-center">
                                                                    <img className="energy-logo mx-1" src={energy} alt="" />
                                                                </div>
                                                                <div className="energy-cant ">
                                                                    {energyTozero(item.energy)}

                                                                </div>
                                                            </div>
                                                            <img className="w-100" src={item.img} alt="" />
                                                            <div className="p-1 border mb-2 bg-light rounded text-dark">
                                                                {item._id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-7">
                                                    <div className="row">
                                                        <div className="col-12 text-center">
                                                            <h4>
                                                                Add Materials<br />
                                                            </h4>
                                                            5 x Material = 1 Refined Material
                                                            <hr />
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <div className="col-2 text-center">
                                                                    <button onClick={() => prepareMaterial(item, "iron", props.user.materials.iron)} className="items">
                                                                        <img className="img-fluid" src={iron} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {props.user.wallet != null ? <>
                                                                            {
                                                                                props.user.materials.iron
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "silver", props.user.materials.silver)} className="items">
                                                                        <img className="img-fluid" src={silver} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {props.user.wallet != null ? <>
                                                                            {
                                                                                props.user.materials.silver
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "gold", props.user.materials.gold)} className="items">
                                                                        <img className="img-fluid" src={gold} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {props.user.wallet != null ? <>
                                                                            {
                                                                                props.user.materials.gold
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "diamond", props.user.materials.diamond)} className="items">
                                                                        <img className="img-fluid" src={diamond} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {props.user.wallet != null ? <>
                                                                            {
                                                                                props.user.materials.diamond
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "ice", props.user.materials.ice)} className="items">
                                                                        <img className="img-fluid" src={ice} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {props.user.wallet != null ? <>
                                                                            {
                                                                                props.user.materials.ice
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "petroleum", props.user.materials.petroleum)} className="items">
                                                                        <img className="img-fluid" src={petroleum} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {props.user.wallet != null ? <>
                                                                            {
                                                                                props.user.materials.petroleum
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <hr />
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="refined d-flex align-items-center justify-content-center">
                                                                <div className="mx-2">
                                                                    {item.result !== undefined ? <>
                                                                        {item.result}
                                                                    </> : <>No material</>}
                                                                </div>
                                                                <div className="item-to-refine d-flex justify-content-center">
                                                                    {props.wallet !== null ? <>
                                                                        {item.prepare ? <>
                                                                            <img className="w-100" src={changeMaterialForImg(item.material)} alt="" />
                                                                        </> : <h1>?</h1>
                                                                        }
                                                                    </> : <></>}
                                                                </div>
                                                                <div className="mx-2"> Cost {item.cost !== undefined ? <>{item.cost}</> : <>0</>} Gm</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 pt-3 d-flex justify-content-center">
                                                            <button className="btn btn-secondary mx-2" onClick={park}> Clean </button>
                                                            <button onClick={() => refine(item)} className="btn btn-danger mx-2">
                                                                Refine
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </> : <></>}
                                    </div>
                                )
                            })}
                        </> : <div className="text-center bg-refinery w-100 p-4 mt-4 rounded">
                            Loading... <br /><div className="spinner-border" role="status"></div>
                        </div>

                        }

                    </div>
                </div>
            </div>
        </>
    )

}

export default Refinery