import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink } from 'react-router-dom';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: "genericUser", password: "password3"}))
      .then(closeModal);
  }

  return (
    <div className="login-div">
      <h1 className="login-title">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className="login-errors">
          {errors.map((error, idx) => (
            <li className="login-error-text" key={idx}>{error}</li>
          ))}
        </ul>

        <ul className="login-ui">
          <li className="login-detail">
            <label>
              <input
                type="text"
                placeholder="Username or Email"

                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </li>

          <li className="login-detail">
            <label>
              <input
                type="password"
                placeholder="Password"

                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </li>

          <li className="login-detail-button">
            <button className="login-button" type="submit" disabled={(credential.length < 4) || (password.length < 6) ? true : false}>Log In</button>
          </li>

          <li className="login-detail demo-login">
            <NavLink className="demo-login-link" exact to='/' onClick={demoLogin}>
              Demo User
            </NavLink>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default LoginFormModal;