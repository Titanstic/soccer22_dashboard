import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AlertContext from "../../context/AlertContext";
import NavContext from "../../context/NavContext";

const NavUserData = ({username}) => {
    // useNavigate
    const navigate = useNavigate();
    // useContext
    const {showAlert} = useContext(AlertContext);
    const {setNavActive, setMainNav} = useContext(NavContext);


    // Start Function
    const logoutHandle = () => {
        showAlert("Logout Successfully", false);

        window.localStorage.removeItem("loggedUser");
        setNavActive("");
        setMainNav("");
        navigate("/");
    };
    // End Function

    return (
        <div className="w-full flex justify-between items-center shadow py-5 pl-3">
            <p className="text-md font-bold">Welcome Back, {username}</p>

            <div className="mr-5">
                <button className=" text-lg bg-blue-500 text-white font-bold shadow rounded hover:bg-blue-400 px-5 py-2" onClick={logoutHandle}><i className="fa-solid fa-right-to-bracket mr-2"></i> Logout</button>
            </div>
        </div>
    )
};

export default NavUserData;