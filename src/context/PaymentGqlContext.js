import {createContext} from "react";
import {useLazyQuery} from "@apollo/client";
import {EACH_USER_PAYMENT_HISTORY, PAYMENT_HISTORY} from "../gql/payment";

const PaymentGqlContext = createContext();

const PaymentGqlContextProvider = ({children}) => {
    const [loadHistory, resultHistory] = useLazyQuery(PAYMENT_HISTORY);
    const [loadEachHistory, eachHistoryResult] = useLazyQuery(EACH_USER_PAYMENT_HISTORY);

    return (
        <PaymentGqlContext.Provider value={{ loadHistory, resultHistory, loadEachHistory, eachHistoryResult}}>
            {children}
        </PaymentGqlContext.Provider>
    )
};

export { PaymentGqlContextProvider };
export default PaymentGqlContext;