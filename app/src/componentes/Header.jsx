import userService from '../services/UserService';
import '../estilos/Header.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContextProvider';

export default function Header() {
  const { contextValue, setContextValue } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/validate", {credentials: "include"})
      .then(r => r.json().then(r => r.ok && setContextValue(r.user)))
  }, [])
  const navigate = useNavigate();
  return (<>
    <header>
      <h2>
        <NavLink to="/">
          My Site
        </NavLink>
      </h2>

      <nav>
        <ul>
          {!contextValue &&
            <li>
              <NavLink to="/signup" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>
                SignUp
              </NavLink>
            </li>}
          {!contextValue &&
            <li>
              <NavLink to="/login" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>
                Login
              </NavLink>
            </li>}
          {contextValue && <li>
            <NavLink to="/write" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>Write</NavLink>
          </li>}


          {contextValue &&
            <li>
              <NavLink to="/logout" onClick={async e => {
                e.preventDefault();
                userService.logout();
                setContextValue(null);
                navigate('/', { replace: true });
              }}>
                Logout
              </NavLink>
            </li>
          }
        </ul>
      </nav>
    </header>
  </>)
}
