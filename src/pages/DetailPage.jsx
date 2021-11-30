import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { clientContext } from "../contexts/ClientContext";
import { Button } from "@mui/material";
import Comment from "../components/Comments/Comment";
import Likes from "../components/Likes";
import '../Detail.css'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const DetailPage = () => {
  const { getDetails, productDetails, addAndDeleteProductInCart, checkProductInCart, products } = useContext(clientContext);
  
  const params = useParams();
  useEffect(() => {
    getDetails(params.id);
  }, []);
  
  return (
    <div style={{ color: "black" }}>
      {productDetails ? (
        <>
        <div className="detail-page">
          <div className="detail-image">
            <img src={productDetails.image} alt="phone" />
          </div>
          <div>
            <h2 style={{fontWeight: 'bold'}}>{productDetails.name}</h2>
            <p>{productDetails.composition}</p>
            <div>
                <h4>Описание:</h4>
              <ul className="character" style={{listStyleType: 'none'}}>
              <li>
                  <strong>Исполнитель:</strong>
                  <span> {productDetails.artist}</span>
                </li>
                <li>
                  <strong>Альбом:</strong>
                  <span> {productDetails.album}</span>
                </li>
                <li>
                  <strong>Цена:</strong>
                  <span> {productDetails.price}$</span>
                </li>
                <li>
                  <strong>Жанр:</strong>
                  <span> {productDetails.category}</span>
                </li>
              </ul>
          <Button
            variant="contained"
            onClick={() => addAndDeleteProductInCart(productDetails)}
            style={{marginRight: '15px'}}
          >
            <ShoppingCartIcon
              color={checkProductInCart(productDetails.id) ? "error" : "light"}
            />
          </Button>
          <Likes />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="video">
          <iframe src={productDetails.clip} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
          <Comment />
      </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default DetailPage;

