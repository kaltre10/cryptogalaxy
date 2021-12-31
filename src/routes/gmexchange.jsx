import React from "react";
import Sidebar from "../components/sidebar";
const Gmexchange = () => {

    return (
        <>
            <div className="container-fluid m-0 p-0 bg-stars">
                <div className="row gx-0">
                    <div className="col-12 col-md-3 ">
                        < Sidebar />
                    </div>
                    <div className="col-12 col-md-9 p-0 w-market-container">
                        <div className="text-center pt-5">
                            <div>
                                <h1>Gm Exchange</h1>
                                <hr />
                            </div>
                            <div>
                                Available shortly
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gmexchange