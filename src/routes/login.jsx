import React from "react";
import metamask from "../img/assets/metamask.svg"
import { Link } from 'react-router-dom';
import logo from "../img/logoglx.svg";

const Login = (props) => {

    function filterWallet(w) {
        let str1 = w.substr(0, 4);
        const l = w.length
        const str2 = w.substr(l - 4, 4);
        const result = str1 + "..." + str2;
        return result;
    }

    return (
        <>
            {<div className="text-center mt-5 d-flex justify-content-center">
                <div className="w-login">
                    <div className="mb-4">
                        <img src={logo} height="70px" alt="" />
                        <h1 className="text-white p-0 text-center m-0">Welcome Miner</h1>
                    </div>
                    {props.user.wallet !== undefined ? <>
                        Wallet: {filterWallet(props.user.wallet)}
                        <Link to="/inventory" className="btn btn-success form-control"> Enter Dapp </Link>
                    </> : <>
                        {props.loading ? <>
                            <button className="btn btn-secondary">
                                Loaing...
                            </button>
                        </> : <>
                        <button onClick={props.connectOrRegister} className="btn btn-primary">
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