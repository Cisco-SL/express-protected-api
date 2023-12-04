import userService from '../services/UserService';
import '../estilos/Header.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContextProvider';

export default function Header() {
  const navigate = useNavigate();

  const { userContext, setUserContext } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/validate", {credentials: "include"})
      .then(r => r.json().then(r => r.ok && setUserContext(r.user)))
  }, [])
  return (<>
    <header>
      <h2>
        <NavLink to="/">
          My Site
        </NavLink>
      </h2>

      <nav>
        <ul>
          {!userContext &&
            <li>
              <NavLink to="/signup" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>
                SignUp
              </NavLink>
            </li>}
          {!userContext &&
            <li>
              <NavLink to="/login" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>
                Login
              </NavLink>
            </li>}
          {userContext && <li>
            <NavLink to="/write" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>Write</NavLink>
          </li>}


          {userContext &&
            <li>
              <NavLink to="/logout" onClick={async e => {
                e.preventDefault();
                userService.logout();
                setUserContext(null);
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
