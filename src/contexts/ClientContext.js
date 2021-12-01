import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";
import { API } from "../helpers/const";

export const clientContext = createContext();

const INIT_STATE = {
  products: null,
  productDetails: null,
  productCountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  cart: null,
  productsCountInFavorites: JSON.parse(localStorage.getItem('favorite')) ? JSON.parse(localStorage.getItem('favorite')).favorites.length : 0,
  favorites: null
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_DETAILS":
      return { ...state, productDetails: action.payload };
    case "ADD_AND_DELETE_PRODUCT_IN_CART":
      return { ...state, productCountInCart: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    case "ADD_AND_DELETE_FAVORITES":
      return { ...state, productsCountInFavorites: action.payload }
    case "GET_FAVORITES":
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

const ClientContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      let filter = window.location.search;
      const response = await axios(`${API}${filter}`);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
      resetCurrentPage();
    } catch (e) {
      console.log(e);
    }
  };
  //! Для страницы деталей
  const getDetails = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_DETAILS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  //!Пагинация
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    if (state.products) {
      const data = state.products;
      setPosts(data);
    }
  }, [state.products]);

  const numberOfLastPost = currentPage * postsPerPage;
  const numberOfFirstPost = numberOfLastPost - postsPerPage;
  const currentPosts = posts.slice(numberOfFirstPost, numberOfLastPost);
  const totalPosts = posts.length;

  const handlePage = (newPage) => {
    setCurrentPage(newPage);
  };
  function resetCurrentPage() {
    setCurrentPage(1);
  }

  //! Корзина
  const addAndDeleteProductInCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let post = {
      product: product,
      count: 1,
      subPrice: 0,
    };
    post.subPrice = calcSubPrice(post);
    let chekArr = cart.products.filter((item) => {
      return item.product.id === product.id;
    });
    if (chekArr.length === 0) {
      cart.products.push(post);
    } else {
      cart.products = cart.products.filter((item) => {
        return item.product.id !== product.id;
      });
    }
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DELETE_PRODUCT_IN_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let checkArr = cart.products.filter((item) => {
      return item.product.id === id;
    });
    if (checkArr.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let action = {
      type: "GET_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const changeCountProduct = (count, id) => {
    if (count < 1) {
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      console.log(item);
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  // ! Избранное
  // ! favorites 
  const addAndDeleteProductInFavorites = (item) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        favorites: [],
      };
    }
    let favProduct = {
      item: item,
    };
    let checkArr = favorite.favorites.filter((elem) => {
      return elem.item.id === item.id;
    });
    if (checkArr.length === 0) {
      favorite.favorites.push(favProduct);
    } else {
      favorite.favorites = favorite.favorites.filter((elem) => {
        return elem.item.id !== item.id;
      });
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
    dispatch({
      type: "ADD_AND_DELETE_FAVORITES",
      payload: favorite.favorites.length,
    });
  };
  const checkFavoriteInFavorites = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        favorites: [],
      };
    }
    let checkArr = favorite.favorites.filter((elem) => {
      return elem.item.id === id;
    });
    if (checkArr.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const getFavorite = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    dispatch({
      type: "GET_FAVORITES",
      payload: favorite,
    });
  };
  return (
    <clientContext.Provider
      value={{
        getProducts: getProducts,
        getDetails: getDetails,
        handlePage: handlePage,
        addAndDeleteProductInCart: addAndDeleteProductInCart,
        checkProductInCart: checkProductInCart,
        getCart: getCart,
        changeCountProduct: changeCountProduct,
        addAndDeleteProductInFavorites: addAndDeleteProductInFavorites,
        checkFavoriteInFavorites: checkFavoriteInFavorites,
        getFavorite: getFavorite,
        products: state.products,
        productDetails: state.productDetails,
        totalPosts: totalPosts,
        currentPosts: currentPosts,
        postsPerPage: postsPerPage,
        productCountInCart: state.productCountInCart,
        currentPage: currentPage,
        cart: state.cart,
        productsCountInFavorites: state.productsCountInFavorites,
        favorites: state.favorites,
      }}
    >
      {props.children}
    </clientContext.Provider>
  );
};

export default ClientContextProvider;
