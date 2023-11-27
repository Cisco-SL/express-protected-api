import { useState } from 'react'
import { createContext, useContext } from 'react';

export const UserContext = createContext(null);


export default function UserContextProvider(props) {
/*   let initialValue = null;
  try {
    initialValue = JSON.parse(document.cookie.substring(/User=[*+]}/).split("=")[1]);
} catch (err) {
    console.log(err)
} */
  const [contextValue, setContextValue] = useState(null);

  return (
    <UserContext.Provider value={{contextValue, setContextValue}}>
        {props.children}
    </UserContext.Provider>
  )
}



