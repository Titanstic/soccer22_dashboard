import {createContext, useState} from "react";

const AlertContext = createContext();

const AlertContextProvider = ({children}) => {
    const [alert, setAlert] = useState("");
    const [alertError, setAlertError] = useState(false);

    return (
        <AlertContext.Provider value={{alert, setAlert, alertError, setAlertError}}>
            {children}
        </AlertContext.Provider>
    )
}
export default AlertContext;
export {AlertContextProvider};
