import React from "react";
import './RecentBlock.css'

export default function RecentBlock(props){
    return(
        <div className="recentBlock">
            <div className="blockContent">
                <p onClick={()=> console.log("Hi")} className="playButton">L</p>
            </div>
            <div className="blockText">
                <p>Too Many Nights </p>
            </div>
        </div>
    )
}