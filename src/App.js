import './css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Market from './routes/market'
import Inventory from './routes/inventory'
import React from 'react';
import Login from './routes/login'
import Planet from './routes/planet'
import urlApi from './urlApi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TopNav from './components/topNav';
import Web3 from 'web3'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shop from './routes/shop';
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(provider)
const eth = window.ethereum;

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

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [bnb, setBNB] = useState(0);

    useEffect(() => {
        connectOrRegister()
        detectChainId()
    }, [])

    async function getBNB(w) {
        web3.eth.getBalance(w).then((r) => {
            setBNB(web3.utils.fromWei(r, 'ether'))
        })
    }
    async function connectOrRegister() {

        eth.request({ 'method': 'eth_requestAccounts' }).then((res) => {
            const wallet = res[0];
            getBNB(wallet);
            
            axios.post(urlApi + "/api/v1/x/", { wallet }).then((res) => {
                //console.log(res.data.user);
                setUser(res.data.user);
                setLoading(false);

                var shipsObj = res.data.user.ships
                var recTime = Date.now()
                shipsObj.map((item)=>{
                    if(item.charge <= recTime ){
                        upEnergy(wallet,item.id)
                    }
                })

            }).catch((err) => {
                alert(err.message);
            });
        }).catch((err) => {
            alert(err.message);
        });
    }

    async function upEnergy(wallet,id){

        axios.put(urlApi+"/api/v1/upEnergy",{wallet,id})
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=> alert(err))
        //alert("sube energia a la nave: "+nave+" wallet:"+w)
    }

    function stateLoading(imp) {
        setLoading(imp);
    }

    window.ethereum.on('accountsChanged', () => {
        window.location.href = './login';
    });

    async function detectChainId(){
         const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log("Chain id: "+web3.utils.hexToNumber(chainId))
     } 

    const Toast = (type,msg) => {
        if(type == 0)
            toast.error(msg);
        if(type == 1)
            toast.success(msg);
    }

    return (
        <Router>
           {/*  <button onClick={()=>Toast(1,"mensage de error")}>Notify!</button>*/}
            <ToastContainer theme="dark" className="z-index-max"/> 
            <TopNav user={user} connectOrRegister={connectOrRegister} loading={loading} />
            <div className="container-fluid p-0">
                <div className="row gx-0">
                    <div className="col-12">
                        <Switch>
                            <Route path="/inventory">
                                <Inventory connectOrRegister={connectOrRegister} bnb={bnb} user={user} loading={loading} stateLoading={stateLoading} Toast={Toast}/>
                            </Route>
                            <Route path="/planet">
                                <Planet connectOrRegister={connectOrRegister} bnb={bnb} user={user} loading={loading} stateLoading={stateLoading} Toast={Toast}/>
                            </Route>
                            <Route path="/shop">
                                <Shop connectOrRegister={connectOrRegister} bnb={bnb} user={user} loading={loading} stateLoading={stateLoading} Toast={Toast}/>
                            </Route>
                            <Route path="/market">
                                <Market user={user} />
                            </Route>
                            <Route path="/login">
                                <Login user={user} connectOrRegister={connectOrRegister} />
                            </Route>
                            <Route path="/" exact>
                                <Login user={user} connectOrRegister={connectOrRegister} />
                            </Route>
                        </Switch>

                    </div>
                </div>
            </div>



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
    )
}

export default App;