import {createContext, useState} from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userRow, setUserRow] = useState({});
    const [decodeToken, setDecodeToken] = useState({});
    const [where, setWhere] = useState(null);
    const [adminRow, setAdminRow] = useState("");

    return(
        <AuthContext.Provider value={{user, setUser, userRow, setUserRow, decodeToken, setDecodeToken, where, setWhere, adminRow, setAdminRow}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;