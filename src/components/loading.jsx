import React, { useEffect, useState } from "react";

const Loading = (props) => {

    const [load, setLoad] = useState()

    useEffect(() => {
        setLoad(props.load)
    },[load])
    return (

        <>

            {load ?
                <div className="p-3 bg-dark d-flex justify-content-center loader-wrap">
                    <div className="p-4 bg-light text-center center-loading">
                        <div className="spinner-border text-success" role="status"></div>
                        <br />
                        Please Wait

                    </div>
                </div>
                : <div></div>
            }


        </>
    )
}

export default Loading