import React from 'react'

const Nosotros = ()=>{

    const [equipo, setEquipo] = React.useState([{"id":1,"title":"t1"},{"id":2,"title":"t2"}])

    React.useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async ()=>{
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        const users = await data.json()
        console.log(users)
       // setEquipo(users)
    }

    return(
        <>
        <ul className="bg-danger"> sdfsdfsd
                    {
                        equipo.map(item => {
                            <li key={item.id}>
                               {item.title}
                            </li>
                        })
                    }
                </ul>
        </>
    )

}

export default Nosotros