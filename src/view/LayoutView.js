import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AlertContext from "../context/AlertContext";
import ShowAlert from "../component/alert/ShowAlert";
import {decodeUserToken} from "../composable/login";
import {useLazyQuery} from "@apollo/client";
import {USERS_BY_PK} from "../gql/user";
import Nav from "../component/layout/Nav";
import NavUserData from "../component/layout/NavUserData";

const LayoutView = ({children}) => {
    // useState
    const [user, setUser] = useState({});
    // useNavigate
    const navigate = useNavigate();
    // useContext
    const {alert} = useContext(AlertContext);

    const [loadUser, resultUser] = useLazyQuery(USERS_BY_PK);

    // Start useEffect
    useEffect(() => {
        const userData = decodeUserToken();

        if(!userData){
            navigate("/");
        }else {
            loadUser({variables: {id: userData.userID}});
        }
    }, [loadUser]);

    useEffect(() => {
        if(resultUser.data){
            setUser(resultUser.data.users_by_pk);
        }
    }, [resultUser]);
    // End useEffect

    console.log(user);

    return (
        <div className="h-screen overflow-hidden relative">
            <div className="flex h-full">
                {
                    user ?
                        <>
                            {/*Start Nav Bar*/}
                            <Nav/>
                            {/*End Nav Bar*/}

                            {/*Start Show Data */}
                            <div className="w-full h-full overflow-auto relative">
                                <NavUserData username={user.username}/>

                                {/*Start Children */}
                                {children}
                                {/*End Children */}
                            </div>
                            {/*End Show Data */}
                        </>
                        :
                        <h1>Loading</h1>
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

