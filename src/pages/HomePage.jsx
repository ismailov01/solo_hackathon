import React, { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router";
import MediaCard from "../components/MediaCard";
import { clientContext } from "../contexts/ClientContext";
import Pagination from "../components/Pagination";
import MyCarousel from '../components/Carousel/Carousel';
import { pink } from "@mui/material/colors";
import Footer from "../components/Footer/Footer";


const HomePage = () => {
  const { getProducts, products, currentPosts } = useContext(clientContext);
  const navigate = useNavigate()
  const [brandValue, setBrandValue] = useState('')

  let object = new URLSearchParams(window.location.search)
  function filterProducts(key, value) {
    object.set(key, value)
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl)
    getProducts()
    setBrandValue(value)
  }

  useEffect(() => {
    setBrandValue(object.get('category'))
  }, [object])

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className="home-page">
        <div className="sidebar" >
          <FormControl component="fieldset">
            <FormLabel className="category_h2" style={{ color: "white", textAlign: "center", marginTop: "10px", fontFamily: "Francois One, sans-serif", letterSpacing: "1px", fontSize: "30px", fontWeight: "bold" }} component="legend">Жанр</FormLabel>
            <RadioGroup
              aria-label="gender"
              value={brandValue}
              name="radio-buttons-group"
              onChange={(e) => filterProducts("category", e.target.value)}
            >
              <FormControlLabel
                value="phonk"
                control={<Radio
                  sx={{
                    color: pink[50],
                    "&.Mui-checked": {
                      color: pink[50],
                    },
                  }}  />}
                label="Phonk"
              />
              <FormControlLabel
                value="hip-hop"
                control={<Radio
                  sx={{
                    color: pink[50],
                    "&.Mui-checked": {
                      color: pink[50],
                    },
                  }}  />}
                label="Hip-Hop"
              />
              <FormControlLabel
                value="rap"
                control={<Radio
                  sx={{
                    color: pink[50],
                    "&.Mui-checked": {
                      color: pink[50],
                    },
                  }}  />}
                label="Rap"
              />
              <FormControlLabel
                value="pop"
                control={<Radio
                  sx={{
                    color: pink[50],
                    "&.Mui-checked": {
                      color: pink[50],
                    },
                  }}  />}
                label="Pop"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {products ? (
          <>
            <div className="products">
              {currentPosts.map((product) => (
                <MediaCard product={product} key={product.id} />
              ))}
            </div>

          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>

      <div>
        <Pagination />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
