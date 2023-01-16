import {createContext, useState} from "react";

const NavContext = createContext();

export const NavContextProvider = ({children}) => {
    const [navActive, setNavActive] = useState('home');

    return (
        <NavContext.Provider value={{navActive, setNavActive}}>
            {children}
        </NavContext.Provider>
    )
}

export default NavContext;