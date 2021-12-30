import React, { useContext } from "react";
import { useEffect } from "react";
import Sidebar from "../components/sidebar";
import { DataContext } from "../context/DataContext";
import iron from '../img/meterials/crud/iron.webp'
import silver from '../img/meterials/crud/silver.webp'
import gold from '../img/meterials/crud/gold.webp'
import diamond from '../img/meterials/crud/diamond.webp'
import ice from '../img/meterials/crud/ice.webp'
import petroleum from '../img/meterials/crud/petroleum.webp'

import energy from '../img/assets/energy.svg'
import RecTimer from "../components/recTimer";
const Refinery = () => {

    const {
        ships,
        user,
        loading,
        refinerys,
        park,
        prepareMaterial,
        changeMaterialForImg,
        refine,
        energyTozero, } = useContext(DataContext)

    useEffect(() => {
        park()
    }, [ships])

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-ref">
                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar  />
                    </div>
                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">
                        <div className=''>
                            <RecTimer  />
                        </div>
                        <div className="row">
                            <div className="col-12 bg-refinery mb-4 text-center">
                                <h1>Refinery</h1>
                            </div>
                        </div>

                        {user.wallet != undefined ? <>
                            {refinerys.map((item) => {
                                return (
                                    <div key={item._id}>
                                        {item.type === "Refinery" ? <>
                                            <div className="row bg-refinery mb-4">
                                                {loading ?
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
                                                                    <button onClick={() => prepareMaterial(item, "iron", user.materials.iron)} className="items">
                                                                        <img className="img-fluid" src={iron} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {user.wallet != null ? <>
                                                                            {
                                                                                user.materials.iron
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "silver", user.materials.silver)} className="items">
                                                                        <img className="img-fluid" src={silver} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {user.wallet != null ? <>
                                                                            {
                                                                                user.materials.silver
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "gold", user.materials.gold)} className="items">
                                                                        <img className="img-fluid" src={gold} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {user.wallet != null ? <>
                                                                            {
                                                                                user.materials.gold
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "diamond", user.materials.diamond)} className="items">
                                                                        <img className="img-fluid" src={diamond} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {user.wallet != null ? <>
                                                                            {
                                                                                user.materials.diamond
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "ice", user.materials.ice)} className="items">
                                                                        <img className="img-fluid" src={ice} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {user.wallet != null ? <>
                                                                            {
                                                                                user.materials.ice
                                                                            }
                                                                        </> : <> Loading.. </>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <button onClick={() => prepareMaterial(item, "petroleum", user.materials.petroleum)} className="items">
                                                                        <img className="img-fluid" src={petroleum} alt="" />
                                                                    </button>
                                                                    <div className="text-center">
                                                                        {user.wallet != null ? <>
                                                                            {
                                                                                user.materials.petroleum
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
                                                                    {user.wallet !== undefined ? <>
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