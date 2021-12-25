import React from "react";
import Sidebar from "../components/sidebar";
import RecTimer from "../components/recTimer";
const Factory = (props) => {

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">

                <div className="row gx-0">
                    <div className="col-3 bg-danger d-none d-md-block">
                        < Sidebar glx={props.glx} connectOrRegister={props.connectOrRegister} user={props.user} bnb={props.bnb} loading={props.loading} stateLoading={props.stateLoading} />
                    </div>

                    <div className="col-12 col-md-9">
                        <div className="w-market-container p-3">


                            <div className=''>
                                <RecTimer user={props.user} upEnergy={props.upEnergy} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Factory