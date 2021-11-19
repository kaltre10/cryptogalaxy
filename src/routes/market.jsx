import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Web3 from 'web3'
import nft from '../img/nft/cat-miner.svg'
import nft2 from '../img/nft/explorer.svg'
import nft3 from '../img/nft/thrasher.svg'
import nft4 from '../img/nft/factory.svg'
import nft5 from '../img/nft/refinery.svg'
//import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Loading from '../components/loading';
//import { propTypes } from 'react-bootstrap/esm/Image';

const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const myAddress = "0x7daf5a75c7b3f6d8c5c2b53117850a5d09006168"
const ouner = "0x0b18947426e74500dc0e96312A02E410d961a91E"
const web3 = new Web3(provider)

const Market = (props) => {

    const [wallet, setWallet] = useState('')

    const [jeison, setJeison] = useState([{ name: "nave1", id: 1 }, { name: "nave2", id: 2 }])
    
    const [loading, setLoading] = useState(false)
    
    const [errorToast, setErrorToast] = useState(false)
    const [errorToasText, setErrorToastText] = useState("")

    const [infoToast, setInfoToast] = useState(false)
    const [infoToasText, setInfoToastText] = useState("")
    
    //const [onCharge, setOnCharge] = useState(false)
    /* async function onChargeX() {
        setOnCharge(!onCharge)
        alert(onCharge)
    } */

    function getErrorToast(bool, message) {
        setErrorToast(bool)
        setErrorToastText(message)
    }

    function getInfoToasText(val) {
        setInfoToastText(val)
        setInfoToast(true)
    }

    function closeAlert() { setErrorToast(false) }
    function closeInfo() { setInfoToast(false) }

    async function buy() {

        setLoading(true)

        //alert(onCharge)
        //onChargeX()
        console.log("Intentando transferir desde: " + wallet + " a:" + ouner)
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        setWallet(accounts[0])
        window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: wallet,
                        to: ouner,
                        value: web3.utils.toHex(web3.utils.toWei('0.03', 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                    },
                ],
            })
            .then((txHash) => {
                setLoading(false)
                getInfoToasText("Este el el Hash de la transaccion: " + txHash)
                console.log("Este el el Hash de la transaccion: " + txHash)
            })
            .catch((error) => {
                setLoading(false)
                getErrorToast(true, error.message)
                console.log("Ocurrio el siguiente error: " + error.message)
            })
    }

    /**/

    return (

        <div className="container-fluid   w-market-container">

            <Loading load={loading} />

            {errorToast ?
                <div className="alert alert-warning alert-dismissible d-flex justify-content-between">
                    <div>
                        <strong>Error! </strong> {errorToasText}
                    </div>
                    <button onClick={closeAlert} className="btn btn-warning" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                : <div></div>

            }
            {infoToast ?
                <div className="alert alert-success alert-dismissible d-flex justify-content-between">
                    <div>
                        <strong>Success! </strong>{infoToasText}
                    </div>
                    <button onClick={closeInfo} className="btn btn-success" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                : <div></div>
            }

            <div className="w-nav-market p-3 ">
                {/* <Form.Select className=" d-block">

                    <option value="1">Ships</option>
                    <option value="2">Items</option>
                    <option value="3">Materials</option>
                </Form.Select> */}

                <div className="text-center">
                    <h1 className="text-white text-center mt-3"> Welcome Space miners!</h1>
                </div>

            </div>

            <div className="row">

                
                <div className="col-12">
                    <div className="row p-4 gx-2">
                        <div className="col-12 col-md-6 col-xl-3">
                            <div className="nft">
                                <div className="img">
                                    <img className="nft-image w-100" src={nft} />
                                </div>
                                <div className="row pt-1 gx-0">
                                    <div className="col-6">
                                        <h4 className="name-nft m-0 p-0">Cat-Miner</h4>
                                        <p className="m-0 price p-0"> 0.01 BNB</p>
                                    </div>
                                    <div className="col-6">
                                        {loading ?
                                            <button className="btn bg-secondary px-5 text-white">Buy</button>
                                            :
                                            <button onClick={buy} className="btn bg-success form-control text-white">Buy</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <div className="nft">
                                <div className="img">
                                    <img className="nft-image w-100" src={nft2} />
                                </div>
                                <div className="row pt-1 gx-1">
                                    <div className="col-6">
                                        <h4 className="name-nft m-0 p-0">Explorer</h4>
                                        <p className="m-0 price p-0"> 0.01 BNB</p>
                                    </div>
                                    <div className="col-6 ">
                                        <button className="btn bg-success form-control text-white">Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <div className="nft">
                                <div className="img">
                                    <img className="nft-image w-100" src={nft4} />
                                </div>
                                <div className="row pt-1 gx-1">
                                    <div className="col-6">
                                        <h4 className="name-nft m-0 p-0">Factory</h4>
                                        <p className="m-0 price p-0"> 0.05 BNB</p>
                                    </div>
                                    <div className="col-6 ">
                                        <button className="btn bg-success form-control text-white">Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <div className="nft">
                                <div className="img">
                                    <img className="nft-image w-100" src={nft5} />
                                </div>
                                <div className="row pt-1 gx-1">
                                    <div className="col-6">
                                        <h4 className="name-nft m-0 p-0">Refinery</h4>
                                        <p className="m-0 price p-0"> 0.05 BNB</p>
                                    </div>
                                    <div className="col-6 ">
                                        <button className="btn bg-success form-control text-white">Buy</button>
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


export default Market