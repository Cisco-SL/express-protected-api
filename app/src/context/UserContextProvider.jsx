import { useState } from 'react'
import { createContext, useContext } from 'react';

export const UserContext = createContext(null);


export default function UserContextProvider(props) {

  const [userContext, setUserContext] = useState("");

  return (
    <UserContext.Provider value={{userContext, setUserContext}}>
        {props.children}
    </UserContext.Provider>
  )
}



