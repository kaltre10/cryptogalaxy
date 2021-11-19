import React, { useState, useEffect } from 'react'
import Loading from '../components/loading'
import axios from 'axios'

function Crafting() {
    const [jeison, setJeison] = useState({user:"",_id:"",gm:"5"})
    const [loading, setLoading] = useState(false)

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    const data = { wallet: "sdf544s6df54sdf6" }
    const method = "POST"

    useEffect(() => {
        obtenreDatos()
    }, [])
    const obtenreDatos = async () => {
        setLoading(true)

        await axios.post('http://localhost:4000/api/v1/auth', { wallet: "sdf544s6df54sdf6" })
            .then((res) => {
                const users = res.data
                console.log(res.data);
                if (users) {
                    setJeison(users)
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })

        /* await axios.post({
            url: "http://localhost:4000/api/v1/auth",
            data
        }).then((res) => {
            console.log(res.data)
        }) */

    }
    return (
        <div>
            {/* <Loading load={loading} /> */}
            <h1 className="text-white">Hola crafting</h1>
            <div className="row">
                <div className="col-6 border text-white">
                    Wallet: {  jeison.user.wallet}
                </div>
                <div className="col-6 border text-white">
                    Id: { jeison.user._id }
                </div>
                <div className="col-12 border text-white">
                    gm: { jeison.user._gm }
                </div>
                <div className="col-12 border text-white">
                    registration: { jeison.user.registration }
                </div>
            </div>

        </div>
    )
}
export default Crafting
