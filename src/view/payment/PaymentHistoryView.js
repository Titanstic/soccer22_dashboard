import LayoutView from "../LayoutView";
import {useContext, useEffect, useState} from "react";
import Loading from "../../component/Loading";
import AuthContext from "../../context/AuthContext";
import PaymentGqlContext from "../../context/PaymentGqlContext";

const PaymentHistoryView = () => {
    // useState
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [paymentHistory, setPaymentHistory] = useState(null);
    // useContext
    const {user}  = useContext(AuthContext);
    const {loadHistory, resultHistory} = useContext(PaymentGqlContext);
    // useLazyQuery

    useEffect(() => {
        if(user){
            loadHistory({variables: { limit, offset, sender_id: user.id }});
        }
    }, [user])

    useEffect(() => {
        console.log(resultHistory.data);
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
                                    <th className="px-6 py-4">Time</th>
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
                                        <td className="px-6 py-4">{new Date(payment.created_at).getDate() < 10 ? `0${new Date(payment.created_at).getDate()}` : new Date(payment.created_at).getDate()}-{new Date(payment.created_at).getMonth() + 1 < 10 ? `0${new Date(payment.created_at).getMonth() + 1}` : new Date(payment.created_at).getMonth() + 1}-{new Date(payment.created_at).getFullYear()}</td>
                                        <td className="px-6 py-4">{new Date(payment.created_at).getHours() < 10 ? `0${new Date(payment.created_at).getHours()}` : new Date(payment.created_at).getHours()}:{new Date(payment.created_at).getMinutes() < 10 ? `0${new Date(payment.created_at).getMinutes()}` : new Date(payment.created_at).getMinutes()}:{new Date(payment.created_at).getSeconds() < 10 ? `0${new Date(payment.created_at).getSeconds()}` : new Date(payment.created_at).getSeconds()}</td>
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