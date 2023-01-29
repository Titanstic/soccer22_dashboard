import LayoutView from "../LayoutView";
import {useContext, useEffect, useState} from "react";
import Loading from "../../component/Loading";
import {useLazyQuery} from "@apollo/client";
import {PAYMENT_HISTORY} from "../../gql/payment";
import AuthContext from "../../context/AuthContext";

const PaymentHistoryView = () => {
    // useState
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [paymentHistory, setPaymentHistory] = useState(null);
    // useContext
    const {user}  = useContext(AuthContext);
    // useLazyQuery
    const [loadHistory, resultHistory] = useLazyQuery(PAYMENT_HISTORY);

    useEffect(() => {
        if(user){
            loadHistory({variables: { limit, offset, sender_id: user.id }});
        }
    }, [user])

    useEffect(() => {
        if(resultHistory.data){
            setPaymentHistory(resultHistory.data.balance_transfer_history);
            setLoading(false);
        }
    }, [resultHistory]);
    return (
        <LayoutView>
            {
                loading ?
                    <Loading/>
                    :
                    <div className="w-11/12 rounded-lg border border-gray-200 shadow-md my-10 mx-auto">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                            <tr className="text-lg font-medium text-gray-900">
                                <th scope="col" className="px-6 py-4">Id</th>
                                <th scope="col" className="px-6 py-4">Sender ID</th>
                                <th scope="col" className="px-6 py-4">Receiver ID</th>
                                <th scope="col" className="px-6 py-4">Transfer Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">time</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {
                                paymentHistory.map(payment => (
                                    <tr className="hover:bg-gray-50" key={payment.id}>
                                        <td className="px-6 py-4">{payment.id}</td>
                                        <td className="px-6 py-4">{payment.sender_id}</td>
                                        <td className="px-6 py-4">{payment.receiver_id}</td>
                                        <td className="px-6 py-4">{payment.transfer_amount}</td>
                                        <td className="px-6 py-4">{new Date(payment.created_at).getDate()}-{new Date(payment.created_at).getMonth()}-{new Date(payment.created_at).getFullYear()}</td>
                                        <td className="px-6 py-4">{new Date(payment.created_at).getHours()}:{new Date(payment.created_at).getMinutes()}:{new Date(payment.created_at).getSeconds()}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
            }
        </LayoutView>
    )
};

export default PaymentHistoryView;