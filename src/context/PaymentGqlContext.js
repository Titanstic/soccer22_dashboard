import {createContext} from "react";
import {useLazyQuery} from "@apollo/client";
import {PAYMENT_HISTORY} from "../gql/payment";

const PaymentGqlContext = createContext();

const PaymentGqlContextProvider = ({children}) => {
    const [loadHistory, resultHistory] = useLazyQuery(PAYMENT_HISTORY);

    return (
        <PaymentGqlContext.Provider value={{ loadHistory, resultHistory }}>
            {children}
        </PaymentGqlContext.Provider>
    )
};

export { PaymentGqlContextProvider };
export default PaymentGqlContext;