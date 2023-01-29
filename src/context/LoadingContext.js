import {createContext, useState} from "react";

const LoadingContext = createContext();

export const LoadingContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true);

    return(
        <LoadingContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}
export default LoadingContext;