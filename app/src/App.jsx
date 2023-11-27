import './App.css'
import Header from './componentes/Header'
import Footer from './componentes/Footer'
import { Outlet } from 'react-router-dom';
import UserContext from './context/UserContextProvider';
function App() {


  return (
    <>
    <UserContext>
      < Header />
        <Outlet/>
      < Footer />
      </UserContext>
    </>
  )
}

export default App
