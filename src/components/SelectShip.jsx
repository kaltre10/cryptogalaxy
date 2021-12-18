import React, { useEffect, useState } from "react";
import urlApi from '../urlApi';
import axios from "axios";

const SelectShip = (props) => {

    async function toMine(ship, planet) {
        if (ship.energy >= 1) {
            props.loadingTrue()
            const balance = props.user.gm
            const wallet = props.user.wallet.toLowerCase()
            if (balance >= ship.mp) {
                const axiosHeader = { headers: { "Content-Type": "application/json", } }
                const axiosParams = { wallet, planet, ship }
                const axiosUrl = urlApi + "/api/v1/mine";
                const mine = await axios.put(axiosUrl, axiosParams, axiosHeader);
                console.log(mine.data);
                props.Toast(1, "You have mined " + mine.data.mined + " " + mine.data.material);
                props.loadingFalse()
                props.connectOrRegister()
            } else {
                props.Toast(0, "Insuficient balance GM")
                props.loadingFalse()
            }
        } else {
            props.Toast(0, "No energy")
        }
    }
    /*  function energyFilter(en) {
 
         const ex = Math.round((en - Date.now()) / 1000);
 
         if (ex <= 0)
             return "0 S"
 
         if (ex < 60) {
             return Math.round(ex)+ "S"
 
         } else if (ex > 60 && ex < 3600) {
             var min = Math.floor(ex / 60)
             var sec = Math.round( (ex-min)*60)
             return min + " M " + sec + " S "
         } else if (ex > 3600) {
             var hor = Math.floor(ex / 3600)
             var min = Math.floor( ((ex-hor )/60) )
             return hor + " H " + min + " M "
         }
     } */

    return (
        <>
            {props.selectship ?
                <div className="p-4 bg-dark d-flex justify-content-center loader-wrap">
                    <div className="center-ships w-100 p-3">
                        <div className="p-2 text-left d-flex justify-content-between mb-3 w-button-close-ship">
                            <div>
                                Mining {props.planet.mine}, Planet {props.planet.name},
                                Lvl {props.planet.lvl}
                            </div>
                            <button onClick={props.closeShips} className="btn-close-ships" > Close </button>
                        </div>
                        <div className="row">
                            {props.ships.map((item) => {
                                return (
                                    <div key={item.id} className="col-12 col-sm-6 col-md-3">
                                        <div className="nft">
                                            <div className="img mhe">
                                                <img className="nft-image w-100" src={item.img} />
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
                                                <div className="col-6">
                                                    <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                    <p className="text-white m-0 p-0"> mp : {item.mp}</p>
                                                </div>
                                                <div className="col-6 pt-1">
                                                    {props.loading ? <button className="btn btn-secondary"> Mining... </button> :
                                                        <button onClick={() => { toMine(item, props.planet) }} className="btn bg-danger form-control text-white">Mine - {item.mp} GM</button>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                </div>
                : <div></div>
            }
        </>
    )
}

export default SelectShip