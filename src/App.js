import Web3 from 'web3';
import './css/App.css';
import logo from './img/logo-planet.svg'
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const myAddress = '0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da'
const web3 = new Web3(provider)

function App() {
  var account = ""
  try {
    const accounts = window.ethereum.request({ 'method': 'eth_requestAccounts' })
    account = accounts[0]
  } catch (error) {
    alert(error)
  }

  const nft = 'https://raw.githubusercontent.com/manuelperez0000/miningtown-node/master/public/img/catt1.png'

  async function connect() {
    try {
      const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
      console.log(accounts[0])
    } catch (error) {
      alert(error)
    }
  }

  function disconnect() {
    console.log("desconnect")
  }

  function getBalanceOf() {
    web3.eth.getBalance(myAddress).then((r) => {
      console.log(web3.utils.fromWei(r, 'ether'))
    })
  }

  function isConnected() {
    if (window.ethereum.isConnected()) {
      alert("se")
    } else {
      alert("No")
    }
  }

  return (
    <div className="bg-img-planet">
      <nav className="navbar m-0 navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img className="logo" src={logo} />
            PLANETARY GEMS EXPEDITIONS
            {/* <img className="img-logo" src="../assets/img/logo-winem-yellow.png" alt=""> */}
          </div>
          <div className=" navbar-collapse justify-content-end" id="navbarSupportedContent">
            <span> {account} </span>
            <button onClick={connect} className="btn btn-wallet px-5">Connect Wallet</button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-5 col-sm-4 col-md-3 flex-column px-3 pt-5 text-white sidebar-w">
            <button className="btn btn-wallet form-control">Market</button>

            <ul className="nav nav-pills flex-column mb-auto mt-3">
              <li>
                <button className="nav-button"> Inventary </button>

              </li>
              <li>

                <button className="nav-button"> Expeditions </button>
              </li>

            </ul>
            <hr />
            <ul>
              <li>BNB Balance</li>
              <li>PGE Balance</li>
              <li>GM Balance</li>
            </ul>
          </div>
          <div className="col-7 col-sm-8 col-md-9">
            <div className="row p-4">
              <div className="col-12 col-sm-6 col-md-4">
                <div className="nft">
                  <div className="nft-roi">
                    Gm 4565/21
                  </div>
                  <div className="img">
                    <img className="nft-image img-fluid" src={nft} />
                  </div>
                  <div className="row pt-1 gx-1">
                    <div className="col-12">
                      <h4>Cat-Miner</h4>
                    </div>
                    <div className="col-6">
                      <div className="border p-1 rounded w-100" >00012535</div>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-sm bg-success text-white form-control">Start</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>

      {/* 
      No connected
      <button onClick={disconnect}>Disconnect</button>

      <button onClick={isConnected}>Is connect</button>

      <button onClick={getBalanceOf}>Get Balance</button> */}
    </div>
  );
}

export default App;
