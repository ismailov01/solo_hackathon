import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { clientContext } from "../contexts/ClientContext";
import ReactCardFlip from "react-card-flip";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Aos from "aos";
import "aos/dist/aos.css";

const MediaCard = (props) => {
  const {
    addAndDeleteProductInCart,
    checkProductInCart,
    addAndDeleteProductInFavorites,
    checkFavoriteInFavorites,
    getProducts,
  } = useContext(clientContext);
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div data-aos="flip-left">
      <Card
        sx={{
          maxWidth: 280,
          margin: "10px",
          height: "350px",
          backgroundColor: "rgb(28, 28, 28)",
        }}
        className="cartochka"
      >
        <Link to={`/product/${props.product.id}`}>
          <CardMedia
            component="img"
            height="140"
            style={{ objectFit: "contain" }}
            image={props.product.image}
            alt="product"
          />
        </Link>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontWeight: "bold", fontFamily: "revert", color: "white" }}
          >
            {props.product.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ fontWeight: "300", fontFamily: "revert", color: "gray" }}
          >
            {props.product.artist}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              fontSize: "20px",
              fontFamily: "revert",
              fontWeight: "600",
              color: "red",
            }}
          >
            {props.product.price} $
          </Typography>
        </CardContent>
        <CardActions style={{display: 'flex', justifyContent: 'space-around'}}>
          <Button
            size="small"
            onClick={() => addAndDeleteProductInCart(props.product)}
          >
            <ShoppingCartIcon
              color={checkProductInCart(props.product.id) ? "error" : "primary"}
            />
          </Button>
          <Button
            size="small"
            onClick={() => addAndDeleteProductInFavorites(props.product)}
          >
            <BookmarkIcon
              color={
                checkFavoriteInFavorites(props.product.id) ? "error" : "primary"
              }
            />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default MediaCard;
