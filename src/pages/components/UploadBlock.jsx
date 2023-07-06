import React, { useState } from "react";
import './UploadBlock.css'
import { initializeApp } from "firebase/app";
import { getDocs, doc, onSnapshot, getFirestore,collection, query, orderBy, limit, updateDoc, setDoc, increment, addDoc } from 'firebase/firestore'
import {getStorage, ref, getMetadata, getDownloadURL, uploadBytes} from 'firebase/storage'

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

export default function UploadBlock(props){

    const [errorMessage, setErrorMessage] = useState('')

    async function uploadSong(path, metadata, file){
        setErrorMessage("Downloading Song")
        const songRef = ref(storage, "songs/"+path)
        await uploadBytes(songRef, file, metadata)
    }

    async function addSongData(obj){
        const songsCol  = collection(db, "songs")
        await addDoc(songsCol, obj)
        setErrorMessage("Upload Success")
        console.log("Collection updated")
    }
    //error checks occur on client and not cloud anoymore because I cant afford it :(
    const submitForm = async (e) => {
        e.preventDefault()
        setErrorMessage("Uploading...")
        const file = e.target.file.files[0]
        if(file == null) return setErrorMessage("Missing file upload")
        const songName = e.target.song.value
        const artistName = e.target.artist.value
        if(file.type != "audio/mpeg") return setErrorMessage("Invalid file format")
        if(songName.length <= 2 || artistName.length <=2 ) return setErrorMessage("Song name or artist name is too short")
        const path = songName+artistName+Math.floor(Math.random(0,1000))
        const songData = {
            artistName: artistName,
            songName: songName,
            cover :"",
            likes: 0,
            views: 0,
            songRef: path
        }
        const metadata = {
            contentType: 'audio/mpeg'
        }
        uploadSong(path, metadata, file).then(addSongData(songData)).catch((error)=>{
            console.log("error occured")
        })
    }

    return(
        <div className="upload-container">
            <button className="exit" onClick={()=> props.func(false)}>X</button>
            <form className="upload" onSubmit={(e)=>submitForm(e)}>
                <p className="errorMessage">{errorMessage}</p>
                <p className="label">Song Name</p>
                <br></br>
                <input type="text" className="input-block" name = "song" />
                <p className="label">Artist Name</p>
                <br></br>
                <input type="text" className="input-block" name = "artist" />
                <input type="file" className="songFile" name = "file" />
                <br></br>
                <br></br>
                <button type = 'submit' className="submit-button">Upload</button>
            </form>
        </div>

    )
}