import {createContext, useState} from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userRow, setUserRow] = useState({});
    const [decodeToken, setDecodeToken] = useState({});
    const [where, setWhere] = useState(null);

    return(
        <AuthContext.Provider value={{user, setUser, userRow, setUserRow, decodeToken, setDecodeToken, where, setWhere}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;