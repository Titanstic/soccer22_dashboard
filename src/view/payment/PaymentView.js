import LayoutView from "../LayoutView";
import PaymentData from "../../component/payment/PaymentData";
import {useLazyQuery} from "@apollo/client";
import {USERS} from "../../gql/user";
import {useState} from "react";
import UpdatePayment from "../../component/payment/UpdatePayment";

const  PaymentView = () => {
    // useState
    const [userdata, setUserdata] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [balance, setBalance] = useState(0);
    // useLazyQuery
    const [loadPayment, resultPayment] = useLazyQuery(USERS);

    // Start Function
    const updateModalHandle = (data, userBalance) => {
        setUserdata(data);
        setBalance(userBalance);
        setOpenUpdate(!openUpdate);
    }
    // End Function

    return (
        <LayoutView>
            <PaymentData updateModalHandle={updateModalHandle} loadPayment={loadPayment} resultPayment={resultPayment} />

            {/*Start Update Payment Modal*/}
            {
                openUpdate && <UpdatePayment updateModalHandle={updateModalHandle} balance={balance} setBalance={setBalance} userdata={userdata}/>
            }
            {/*End Update Payment Modal*/}
        </LayoutView>
    )
};

export default PaymentView;