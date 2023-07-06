import React from "react";
import "./Trendblock.css"



export default function TrendBlock(props){
    return (
        <div className="background">
            <div className="content">
                <p className="song-name"> {props.songName}</p>
                <p className="artist-name">{props.artistName}</p>

            </div>
        </div>
        
    )
}