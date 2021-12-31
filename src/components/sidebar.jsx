import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Links from './links';
/* import bnbLogo from '../img/assets/bnb.svg';
import gem from '../img/gems.svg';
import Modal from 'react-bootstrap/Modal';
import Web3 from 'web3'
import axios from 'axios';
import urlApi from '../urlApi';
import { DataContext } from '../context/DataContext'; */

/* const contractOuner = "0x7daF5a75C7B3f6d8c5c2b53117850a5d09006168"
const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const web3 = new Web3(provider) */

function Sidebar() {

   /*  const { Toast, glx, connectOrRegister, bnb, user, loading, stateLoading } = useContext(DataContext)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const [bnbBalance, setBnbBalance] = useState(0)
    const [gmBalance, setGmBalance] = useState(0)

    const [stateSwapBtn, setStateSwapBtn] = useState(false)
    const [minimun, setMinimun] = useState(false)

    async function buyGm() {
        stateLoading(true)
        const accounts = await window.ethereum.request({ 'method': 'eth_requestAccounts' })
        await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: accounts[0],
                        to: contractOuner,
                        value: web3.utils.toHex(web3.utils.toWei(bnbBalance, 'ether')),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                        gas: web3.utils.toHex(web3.utils.toWei('22000', 'wei')),
                    },
                ],
            })
            .then(async (txHash) => {
                /* console.log("Este el el Hash de la transaccion: " + txHash)
                getInfoToasText("Transaction hash: " + txHash)
                console.log("Cantidad de Gemas: " + amount) //////<------////
                const amount = bnbBalance*100000
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

    const roundBnb = (bnb) => {
        return (Math.round(bnb * 10000)) / 10000
    }

    const calcBNBToGM = (e) => {
        const bnbC = e.target.value
        const gmC = bnbC * 100000
        setBnbBalance(bnbC)
        setGmBalance(gmC)

        compareSwapBtn(bnbC)

        //console.log(e.target.value)
    }

    const compareSwapBtn = (bnb) => {
        console.log(bnb)
        if (bnb >= 0.005) {
            setStateSwapBtn(true)
            setMinimun(false)
        } else {
            setMinimun(true)
            setStateSwapBtn(false)
        }

    } */

    return (
        <div className="sidebar">
            <div className="flex-column text-white sidebar-w">
                <div className="">
                    <div className="d-none d-md-block">
                        <div className="w-market">
                            <Link to="/market" className="btn btn-wallet form-control mb-3">Market</Link>
                            <Link to="/shop" className="btn btn-primary form-control">Shop</Link>
                        </div>
                        <Links />
                        
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Sidebar