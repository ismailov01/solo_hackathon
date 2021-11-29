import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { clientContext } from '../contexts/ClientContext';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    p: 4,
};
const Favorites = ({ open, handleCloseFavorite }) => {
    const { addAndDeleteProductInCart, checkProductInCart, favorites, addAndDeleteProductInFavorites, getFavorite } = useContext(clientContext)
    useEffect(() => {
        getFavorite()
    }, [])
    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseFavorite}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{ textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2"> Избранное
                        {
                            favorites ? (
                                favorites.favorites.length > 0 ? (
                                    favorites.favorites.map((item) => (

                                        <div key={item.item.id} className="favorite" >
                                            <img width='220px' src={item.item.image} />
                                            <span >{item.item.name}</span>

                                            <Button onClick={() => {
                                                addAndDeleteProductInFavorites
                                                    (item.item)
                                                getFavorite()
                                            }
                                            }
                                            >X</Button>
                                            <Button
                                                onClick={() => addAndDeleteProductInCart(item.item)}
                                                className='shop-btn' color={checkProductInCart(item.item.id) ? 'error' : ''} variant='outlined' size="large">
                                                <ShoppingCartIcon color={checkProductInCart(item.item.id) ? 'error' : ''} />
                                            </Button>
                                            <br />
                                        </div>

                                    ))
                                ) : (
                                    <h3>Загрузка</h3>
                                )
                            ) : (
                                <h3>У вас нет избранных товаров </h3>
                            )
                        }
                    </Typography>

                </Box>
            </Modal>
        </div>
    );
};

export default Favorites;