import React, { useState, useEffect } from 'react';
import logo from '../img/logo-planet.svg';
import axios from 'axios';
import urlApi from '../urlApi';
import metamask from "../img/assets/metamask.svg";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Offcanvas } from 'react-bootstrap'

import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import arrow from '../img/arrow.svg';
import { Link } from 'react-router-dom';

function topNav(props) {

  function filterWallet(w) {
    let str1 = w.substr(0, 4);
    const l = w.length
    const str2 = w.substr(l - 4, 4);
    const result = str1 + "..." + str2;
    return result;
  }
  /* 
    useEffect(() => {
      connect()
    }, [])
  
    const [wallet, setWallet] = useState('') */

  /* async function connect() {
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
  } */

  return (
    <>
      {/*  <nav className="navbar navbar-fixed-top navbar-expand navbar-dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img className="logo" src={logo} />
            CryptoGalaxy
          </div>
          <div className="navbar-collapse justify-content-end" id="navbarSupportedContent">
            {
              props.user.wallet ?
                <>
                  <span className="text-white d-none d-md-block"> { props.user.wallet } </span>
                  <span className="text-white d-md-none"> Connected </span>
                </>
                : <button onClick={ props.connectOrRegister } className="btn btn-wallet px-5">Connect Wallet</button>
            }
          </div>
        </div>
      </nav> */}

      <Navbar bg="dark" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={logo} height="25px" alt="" className="mx-2" />
            CryptoGalaxy Online
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="d-block d-md-none" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton className="bg-dark">
              <Offcanvas.Title id="offcanvasNavbarLabel" className="w-100">

                <div className="w-market w-100">
                  <Link to="/market" className="btn btn-wallet form-control">Market</Link>
                </div>

              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="bg-dark">
              <Nav className="justify-content-end flex-grow-1">
                <ul className="nav nav-pills flex-column">
                  <li>
                    <Link to="/inventory" className="nav-button">
                      • Inventory
                    </Link>
                  </li>

                  <li>
                    <Link to="/planet" className="nav-button">
                      • Planets
                    </Link>
                  </li>

                </ul>
                <div className="sidebar-balance pb-3">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <img className="logo-sidebar" src={bnbLogo} />  0
                    </div>
                    <div className="">
                      <img className="logo-sidebar" src={logo} /> 0
                    </div>
                    <div className="">
                      <img className="logo-sidebar" src={gem} /> {props.user.gm}
                    </div>
                  </div>
                </div>

                <div className="w-gems mt-4">
                  <h4 className="text-white text-center">Exchange </h4>

                  <div className="gems-exchange d-flex justify-content-between">

                    <div className="d-inline-block">
                      <img className="img-gem" src={bnbLogo} />
                    </div>
                    <div className="d-inline-block">
                      <img className="img-gem" src={arrow} />
                    </div>
                    <div className="d-inline-block">
                      <img className="img-gem" src={gem} />
                    </div>
                  </div>
                </div>

              {/*  <Nav.Link>
                  Home
                </Nav.Link> */}

              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </>
  )
}

export default topNav