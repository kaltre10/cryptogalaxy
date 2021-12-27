import React from "react";
import { Link } from "react-router-dom";

const LinksN = ()=>{

    return(
        <>
        <ul className="nav nav-pills flex-column mb-auto">
                            
                            <li>
                                <Link to="/inventory" className="nav-button">
                                    • Inventory
                                </Link>
                            </li>
                            <li>
                                <Link to="/planet" className="nav-button">
                                    • Planets
                                </Link>
                            </li>
                            <li>
                                <Link to="/invaders" className="nav-button ">
                                    • Invaders
                                </Link>
                            </li>
                            <li>
                                <Link to="/refinery" className="nav-button ">
                                    • Refinery
                                </Link>
                            </li>
                            <li>
                                <Link to="/factory" className="nav-button ">
                                    • Factory
                                </Link>
                            </li>
                        </ul>
        </>
    )
}
export default LinksN