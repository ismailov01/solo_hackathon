import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router";
import { adminContext } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const schema = yup.object({
    image: yup.string().required("Обязательно"),
    name: yup.string().min(3).max(30).required("Обязательно"),
    category: yup.string().min(2).max(30).required("Обязательно"),
    composition: yup.string().min(10).max(255).required("Обязательно"),
    price: yup.number().min(3).required("Обязательно"),
   gram: yup.string().min(1).max(30).required("Обязательно"),
  });

  const params = useParams()

  const {getProductToEdit, productToEdit, saveEditedProduct } = useContext(adminContext)
  useEffect(() => {
    getProductToEdit(params.id)
  }, [])
  const navigate = useNavigate()

  return (
    <div className="edit-page">
      <h2>Изменить продукт</h2>
      {
          productToEdit ? (
            <Formik
            validationSchema={schema}
            onSubmit={(editedProduct) => {
                saveEditedProduct(editedProduct)
                navigate('/admin')

            }}
            initialValues={productToEdit}
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
                  helperText={touched.image ? errors.image : ""}
                  onChange={handleChange}
                />
                <TextField
                  label="Название продукта"
                  type="text"
                  variant="standard"
                  name="name"
                  value={values.name}
                  error={!!errors.name && touched.name}
                  helperText={touched.name ? errors.name : ""}
                  onChange={handleChange}
                />
                <TextField
                  label="Категория продукта"
                  type="text"
                  variant="standard"
                  name="category"
                  value={values.category}
                  error={!!errors.category && touched.category}
                  helperText={touched.category ? errors.category : ""}
                  onChange={handleChange}
                />
                <TextField
                  label="Состав"
                  type="text"
                  variant="standard"
                  name="composition"
                  value={values.composition}
                  error={!!errors.composition && touched.composition}
                  helperText={touched.composition ? errors.composition : ""}
                  onChange={handleChange}
                />
               
                <TextField
                  label="Цена"
                  type="number"
                  variant="standard"
                  name="price"
                  value={values.price}
                  error={!!errors.price && touched.price}
                  helperText={touched.price ? errors.price : ""}
                  onChange={handleChange}
                />
                <TextField
                  label="См/грамм"
                  type="text"
                  variant="standard"
                  name="gram"
                  value={values.gram}
                  error={!!errors.gram && touched.gram}
                  helperText={touched.gram ? errors.gram : ""}
                  onChange={handleChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Сохранить изменения
                </Button>
              </form>
            )}
          </Formik>
          ) : (
              <h2>Loading</h2>
          )
      }
      
    </div>
  );
};

export default EditPage;
