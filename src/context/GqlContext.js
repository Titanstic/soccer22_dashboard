import {createContext} from "react";
import {useLazyQuery} from "@apollo/client";
import {EACH_USER_PAYMENT_HISTORY, PAYMENT_HISTORY} from "../gql/payment";
import {COMMISION_HISTORY} from "../gql/report";

const GqlContext = createContext();

const PaymentGqlContextProvider = ({children}) => {
    const [loadHistory, resultHistory] = useLazyQuery(PAYMENT_HISTORY);
    const [loadEachHistory, eachHistoryResult] = useLazyQuery(EACH_USER_PAYMENT_HISTORY);
    const [loadComHistory, resultComHistory] = useLazyQuery(COMMISION_HISTORY);

    return (
        <GqlContext.Provider value={{ loadHistory, resultHistory, loadEachHistory, eachHistoryResult, loadComHistory, resultComHistory}}>
            {children}
        </GqlContext.Provider>
    )
};

export { PaymentGqlContextProvider };
export default GqlContext;