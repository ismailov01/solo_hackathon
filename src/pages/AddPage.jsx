import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { adminContext } from "../contexts/AdminContext";
import { useNavigate } from "react-router";

const AddPage = () => {
  const schema = yup.object({
    image: yup
      .string()
      .required("Данное поле обязательно"),
    name: yup
      .string()
      .min(3, "Минимальное 3 символа")
      .max(30, "Максимальное 30 символов")
      .required("Данное поле обязательно"),
    category: yup
      .string()
      .min(2, "Минимальное 2 символа")
      .max(30, "Максимальное 30 символов")
      .required("Данное поле обязательно"),
    artist: yup
      .string()
      .min(2, "Минимальное 2 символов")
      .max(30, "Максимальное 30 символов")
      .required("Данное поле обязательно"),
    price: yup
      .number()
      .required("Данное поле обязательно"),
    album: yup
      .string()
      .min(1, "Минимальный 1 символ")
      .max(50, "Максимальное 50 символов")
      .required("Данное поле обязательно"),
    clip: yup
      .string()
      .min(10, "Минимальное 10 символов")
      .max(255, "Максимальное 255 символов")
      .required("Данное поле обязательно"),
  });

  const { addProduct } = useContext(adminContext)
  const navigate = useNavigate()
  const handleSubmit = (product) => {
      addProduct(product)
      navigate("/admin")
  }
  return (  
    <div className="add-page">
      <h2>Добавить композицию</h2>
      <Formik 
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          image: '',
            name: '',
            category: '',
            artist: '',
            price: '',
            album: '',
            clip: '',
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Изображение"
              type="text"
              variant="standard"
              name="image"
              value={values.image}
              error={!!errors.image && touched.image}
              helperText={touched.image ? errors.image : ''}
              onChange={handleChange}
            />
            <TextField
              label="Название композиции"
              type="text"
              variant="standard"
              name="name"
              value={values.name}
              error={!!errors.name && touched.name}
              helperText={touched.name ? errors.name : ''}
              onChange={handleChange}
            />
            <TextField
              label="Жанр"
              type="text"
              variant="standard"
              name="category"
              value={values.category}
              error={!!errors.category && touched.category}
              helperText={touched.category ? errors.category : ''}
              onChange={handleChange}
            />
            <TextField
              label="Исполнитель"
              type="text"
              variant="standard"
              name="artist"
              value={values.artist}
              error={!!errors.artist && touched.artist}
              helperText={touched.artist ? errors.artist : ''}
              onChange={handleChange}
            />
            
            <TextField
              label="Цена"
              type="number"
              variant="standard"
              name="price"
              value={values.price}
              error={!!errors.price && touched.price}
              helperText={touched.price ? errors.price : ''}
              onChange={handleChange}
            />
            <TextField
              label="Название альбома"
              type="text"
              variant="standard"
              name="album"
              value={values.album}
              error={!!errors.album && touched.album}
              helperText={touched.album ? errors.album : ''}
              onChange={handleChange}
            />
            <TextField
              label="Ссылка клипа"
              type="text"
              variant="standard"
              name="album"
              value={values.clip}
              error={!!errors.clip && touched.clip}
              helperText={touched.clip ? errors.clip : ''}
              onChange={handleChange}
            />
            <Button 
            variant="contained" 
            color="primary" 
            type="submit">
            Добавить композицию
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddPage;
