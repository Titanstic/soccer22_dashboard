import LayoutView from "../LayoutView";
import {useContext, useEffect, useState} from "react";
import Loading from "../../component/Loading";
import AuthContext from "../../context/AuthContext";
import PaymentGqlContext from "../../context/PaymentGqlContext";
import NavContext from "../../context/NavContext";

const PaymentHistoryView = () => {
    // useState
    const [loading, setLoading] = useState(true);
    const [count ,setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [paymentHistory, setPaymentHistory] = useState(null);
    // useContext
    const {user}  = useContext(AuthContext);
    const {loadHistory, resultHistory} = useContext(PaymentGqlContext);

    // useContext
    const {setNavActive, setMainNav} = useContext(NavContext);

    // Start useEffect
    useEffect(() => {
        setNavActive("history");
        setMainNav("payment");
    })

    useEffect(() => {
        if(user){
            loadHistory({variables: { limit, offset, sender_id: user.id }});
        }
    }, [user, offset])

    useEffect(() => {
        if(resultHistory.data){
            setTotalCount(resultHistory.data.balance_transfer_history_aggregate.aggregate.count);
            setCount(Math.ceil(resultHistory.data.balance_transfer_history_aggregate.aggregate.count / limit));
            setPaymentHistory(resultHistory.data.balance_transfer_history);
            setLoading(false);
        }
    }, [resultHistory]);
    // End useEffect


    // Start Function
    const paginateButton = (state) => {
        if(state === "next"){
            setOffset(offset + 10);
            setPage(page + 1);
        }else{
            setOffset(offset - 10);
            setPage(page - 1);
        }
    };
    // End Function

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

                        {
                            count > 1 && <div className="text-sm border-t flex justify-between items-center py-2">
                                <p className="ml-5">Showing <span className="font-bold">{page}</span> to <span className="font-bold">{count}</span> page  {totalCount} results</p>

                                <div className="mr-5">
                                    <button className={`${page === 1 ? "bg-gray-200" : "bg-white hover:bg-gray-50"} font-bold border rounded shadow mr-5 px-3 py-2`} onClick={() => paginateButton("prev")} disabled={page === 1 ? true : false}>Previous</button>
                                    <button className={`${page < count ? "bg-white hover:bg-gray-50" : "bg-gray-200"} font-bold border rounded shadow mr-5 px-3 py-2`} onClick={() => paginateButton("next")} disabled={page < count ? false : true}>Next</button>
                                </div>
                            </div>
                        }
                    </div>
            }
        </LayoutView>
    )
};

export default PaymentHistoryView;