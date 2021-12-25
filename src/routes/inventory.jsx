import React from 'react'
import Sidebar from '../components/sidebar'
import RecTimer from '../components/recTimer';

import iron from '../img/meterials/crud/iron.webp';
import iron_bar from '../img/meterials/refined/iron_bar.webp';
import silver_bar from '../img/meterials/refined/silver_bar.webp';
import gold_bar from '../img/meterials/refined/gold_bar.webp';
import ice_bar from '../img/meterials/refined/ice_bar.webp';
import oil from '../img/meterials/refined/oil.webp';
import cut_diamond from '../img/meterials/refined/cut_diamond.webp';

import silver from '../img/meterials/crud/silver.webp';
import gold from '../img/meterials/crud/gold.webp';
import diamond from '../img/meterials/crud/diamond.webp';
import ice from '../img/meterials/crud/ice.webp';
import petroleum from '../img/meterials/crud/petroleum.webp';

function Inventory(props) {

   /*  const [sell, setSell] = useState(); */

    async function sellShip(id) {
        props.Toast(0, "Market is off")
    }

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">

                <div className="row gx-0">
                    <div className="col-3 bg-danger d-none d-md-block">
                        < Sidebar glx={props.glx} connectOrRegister={props.connectOrRegister} user={props.user} bnb={props.bnb} loading={props.loading} stateLoading={props.stateLoading} />
                    </div>

                    <div className="col-12 col-md-9">
                        <div className="w-market-container p-3">


                            <div className=''>
                                <RecTimer user={props.user} upEnergy={props.upEnergy} />
                            </div>
                            <div className="w-inventory-item p-2">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="text-center bg-title-market"> Ships </h3>

                                    </div>
                                    {props.loading ? <div className='w-100 text-center'>
                                        <div class="spinner-border" role="status"></div>
                                    </div> : <>
                                        {props.user.wallet !== undefined ?
                                            props.ships.map((item) => {
                                                return (
                                                    <div key={item._id} className="col-12 col-sm-6 col-xl-3 ">
                                                        <div className="nft">
                                                            <div className="img">
                                                                <img alt=""className="nft-image w-100" src={item.img} />
                                                                <div className="mp-img">
                                                                    mp : {item.mp}
                                                                </div>
                                                                <div className="id-img">
                                                                    {item._id}
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

                                                            <div className="row pt-1 gx-0">
                                                                <div className="col-6">
                                                                    <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                                    <p className="text-white m-0 p-0"> ATK {item.attack !== 1 ? <>{item.attack}</> : <>0</>} </p>
                                                                </div>
                                                                <div className="col-6">
                                                                    <button onClick={() => sellShip(item.id)} className='form-control'> Sell </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : <>
                                                No ships in inventory
                                            </>
                                        }
                                    </>}
                                </div>
                            </div>

                            <div className="w-inventory-item p-3">
                                <h3 className="text-center bg-title-market"> Materials </h3>

                                {props.user.wallet !== undefined ? <>
                                    <div className="row">
                                        {props.user.materials.iron > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Iron</h4>
                                                    </div>
                                                    <div>
                                                        <img alt=""height="50px" className="" src={iron} />

                                                    </div>
                                                    <div className="text-white">
                                                        {props.user.materials.iron}
                                                    </div>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {props.user.materials.silver > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Silver</h4>
                                                    </div>
                                                    <div>
                                                        <img alt=""height="50px" className="" src={silver} />

                                                    </div>
                                                    <div className="text-white">
                                                        {props.user.materials.silver}
                                                    </div>
                                                </div>
                                            </div>
                                        </> : <></>}

                                        {props.user.materials.gold > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Gold</h4>
                                                    </div>
                                                    <div>
                                                        <img alt=""height="50px" className="" src={gold} />

                                                    </div>
                                                    <div className="text-white">
                                                        {props.user.materials.gold}
                                                    </div>
                                                </div>
                                            </div>
                                        </> : <></>
                                        }
                                        {props.user.materials.diamond > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Diamond</h4>
                                                    </div>
                                                    <div>
                                                        <img alt=""height="50px" className="" src={diamond} />

                                                    </div>
                                                    <div className="text-white">
                                                        {props.user.materials.diamond}
                                                    </div>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {props.user.materials.ice > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Ice</h4>
                                                    </div>
                                                    <div>
                                                        <img alt=""height="50px" className="" src={ice} />

                                                    </div>
                                                    <div className="text-white">
                                                        {props.user.materials.ice}
                                                    </div>
                                                </div>
                                            </div>
                                        </> : <></>}
                                        {props.user.materials.petroleum > 0 ? <>
                                            <div className="px-2 col-6 col-md-2  my-2">
                                                <div className="p-2 material-bg text-center ">
                                                    <div>
                                                        <h4 className="text-white m-0 p-0">Petroleum</h4>
                                                    </div>
                                                    <div>
                                                        <img alt=""height="50px" className="" src={petroleum} />

                                                    </div>
                                                    <div className="text-white">
                                                        {props.user.materials.petroleum}
                                                    </div>
                                                </div>
                                            </div>
                                        </> : <></>}
                                    </div>
                                </> : <></>}

                            </div>

                            <div className="w-inventory-item p-3">
                                <h3 className="text-center bg-title-market"> Refined Materials </h3>

                                {props.user.wallet !== undefined ? <>
                                    <div className="row">
                                    {props.user.refined.ironbar > 0 ? <>
                                        <div className="px-2 col-6 col-md-2  my-2">
                                            <div className="p-2 material-bg text-center ">
                                                <div>
                                                    <h4 className="text-white m-0 p-0">Iron Bar</h4>
                                                </div>
                                                <div>
                                                    <img alt=""height="50px" className="" src={iron_bar} />

                                                </div>
                                                <div className="text-white">
                                                    {props.user.refined.ironbar}
                                                </div>
                                            </div>
                                        </div>
                                    </>:<></>}
                                    {props.user.refined.silverbar > 0 ? <>
                                        <div className="px-2 col-6 col-md-2  my-2">
                                            <div className="p-2 material-bg text-center ">
                                                <div>
                                                    <h4 className="text-white m-0 p-0">Silver Bar</h4>
                                                </div>
                                                <div>
                                                    <img alt=""height="50px" className="" src={silver_bar} />

                                                </div>
                                                <div className="text-white">
                                                    {props.user.refined.silverbar}
                                                </div>
                                            </div>
                                        </div>
                                    </>:<></>}
                                    {props.user.refined.goldbar > 0 ? <>
                                        <div className="px-2 col-6 col-md-2  my-2">
                                            <div className="p-2 material-bg text-center ">
                                                <div>
                                                    <h4 className="text-white m-0 p-0">Gold Bar</h4>
                                                </div>
                                                <div>
                                                    <img alt=""height="50px" className="" src={gold_bar} />

                                                </div>
                                                <div className="text-white">
                                                    {props.user.refined.goldbar}
                                                </div>
                                            </div>
                                        </div>
                                    </>:<></>}
                                    {props.user.refined.cutdiamond > 0 ? <>
                                        <div className="px-2 col-6 col-md-2  my-2">
                                            <div className="p-2 material-bg text-center ">
                                                <div>
                                                    <b className="text-white m-0 p-0">Cut Diamond</b>
                                                </div>
                                                <div>
                                                    <img alt=""height="50px" className="" src={cut_diamond} />
                                                </div>
                                                <div className="text-white">
                                                    {props.user.refined.cutdiamond}
                                                </div>
                                            </div>
                                        </div>
                                    </>:<></>}
                                    {props.user.refined.icebar > 0 ? <>
                                        <div className="px-2 col-6 col-md-2  my-2">
                                            <div className="p-2 material-bg text-center ">
                                                <div>
                                                    <h4 className="text-white m-0 p-0">Ice</h4>
                                                </div>
                                                <div>
                                                    <img alt=""height="50px" className="" src={ice_bar} />

                                                </div>
                                                <div className="text-white">
                                                    {props.user.refined.icebar}
                                                </div>
                                            </div>
                                        </div>
                                    </>:<></>}
                                    {props.user.refined.oil > 0 ? <>
                                        <div className="px-2 col-6 col-md-2  my-2">
                                            <div className="p-2 material-bg text-center ">
                                                <div>
                                                    <h4 className="text-white m-0 p-0">Oil</h4>
                                                </div>
                                                <div>
                                                    <img alt=""height="50px" className="" src={oil} />

                                                </div>
                                                <div className="text-white">
                                                    {props.user.refined.oil}
                                                </div>
                                            </div>
                                        </div>
                                    </>:<></>}

                                    </div>
                                </> : <></>}

                            </div>

                            <div className="w-inventory-item p-3">
                                <h3 className="text-center bg-title-market"> Items </h3>
                                <div className="p-2 ">
                                    Coming soon...
                                </div>
                            </div>

                            <div className="w-inventory-item p-2">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className='text-center bg-title-market'>Account XP</h3>
                                        {props.user.wallet !== undefined ? <>
                                            Minery: {props.user.xp.minery}
                                        </> : <></>}
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
export default Inventory