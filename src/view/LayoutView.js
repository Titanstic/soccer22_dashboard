import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import AlertContext from "../context/AlertContext";
import ShowAlert from "../component/alert/ShowAlert";
import {decodeUserToken} from "../composable/login";
import {useLazyQuery} from "@apollo/client";
import {USERS_BY_PK} from "../gql/user";
import Nav from "../component/layout/Nav";
import NavUserData from "../component/layout/NavUserData";
import AuthContext from "../context/AuthContext";
import {checkUserRow, whereUserRow} from "../composable/user";
import Loading from "../component/Loading";

const LayoutView = ({children}) => {
    // useNavigate
    const navigate = useNavigate();
    // useContext
    const {alert} = useContext(AlertContext);
    const {user, setUser, setDecodeToken, setUserRow, setWhere, setAdminRow} = useContext(AuthContext);
    // useLazyQuery
    const [loadUser, resultUser] = useLazyQuery(USERS_BY_PK);

    // Start useEffect
    useEffect(() => {
        const userData = decodeUserToken();
        setDecodeToken(userData);

        if(!userData){
            navigate("/");
        }else {
            loadUser({variables: {id: userData.userID}});
        }
    }, [loadUser]);

    useEffect(() => {
        if(resultUser.data){
            let checkRow = checkUserRow(resultUser.data.users_by_pk);
            const {tempWhere, tempRow} = whereUserRow(checkRow);
            console.log(tempRow);

            setAdminRow(tempRow);
            setWhere(tempWhere);
            setUserRow(checkRow);
            setUser(resultUser.data.users_by_pk);
        }
    }, [resultUser]);
    // End useEffect

    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="flex h-full">
                {
                    user ?
                        <>
                            {/*Start Nav Bar*/}
                            <Nav/>
                            {/*End Nav Bar*/}

                            {/*Start Show Data */}
                            <div className="w-10/12 h-full overflow-auto">
                                <NavUserData username={user.username}/>

                                {/*Start Children */}
                                {children}
                                {/*End Children */}
                            </div>
                            {/*End Show Data */}
                        </>
                        :
                        <Loading/>
                }
            </div>
            {/*Start Alert Modal */}
            {
                alert && <ShowAlert/>
            }
            {/*End Alert Modal */}

        </div>
    );
};

export default LayoutView;

