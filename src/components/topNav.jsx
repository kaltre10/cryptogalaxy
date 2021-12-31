import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
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
import LinksN from './links';
const contractOuner = "0x7daF5a75C7B3f6d8c5c2b53117850a5d09006168"
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(provider)

function TopNav() {

  const { connectOrRegister,bnb,user,loading,stateLoading } = useContext(DataContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  async function buyGm(id) {

    stateLoading(true)
    var price = 0
    var amount = 0
    if (id === 1) {
      price = "0.01"
      amount = 1000
    } else if (id === 2) {
      price = "0.028"
      amount = 3000
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
        stateLoading(false);
        connectOrRegister()

      })
      .catch((error) => {
        stateLoading(false);
        console.log("Ocurrio el siguiente error: " + error.message)
      })
  }

  /*   function filterWallet(w) {
      let str1 = w.substr(0, 4);
      const l = w.length
      const str2 = w.substr(l - 4, 4);
      const result = str1 + "..." + str2;
      return result;
    } */

  const [exp, setExp] = useState(false)

  return (
    <>
      <Navbar bg="dark" variant="dark" expanded={exp}>
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={logo} height="25px" alt="" className="mx-2" />
            CryptoGalaxy Online
          </Navbar.Brand>

          <div className='d-none d-sm-none d-md-block'>

            {user.wallet}

          </div>
          {user.wallet !== undefined ? <>
            <Navbar.Toggle onClick={() => setExp(!exp)} aria-controls="offcanvasNavbar" className="d-block d-md-none" />
          </> : <></>}
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
                <LinksN/>
                

              

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

     

    </>
  )
}

export default TopNav

TopNav.defaultProps = {
  user: { wallet: null }
}