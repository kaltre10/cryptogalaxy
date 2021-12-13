import React, { useState, useEffect } from 'react';
const time = 3605

const Timer = () => {
    const [s, setSeconds] = useState(0);
    const [h,setH] = useState(0);
    const [m,setM] = useState(0);
    const [tim,setTim] = useState(time);

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setTim(tim - 1);
            var hours = Math.floor(tim/60/60)
            setH(hours)
            var mins = Math.floor(((tim/60/60)-hours)*60)
            setM(mins)
            var secs = Math.round((((((tim/60/60) - hours)*60))-mins)*60) 
            setSeconds(secs)
        }, 1000);

        return () => clearInterval(interval);
    }, [tim]);

    return (
        <>
        <h1 className="time p-5 border bg-dark">
         { h }h : { m }:  { s }s
        </h1>
        </>
    );
};

export default Timer;