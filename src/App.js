import React from 'react';
import { DataProvider } from './context/DataContext';
import './css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Market from './routes/market'
import Inventory from './routes/inventory'
import Login from './routes/login'
import Planet from './routes/planet'
import TopNav from './components/topNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shop from './routes/shop';
import Invaders from './routes/invaders';
import Refinery from './routes/refinery';
import Factory from './routes/factory';
import Gmexchange from './routes/gmexchange';
import NewM from './routes/newm';
import Dashboard from './routes/dashboard';

//const testnetProvider = "https://data-seed-prebsc-1-s1.binance.org:8545/"
/* const mainnetContractAbiGlx = "0x78f959923Ed10Af70729fa020C16Bd66AEE10083"
const mainnetProvider = 'https://bsc-dataseed.binance.org/'
const web3 = new Web3(mainnetProvider)
const eth = window.ethereum;
const mycontract = new web3.eth.Contract(glxAbi, mainnetContractAbiGlx) */

//abis glx & nft
/* import abi from './token/glxAbi'
import abiNft from './token/abiNft' */
/* const addressContract = '0xA8928409d80D218E0B891D6FE9260D824990fd49'
const nftCatMiner = '0x06B532c3Fc2ff1E61103Aa4075658b2D151c51cb' */
//const myNftContract = new web3.eth.Contract(abiNft, nftCatMiner)
/* console.log(myNftContract.methods.name().call().then((r) => {
    console.log(r)
})) */
//console.log(mycontract.methods)

const App = () => {

/*     const [user, setUser] = useState({});
    const [ships, setShips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bnb, setBNB] = useState(0);
    const [glx, setGlx] = useState(0); */

  /*   useEffect(() => {
        connectOrRegister()
    }, []); */

    /* window.ethereum.on('chainChanged', async (chainId) => {
         switchChain()
     }*/

    /* async function getBNB(w) {
        web3.eth.getBalance(w).then((r) => {
            setBNB(web3.utils.fromWei(r, 'ether'))
        })
    } */
    //test 97 smart 56
    /* const net = web3.utils.toHex(97) */

   /*  async function connectOrRegister() {
        setLoading(true);
        if (typeof window.ethereum !== 'undefined') {
            const chainIdhex = await window.ethereum.request({ method: 'eth_chainId' })
            if (chainIdhex === net) {

                eth.request({ 'method': 'eth_requestAccounts' }).then(async (res) => {
                    const wallet = res[0].toLowerCase();
                    await getShips(wallet);
                    await getBNB(wallet);
                    await getGlx(wallet);
                    const axiosHeader = { headers: { "Content-Type": "application/json" } }
                    axios.post(urlApi + "/api/v1/x/", { wallet }, axiosHeader).then((res) => {
                        setUser(res.data);
                        setLoading(false);
                        var recharge = res.data.recharge
                        var rectime = recharge - Date.now()
                        if (rectime < 1) {
                            upEnergy(wallet)
                        }
                    }).catch((err) => {
                        alert(err.message);
                    });
                }).catch((err) => {
                    alert(err.message);
                })

            } else {
                alert("Wrong Network: Configure Binance Testnet in Metamask")
                switchEthereumChain()
            }
        } else {
            alert("Need Metamask extension!")
        }
    } */

 /*    async function switchEthereumChain() {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: net }],
        })
        connectOrRegister()
    } */
/* 
    async function getShips(wallet) {
        const axiosHeader = { headers: { "Content-Type": "application/json" } }

        let ships = await axios.get(urlApi + '/api/v1/getShips/' + wallet, axiosHeader);
        //console.log(ships.data)
        setShips(ships.data)
    }

    async function upEnergy() {

        const account = await eth.request({ 'method': 'eth_requestAccounts' })
        const wallet = account[0].toLowerCase()
        const axiosHeader = { headers: { "Content-Type": "application/json" } }
        axios.put(`${urlApi}/api/v1/upEnergy`, { wallet }, axiosHeader)
            .then(res => console.log(res.data))
            .catch((err) => alert(err.message))
            .finally(() => connectOrRegister())
    }

    function stateLoading(imp) {
        setLoading(imp);
    } */

   

    /*async function detectChainId() {
           const chainId = await window.ethereum.request({ method: 'eth_chainId' });
           console.log("Chain id: " + web3.utils.hexToNumber(chainId))
           if (chainId != "0x61") {
               alert("Wron network, Need use the binance Testnet")
               return false
           } else if (chainId == "0x31") {
               return true
           }
    }*/

    /* const Toast = (type, msg) => {
        if (type === 0)
            toast.error(msg);
        if (type === 1)
            toast.success(msg);
    } */

    /* async function getGlx(ownerAddress) {
        mycontract.methods.balanceOf(ownerAddress).call().then((r) => {
            setGlx(web3.utils.fromWei(r, 'ether'))
        })
    } */

    return (
        <DataProvider>
            
            <Router>
                <ToastContainer theme="dark" className="z-index-max" />
                <TopNav />

                <div className="container-fluid p-0">
                    <div className="row gx-0">
                        <div className="col-12">
                            <Switch>
                            <Route path="/inventory">
                                    <Inventory/>
                                </Route>
                                <Route path="/dashboard">
                                    <Dashboard/>
                                </Route>
                                <Route path="/planet">
                                    <Planet/>
                                </Route>
                                <Route path="/shop">
                                    <Shop/>
                                </Route>
                                <Route path="/gmexchange">
                                    <Gmexchange/>
                                </Route>
                                <Route path="/invaders">
                                    <Invaders />
                                </Route>
                                <Route path="/refinery">
                                    <Refinery/>
                                </Route>
                                <Route path="/factory">
                                    <Factory  />
                                </Route>
                                <Route path="/newm">
                                    <NewM/>
                                </Route>
                                <Route path="/market" >
                                    <Market/>
                                </Route>
                                <Route path="/login" >
                                    <Login />
                                </Route>
                                <Route path="/" exact>
                                    <Login />
                                </Route>
                            </Switch>

                        </div>
                    </div>
                </div>

            </Router>

        </DataProvider>
    )
}

export default App;