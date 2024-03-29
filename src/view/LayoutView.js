import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AlertContext from "../context/AlertContext";
import ShowAlert from "../component/alert/ShowAlert";
import {decodeUserToken} from "../composable/login";
import {useLazyQuery} from "@apollo/client";
import {USERS_BY_PK} from "../gql/user";
import PhoneNav from "../component/layout/PhoneNav";
import AuthContext from "../context/AuthContext";
import {checkUserRow, whereUserRow} from "../composable/user";
import Loading from "../component/Loading";
import WindowNav from "../component/layout/WindowNav";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import "../css/style.css";

const LayoutView = ({children}) => {
    const [showNav, setShowNav] = useState(false);
    // useNavigate
    const navigate = useNavigate();
    const location = useLocation();
    // useContext
    const {alert} = useContext(AlertContext);
    const {user, setUser, setSingleBet, setMaxBet, setDecodeToken, setUserRow, setWhere, setWhereArr} = useContext(AuthContext);
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
            const {tempWhere, tempRowValue} = whereUserRow(checkRow);

            setSingleBet(resultUser.data.users_by_pk.single_bet);
            setMaxBet(resultUser.data.users_by_pk.max_bet);
            setWhere(tempWhere);
            setWhereArr(tempRowValue);
            setUserRow(checkRow);
            setUser(resultUser.data.users_by_pk);
        }
    }, [resultUser]);
    // End useEffect

    const navHandle = () => {
        setShowNav(!showNav);
    }

    return (
        <div className="w-full h-screen flex overflow-hidden">
            {
                user ?
                    <>
                        {/*Start PhoneNav Bar*/}
                        <PhoneNav showNav={showNav} navHandle={navHandle}/>
                        <WindowNav/>

                        {/*End PhoneNav Bar*/}

                        {/*Start Show Data */}

                        <SwitchTransition>
                            <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
                                <div className="w-full h-full overflow-y-auto md:w-10/12">
                                    <div className="w-full flex justify-between items-center shadow px-2 py-5">
                                        <div className="flex">
                                            <button className="block border mr-3 px-3 py-1 hover:bg-gray-50 md:hidden" onClick={navHandle}><i className="fa-solid fa-bars"></i></button>
                                            <p className="text-sm md:text-md font-bold pt-2 md:pt-0">Welcome Back, {user.username}</p>
                                        </div>

                                        <div className="md:mr-5">
                                            <p className="text-sm md:text-md font-bold">Balance - {user.balance}</p>
                                        </div>
                                    </div>
                                    {/*Start Children */}
                                            {children}
                                    {/*End Children */}
                                </div>
                                {/*End Show Data */}
                            </CSSTransition>
                        </SwitchTransition>
                    </>
                    :
                    <Loading/>
            }

            {/*Start Alert Modal */}
            {
                alert && <ShowAlert/>
            }
            {/*End Alert Modal */}

        </div>
    );
};

export default LayoutView;

