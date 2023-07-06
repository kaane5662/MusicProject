import React from "react";
import "./Trendblock.css"



export default function TrendBlock(props){
    return (
        <div className="background" onClick={()=> props.func(props.songRef, props.songName, props.artistName, props.songId)}>
            <div className="content">
                <p className="song-name"> {props.songName}</p>
                <p className="artist-name">{props.artistName}</p>

            </div>
        </div>
        
    )
}