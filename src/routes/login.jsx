import React, { useState, useEffect } from "react";
import metamask from "../img/assets/metamask.svg"
import Loading from "../components/loading";
import { Link } from 'react-router-dom';
import Navbar from "../components/navbar";
import logo from "../img/logo-planet.svg";

const Login = (props) => {

    useEffect(()=>{
        connection()
    },[])

    const [load, setLoading] = React.useState(false)
    const [wallet, setWallet] = React.useState("No Connected")
    const [connect, setConnect] = useState(false)

    async function connection() {
        setLoading(true)
        try {
            await window.ethereum.request({ 'method': 'eth_requestAccounts' }).then((res) => {
                if(res){
                    setConnect(true)
                    setLoading(false)
                    //window.location.href="./market"
                }
            }).catch((err)=>{
                setLoading(false)
               // alert(err.message)
            })
        } catch (error) {
                setLoading(false)
               // alert(error.message)
        }
    }

    
    
    return (
        <>
            <Loading load={load} />
            <Navbar connect={connection} wallet={wallet}/>
            <div className="text-center mt-5 d-flex justify-content-center">
                <div className="w-login">
                    <div className="mb-4">
                        <img src={logo} height="70px" alt="" />
                        <h1 className="text-white p-0 text-center m-0">Welcome Miner</h1>
                    </div>
                    {connect ?
                        <></> :
                        <div>
                            <div>
                                <button onClick={connection} className="btn btn-primary">
                                    Connect whith Metamask
                                    <img className="mx-2" height="25px" src={metamask} alt="" />
                                </button>
                            </div>
                        </div>
                    }
                    {connect ?
                        <div>
                            <div className="text-white my-4 d-flex justify-content-center">
                                <div className="text-white mx-2">
                                    Wallet:
                                </div>
                                <div className="text-gray">
                                    {wallet}
                                </div>
                            </div>
                            <Link to="/market" className="btn btn-success form-control"> Enter Dapp </Link>
                        </div> : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Login