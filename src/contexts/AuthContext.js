import React, { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/FireBase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth, 
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";


export const authContext = createContext();
const INIT_STATE = {
  user: '',

};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  console.log(props);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "LOGIN_USER",
          payload: user,
        });
      } else {
        dispatch({
          type: "LOGOUT_USER",
          payload: '',
        });
      }
    });
  }, []);

  const createUserWithEmailAndPasswordHandler = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT_USER",
          payload: '',
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  let adminEmail = 'kubaismailov02@gmail.com';

  const loginUserWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.log(e);
    }
  };

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000/login'
    })
  }

  return (
    <authContext.Provider
      value={{
        createUserWithEmailAndPasswordHandler,
        loginUserWithEmail,
        logOut,
        forgotPassword,
        user: state.user,
        adminEmail
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
