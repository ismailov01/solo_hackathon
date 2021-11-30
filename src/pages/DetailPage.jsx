import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { clientContext } from "../contexts/ClientContext";
import { Button } from "@mui/material";
import Comment from "../components/Comments/Comment";
import Likes from "../components/Likes";

const DetailPage = () => {
  const { getDetails, productDetails } = useContext(clientContext);
  const params = useParams();
  useEffect(() => {
    getDetails(params.id);
  }, []);
  

  return (
    <div style={{ color: "black" }}>
      {productDetails ? (
        <div className="detail-page">
          <div className="detail-image">
            <img src={productDetails.image} alt="phone" />
            <iframe
              width="560"
              height="315"
              src={productDetails.clip}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <h2>{productDetails.name}</h2>
            <p>{productDetails.composition}</p>
            <Button variant="contained" color="primary">
              Добавить в корзину
            </Button>
            <div>
              <h4>Описание:</h4>
              <ul className="character">
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
            </div>
          </div>
          <Comment />
          <Likes />
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default DetailPage;
