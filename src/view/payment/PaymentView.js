import LayoutView from "../LayoutView";
import PaymentData from "../../component/payment/PaymentData";
import {useLazyQuery} from "@apollo/client";
import {UPPER_USER, USERS} from "../../gql/user";
import {useContext, useEffect, useState} from "react";
import UpdatePayment from "../../component/payment/UpdatePayment";
import NavContext from "../../context/NavContext";
import DeductAllPayment from "../../component/payment/DeductAllPayment";

const  PaymentView = () => {
    // useState
    const [userCode, setUserCode] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [accStatus, setAccStatus] = useState(null);
    const [action, setAction] = useState(null);
    const [balance, setBalance] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDeductAll, setOpenDeductAll] = useState(false);
    // useLazyQuery
    const [loadPayment, resultPayment] = useLazyQuery(USERS);
    const [loadUpperAcc, resultUpperAcc] = useLazyQuery(UPPER_USER);
    // useContext
    const {setNavActive, setMainNav} = useContext(NavContext);

    // Start useEffect
    useEffect(() => {
        setNavActive("quick");
        setMainNav("payment");
    })
    // End useEffect

    // Start Function
    const updateModalHandle = (data, receiverBalance, userBalance, account, action) => {
        // receiver balance
        setUserCode(data);
        setUserBalance(receiverBalance);
        // login balance
        setBalance(userBalance);
        setAccStatus(account);
        setAction(action);
        setOpenUpdate(!openUpdate);
    }

    const deductAllModal = (data, receiverBalance) => {
        // receiver balance
        setUserCode(data);
        setUserBalance(receiverBalance);
        setOpenDeductAll(!openDeductAll);
    }
    // End Function

    return (
        <LayoutView>
            <PaymentData updateModalHandle={updateModalHandle} deductAllModal={deductAllModal} loadPayment={loadPayment} resultPayment={resultPayment} loadUpperAcc={loadUpperAcc} resultUpperAcc={resultUpperAcc}/>

            {/*Start Update Payment Modal*/}
            {
                openUpdate && <UpdatePayment updateModalHandle={updateModalHandle} resultPayment={resultPayment} resultUpperAcc={resultUpperAcc} balance={balance} userCode={userCode} userBalance={userBalance} accStatus={accStatus} action={action}/>
            }
            {/*End Update Payment Modal*/}

            {/*Start Deduct All payment Modal*/}
            {
                openDeductAll && <DeductAllPayment deductAllModal={deductAllModal} resultPayment={resultPayment} resultUpperAcc={resultUpperAcc} userCode={userCode} userBalance={userBalance}/>
            }
            {/*End Deduct All payment Modal*/}
        </LayoutView>
    )
};

export default PaymentView;