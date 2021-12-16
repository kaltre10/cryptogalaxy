import React, { useEffect, useState } from "react";

const RecTimer = (props) => {

    const [h, setH] = useState(0);
    const [m, setM] = useState(0);
    const [s, setSeconds] = useState(0);
    const [time, setTime] = useState(3600);

    useEffect(() => {
        if (props.user.wallet != null) {
            const asig = Math.round((props.user.recharge - Date.now()) / 1000)
            setTime(asig)
            rechargeTime()
        }
        let interval = null;
        interval = setInterval(() => {

            setTime(time - 1);

            var hours = Math.floor(time / 60 / 60)
            setH(hours)
            var mins = Math.floor(((time / 60 / 60) - hours) * 60)
            setM(mins)
            var secs = Math.round((((((time / 60 / 60) - hours) * 60)) - mins) * 60)
            setSeconds(secs)
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    function rechargeTime() {
        if (time <= 1) {
           // alert(time)
           props.upEnergy(props.user.wallet)
        }
    }

    return (
        <div className="text-center">
            Next Energizer in {h}:{m}:{s}
        </div>
    )
}
export default RecTimer