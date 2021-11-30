import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import ForgotPassword from "./ForgotPaswword";


export const SignInModal = (props) => {
  let navigate = useNavigate();

  const { loginUserWithEmail } = useContext(authContext);
  const [user, setUser] = useState({ email: "", password: "" });

  const [showForgot, setShowForgot] = React.useState(false);
  const handleCloseForgot = () => setShowForgot(false);
  const handleShowForgot = () => setShowForgot(true);


  function handleChange(e) {
    let userr = { ...user, [e.target.name]: e.target.value };
    setUser(userr);
  }

  function handleLogIn(e) {
    try {
      e.preventDefault();
      loginUserWithEmail(user.email, user.password);
      props.handleCloseLogin();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Modal
        show={props.showLogin}
        onHide={props.handleCloseLogin}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Войти в аккаунт</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Введите логин"
              />
              <Form.Text className="text-muted">
                Мы никогда никому не передадим ваше имя пользователя.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Пароль"
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* <Button variant="primary" onClick={handleShow}>
                Забыли пароль
              </Button> */}
              <Button variant="primary" type="submit">
                Войти
              </Button>
              <Button color="inherit" onClick={() => {
                  handleShowForgot()
                  props.handleCloseLogin()
                  }} style={{ fontFamily: "Francois One, sans-serif", letterSpacing: "1px", fontSize: "16px" }}>
          Забыли пароль
        </Button>

            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ForgotPassword
          handleCloseForgot={handleCloseForgot}
          showForgot={showForgot}
        />
    </>
  );
};

export default SignInModal;
