import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-div">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <ul className="signup-errors">
          {errors.map((error, idx) => <li className="signup-error-text" key={idx}>{error}</li>)}
        </ul>

        <ul className="signup-ui">
          <li className="signup-detail">
            <label>
              <input
                type="text"
                placeholder="Email"

                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </li>

          <li className="signup-detail">
            <label>
              <input
                type="text"
                placeholder="Username"

                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </li>

          <li className="signup-detail">
            <label>
              <input
                type="text"
                placeholder="First Name"

                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
          </li>

          <li className="signup-detail">
            <label>
              <input
                type="text"
                placeholder="Last Name"

                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </li>

          <li className="signup-detail">
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

          <li className="signup-detail">
            <label>
              <input
                type="password"
                placeholder="Confirm Password"

                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </li>

          <li className="signup-detail-button">
            <button 
              className="signup-button" 
              type="submit" 
              disabled={(!email || username.length < 4 || !firstName || !lastName || password.length < 6 || !confirmPassword) || (password !== confirmPassword) ? true : false}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SignupFormModal;