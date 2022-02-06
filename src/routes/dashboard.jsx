import React, { useEffect, useState, useContext, useReducer } from 'react'
import Sidebar from '../components/sidebar'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
import urlApi from '../urlApi'

const Dashboard = () => {
    const { Toast, connectOrRegister, filterWallet,user } = useContext(DataContext)
    const [activity, setActivity] = useState([])

    useEffect(() => {
        getActivity()
    }, [])


    const getActivity = async () => {
        axios.get(urlApi + "/api/v1/activity")
            .then((res) => {

                setActivity(res.data)
            })
            .catch(err => console.log(err))
    }

    const getActivityWallet = async () => {
        axios.get(urlApi + "/api/v1/activityWallet/"+user.wallet)
            .then((res) => {
                setActivity(res.data)
            })
            .catch(err => console.log(err))
    }

    const formateado = (t)=>{
        const ahora = Date.now()
        const sec = Math.floor((ahora-t)/1000)
        let min, hor, day
        if(sec < 60)
            return sec+" second ago"
        if(sec > 60 && sec < 3600){
            min =  Math.floor(sec/60)
            return (min+" minutes ago")
        }
        if(sec > 3600 && sec < 86400){
            hor = Math.floor(sec/3600)
            return hor+" hours ago"
        }
        if(sec > 86400){
            day = Math.floor(sec/86400 )
        }
            return day + " days ago"

        return 0
    }


    return (<>
        <div className="container-fluid m-0 p-0 bg-stars">
            <div className="row gx-0">
                <div className="col-12 col-md-3 ">
                    < Sidebar />
                </div>
                <div className="col-12 col-md-9 p-3 w-market-container">
                    <div className='in-menu-marjet p-2'>
                        <div className='justify-content-between d-flex align-items-center'>
                            <h3 className='p-0 m-0'> Dashboard</h3>
                            <div>
                                <button onClick={getActivity} className='btn btn-outline-success mx-2'>
                                    All Users
                                </button>
                                <button onClick={getActivityWallet} className='btn btn-outline-primary'>
                                    My Activity
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='in-menu-marjet mt-2 px-2'>
                        <div className=''>
                            {activity.map((item) => {
                                return (
                                    <div className='border-sell p-2 my-2'>
                                        <div key={item._id} className='row'>
                                            <div className='col-12 d-flex justify-content-between'>
                                                <div>
                                                    {filterWallet(item.wallet)}
                                                </div>
                                                <div>
                                                    {item.description} 
                                                </div>
                                         
                                                <div>
                                                    {formateado(item.time) }
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                )
                            })

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Dashboard