import React, {useState} from "react";
import './Navbar.css'

export default function Navbar(props){

    const [clicked, setClicked] = useState(false)

    return(
        <nav className="navbarContainer" >
            <div className="navbar">
               <p className = "tag">Home</p>
               <p className = "tag">Likes</p>
               <p className = "tag" onClick={()=> console.log("Hi")}>Settings</p>
               <p className = "tag">Upload</p>
            </div>
            

        </nav>

    )
}