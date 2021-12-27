import React from "react";
import Sidebar from "../components/sidebar";
import RecTimer from "../components/recTimer";
import factory from '../img/ships/stations/factory.webp'
import { NavItem } from "react-bootstrap";
import { useState } from "react";
const Factory = (props) => {

    const [item,setItem] = useState({img:"/lkjl"})

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-ref">

                <div className="row gx-0">
                    <div className="col-3 bg-danger d-none d-md-block">
                        < Sidebar glx={props.glx} connectOrRegister={props.connectOrRegister} user={props.user} bnb={props.bnb} loading={props.loading} stateLoading={props.stateLoading} />
                    </div>

                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">

                        <div className="row">
                            <div className="col-12 bg-refinery mb-4 text-center">
                                <h1>Factory</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 bg-refinery mb-4 text-center">
                                <div className="row gx-4 p-3">
                                    <div className="col-2 border">
                                        <img src={factory} alt="" className="img-fluid border" />
                                    </div>
                                    <div className="col-6 border">
                                        <div className="border p-2 bg-dark">
                                            <div className="d-flex justify-content-center">
                                                <div className="p-2 bg-warning mx-1"> Miner </div>
                                                <div className="p-2 bg-warning mx-1"> Fighter </div>
                                                <div className="p-2 bg-warning mx-1"> Refinery </div>
                                                <div className="p-2 bg-warning mx-1"> Factory </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between p-2">
                                        <div className="bg-danger px-3">
                                                <h1>T1</h1>
                                            </div>
                                            <div className="bg-danger px-3">
                                                <h1>T2</h1>
                                            </div>
                                            <div className="bg-danger px-3">
                                                <h1>T3</h1>
                                            </div>
                                            <div className="bg-danger px-3">
                                                <h1>T4</h1>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="bg-dark p-2">
                                            Need to Build
                                            <div className="row">
                                                <div className="col-4">
                                                    M1
                                                </div>
                                                <div className="col-4">
                                                    M2
                                                </div>
                                                <div className="col-4">
                                                    M3
                                                </div>
                                            </div>

                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-4 border">
                                        <img src={factory} className="w-100 border" alt="" />
                                        <div className="fee text-warning text-left"> Sales rate 0.003 BNB  </div>
                                            <button className="btn btn-danger form-control"> BUILD </button>
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

export default Factory