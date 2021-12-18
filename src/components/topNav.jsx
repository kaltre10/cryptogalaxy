import React, { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import logo from '../img/logoglx.svg';
import arrow from '../img/arrow.svg';
import Modal from 'react-bootstrap/Modal';
import Web3 from 'web3'
import axios from 'axios';
import urlApi from '../urlApi';
const contractOuner = "0x7daF5a75C7B3f6d8c5c2b53117850a5d09006168"
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(provider)
const eth = window.ethereum;

function TopNav(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  async function buyGm(id) {

    props.stateLoading(true)

    if (id == 1) {
      var price = "0.01"
      var amount = 1000
    } else if (id == 2) {
      var price = "0.028"
      var amount = 3000
    }

    const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })

    await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: contractOuner,
            value: web3.utils.toHex(web3.utils.toWei(price, 'ether')),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
          },
        ],
      })
      .then(async (txHash) => {
        /* console.log("Este el el Hash de la transaccion: " + txHash)
        getInfoToasText("Transaction hash: " + txHash)
        console.log("Cantidad de Gemas: " + amount) */

        const hash = txHash
        const account = accounts[0]
        const wallet = account.toLowerCase()
        const getGm = await axios.put(urlApi + "/api/v1/buygm", { wallet, amount, hash })

        console.log("Buy gm: " + getGm.data);

        console.log("Transaction hash:" + hash);
        setShow(false)
        props.stateLoading(false);
        props.connectOrRegister()

      })
      .catch((error) => {
        props.stateLoading(false);
        console.log("Ocurrio el siguiente error: " + error.message)
      })
  }

  function filterWallet(w) {
    let str1 = w.substr(0, 4);
    const l = w.length
    const str2 = w.substr(l - 4, 4);
    const result = str1 + "..." + str2;
    return result;
  }

  const [exp, setExp] = useState(false)

  return (
    <>
      <Navbar bg="dark" variant="dark" expanded={exp}>
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={logo} height="25px" alt="" className="mx-2" />
            CryptoGalaxy Online
          </Navbar.Brand>

          

          <div className='d-none d-sm-none d-md-block'> {props.user.wallet != null ? <>
            {filterWallet(props.user.wallet)}
          </> : <></>} </div>
          <Navbar.Toggle onClick={() => setExp(!exp)} aria-controls="offcanvasNavbar" className="d-block d-md-none" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header onClick={() => setExp(!exp)} closeButton className="bg-dark">
              <Offcanvas.Title id="offcanvasNavbarLabel" className="w-100">

                <Nav className="w-market w-100">
                  <Link onClick={() => setExp(!exp)} to="/market" className="btn btn-wallet form-control mb-2">Market</Link>
                  <Link onClick={() => setExp(!exp)} to="/shop" className="btn btn-primary form-control">Shop</Link>
                </Nav>

              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="bg-dark">
              <Nav className="justify-content-end flex-grow-1">
                <ul className="nav nav-pills flex-column mb-auto">
                  <li>
                    <Link onClick={() => setExp(!exp)} to="/login" className="nav-button">
                      • Login
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setExp(!exp)} to="/inventory" className="nav-button">
                      • Inventory
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setExp(!exp)} to="/planet" className="nav-button">
                      • Planets
                    </Link>
                  </li>
                </ul>
                <div className="sidebar-balance pb-3">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <img className="logo-sidebar" src={bnbLogo} /> {props.bnb}
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

                  <div onClick={() => { setShow(true) }} className="gems-exchange d-flex justify-content-between">

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

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Modal className="bg-modal" show={show} onHide={handleClose}>
        <Modal.Header className="modal-w text-white hr-modal" closeButton>
          <Modal.Title>
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-inline-block">
                  <img className="img-gem" src={bnbLogo} />
                </div>
                <div className="d-inline-block mx-3">
                  <img className="img-gem" src={arrow} />
                </div>
                <div className="d-inline-block">
                  <img className="img-gem" src={gem} />
                </div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">

          <div className="py-4 d-flex justify-content-center">
            <div className="p-4 w-buy-gm m-2">
              <div className="text-center">
                <img height="50px" src={gem} alt="" />
              </div>
              <div className="mb-2">
                1000 GM - 0.01 BNB
              </div>
              {props.loading ? <>
                <button className="btn btn-secondary px-4" >
                  <div class="spinner-border" role="status"></div>
                </button>
              </> : <>
                <button onClick={() => buyGm(1)} className="btn btn-success px-4" >
                  Buy
                </button>
              </>}
            </div>

            <div className="p-4 w-buy-gm m-2">
              <div className="text-center">
                <img height="50px" src={gem} alt="" />
              </div>
              <div className="mb-2">
                3000 gm - 0.028 BNB
              </div>
              {props.loading ? <>
                <button className="btn btn-secondary px-4" >
                  <div class="spinner-border" role="status"></div>
                </button>
              </> : <>
                <button onClick={() => buyGm(2)} className="btn btn-success px-4" >
                  Buy
                </button>
              </>}
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default TopNav