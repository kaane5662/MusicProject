import {React, useState, useRef, useEffect} from "react"
import './Home.css';


import RecentlyPlayed from "./components/RecentlyPlayed"
import RecentBlock from "./components/RecentBlock"
import TrendBlock from "./components/Trendblock"
import FavoriteBlock from "./components/FavoriteBlock"
import SongBlock from "./components/SongBlock"
import UploadBlock from "./components/UploadBlock";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRepeat, faHeart, faVolumeMute, faVolumeLow, faVolumeHigh, faVolumeUp } from "@fortawesome/free-solid-svg-icons";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDocs, doc, onSnapshot, getFirestore,collection, query, orderBy, limit, updateDoc, setDoc, increment } from 'firebase/firestore'
import {getStorage, ref, getMetadata, getDownloadURL} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtvtG8I6jJ3JvUKbcJBjHmDsQj4OdpE0o",
  authDomain: "musicsite-3e679.firebaseapp.com",
  projectId: "musicsite-3e679",
  storageBucket: "musicsite-3e679.appspot.com",
  messagingSenderId: "932804518212",
  appId: "1:932804518212:web:ee4accbb49448d0d89f711",
  measurementId: "G-Z9L5700TEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


let track = new Audio()

export default function Home(){
   
    const [songsList, setSongs] = useState([])
    const [trendingSongsList, setTrendingSongsList] = useState([])
    const [favoritedSongsList, setFavoritedSongsList] = useState([])


    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [volumeState, setVolumeState] = useState(faVolumeUp)

    const [playerSongName, setPlayerSongName] = useState("__")
    const [playerArtistName, setPlayerArtistName] = useState("__")

    const [promptActive, setPromptActive] = useState(false)

    //#region fetch data
    async function getSongs(){
        setSongs([])
        const songsQuery = await getDocs(collection(db, "songs"))
        const tempSongs = []
        songsQuery.forEach((doc)=>{
            
            let songData = doc.data()
            songData["songId"] = doc.id
            console.log(songData.songId)
            tempSongs.push(songData)
        })
        setSongs(tempSongs)
        console.log(songsList)
    }

    async function getTrendingSongs(){
        const trendingQuery = query(collection(db, "songs"), orderBy("views", "desc"), limit(4));
        const trendingDocs = await getDocs(trendingQuery)
        const tempSongs = []
        trendingDocs.forEach((doc)=>{
            tempSongs.push(doc.data())
        })
        setTrendingSongsList(tempSongs)
        
    }

    async function getMostFavoritedSongs(){
        const favoritedQuery = query(collection(db, "songs"), orderBy("likes", "desc"), limit(3));
        const favoritedDocs = await getDocs(favoritedQuery)
        const tempSongs = []
        favoritedDocs.forEach((doc)=>{
            tempSongs.push(doc.data())
        })
        setFavoritedSongsList(tempSongs)
    }
    //#endregion
    //#region add to database

    async function likeSong(songId){
        console.log("The song:"+songId)
        const songDoc = doc(db, "songs", songId)
        await updateDoc(songDoc, {likes: increment(1)})
    }

    async function viewSong(songId){
        const songDocRef = doc(db, "songs", songId)
        await updateDoc(songDocRef, {views: increment(1)})
    }

    

    //#endregion
    

    //#region track player scripts


    
    function updateTrackSlider(){
        console.log("Hi")
        setDuration( track.currentTime/track.duration *100)
    }

    async function setSong(songRef, songName, artistName, songId){
        console.log("Fetching from storage")
        const path = "songs/"+songRef
        console.log(path)
        getDownloadURL(ref(storage, path)).then((url)=>{
            
            console.log(url)
            track.src = url
            track.play()
            setIsPlaying(true)
            track.ontimeupdate = () => updateTrackSlider()
            setPlayerSongName(songName)
            setPlayerArtistName(artistName)
            viewSong(songId)
        }).catch((err) =>{
            console.log(err)
        })
    }

    async function playPause(){
        if (!track.src) {return}
        setIsPlaying(!isPlaying);
        if(!isPlaying){
            track.play()
            track.ontimeupdate = ()=> updateTrackSlider()
        }else{
            track.pause()
        }

    }

    async function setTrackDuration(e){
        console.log(e.target.value)
        track.currentTime = e.target.value/100*track.duration
        // track.ontimeupdate = ()=> updateTrackSlider()
        console.log("Hello there bud")
    }

    async function setTrackVolume(e){
        track.volume = e.target.value/10
        if(track.volume > .6){
            setVolumeState(faVolumeHigh)
        }else if(track.volume > .3){
            setVolumeState(faVolumeUp)
        }else if(track.volume > 0){
            setVolumeState(faVolumeLow)
        }else{
            setVolumeState(faVolumeMute)
        }
           
    }

    async function repeat(){
        if (!track.src) {return}
        track.currentTime = 0
    }


    //#endregion

    useEffect(() => {
        console.log("Welcome back")
        track.src = "src/pages/songtest.mp3"
        getSongs()
        getTrendingSongs()
        getMostFavoritedSongs()
    }, []);
    

    
    return(
        
        <div>
           
            <div className = "container">
                {promptActive ? <UploadBlock func = {setPromptActive} ></UploadBlock> : null }
                <h1 class = 'welcome'>Welcome Kaan</h1>
                <p className="uploadSong" onClick={()=> setPromptActive(!promptActive)}>Upload</p>
                    <div className="recent">
                        {
                            trendingSongsList.map((song, index)=>{
                                return (
                                    <TrendBlock songName = {song.songName} artistName = {song.artistName} key = {index}></TrendBlock>
                                )
                            })
                        }
                    </div>
                <h1 className="welcome">Liked by Users</h1>
                    <div className="recent">
                        {
                            favoritedSongsList.map((song, index)=>{
                                return (
                                    <FavoriteBlock songName = {song.songName} artistName = {song.artistName} key = {index}></FavoriteBlock>
                                )
                            })
                        }

                    </div>
                <div className="songs">
                    {
                        songsList.map((song, index)=>{
                            return (
                                <SongBlock songName = {song.songName} artistName = {song.artistName} views = {song.views} key = {index} func = {setSong} likeFunc = {likeSong} songId = {song.songId} songRef = {song.songRef}  ></SongBlock>
                            )
                        })
                    }
                </div>

                
            </div>
            <div className="player">
                <div className="player-left">
                    <img src="" alt="" className="cover" />
                    <div className="songContent">
                        <p className="player-songName">{playerSongName}</p>
                        <p className="player-artistName">{playerArtistName}</p>
                    </div>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="ppIcon" onClick={()=>  playPause()} />
                    <FontAwesomeIcon icon = {faRepeat} onClick={()=> repeat()} className="ppIcon"></FontAwesomeIcon>
                </div>
                <input type = 'range' value = {duration.toString()} min = "0" onChange={e => setTrackDuration(e)} max = "100" className="main-slider"></input>
                <div className="player-right">
                    <FontAwesomeIcon icon={faHeart} className="ppIcon"></FontAwesomeIcon>
                    <FontAwesomeIcon icon={volumeState} className="ppIcon"></FontAwesomeIcon>
                    <input type = 'range' min = "0" onChange={e => setTrackVolume(e)} max = "10" className="volume-slider"></input>
                </div>
            </div>
        </div>
    )
}