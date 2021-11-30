import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { authContext } from "../contexts/AuthContext";
import { Button } from "@mui/material";
import SignUpModal from "./auth/SignUpModal";
import SignInModal from "./auth/SignInModal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { clientContext } from "../contexts/ClientContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Favorites from "../pages/Favorites";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logOut, adminEmail } = React.useContext(authContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const {
    getProducts,
    productCountInCart,
    productsCountInFavorites,
    getFavorite,
  } = React.useContext(clientContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  let object = new URLSearchParams(window.location.search);
  function filterProducts(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getProducts();
  }

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = React.useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseFavorite = () => setOpen(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";

  
  let profile;
  if (user) {
    profile = (
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    );
  } else {
    profile = (
      <>
        <Button color="inherit" onClick={handleShowLogin} style={{ fontFamily: "Francois One, sans-serif", letterSpacing: "1px", fontSize: "16px"}}>
          Sign In
        </Button>
        <Button color="inherit" onClick={handleShow} style={{ fontFamily: "Francois One, sans-serif", letterSpacing: "1px", fontSize: "16px" }}>
          Sign Up
        </Button>
        
      </>
    );
  }

  let temp;
  if (user.email === adminEmail) {
    temp = (
      <Link to="/admin">
        <Button variant="contained" color="error">Admin</Button>
      </Link>
    );
  }

  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      {
        user ? (
      <>
      <MenuItem onClick={handleMenuClose}>
      {
        user && (<p style={{ fontSize: "15px" }}>{user.email}</p>)
      }
      </MenuItem>
      <MenuItem
      onClick={() => {
        handleMenuClose();
        logOut();
        getProducts();
      }}
      >
      Log Out
    </MenuItem>
    </>
        ) : (
      <MenuItem> 
      {profile}
      </MenuItem> 
        ) 
      }


    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <Link to="/cart">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={productCountInCart} color="primary">
                    <ShoppingCart style={{ color: 'black'}}/>
                  </Badge>
                </IconButton>
              </Link>
        <p>Корзина</p>
      </MenuItem>
      <MenuItem>
      <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={productsCountInFavorites} color="primary">
                  <BookmarkIcon
                    onClick={() => {
                      handleOpen();
                      getFavorite();
                    }}
                  />
                </Badge>
              </IconButton>
        <p>Избранное</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{ background: "black"}}
          position="static"
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{cursor: 'pointer'}}
              sx={{ display: { xs: "none", sm: "block" } }}
              onClick={() => {
                navigate("/");
                getProducts();
              }}
              style={{ cursor: 'pointer', fontSize: "30px", fontFamily: "Francois One, sans-serif", letterSpacing: "1px"}}
            >
              Makers music<MusicNoteIcon />
            </Typography> 
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => filterProducts("q", e.target.value)}
                placeholder="Поиск…"
                style={{ fontFamily: "Francois One, sans-serif", letterSpacing: "1px"}}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {user.email === adminEmail ? temp : <></>}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to="/cart">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={productCountInCart} color="primary">
                    <ShoppingCart style={{ color: 'white'}}/>
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={productsCountInFavorites} color="primary">
                  <BookmarkIcon
                    onClick={() => {
                      handleOpen();
                      getFavorite();
                    }}
                  />
                </Badge>
              </IconButton>
              {profile}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <SignUpModal handleClose={handleClose} show={show} />
        <SignInModal
          handleCloseLogin={handleCloseLogin}
          showLogin={showLogin}
        />
        
      </Box>
      <Favorites
        open={open}
        handleCloseFavorite={handleCloseFavorite}
        handleOpen={handleOpen}
      />
    </>
  );
}
