import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import Loading from "../Loading";
import {filterTransferUsers, getReceiverCode} from "../../composable/payment";
import AlertContext from "../../context/AlertContext";

const PaymentData = ({updateModalHandle, deductAllModal, loadPayment, resultPayment}) => {
    // useState
    const [paymentData, setPaymentData] = useState(null);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    // useContext
    const {user, where, decodeToken, whereArr} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);

    // Start UseEffect
    useEffect(() => {
        setLoading(true);
        if(where){
            loadPayment({ variables: { where: {_and: where}} })
        }
    }, [where])

    useEffect(() => {
        if(resultPayment.data){
            // to get balance from login user account
            resultPayment.data.users.forEach(u => u.id === decodeToken.userID && setBalance(u.balance) );

            // to remove next lower account
            let filterUser = filterTransferUsers(resultPayment.data.users, whereArr);
            setPaymentData(filterUser);

            setLoading(false);
        }
    }, [resultPayment])

    // End UseEffect

    // Start Function
    const balanceWithDraw = (data) => {
        if(data.active){
            const {receiverCode, transfer} = getReceiverCode(data, user);
            let receiverBalance = data.balance;

            if(transfer){
                updateModalHandle(receiverCode, receiverBalance, balance, "lower", "transfer");
            }else{
                showAlert("You don't have permission this lower account", true);
            }
        }else{
            showAlert("This account is not active", true);
        }
    };

    const balanceDeduct = (data) => {
        if(data.active){
            if(data.balance > 0){
                const {receiverCode, transfer} = getReceiverCode(data, user);
                let receiverBalance = data.balance;

                if(transfer){
                    updateModalHandle(receiverCode, receiverBalance, balance, "lower", "deduct");
                }else{
                    showAlert("You don't have permission this lower account", true);
                }
            }else{
                showAlert("This account balance is 0.So you can't deduct balance this account", true);
            }
        }else{
            showAlert("This account is not active", true);
        }
    };

    const balanceDeductAll = (data) => {
        if(data.active){
            if(data.balance > 0){
                const {receiverCode, transfer} = getReceiverCode(data, user);
                let receiverBalance = data.balance;

                if(transfer){
                    deductAllModal(receiverCode, receiverBalance);
                }else{
                    showAlert("You don't have permission this lower account", true);
                }
            }else{
                showAlert("This account balance is 0.So you can't deduct balance this account", true);
            }
        }else{
            showAlert("This account is not active", true);
        }
    };
    // End Function

    return(
        <>
            {
                loading ?
                    <Loading/>
                    :
                    <>
                        <div className="flex justify-between items-center mx-10 py-5">
                            <p className="text-xl font-bold">Main Balance : {balance}</p>
                        </div>

                        <div className="w-11/12 border border-gray-200 rounded-lg shadow-md mt-5 mb-10 mx-auto">
                            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                <thead className="bg-gray-50">
                                <tr className="text-lg font-medium text-gray-900">
                                    <th scope="col" className="px-6 py-4">User Name</th>
                                    <th scope="col" className="px-6 py-4">Contact Name</th>
                                    <th scope="col" className="px-6 py-4">Current Balance</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {
                                    paymentData && paymentData.map( pay => (
                                        <tr className="hover:bg-gray-50" key={pay.id}>
                                            <td className="px-6 py-4">{pay.username}</td>
                                            <td className="px-6 py-4">{pay.contact_name}</td>
                                            <td className="px-6 py-4">{pay.balance}</td>
                                            <td className="px-6 py-2">
                                                <button className={`${pay.active ? "bg-blue-600 cursor-pointer" : "bg-blue-400"} text-white border shadow rounded px-3 py-2 hover:bg-blue-400 mr-8`} onClick={() => balanceWithDraw(pay)} disabled={!pay.active}>Transfer</button>
                                                <button className={`${pay.active ? "bg-red-600 cursor-pointer" : "bg-red-400"} text-white border shadow rounded px-3 py-2 hover:bg-red-400 mr-8`} onClick={() => balanceDeduct(pay)} disabled={!pay.active}>Deduct</button>
                                                <button className={`${pay.active ? "bg-red-600 cursor-pointer" : "bg-red-400"} text-white border shadow rounded px-3 py-2 hover:bg-red-400`} onClick={() => balanceDeductAll(pay)} disabled={!pay.active}>Deduct All</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </>
    )
};

export default PaymentData;