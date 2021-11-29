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
              <TableRow>
                <TableCell align="right">Изображение</TableCell>
                <TableCell>Название продукта</TableCell>
                <TableCell align="right">Состав</TableCell>
                <TableCell align="right">Цена</TableCell>
                <TableCell align="right">См/грамм</TableCell>
                <TableCell align="right">#</TableCell>
                <TableCell align="right">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((phone) => (
                <TableRow
                  key={phone.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <img width="70" src={phone.image} alt="phone" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {phone.name}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={phone.composition}>
                      <p>{phone.composition.slice(0, 30)}...</p>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">{phone.price} сом</TableCell>
                  <TableCell align="right">{phone.gram}</TableCell>
                  <TableCell align="right">
                    <Link to={`/admin/edit/${phone.id}`}>
                      <Button color="warning" variant="outlined">
                        Изменить
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => deleteProduct(phone.id)}>
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
