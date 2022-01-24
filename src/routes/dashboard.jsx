import React from 'react'
import Sidebar from '../components/sidebar'

const Dashboard = () => {
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
                                <button className='btn btn-outline-success mx-2'>
                                    All Users
                                </button>
                                <button className='btn btn-outline-primary'>
                                    My Activity
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='in-menu-marjet mt-2 px-2'>
                        <div className=''>
                            <div className='border-sell p-2 my-2'>
                                <div className='row'>
                                    <div className='col-4'>
                                        0x13...1123
                                    </div>
                                    <div className='col-4'>
                                        Sell 1500 GM
                                    </div>
                                    <div className='col-4'>
                                        0.01 BNB
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Dashboard