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
    composition: yup
      .string()
      .min(10, "Минимальное 10 символов")
      .max(255, "Максимальное 255 символов")
      .required("Данное поле обязательно"),
    price: yup
      .number()
      .min(3, "Минимальное 3 символа")
      .required("Данное поле обязательно"),
    gram: yup
      .string()
      .min(1, "Минимальный 1 символ")
      .max(50, "Максимальное 50 символов")
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
      <h2>Добавить продукт</h2>
      <Formik 
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          image: '',
            name: '',
            category: '',
            composition: '',
            price: '',
            gram: ''
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
              label="Название продукта"
              type="text"
              variant="standard"
              name="name"
              value={values.name}
              error={!!errors.name && touched.name}
              helperText={touched.name ? errors.name : ''}
              onChange={handleChange}
            />
            <TextField
              label="Категория"
              type="text"
              variant="standard"
              name="category"
              value={values.category}
              error={!!errors.category && touched.category}
              helperText={touched.category ? errors.category : ''}
              onChange={handleChange}
            />
            <TextField
              label="Состав:"
              type="text"
              variant="standard"
              name="composition"
              value={values.composition}
              error={!!errors.composition && touched.composition}
              helperText={touched.composition ? errors.composition : ''}
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
              label="См/грамм"
              type="text"
              variant="standard"
              name="gram"
              value={values.gram}
              error={!!errors.gram && touched.gram}
              helperText={touched.gram ? errors.gram : ''}
              onChange={handleChange}
            />
            <Button 
            variant="contained" 
            color="primary" 
            type="submit">
            Добавить продукт
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddPage;
