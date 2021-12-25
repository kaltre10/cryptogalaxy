import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import urlApi from '../urlApi';
import invader from '../img/ships/invaders/rat.svg'
import RecTimer from '../components/recTimer';

const Invaders = (props) => {

    const [ship, setShip] = useState({})

    function getEnergy(ship) {
        if (ship.energy <= 0) {
            props.Toast(0, "No Energy!")
        } else {
            setShip(ship)
        }
    }

    const winRate = (atk, def) => {
        return Math.round((atk / (atk + def)) * 100)
    }

    async function attack(def) {
        props.stateLoading(true)
        if (ship.energy > 0) {
            //alert("energia: "+ship.energy)
            const wallet = props.user.wallet.toLowerCase()
            axios.put(urlApi + "/api/v1/attack", { wallet, def, ship }).then((res) => {
                props.connectOrRegister()
                if (res.data.win) {
                    props.Toast(1, res.data.msg)
                } else {
                    props.Toast(0, res.data.msg)
                }
               // console.log(res.data)
                props.stateLoading(false)
            }).catch(err => {
                alert(err.message)
                props.stateLoading(false)

            })

            /*
                .then((res) => {
                    if (res.data.win) {
                        props.Toast(1, res.data.msg)
                    } else {
                        props.Toast(0, res.data.msg)
                    }
                    console.log(res.data)

                    props.connectOrRegister()
                })
                .catch(err => console.log(err)) */
        } else {
            props.Toast(0, "No energy!")
        }
    }

    return (
        <div className='invadersBG'>
            <div className="container-fluid p-4">
                <div className="row">
                <div className=''>
                                <RecTimer user={props.user} upEnergy={props.upEnergy} />
                            </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <div className='bg-battle-zone d-flex justify-content-between'>
                                    <Link to="/inventory" className='btn btn-primary'>
                                        ← Back
                                    </Link>
                                    <div className=' text-center'>
                                        <h3> Battle Zone </h3>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-2'>
                        </div>

                    </div>
                    <div className="col-md-5 p-2">

                        <div className='invader-content p-2'>
                            <div className='d-flex justify-content-between px-4 bg-h3-invader-title mb-2'>
                                <h3 className='text-center'>My ships</h3>
                                <h3 className='text-warning'>{props.user.gm} Gm</h3>
                            </div>
                            <div className='p-1'>
                                <div className='row gx-2 gy-2'>
                                    {props.user.wallet != null ? <>
                                        {props.ships.map((item) => {
                                            return (
                                                <>
                                                    {
                                                        item.type === "Fighter" ? <>
                                                            <div key={item.id} className="col-12 col-sm-4">
                                                                <div className="nft">
                                                                    <div className="imgx">
                                                                        <img alt="" className="nft-image2 w-100" src={item.img} />

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
                                                                            <div className=" m-0 p-0">{item.name}</div>
                                                                            <p className="text-white m-0 pt-1"> ATK {item.attack} </p>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            {props.loading ? <button className="btn btn-secondary"> Attacking... </button> :
                                                                                <button onClick={() => { getEnergy(item) }} className="btn bg-danger form-control text-white"> Atack </button>
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </> : <></>
                                                    }
                                                </>
                                            )

                                        })}
                                    </> : <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='col-6'>
                        <h1>
                            {ship.attack != null ? <> {ship.attack} </> : <> 0 </>}

                        </h1>
                    </div> */}
                    <div className="col-md-7 p-2">
                        <div className='invader-content p-2'>
                            <h3 className='text-center bg-h3-invader-title p-1'>Invaders</h3>
                            <div className="row p-2">

                            <div className="col-3">
                                    <h4 className='text-center'>Inv T1</h4>
                                    <div className='bg-invader-enemy p-2'>
                                        <img src={invader} alt="" className='img-fluid' srcset="" />
                                    </div>
                                    <div className='text-center'>
                                        <div className='d-flex justify-content-around '>
                                            <div>
                                                ♦ 40
                                            </div>
                                            <div>
                                                {ship.attack != null ? <>
                                                    {
                                                        winRate(ship.attack, 40)
                                                    }
                                                </> : <> 0 </>
                                                } %
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <b className='text-warning'>Win 198 GM </b>
                                    </div>
                                    <div className='text-center'>
                                        {ship.attack != null ? <>
                                            {props.loading ?
                                                <button className='btn btn-secondary mt-2'> → Loading ← </button>
                                                :
                                                <button onClick={() => attack(40)} className='btn btn-danger mt-2'> → Select ← </button>
                                            }
                                        </> :
                                            <button className='btn btn-secondary mt-2'> → Select ← </button>}
                                    </div>
                                </div>

                                <div className="col-3">
                                    <h4 className='text-center'>Inv T2</h4>
                                    <div className='bg-invader-enemy p-2'>
                                        <img src={invader} alt="" className='img-fluid' srcset="" />
                                    </div>
                                    <div className='text-center'>
                                        <div className='d-flex justify-content-around '>
                                            <div>
                                                ♦ 120
                                            </div>
                                            <div>
                                                {ship.attack != null ? <>
                                                    {
                                                        winRate(ship.attack, 120)
                                                    }
                                                </> : <> 0 </>
                                                } %
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <b className='text-warning'>Win 420 GM </b>
                                    </div>
                                    <div className='text-center'>
                                        {ship.attack != null ? <>
                                            {props.loading ?
                                                <button className='btn btn-secondary mt-2'> → Loading ← </button>
                                                :
                                                <button onClick={() => attack(120)} className='btn btn-danger mt-2'> → Select ← </button>
                                            }
                                        </> :
                                            <button className='btn btn-secondary mt-2'> → Select ← </button>}
                                    </div>
                                </div>

                                <div className="col-3">
                                    <h4 className='text-center'>Inv T3</h4>
                                    <div className='bg-invader-enemy p-2'>
                                        <img src={invader} alt="" className='img-fluid' srcset="" />
                                    </div>
                                    <div className='text-center'>
                                        <div className='d-flex justify-content-around '>
                                            <div>
                                                ♦ 320
                                            </div>
                                            <div>
                                                {ship.attack != null ? <>
                                                    {
                                                        winRate(ship.attack, 320)
                                                    }
                                                </> : <> 0 </>
                                                } %
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <b className='text-warning'>Win 780 GM </b>
                                    </div>
                                    <div className='text-center'>
                                        {ship.attack != null ? <>
                                            {props.loading ?
                                                <button className='btn btn-secondary mt-2'> → Loading ← </button>
                                                :
                                                <button onClick={() => attack(320)} className='btn btn-danger mt-2'> → Select ← </button>
                                            }
                                        </> :
                                            <button className='btn btn-secondary mt-2'> → Select ← </button>}
                                    </div>
                                </div>

                                <div className="col-3">
                                    <h4 className='text-center'>Inv T4</h4>
                                    <div className='bg-invader-enemy p-2'>
                                        <img src={invader} alt="" className='img-fluid' srcset="" />
                                    </div>
                                    <div className='text-center'>
                                        <div className='d-flex justify-content-around '>
                                            <div>
                                                ♦ 720
                                            </div>
                                            <div>
                                                {ship.attack != null ? <>
                                                    {
                                                        winRate(ship.attack, 720)
                                                    }
                                                </> : <> 0 </>
                                                } %
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <b className='text-warning'>Win 1080 GM </b>
                                    </div>
                                    <div className='text-center'>
                                        {ship.attack != null ? <>
                                            {props.loading ?
                                                <button className='btn btn-secondary mt-2'> → Loading ← </button>
                                                :
                                                <button onClick={() => attack(720)} className='btn btn-danger mt-2'> → Select ← </button>
                                            }
                                        </> :
                                            <button className='btn btn-secondary mt-2'> → Select ← </button>}
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )

}

export default Invaders