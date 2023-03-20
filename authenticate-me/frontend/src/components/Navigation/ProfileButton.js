import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "-hidden");

  console.log(ulClassName)

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li className="profile-content">Hello, {user.username}!</li>
        <li className="profile-content">Name: {user.firstName} {user.lastName}</li>
        <li className="profile-content top-divide">Email: {user.email}</li>
        <li className="profile-content top-divide manage-link-li">
          <NavLink className="manage-link" exact to="/spots/current">Manage Spots</NavLink>
        </li>
        <li className="logout-li">
          <button className="logout-button" onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;