import React, { useState, useEffect } from 'react'
import logo from '../img/logo-planet.svg'
import axios from 'axios'
import urlApi from '../urlApi'

function Navbar() {

  useEffect(() => {
    connect()
  }, [])

  const [wallet, setWallet] = useState('')

  async function connect() {
    try {

      const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
      const account = accounts[0]
      var uper = account.toLowerCase();
      setWallet(account);
      //console.log("Account: "+uper)
      const walletObj = { wallet: uper }
      //console.log(walletObj)
      await axios.post(urlApi + "/api/v1/x", walletObj).then((res) => {
        //console.log("Res data: "+res.data.user.wallet)
      }).catch(err => alert("error guardar auth: " + err.message))

    } catch (error) {
      alert("Connection error: " + error.message)
      window.location.href = "./login"
    }
  }

  return (
    <>
      <nav className="navbar navbar-fixed-top navbar-expand navbar-dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img className="logo" src={logo} />
            CryptoGalaxy
          </div>
          <div className="navbar-collapse justify-content-end" id="navbarSupportedContent">
            {
              wallet ?
                <>
                  <span className="text-white d-none d-md-block">{wallet} </span>
                  <span className="text-white d-md-none"> Connected </span>
                </>
                : <button onClick={connect} className="btn btn-wallet px-5">Connect Wallet</button>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar