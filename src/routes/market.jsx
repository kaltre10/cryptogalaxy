import React from 'react';
/* import Web3 from 'web3' */

/* import nft from '../img/nft/miners/aligator.webp';
import nft2 from '../img/nft/figthers/dolphin.webp';
import nft4 from '../img/nft/stations/factory.webp'
import nft5 from '../img/nft/stations/refinery.webp'; */

/* import Loading from '../components/loading';
import axios from 'axios';
import Navbar from '../components/topNav'; */
import Sidebar from '../components/sidebar';
/* import glxAbi from '../token/glxAbi' */
/* import urlApi from '../urlApi'; */

//const mainnetProvider = ""
/* const testnetProvider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const contractOuner = "0x7daf5a75c7b3f6d8c5c2b53117850a5d09006168"
const web3 = new Web3(testnetProvider)
const glxContract = new web3.eth.Contract(glxAbi, contractOuner) */

const Market = (props) => {

    /* const [wallet, setWallet] = useState('')
    const [user, setUser] = useState({})
    const [bnb, setBnb] = useState(10)
    const [glx, setGlx] = useState(10)
    const [listItems, setList] = useState([])

    //Loading, alerts and errors
    const [loading, setLoading] = useState(false)
    const [errorToast, setErrorToast] = useState(false)
    const [errorToasText, setErrorToastText] = useState("")
    const [infoToast, setInfoToast] = useState(false)
    const [infoToasText, setInfoToastText] = useState("")
    function getErrorToast(bool, message) { setErrorToast(bool); setErrorToastText(message) }
    function getInfoToasText(val) { setInfoToastText(val); setInfoToast(true) }
    function closeAlert() { setErrorToast(false) }
    function closeInfo() { setInfoToast(false) }
    //end Loading, alerts and errors

    const date = new Date()
    const nowDate = Date.now()

    window.ethereum.on('chainChanged', async (chainId) => {
        switchChain()
    }
        //window.location.href = './login'
    );

    useEffect(() => {
        switchChain()
        connection()
        getUser()
        getBnb()
        getGlx()
        setList(shipsObj)
    }, [])

    async function getGlx() {
        glxContract.methods.balanceOf(contractOuner).call().then((res) => {
            setGlx(web3.utils.fromWei(res, 'ether'))
        })
    }

    async function getBnb() {
        const accounts = await window.ethereum.request({ "method": "eth_requestAccount" })
        //const account = accounts[0]
        setBnb(456)
    }

    async function getUser() {
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0].toLowerCase()
        const user = await axios.get(urlApi + "/api/v1/user/" + account)
        //console.log("user: +"+user.data[0].wallet)
        setUser(user.data[0])
    }

    async function switchChain() {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x61" }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function buyNFTDbUpdate(txHash, objSell) {
        //alert(num + " " + txHash)
        const hash = txHash
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0]
        const wallet = account.toLowerCase()
        const buyShip = await axios.put(urlApi + "/api/v1/buyship", { wallet, hash, objSell })
        console.log(buyShip.data)
        //console.log("Transaction hash:" + hash)
        getUser()
        setLoading(false)
    }

    async function buyNFT(objSell) {

        switchChain()
        setLoading(true)

        //console.log(objSell)

        //getWallet
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        const account = accounts[0]

        const price = objSell.sellPrice;
        console.log(price);

        await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: account,
                        to: contractOuner,
                        value: web3.utils.toHex(web3.utils.toWei(price, 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                    },
                ],
            })
            .then(async (txHash) => {
                await buyNFTDbUpdate(txHash, objSell)
                setLoading(false)
                getInfoToasText("Transaction hash: " + txHash)
                console.log("Transaction hash: " + txHash)
            })
            .catch((error) => {
                setLoading(false)
                getErrorToast(true, error.message)
                alert("Error Market: " + error.message)
            })
    }

    
     */

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">
                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar connectOrRegister={props.connectOrRegister} user={props.user} bnb={props.bnb} loading={props.loading} stateLoading={props.stateLoading} />
                    </div>
                    <div className="col-12 col-md-9 px-4 py-3 w-market-container">

                        <div className="w-inventory-item p-2 m-3">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">

                                        <div className="col-12">
                                            <h3 className='text-center bg-title-market'>Market</h3>


                                            <div>
                                                <ul>
                                                    <li>Buy and sell mining materials, items and Ships</li>
                                                    <li>Exchange GM to BNB whith Other players</li>
                                                </ul>
                                            </div>
                                            <p className='text-center'>Coming soon...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  <div className="container-fluid m-0 p-0 bg-planet">
                <Navbar connect={connection} wallet={wallet} />

                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        <Sidebar GetUser={getUser} user={user} bnb={bnb} glx={glx} />
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="container-fluid w-market-container">

                            <Loading load={loading} />

                         

                            <div className="row">

                                <div className="col-12">
                                    <div className="bg-market-bar text-white text-center">
                                        <button className="btn-market"> Miners ▼</button>
                                        <button className="btn-market"> Figthers ▼</button>
                                        <button className="btn-market"> Stations ▼</button>
                                        <button className="btn-market"> Minerals ▼</button>
                                        <button className="btn-market"> Refined ▼</button>
                                        <button className="btn-market"> Items ▼</button>
                                    </div>
                                    <div className="row p-4 gx-2">

                                        {listItems.map((item) => {
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-xl-3">
                                                        <div className="nft">
                                                            <div className="img">
                                                                <img className="nft-image w-100" src={item.img} alt="nft" />
                                                                <div className="mp-img">
                                                                    mp : {item.mp}
                                                                </div>
                                                                <div className="type-img d-flex">
                                                                    <div className="w-text-img">
                                                                        {item.type}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="energy">
                                                                <div className="border-energy">
                                                                    {item.energy > 0 ? <div className="in-energy">  </div> : <></>}
                                                                    {item.energy > 1 ? <div className="in-energy">  </div> : <></>}
                                                                    {item.energy < 2 ? <div className="out-energy">  </div> : <></>}
                                                                    {item.energy < 1 ? <div className="out-energy">  </div> : <></>}
                                                                </div>
                                                            </div>

                                                            <div className="row pt-1 gx-0">
                                                                <div className="col-6">
                                                                    <h4 className="name-nft m-0 p-0">{item.name}</h4>
                                                                    <p className="m-0 price p-0"> {item.sellPrice} BNB</p>
                                                                </div>
                                                                <div className="col-6">
                                                                    {loading ?
                                                                        <button className="btn bg-secondary px-5 text-white">Loading...</button>
                                                                        :
                                                                        <button onClick={() => { buyNFT({ name: item.name, id: item.id, sellPrice: item.sellPrice, img: item.img, mp: item.mp, type: item.type, subType: item.subType }) }} className="btn bg-success form-control text-white">Buy</button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>

    )
}


export default Market