import React,{useState} from 'react'
import logo from '../img/logo-planet.svg'

function Navbar(props){
 
    return(
        <>
        <nav className="navbar navbar-fixed-top navbar-expand navbar-dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img className="logo" src={logo} />
            CryptoGalaxy
            {/* <img className="img-logo" src="../assets/img/logo-winem-yellow.png" alt=""> */}
          </div>
          <div className=" navbar-collapse justify-content-end" id="navbarSupportedContent">
            { 
            props.wallet ? <span className="text-white">{props.wallet} </span>: <button onClick={props.connect} className="btn btn-wallet px-5">Connect Wallet</button>
            }
            
            
          </div>
        </div>
      </nav>
        </>
        )
}

export default Navbar