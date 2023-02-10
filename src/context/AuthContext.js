import {createContext, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {ALL_USER} from "../gql/user";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userRow, setUserRow] = useState({});
    const [decodeToken, setDecodeToken] = useState({});
    const [where, setWhere] = useState(null);
    const [whereArr, setWhereArr] = useState(null);
    // useLazyQuery
    const [loadAllUsers, allUsersResult] = useLazyQuery(ALL_USER);


    return(
        <AuthContext.Provider value={{user, setUser, userRow, setUserRow, decodeToken, setDecodeToken, where, setWhere, whereArr, setWhereArr, loadAllUsers, allUsersResult}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;