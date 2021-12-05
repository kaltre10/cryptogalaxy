import './css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Market from './routes/market'
import Inventory from './routes/inventory'
import React from 'react';
import Login from './routes/login'
import Planet from './routes/planet'
import urlApi from './urlApi';
/* import Web3 from 'web3' */

//abis glx & nft
/* import abi from './token/glxAbi'
import abiNft from './token/abiNft' */

//const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
/* const web3 = new Web3(provider)
const addressContract = '0xA8928409d80D218E0B891D6FE9260D824990fd49'
const nftCatMiner = '0x06B532c3Fc2ff1E61103Aa4075658b2D151c51cb' */

//const myNftContract = new web3.eth.Contract(abiNft, nftCatMiner)

/* console.log(myNftContract.methods.name().call().then((r) => {
    console.log(r)
})) */


//console.log(mycontract.methods)

const App = () => {

    /* window.ethereum.on('accountsChanged', function (accounts) {
        
        alert("Change red2")
    }); */
    
   /*  async function detectChainId(){
        
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        alert(web3.utils.hexToNumber(chainId))
    } */
    
    //connect()

    /* const [wallet, setWallet] = useState('')
    const [bnbBalance, setBnbBalance] = useState(0)
    const [glxBalance, setGlxBalance] = useState(0)
    const [gemBalance, setGemBalance] = useState(0) */

    /* 

    function mas() {
        for (let i = 0; i < 10; i++) {
            setGemBalance(gemBalance + 1)
            for (var j = 0; j < 20; j++) {
                console.log(5 * 6565 + 55 + 5 + 546 + 546 * 5)
            }
        }
    }

    async function connect() {
        try {
            const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
            setWallet(accounts[0])
            getBnbBalance(accounts[0])
            getGlx(accounts[0])

        } catch (error) {
            console.log(error)
        }
    }
    function buy() {
        window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: wallet,
                        to: '0x0b18947426e74500dc0e96312A02E410d961a91E',
                        value: web3.utils.toHex(web3.utils.toWei('0.03', 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('21000', 'wei')),
                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch(() => console.error);
    }

    async function getBnbBalance(w) {
        web3.eth.getBalance(w).then((r) => {
            setBnbBalance(web3.utils.fromWei(r, 'ether'))

        })

    } */

    /* async function consulta() {
       await fecth("http://localhost:3001/api/getUser/"+wallet)
            .then((response) => {
                return response.json();
            })
            .then((recurso) => {
                alert(recurso);
            });

        alert("Process end")
    } */
    return (
        <Router>
            <Switch>
                <Route path="/market">
                    <Market/>
                </Route>
                <Route path="/inventory">
                    <Inventory />
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/planet">
                    <Planet/>
                </Route>
             
                <Route path="/" exact>
                    <Login/>
                </Route>
            </Switch>

            {/* <div className="bg-img-planet">

                <Navbar connect={connect} wallet={wallet} />
                <div className="w3-sidebar side">
                    <Sidebar mas={mas} menos={menos} gemBalance={gemBalance} bnbBalance={bnbBalance} glxBalance={glxBalance} />
                </div>
                <div className="w3-container">
                    <Switch>
                        <Route path="/market">
                            <Market buy={buy} />
                        </Route>
                        <Route path="/inventory">
                            <Inventory />
                        </Route>
                        <Route path="/expeditions">
                            <Expeditions />
                        </Route>
                        <Route path="/" exact>
                            <Market />
                        </Route>
                    </Switch>
                </div>
            </div> */}
        </Router>
    );
}

export default App;