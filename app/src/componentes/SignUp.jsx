import { useState } from 'react'
import userService from '../services/UserService';
import('../estilos/Formularios.css')
export default function SignUp() {


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (

    <form id="signupForm"
      onSubmit={ async form => {
        form.preventDefault();
        const user = {
          "username": username,
          "email": email,
          "password": password
        };
        const res = await userService.signUp(user);
        console.log(res);
      }}>

      <h1>Nuevo usuario</h1>

      <input name='username' type='text' value={username}
        placeholder='Username' required autoComplete='off'
        onChange={
          e => setUsername(e.target.value)} />

      <input name='email' value={email} placeholder='Email' required
        onChange={
          e => setEmail(e.target.value)} />

      <input name='password' type='password' value={password} required
        placeholder='Password' onChange={
          e => setPassword(e.target.value)} />

      <button type='submit'>Crear usuario</button>
    </form>
  )
}

