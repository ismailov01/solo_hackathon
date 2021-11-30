import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BasicTable from "../components/BasicTable";

const AdminPage = () => {
  return (
    <div>
      <h2 style={{color: 'white', textAlign: 'center'}}>Страница Администратора</h2>
      <Link to="/add">
        <Button variant="contained" color="error" style={{display: 'flex', justifyContent: 'center'}}>
          Добавить композицию
        </Button>
      </Link>
      <div>
        <BasicTable />
      </div>
    </div>
  );
};

export default AdminPage;
