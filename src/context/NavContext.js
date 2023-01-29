import {createContext, useState} from "react";

const NavContext = createContext();

export const NavContextProvider = ({children}) => {
    const [navActive, setNavActive] = useState("");
    const [mainNav, setMainNav] = useState("");

    return (
        <NavContext.Provider value={{navActive, setNavActive, mainNav, setMainNav}}>
            {children}
        </NavContext.Provider>
    )
}

export default NavContext;