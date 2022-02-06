import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import urlApi from '../urlApi';
import axios from "axios";
import { useEffect } from "react";

const SelectShip = () => {
    const { upEnergy,connectOrRegister,ships, user, loading, stateLoading, Toast, planet, selectships, setSelectship, miners, setMiners } = useContext(DataContext)

    useEffect(() => {
        getMiners()
    }, [ships])

    const getMiners = async () => {
        let newMiners = []
        if (ships.length > 0) {
            ships.forEach(ship => {
                if (ship.type === "Miner" && !ship.onSell) {
                    newMiners.push(ship)
                }
            });
            /* ships.map((ship) => {
                if (ship.type === "Miner" && !ship.onSell) {
                    newMiners.push(ship)
                }
            }) */
            setMiners(newMiners)
        }
    }

    async function toMine(ship, planet) {
        if (ship.energy >= 1) {
            stateLoading(true)
            const balance = user.gm
            const wallet = user.wallet.toLowerCase()
            if (ship.mp <= 5 || balance >= ship.mp  ) {
                const axiosHeader = { headers: { "Content-Type": "application/json" } }
                const axiosParams = { wallet, planet, ship }
                const axiosUrl = urlApi + "/api/v1/mine";
                axios.put(axiosUrl, axiosParams).then((res) => {

                    switch (res.status) {
                        case 200:
                           Toast(1, res.data.msg)
                            break;
                        case 400:
                            Toast(0, res.data.msg)
                            break;

                        default:
                            Toast(0, "Undefined")
                            break;
                    }
                    connectOrRegister()
                }).catch((err) => {
                    Toast(0,err.message)
                    console.log(err)
                }).finally(() => {
                    //getMiners()
                    setTimeout(()=>{
                        stateLoading(false)
                    },5000)
                })

                //// console.log(mine.status);
                //Toast(1, "You have mined " + mine.data.mined + " " + mine.data.material);
            } else {
                Toast(0, "Insuficient balance GM")
                stateLoading(false)
            }
        } else {
            Toast(0, "No energy")
        }
    }

    const gmCost = (gm)=>{
        if(gm <= 5){
            return 0
        }else{
            return gm
        }
    }

    return (
        <>
            {selectships ?
                <div className="p-4 bg-dark d-flex justify-content-center loader-wrap">
                    <div className="center-ships w-100 p-3">
                        <div className="p-2 text-left d-flex justify-content-between mb-3 w-button-close-ship">
                            <div>
                                Mining {planet.mine}, Planet {planet.name},
                                Lvl {planet.lvl}

                               {/*  <button onClick={upEnergy}> UpEnergy </button> */}
                            </div>
                            <button onClick={() => setSelectship(false)} className="btn-close-ships" > X </button>
                        </div>
                        <div className="row">
                            {miners.length > 0 ? <>
                                {miners.map((item) => {
                                    return (
                                        <div key={item._id} className="col-12 col-sm-6 col-md-3">
                                            <div className="nft">
                                                <div className="img mhe">
                                                    <img className="nft-image w-100" src={item.img} alt={item.name} />
                                                    <div className="mp-img">
                                                        mp : {item.mp}
                                                    </div>
                                                    <div className="id-img">
                                                        {item.id}
                                                    </div>
                                                    <div className="type-img d-flex">
                                                        <div className="w-text-img">
                                                            {item.type} {item.subType}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="energy">
                                                    <div className="border-energy">
                                                        {item.energy > 0 ? <div className="in-energy">  </div> : <></>}
                                                        {item.energy > 1 ? <div className="in-energy">  </div> : <></>}
                                                        {item.energy < 2 ? <div className="out-energy">  </div> : <></>}
                                                        {item.energy < 1 ? <div className="out-energy">  </div> : <></>}
                                                    </div>
                                                </div>
                                                <div className="row gx-0">
                                                    {/* {item.energy} */}
                                                    <div className="col-6">
                                                        <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                        <p className="text-white m-0 p-0"> mp : {item.mp}</p>
                                                    </div>
                                                    <div className="col-6 pt-1">
                                                        {loading ? <button className="btn btn-secondary form-control"> Mining... </button> :
                                                            <button onClick={() => { toMine(item, planet) }} className="btn bg-danger form-control text-white">Mine - {gmCost(item.mp)} GM</button>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </> : <></>
                            }

                        </div>

                    </div>
                </div>
                : <div></div>
            }
        </>
    )
}

export default SelectShip