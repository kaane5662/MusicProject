import React from "react";
import "./FavoriteBlock.css"



export default function FavoriteBlock(props){
    return (
        <div className="container" onClick={()=> props.func(props.songRef, props.songName, props.artistName, props.songId)}>
            <img src="" alt="" className="postImage" />
            <div className="content-1">
                <p className="song-name-1">{props.songName}</p>
                <p className="artist-name-1">{props.artistName}</p>
            </div>
        </div>
        
    )
}