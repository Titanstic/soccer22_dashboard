import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AlertContext from "../../context/AlertContext";

const NavUserData = ({username}) => {
    // useNavigate
    const navigate = useNavigate();
    // useContext
    const {setAlert, setAlertError} = useContext(AlertContext);


    // Start Useful Function
    const showAlert = (message, bool) => {
        setAlert(message);
        setAlertError(bool);
        setTimeout(() => {
            setAlert("");
            setAlertError(false);
        }, 3000);
    };
    // End Useful Function

    // Start Function
    const logoutHandle = () => {
        window.localStorage.removeItem("loggedUser");
        showAlert("Logout Successfully", false);
        navigate("/");
    };
    // End Function

    return (
        <div className="w-full flex justify-between shadow py-5 pl-3">
            <p className="text-md font-bold">Welcome Back, {username}</p>

            <div className="mr-5">
                <button className=" text-lg bg-blue-500 text-white font-bold shadow rounded hover:bg-blue-400 px-5 py-2" onClick={logoutHandle}><i className="fa-solid fa-right-to-bracket mr-2"></i> Logout</button>
            </div>
        </div>
    )
};

export default NavUserData;