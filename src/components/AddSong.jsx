import {collection, addDoc } from "@firebase/firestore";
import {ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import React, { useState } from "react";
import { fireDB, storage } from "../firebase/FireBase";


const AddSong = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const fileRef = ref(storage, "music/" + file.name);
    await uploadBytes(fileRef, file).then((snapshot) => {
      console.log("Uploaded file");
    });
    getDownloadURL(fileRef)
      .then((url) => {  
        setFileUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const songName = e.target.songName.value;
    const artistName = e.target.artistName.value;
    const album = e.target.album.value;
    const songCover = e.target.songCover.value;
    if (!songName || !fileUrl || !artistName || !album || !songCover) {
      return;
    }
    try{
        await addDoc(collection(fireDB, "music"), {
            songName,
            artistName, 
            album,
            songCover,
            fileUrl
        })
    } catch(e) {
        console.log('Error upload document', e);
    }
  };

  return (
    <div>
      <form className="uploadForm" onSubmit={onSubmit}>
        <input type="text" name="songName" placeholder="Название песни" />
        <input
          type="text"
          name="artistName"
          placeholder="Имя исполнителя"
        />
        <input type="text" name="album" placeholder="Название альбома" />
        <input type="text" name="songCover" placeholder="Фото альбома" />
        <input type="file" onChange={onFileChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddSong;
