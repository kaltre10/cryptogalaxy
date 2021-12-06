import React, { useEffect, useState } from "react";
import urlApi from '../urlApi';
import axios from "axios";

const SelectShip = (props) => {

    const [loading, setLoading] = useState(false);

    async function toMine(ship, planet) {

        setLoading(true);
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const wallet = accounts[0].toLowerCase()
        const user = await axios.get(urlApi + "/api/v1/user/" + wallet)
        const balance = user.data[0].gm
        if (balance >= planet.cost) {
            const mine = await axios.put(urlApi + "/api/v1/mine", { wallet, planet, ship });
            console.log(mine.data);
            setLoading(false)
            alert("you have mined " + mine.data.mined + " " + mine.data.material)
        } else {
            alert("Insuficient balance GM")
            setLoading(false)
        }
    }

    return (
        <>
            {props.selectship ?
                <div className="p-4 bg-dark d-flex justify-content-center loader-wrap">
                    <div className="center-ships w-100 p-3">
                        <div className="p-2 text-left d-flex justify-content-between mb-3 w-button-close-ship">
                            <div>
                                Mining {props.planet.mine} in planet {props.planet.name} -
                                LVL {props.planet.lvl}

                            </div>
                            <button onClick={props.closeShips} className="btn-close-ships" > Close </button>
                        </div>

                        <div className="row">
                            {props.ships.map((item) => {
                                return (
                                    <div className="col-6 col-sm-4 col-md-3 col-xl-2 ">
                                        <div className="nft">
                                            <div className="img">
                                                <img className="nft-image w-100" src={item.img} />
                                                <div className="mp-img">
                                                    mp : {item.mp}
                                                </div>
                                                <div className="id-img">
                                                             {item.id}
                                                        </div>
                                                <div className="type-img d-flex">
                                                    <div className="w-text-img">
                                                        {item.type}
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
                                            <div className="row pt-1 gx-0">
                                                <div className="col-6">
                                                    <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                    <p className="text-white m-0 p-0"> mp : {item.mp}</p>

                                                </div>
                                                <div className="col-6">
                                                    {loading ? <button className="btn btn-secondary"> Mining... </button> :
                                                        <button onClick={() => { toMine(item, props.planet) }} className="btn bg-danger form-control text-white">Mine</button>
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