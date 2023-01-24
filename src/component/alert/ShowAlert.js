import {useContext} from "react";
import AlertContext from "../../context/AlertContext";

const ShowAlert = () => {
    const {alert, alertError} = useContext(AlertContext);

    return (
        <div className={`${alertError ? "bg-red-500" : "bg-indigo-500"} text-white rounded shadow-md absolute bottom-14 right-10 px-4 py-3`}>
            <p className="font-bold">{alert}</p>
        </div>
    )
};

export default ShowAlert;