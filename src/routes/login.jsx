import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import metamask from "../img/assets/metamask.svg"
import { Link } from 'react-router-dom';
import logo from "../img/logoglx.svg";
import { useEffect } from "react";
import { useState } from "react";

const Login = () => {

    const { user, loading, connectOrRegister } = useContext(DataContext)

    /*  function filterWallet(w) {
         let str1 = w.substr(0, 4);
         const l = w.length
         const str2 = w.substr(l - 4, 4);
         const result = str1 + "..." + str2;
         return result;
     } */

    const [wallet, setWallet] = useState(null)

    useEffect(() => {
        rellenar()
    }, [wallet])

    const rellenar = async () => {
        const wall = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        setWallet(wall[0])
    }

    return (
        <>
            {<div className="text-center pt-5 d-flex justify-content-center bg-stars">
                <div className="w-loginx">
                    <div className="mb-4">
                        <img src={logo} height="70px" alt="" />
                        <h1 className="text-white p-0 text-center m-0">Welcome Miner</h1>
                    </div>

                    {wallet !== null ?
                        <>
                        <div>
                            Wallet: {/* filterWallet(wallet) */}
                            {wallet}
                        </div>
                            <Link to="/inventory" className="btn btn-success mt-4"> Enter Dapp </Link>
                        </> :
                        <>
                            {loading ?
                                <>
                                    <button className="btn btn-secondary">
                                        Loaing...
                                    </button>
                                </> : <>
                                    <button onClick={connectOrRegister} className="btn btn-primary">
                                        Connect whith Metamask
                                        <img className="mx-2" height="25px" src={metamask} alt="" />
                                    </button>
                                </>
                            }
                            <br />
                            No Connected
                        </>}
                </div>
            </div>}
        </>
    )
}

export default Login
/* 
Login.defaultProps = {
    user:{wallet:null}
} */