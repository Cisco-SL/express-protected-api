import { useState } from 'react'
import userService from '../services/UserService';
import('../estilos/Login.css')
import { useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setUserContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form id="loginForm"
      onSubmit={async form => {
        form.preventDefault();
        const credentials =
        {
          "email": email,
          "password": password
        };

        const res = await userService.login(credentials);

        if (res.ok) {
          setUserContext(res.user);
          navigate('/write', { replace: true });
        }
      }}>


      <h1>Login</h1>

      <input name='email' value={email} placeholder='Email' required
        onChange={e => setEmail(e.target.value)}
      />

      <input name='password' type='password' value={password} placeholder='Password' required
        onChange={e => setPassword(e.target.value)}
      />

      <button type='submit'>Login</button>
    </form>
  )
}