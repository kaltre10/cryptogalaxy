import React from 'react';
import logo from '../img/logo-planet.svg';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import arrow from '../img/arrow.svg';
import { Link } from 'react-router-dom';

function TopNav(props) {

  const [Showx,setShowx] = React.useState()
  const handleClose = () => setShowx(false);

  function filterWallet(w) {
    let str1 = w.substr(0, 4);
    const l = w.length
    const str2 = w.substr(l - 4, 4);
    const result = str1 + "..." + str2;
    return result;
  } 
  
  return (
    <>
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

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Modal className="bg-modal" show={Showx} onHide={handleClose}>
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
              <button className="btn btn-success px-4" >
                Buy
              </button>
            </div>

            <div className="p-4 w-buy-gm m-2">
              <div className="text-center">
                <img height="50px" src={gem} alt="" />
              </div>
              <div className="mb-2">
                3000 gm - 0.025 BNB
              </div>
              <button className="btn btn-success px-4">
                Buy
              </button>
              {/* onClick={() => buyGm(1000, "0.01")} */}
            </div>
          </div>
        </Modal.Body>

      </Modal>

    </>
  )
}

export default TopNav