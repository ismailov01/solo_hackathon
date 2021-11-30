// import { useContext, useState } from "react";
// import React from "react";

// import { authContext, useAuth } from "../../contexts/AuthContext";
// import { Link } from "react-router-dom";

// const ForgotPassword = (props) => {
//   const [email, setEmail] = useState("");

//   const { forgotPassword } = useContext(authContext);
//   console.log(props);

//   return (
//     <>
//       <div
//         className="bodyRegister"
//         show={props.show}
//         onHide={props.handleClose}
//       >
//         <div className="containerDi">
//           <Link to="/login">
//             <label
//               htmlFor="show"
//               className="close-btn fas fa-times"
//               title="close"
//             ></label>
//           </Link>

//           <div className="text">Forgot password</div>

//           <form
//             onSubmit={async (e) => {
//               e.preventDefault();

//               try {
//                 await forgotPassword(email);
//               } catch (error) {
//                 console.log(error.message);
//               }
//             }}
//           >
//             <div className="data">
//               <label>Email or Phone</label>
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 name="email"
//                 type="email"
//               />
//             </div>

//             <div className="btn">
//               <div className="inner"></div>

//               <button type="submit">submit</button>
//             </div>
//             <span className="or">or</span>

//             <div className="btn">
//               <div className="inner"></div>
//               <Link to="/login">
//                 <button type="submit">login</button>
//               </Link>
//             </div>
//           </form>

//           {/*  end of the form */}
//         </div>
//         {/* </div> */}
//       </div>
//     </>
//   );
// };

// export default ForgotPassword;

import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";

export const ForgotPassword = (props) => {
  let navigate = useNavigate();

  const { loginUserWithEmail } = useContext(authContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");

  
  const { forgotPassword } = useContext(authContext);
  console.log(props);

  function handleChange(e) {
    let userr = { ...user, [e.target.name]: e.target.value };
    setUser(userr);
  }

  function handleLogIn(e) {
    try {
      e.preventDefault();
      loginUserWithEmail(user.email, user.password);
      props.handleCloseForgot();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
console.log(props);
  return (
    <>
      <Modal
        show={props.showForgot}
        onHide={props.handleCloseForgot}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Войти в аккаунт</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await forgotPassword(email);
                props.handleCloseForgot()
                navigate('/')
              } catch (error) {
                console.log(error);
              }
            }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Введите email"
              />
              <Form.Text className="text-muted">
                Мы никогда никому не передадим ваше имя пользователя.
              </Form.Text>
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="primary" type="submit">
                Восстановить
              </Button>

            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPassword;
