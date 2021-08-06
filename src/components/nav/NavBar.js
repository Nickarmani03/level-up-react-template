import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        // <img className="navbar__logo" src= "https://static.wixstatic.com/media/d60e07_497675d220c543ac84aed3cee4623333~mv2.png/v1/fill/w_224,h_128,al_c,q_85,usm_0.66_1.00_0.01/1610264030690_LevelUp%20copy%203.webp/">

        <ul className="navbar">

            <li className="navbar__item">                
            <Link className="nav-link" to="/"> Home</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/games">Games</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/events">Events</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/users">Users</Link>
            </li>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
