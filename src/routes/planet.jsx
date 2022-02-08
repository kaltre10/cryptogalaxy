import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Sidebar from "../components/sidebar";
import Ares from '../img/planets/Ares.webp';
import Argon from '../img/planets/Argon.webp';
import Elion from '../img/planets/Elion.webp';
import Fiz from '../img/planets/Fiz.webp';
import Seea from '../img/planets/Seea.webp';
import Terrat from '../img/planets/Terrat.webp';
import SelectShip from "../components/SelectShip";
import gm from '../img/gems.svg';
import iron from '../img/meterials/crud/iron.webp';
import silver from '../img/meterials/crud/silver.webp';
import gold from '../img/meterials/crud/gold.webp';
import ice from '../img/meterials/crud/ice.webp';
import diamond from '../img/meterials/crud/diamond.webp';
import petroleum from '../img/meterials/crud/petroleum.webp';
import RecTimer from "../components/recTimer";
import { useEffect } from "react";

const Planet = () => {
    const { user, loading, setSelectship, mineryLevel, setPlanet, unlockPlanet, mlvl } = useContext(DataContext)
    const [xpStyle, setxpStyle] = useState({})

    useEffect(() => {
        getStyle()
    }, [user.xp])

    const getStyle = () => {
        if (user.xp !== undefined) {
            const xp = user.xp.minery
            let percent
            if (xp < mlvl[0])
                percent = xp / mlvl[0] * 100
            if (xp >= mlvl[0] && xp <= mlvl[1])
                percent = xp / mlvl[1] * 100
            if (xp >= mlvl[1] && xp < mlvl[2])
                percent = xp / mlvl[2] * 100
            if (xp >= mlvl[2] && xp < mlvl[3])
                percent = xp / mlvl[3] * 100
            if (xp >= mlvl[3] && xp < mlvl[4])
                percent = xp / mlvl[4] * 100
            if (xp >= mlvl[4])
                percent = xp / mlvl[5] * 100
            setxpStyle({
                width: percent + "%"
            })
        }
    }

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">

                <SelectShip />

                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar />
                    </div>
                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">
                        {loading ? <>
                            <div className="p-4 text-center bg-dark text-white mb-3 bg-materials-planet" >
                                <div className="spinner-border"></div>
                                <div>
                                    Looking for planets...
                                </div>
                            </div>
                        </> : <>
                            <div className="row">
                                <div className="col-12 p-1 bg-dark text-white mb-3 bg-materials-planet">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="bg-title-market d-flex justify-content-between align-items-center px-4">
                                                <div>
                                                    <h4 className="">Minery level: {user.wallet != null ? <>
                                                        {mineryLevel(user.xp.minery)}
                                                    </> : <></>
                                                    }</h4>
                                                    <div className="p-1 bg-darkxp">
                                                        <div style={xpStyle} className="mineryxp px-1">
                                                        </div>
                                                        <div className="xpText">
                                                            XP {user.xp.minery}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <RecTimer />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-2 text-center">
                                            Iron<br />
                                            {user.wallet != null ? <>
                                                {user.materials.iron}
                                            </> : <></>
                                            }
                                        </div>
                                        <div className="col-4 col-md-2 text-center">
                                            Silver<br />
                                            {user.wallet != null ? <>
                                                {user.materials.silver}
                                            </> : <></>
                                            }
                                        </div>
                                        <div className="col-4 col-md-2 text-center">
                                            Gold <br />
                                            {user.wallet != null ? <>
                                                {user.materials.gold}
                                            </> : <></>
                                            }
                                        </div>
                                        <div className="col-4 col-md-2 text-center">
                                            Diamond <br />
                                            {user.wallet != null ? <>
                                                {user.materials.diamond}
                                            </> : <></>
                                            }
                                        </div>
                                        <div className="col-4 col-md-2 text-center">
                                            Ice <br />
                                            {user.wallet != null ? <>
                                                {user.materials.ice}
                                            </> : <></>
                                            }
                                        </div>
                                        <div className="col-4 col-md-2 text-center">
                                            Petroleum<br />
                                            {user.wallet != null ? <>
                                                {user.materials.petroleum}
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
                                                        <p className="m-0 p-0 price"> Xp need 0</p>
                                                        <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.8</b></p>

                                                    </div>
                                                    <div>
                                                        <div className="mineral">
                                                            <img className="vertical-align m-3" height="60px" alt="planet" src={iron} />
                                                            <div className="name-mineral">IRON</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button onClick={() => {
                                                        setSelectship(true);
                                                        setPlanet({ name: "Terrat", mine: "Iron", id: 0, lvl: 1, dif: 0.8 })
                                                    }}
                                                        className="btn bg-danger form-control text-white mt-2">
                                                        Mine
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Terrar 1*/}

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
                                                        <p className="m-0 p-0 price"> Xp need 58</p>
                                                        <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.4</b></p>

                                                    </div>
                                                    <div>
                                                        <div className="mineral">
                                                            <img className="vertical-align m-3" height="60px" src={silver} alt="planet" />
                                                            <div className="name-mineral">Silver</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* inicio */}
                                                <div>
                                                    {!loading ? <>
                                                        {mineryLevel(user.xp.minery) >= 2 ? <>
                                                            {user.planets[1] !== 0 ?
                                                                <div>
                                                                    <button onClick={() => {
                                                                        setSelectship(true);
                                                                        setPlanet({ name: "Argon", mine: "Silver", id: 1, lvl: 2, dif: 0.4 })
                                                                    }}
                                                                        className="btn bg-danger form-control text-white mt-2">
                                                                        Mine
                                                                    </button>
                                                                </div> :
                                                                <div>
                                                                    <button onClick={() => { unlockPlanet(1) }} className="btn bg-success form-control mt-2 text-white ">
                                                                        Unlock 1000
                                                                        <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                    </button>
                                                                </div>
                                                            }
                                                        </> :
                                                            <div className="blockPlanet p-3 mt-4">
                                                                <h1>Locked</h1>
                                                                <hr />
                                                                <div className="unlocklvl mt-3">
                                                                    Unlocks at level 2
                                                                </div>
                                                            </div>
                                                        }
                                                    </> :
                                                        <div className="text-center">
                                                            <div className="spinner-border"></div>
                                                        </div>
                                                    }
                                                </div>
                                                {/* fin */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Argon 2*/}
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
                                                    <div>
                                                        <h2 className="text-white m-0 p-0">Elion</h2>
                                                        <p className="m-0 p-0 text-white"> LVL 3</p>
                                                        <p className="m-0 p-0 price"> Xp need 420</p>
                                                        <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.2</b></p>
                                                    </div>
                                                    <div>
                                                        <div className="mineral">
                                                            <img className="vertical-align m-3" height="60px" src={gold} alt="planet" />
                                                            <div className="name-mineral">Gold</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!loading ? <>
                                                    {mineryLevel(user.xp.minery) >= 3 ? <>
                                                        {user.planets[2] !== 0 ?
                                                            <div>
                                                                <button onClick={() => {
                                                                    setSelectship(true);
                                                                    setPlanet({ name: "Elion", mine: "Gold", id: 2, lvl: 3, dif: 0.2 })
                                                                }}
                                                                    className="btn bg-danger form-control text-white mt-2">
                                                                    Mine
                                                                </button>
                                                            </div> :
                                                            <div>
                                                                <button onClick={() => { unlockPlanet(2) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 3000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            </div>
                                                        }
                                                    </> :
                                                        <div className="blockPlanet p-3 mt-4">
                                                            <h1>Locked</h1>
                                                            <hr />
                                                            <div className="unlocklvl mt-3">
                                                                Unlocks at level 3
                                                            </div>
                                                        </div>
                                                    }
                                                </> :
                                                    <div className="text-center">
                                                        <div className="spinner-border"></div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Elion 3*/}
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
                                                    <div>
                                                        <h2 className="text-white m-0 p-0">Fiz</h2>
                                                        <p className="m-0 p-0 text-white"> LVL 4</p>
                                                        <p className="m-0 p-0 price"> Xp need 1080</p>
                                                        <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.1</b></p>
                                                    </div>
                                                    <div>
                                                        <div className="mineral">
                                                            <img className="vertical-align m-3" height="60px" src={diamond} alt="planet" />
                                                            <div className="name-mineral">Diamond</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!loading ? <>
                                                    {mineryLevel(user.xp.minery) >= 4 ? <>
                                                        {user.planets[3] !== 0 ?
                                                            <div>
                                                                <button onClick={() => {
                                                                    setSelectship(true);
                                                                    setPlanet({ name: "fiz", mine: "Diamond", id: 3, lvl: 4, dif: 0.1 })
                                                                }}
                                                                    className="btn bg-danger form-control text-white mt-2">
                                                                    Mine
                                                                </button>
                                                            </div> :
                                                            <div>
                                                                <button onClick={() => { unlockPlanet(3) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 6000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            </div>
                                                        }
                                                    </> :
                                                        <div className="blockPlanet p-3 mt-4">
                                                            <h1>Locked</h1>
                                                            <hr />
                                                            <div className="unlocklvl mt-3">
                                                                Unlocks at level 4
                                                            </div>
                                                        </div>
                                                    }
                                                </> :
                                                    <div className="text-center">
                                                        <div className="spinner-border"></div>
                                                    </div>
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* Fiz 4*/}
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
                                                        <p className="m-0 p-0 price"> Xp need 2012</p>
                                                        <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.06</b></p>

                                                    </div>
                                                    <div>
                                                        <div className="mineral">
                                                            <img className="vertical-align m-3" height="60px" src={ice} alt="planet" />
                                                            <div className="name-mineral">Ice</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!loading ? <>
                                                    {mineryLevel(user.xp.minery) >= 5 ? <>
                                                        {user.planets[4] !== 0 ?
                                                            <div>
                                                                <button onClick={() => {
                                                                    setSelectship(true);
                                                                    setPlanet({ name: "seea", mine: "Ice", id: 4, lvl: 5, dif: 0.06 })
                                                                }}
                                                                    className="btn bg-danger form-control text-white mt-2">
                                                                    Mine
                                                                </button>
                                                            </div> :
                                                            <div>
                                                                <button onClick={() => { unlockPlanet(4) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 9000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            </div>
                                                        }
                                                    </> :
                                                        <div className="blockPlanet p-3 mt-4">
                                                            <h1>Locked</h1>
                                                            <hr />
                                                            <div className="unlocklvl mt-3">
                                                                Unlocks at level 5
                                                            </div>
                                                        </div>
                                                    }
                                                </> :
                                                    <div className="text-center">
                                                        <div className="spinner-border"></div>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* Seea 5 */}

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
                                                        <p className="m-0 p-0 price"> Xp need 2920</p>
                                                        <p className="m-0 price p-0 mb-1"> Dificulty: <b>0.03</b></p>

                                                    </div>
                                                    <div>
                                                        <div className="mineral">
                                                            <img className="vertical-align m-3" height="60px" src={petroleum} alt="planet" />
                                                            <div className="name-mineral">Petroleum</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!loading ? <>
                                                    {mineryLevel(user.xp.minery) >= 6 ? <>
                                                        {user.planets[5] !== 0 ?
                                                            <div>
                                                                <button onClick={() => {
                                                                    setSelectship(true);
                                                                    setPlanet({ name: "ares", mine: "Petroleum", id: 5, lvl: 6, dif: 0.03 })
                                                                }}
                                                                    className="btn bg-danger form-control text-white mt-2">
                                                                    Mine
                                                                </button>
                                                            </div> :
                                                            <div>
                                                                <button onClick={() => { unlockPlanet(5) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 12000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            </div>
                                                        }
                                                    </> :
                                                        <div className="blockPlanet p-3 mt-4">
                                                            <h1>Locked</h1>
                                                            <hr />
                                                            <div className="unlocklvl mt-3">
                                                                Unlocks at level 6
                                                            </div>
                                                        </div>
                                                    }
                                                </> :
                                                    <div className="text-center">
                                                        <div className="spinner-border"></div>
                                                    </div>
                                                }
                                                {/* user.wallet != null ? <>

                                                {
                                                    user.planets[5] !== 0 ?
                                                        <div>
                                                            <button onClick={() => {
                                                                setSelectship(true);
                                                                setPlanet({ name: "ares", mine: "Petroleum", id: 5, lvl: 6, dif: 0.03 })
                                                            }}
                                                                className="btn bg-danger form-control text-white mt-2">
                                                                Mine
                                                            </button>
                                                        </div> :
                                                        <div>
                                                            {loading ?
                                                                <button className="btn bg-secondary form-control mt-2 px-5 text-white">Loading...</button>
                                                                :
                                                                <button onClick={() => { unlockPlanet(5) }} className="btn bg-success form-control mt-2 text-white ">
                                                                    Unlock 12000
                                                                    <img className=" mx-1 img-gm-button" src={gm} alt="" />
                                                                </button>
                                                            }
                                                        </div>
                                                }
                                            </> : <></> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* Ares */}
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Planet