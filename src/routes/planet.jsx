import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Ares from '../img/planets/Ares.webp';
import Argon from '../img/planets/Argon.webp';
import Elion from '../img/planets/Elion.webp';
import Fiz from '../img/planets/Fiz.webp';
import Seea from '../img/planets/Seea.webp';
import Terrat from '../img/planets/Terrat.webp';
import urlApi from "../urlApi";
import SelectShip from "../components/SelectShip";
import gm from '../img/gems.svg';
import iron from '../img/meterials/crud/iron.webp';
import silver from '../img/meterials/crud/silver.webp';
import gold from '../img/meterials/crud/gold.webp';
import ice from '../img/meterials/crud/ice.webp';
import diamond from '../img/meterials/crud/diamond.webp';
import petroleum from '../img/meterials/crud/petroleum.webp';

const Planet = (props) => {

    const [wallet, setWallet] = useState('');
    const [selectships, setSelectship] = useState(false);
    const [planet, setPlanet] = useState({});

    async function unlockPlanet(planet) {

        if (planet == 0)
            var amount = 600
        if (planet == 1)
            var amount = 1000
        if (planet == 2)
            var amount = 3000
        if (planet == 3)
            var amount = 6000
        if (planet == 4)
            var amount = 9000
        if (planet == 5)
            var amount = 12000

        props.stateLoading(true)

        if (props.user.gm > amount) {
            const unlock = await axios.put(urlApi + "/api/v1/unlockPlanet", { planet, wallet: props.user.wallet, amount })
            props.Toast(1, "planet Unlocked")
            console.log(unlock)
            props.stateLoading(false)
            props.connectOrRegister()
        } else {
            props.Toast(0, "Insuficient GM balance!")
            props.stateLoading(false)
            props.connectOrRegister()
        }
    }
    function mineryLevel(xp) {
        if (xp < 100) {
            return 1
        } else if (xp >= 100 && xp < 200) {
            return 2
        }
    }

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">

                <SelectShip connectOrRegister={props.connectOrRegister} loading={props.loading} loadingFalse={() => { props.stateLoading(false) }} loadingTrue={() => props.stateLoading(true)} selectship={selectships} closeShips={() => setSelectship(false)} user={props.user} planet={planet} Toast={props.Toast} />
                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar connectOrRegister={props.connectOrRegister} user={props.user} bnb={props.bnb} loading={props.loading} stateLoading={props.stateLoading} />
                    </div>
                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">
                        <div className="row">

                            <div className="col-12 p-3 bg-dark text-white mb-3 bg-materials-planet">
                                <div className="row">
                                    <div className="col-12 text-center ">
                                        <h4 className="bg-title-market">Minery level: {props.user.wallet != null ? <>
                                            {mineryLevel(props.user.xp.minery)}
                                        </> : <></>
                                        }</h4>
                                    </div>
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

                                            {props.user.wallet != null ? <>
                                                {props.user.planets[0] !== 0 ?
                                                    <div>
                                                        <button onClick={() => {
                                                            setSelectship(true);
                                                            setPlanet({ name: "Terrat", mine: "Iron", id: 0, lvl: 1, dif: 0.8 })
                                                        }}
                                                            className="btn bg-danger form-control text-white mt-2">
                                                            Mine
                                                        </button>
                                                    </div>
                                                    :
                                                    <div>
                                                        {props.loading ?
                                                            <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                            :
                                                            <button onClick={() => { unlockPlanet(0) }} className="btn bg-success form-control mt-2 text-white ">
                                                                Unlock 600
                                                                <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                            </button>
                                                        }
                                                    </div>
                                                }
                                            </> : <></>}
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
                                                {props.user.wallet != null ? <>
                                                    {props.user.planets[1] !== 0 ?
                                                        <div>
                                                            <button onClick={() => {
                                                                setSelectship(true);
                                                                setPlanet({ name: "Argon", mine: "silver", id: 1, lvl: 2, dif: 0.4 })
                                                            }}
                                                                className="btn bg-danger form-control text-white mt-2">
                                                                Mine
                                                            </button>
                                                        </div> :
                                                        <div>
                                                            {props.loading ?
                                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                                :
                                                                <button onClick={() => { unlockPlanet(1) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 1000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            }
                                                        </div>
                                                    }
                                                </> : <></>}
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
                                            {props.user.wallet != null ? <>
                                                {
                                                    props.user.planets[2] !== 0 ?
                                                        <div>
                                                            <button onClick={() => {
                                                                setSelectship(true);
                                                                setPlanet({ name: "Elion", mine: "gold", id: 2, lvl: 3, dif: 0.2 })
                                                            }}
                                                                className="btn bg-danger form-control text-white mt-2">
                                                                Mine
                                                            </button>
                                                        </div> :
                                                        <div>
                                                            {props.loading ?
                                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                                :
                                                                <button onClick={() => { unlockPlanet(2) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 3000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            }
                                                        </div>
                                                }
                                            </> : <></>}
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
                                            {props.user.wallet != null ? <>

                                                {
                                                    props.user.planets[3] !== 0 ?
                                                        <div>
                                                            <button onClick={() => {
                                                                setSelectship(true);
                                                                setPlanet({ name: "fiz", mine: "diamond", id: 3, lvl: 4, dif: 0.1 })
                                                            }}
                                                                className="btn bg-danger form-control text-white mt-2">
                                                                Mine
                                                            </button>
                                                        </div> :
                                                        <div>
                                                            {props.loading ?
                                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                                :
                                                                <button onClick={() => { unlockPlanet(3) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 6000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            }
                                                        </div>
                                                }
                                            </> : <></>}
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
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.06</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={ice} alt="planet" />
                                                        <div className="name-mineral">Ice</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {props.user.wallet != null ? <>

                                                {
                                                    props.user.planets[4] !== 0 ?
                                                        <div>
                                                            <button onClick={() => {
                                                                setSelectship(true);
                                                                setPlanet({ name: "seea", mine: "ice", id: 4, lvl: 5, dif: 0.06 })
                                                            }}
                                                                className="btn bg-danger form-control text-white mt-2">
                                                                Mine
                                                            </button>
                                                        </div> :
                                                        <div>
                                                            {props.loading ?
                                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                                :
                                                                <button onClick={() => { unlockPlanet(4) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 9000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            }
                                                        </div>
                                                }
                                            </> : <></>}
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
                                                    <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.03</b></p>

                                                </div>
                                                <div>
                                                    <div className="mineral">
                                                        <img className="vertical-align m-3" height="60px" src={petroleum} alt="planet" />
                                                        <div className="name-mineral">Petroleum</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {props.user.wallet != null ? <>

                                                {
                                                    props.user.planets[5] !== 0 ?
                                                        <div>
                                                            <button onClick={() => {
                                                                setSelectship(true);
                                                                setPlanet({ name: "ares", mine: "petroleum", id: 5, lvl: 6, dif: 0.03 })
                                                            }}
                                                                className="btn bg-danger form-control text-white mt-2">
                                                                Mine
                                                            </button>
                                                        </div> :
                                                        <div>
                                                            {props.loading ?
                                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                                :
                                                                <button onClick={() => { unlockPlanet(5) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 12000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            }
                                                        </div>
                                                }
                                            </> : <></>}
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