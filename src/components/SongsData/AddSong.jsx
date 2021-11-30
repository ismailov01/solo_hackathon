import {collection, addDoc } from "@firebase/firestore";
import {ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { fireDB, storage } from "../../firebase/FireBase";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const AddSong = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const navigate = useNavigate()
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
    const genre = e.target.genre.value;
    try{
        await addDoc(collection(fireDB, "music"), {
            songName,
            artistName, 
            album,
            songCover,
            genre,
            fileUrl
          })
    } catch(e) {
      console.log('Error upload document', e);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <form className="uploadForm" onSubmit={() => {
        onSubmit()
        navigate('/')
        }}>

      <Box sx={{ minWidth: 120 }}>
        <TextField
              label="Название композиции"
              type="text"
              variant="standard"
              name="songName"              
            />
            <TextField
              label="Исполнитель"
              type="text"
              variant="standard"
              name="artistName"              
            />
            <TextField
              label="Название альбома"
              type="text"
              variant="standard"
              name="album"              
            />
            <TextField
              label="Изображение"
              type="text"
              variant="standard"
              name="songCover"              
            />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Жанр</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="genre"
          value={age}
          label="Жанр"
          onChange={handleChange}
        >
          <MenuItem value={'hip-hop'}>Hip-Hop</MenuItem>
          <MenuItem value={'rap'}>Rap</MenuItem>
          <MenuItem value={'pop'}>Pop</MenuItem>
          <MenuItem value={'rock'}>Rock</MenuItem>
          <MenuItem value={'phonk'}>Phonk</MenuItem>
          <MenuItem value={'classic'}>Classic</MenuItem>
        </Select>
      </FormControl>
    <TextField
              label="Файл"
              type="file"
              variant="standard"
              onChange={onFileChange}              
              />
              </Box>
              <Button variant="contained" color="error" type="submit">Отправить</Button>
      </form>

    </div>
  );
};

export default AddSong;

      // <form className="uploadForm" onSubmit={onSubmit}>
      //   <input type="text" name="songName" placeholder="Название песни" />
      //   <input
      //     type="text"
      //     name="artistName"
      //     placeholder="Имя исполнителя"
      //   />
      //   <input type="text" name="album" placeholder="Название альбома" />
      //   <input type="text" name="songCover" placeholder="Фото альбома" />
      //   <input type="file" onChange={onFileChange} />
      //   <select id="category" name="genre">
      //     <option value="hip-hop">hip-hop</option>
      //     <option value="rap">rap</option>
      //     <option value="pop">pop</option>
      //     <option value="rock">rock</option>
      //     <option value="phonk">phonk</option>
      //     <option value="classic">classic</option>
      //   </select>
      //   <button>Отправить</button>
      // </form>