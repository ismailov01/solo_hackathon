import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { adminContext } from "../contexts/AdminContext";
import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { API } from "../helpers/const";

export default function BasicTable() {
  const { getProducts, products, deleteProduct } = React.useContext(adminContext);
  React.useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
              <TableCell align="right">№</TableCell>
                <TableCell align="right">Изображение</TableCell>
                <TableCell>Название композиции</TableCell>
                <TableCell align="right">Испонитель</TableCell>
                <TableCell align="right">Альбом</TableCell>
                <TableCell align="right">Жанр</TableCell>
                <TableCell align="right">Цена</TableCell>
                <TableCell align="right">#</TableCell>
                <TableCell align="right">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <TableRow 
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <img width="70" src={item.image} alt="item" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={item.artist}>
                      <p>{item.artist}</p>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">{item.album}</TableCell>
                  <TableCell align="right">{item.category}</TableCell>
                  <TableCell align="right">{item.price}$</TableCell>
                  <TableCell align="right">
                    <Link to={`/admin/edit/${item.id}`} style={{textDecoration: 'none'}}>
                      <Button color="primary" variant="outlined">
                        Изменить
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="error" onClick={() => deleteProduct(item.id)}>
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h2 style={{color: 'white'}}>Loading...</h2>
      )}
    </>
  );
}
