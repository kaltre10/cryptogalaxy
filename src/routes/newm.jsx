import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import urlApi from '../urlApi'
import axios from 'axios'
import { DataContext } from '../context/DataContext'
import gmLogo from '../img/gems.svg'

const Newm = () => {

    const { stateLoading, loading, Toast, connectOrRegister, user } = useContext(DataContext)
    const [materials, setMaterials] = useState([])
    const [selectType, setSelectType] = useState("materials")
    const [selectSubType, setSelectSubType] = useState("Iron")

    useEffect(() => {
        getSellers("materials", "Iron")
    }, [])

    const getSellers = async (item, type) => {
        stateLoading(true)
        const filtred = []
        const obj = await axios.get(urlApi + '/api/v1/getMaterialsOnSell')
        console.log(obj.data)
        obj.data.map((item) => {
            if (item.material === type) {
                filtred.push(item)
            }
        })

        filtred.sort((a,b)=>{
            const price1 = a.ammount/a.price
            const price2 = b.ammount/b.price  
            if(price1 < price2){return 1}
            if(price1 > price2){return -1}
            return 0
        })

        setMaterials(filtred)
        stateLoading(false)
    }
    const changeSelectType = (e) => {
        setSelectType(e.target.value)
        if (e.target.value == "refined") {
            setSelectSubType("Ironbar")
        } else {
            setSelectSubType("Iron")
        }
    }
    const changeSelectSubType = async (e) => {

        setSelectSubType(e.target.value)
        getSellers(selectType, e.target.value)
    }

    const findItem = () => {
        getSellers(selectType, selectSubType)
    }

    const buyMaterial = async (item) => {
        stateLoading(true)

        axios.put(urlApi + "/api/v1/buyMaterial/", {
            item, myWallet: user.wallet
        }).then(async (res) => {
            if (res.data.error) {
                Toast(0, res.data.msg)
            } else {
                Toast(1, res.data.msg)
            }
            console.log(res.data)
        }).finally(() => {
            connectOrRegister()
            getSellers(selectType, selectSubType)
            stateLoading(false)
        })

    }

    const myItems = async () => {
        const obj = await axios.get(urlApi + '/api/v1/getMaterialsOnSell')
        const myItems = []
        obj.data.map((item) => {
            if (item.wallet === user.wallet)
                myItems.push(item)
        })
        setMaterials(myItems)
    }

    const removeItem = async (item) => {
        console.log(item)
        const remo = await axios.put(urlApi + "/api/v1/removeMaterial", item)
        if (remo.data.error) {
            Toast(0, remo.data.msg)
        } else {
            Toast(1, remo.data.msg)
        }

        connectOrRegister()
        getSellers(selectType, selectSubType)
        stateLoading(false)

    }

    function filter(w) {
        let str1 = w.substr(0, 4);
        const l = w.length
        const str2 = w.substr(l - 4, 4);
        const result = str1 + "..." + str2;
        return result;
    }

    return (
        <div className="w-market2 bg-stars">
            <div className="container-fluid">
                <div className="row gx-2">
                    <div className="col-12 col-md-3 p-2">
                        <Link to="/inventory">
                            <button className="back-button mb-2"> ← Back </button>
                        </Link>
                        <div className="in-menu-marjet mb-1 p-2">
                            <div className="mb-2 text-center">
                                Balance: {user.gm} <img src={gmLogo} height="20px" alt="" srcSet="" />
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <button className="btn btn-success w-100 disabled">Buy</button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-primary w-100 disabled">Sell</button>
                                </div>

                            </div>
                        </div>
                        <div className="in-menu-marjet p-2">
                            <select onChange={changeSelectType} className="back-button mb-2 px-2" name="" id="">
                                <option value="materials"> Materials </option>
                                <option value="refined"> Refined </option>
                                {/* <option value="">Miners</option>
                                <option value="">Fighters</option>
                                <option value="">Stations</option>
                                <option value="">Items</option>
                            <option value="">Gems</option> */}
                            </select>
                            {selectType === "materials" ? <>
                                <select onChange={changeSelectSubType} className="back-button mb-2 px-2" name="" id="">
                                    <option value="Iron">Iron</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Diamond">Diamond</option>
                                    <option value="Ice">Ice</option>
                                    <option value="Petroleum">Petroleum</option>
                                </select>
                            </> : <></>}
                            {selectType === "refined" ? <>
                                <select onChange={changeSelectSubType} className="back-button mb-2 px-2" name="" id="">
                                    <option value="Ironbar">Ironbar</option>
                                    <option value="Silverbar">Silverbar</option>
                                    <option value="Goldbar">Goldbar</option>
                                    <option value="Cutiamond">Cutdiamond</option>
                                    <option value="Icebar">Icebar</option>
                                    <option value="Oil">Oil</option>
                                </select>
                            </> : <></>}
                            <div className="mb-2">
                                <hr />
                            </div>
                            {/* <h4>Order By</h4>
                            <div className="d-flex">
                            <div>
                            <span>Price Asc</span>
                            <input className="mx-2" type="radio" name="price" id="1" />
                            </div>
                            <div>
                            <span>Price Desc</span>
                            <input className="mx-2" type="radio" name="price" id="2" />
                            </div>
                        </div> */}
                            <div className="my-2">
                                <hr />
                            </div>
                            <div className="my-2">
                                <button onClick={findItem} className="back-button"> Find </button>
                            </div>
                            <div className="px-4">
                                <button onClick={myItems} className="back-button"> My Items </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 p-2">
                        <div className="in-menu-marjet p-2">
                            <div className="row gx-2">

                                <div className="col-12 p-2">
                                    <div className="text-center d-flex justify-content-between align-items-center">
                                        <div className="center-bt">

                                        </div>
                                        <div>
                                            <h3>Materials on sell</h3>
                                        </div>
                                        <div>
                                            <button onClick={() => { getSellers(selectType, selectSubType) }} className="btn btn-secondary">
                                                Reload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {loading ? <div className="text-center"> <div className="spinner-border"></div> </div> : <></>}

                                <div className=" p-1">
                                    <div className="row gx-1">
                                        {materials.map((item) => {
                                            return (
                                                <div key={item._id} className="col-6 col-sm-4 col-md-3 p-1">
                                                    <div className="border-sell p-2">
                                                        <div className=" d-flex">
                                                            <div className="bg-red-mat px-2">
                                                                {item.ammount} {item.material}
                                                            </div>
                                                        </div>
                                                        <div className="id-item">
                                                            {filter(item.wallet)}
                                                        </div>

                                                        <div className="d-flex justify-content-center align-items-center p-2">
                                                            <div className="img-mat my-3">
                                                                <img className="image" src={item.img} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-between border-top-trans pt-2">
                                                            <div>
                                                                {item.price} GM
                                                                <div className="id-item">
                                                                    {Math.round((item.price/item.ammount)*1000)/1000} GM per Item
                                                                </div>
                                                            </div>
                                                            <div>
                                                            </div>
                                                            <div>
                                                                {loading ? <>
                                                                    <button className="btn btn-secondary disabled w-100"> <div className="spinner-border"></div> </button>
                                                                </> : <>
                                                                    {item.wallet === user.wallet ? <>
                                                                        <button onClick={() => removeItem(item)} className="btn btn-danger"> Remove </button>
                                                                    </> : <>
                                                                        <button onClick={() => { buyMaterial(item) }} className="btn btn-success">Buy</button>
                                                                    </>}
                                                                </>}

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>)
                                        })}
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

export default Newm