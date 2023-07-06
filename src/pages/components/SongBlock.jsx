

import React from "react";
import './SongBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRepeat, faHeart, faVolumeMute, faVolumeLow, faVolumeHigh, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

export default function SongBlock(props){
    return(

        <div className="background-block">
            <div className="left-content">
                <img src="" alt="" className="photoCover" />
                <div className="song-info">
                    <p className="song-name-2">{props.songName}</p>
                    <p className="artist-name-2">{props.artistName}</p>
                </div>
                
            </div>
            <div className="right-content-1">
                <p className="views-1">{props.views}</p>
                <FontAwesomeIcon icon={faHeart} onClick={() => props.likeFunc(props.songId)} className="ppSongIcon"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPlay} className="ppSongIcon" onClick={() => props.func(props.songRef, props.songName, props.artistName, props.songId)}></FontAwesomeIcon>
             
            </div>  
        </div>
    )
}