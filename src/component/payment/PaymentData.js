import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import LoadingContext from "../../context/LoadingContext";
import Loading from "../Loading";

const PaymentData = ({updateModalHandle, loadPayment, resultPayment}) => {
    // useState
    const [paymentData, setPaymentData] = useState(null);
    const [balance, setBalance] = useState(0);
    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);
    // useContext
    const {user, where, decodeToken} = useContext(AuthContext);
    const {loading, setLoading} = useContext(LoadingContext);

    // Start UseEffect
    useEffect(() => {
        setLoading(true);
        if(where){
            loadPayment({ variables: { limit, offset, where: {_and: where}} })
        }
    }, [user])

    useEffect(() => {
        if(resultPayment.data){
            const result = resultPayment.data.users.filter(u => u.id !== decodeToken.userID ? u : setBalance(u.balance));

            setPaymentData(result);
            setLoading(false);
        }
    }, [resultPayment])
    // End UseEffect

    return(
        <>
            {
                loading ?
                    <Loading/>
                    :
                    <div className="w-10/12 rounded-lg my-10 mx-auto">
                        <p className="text-xl font-bold text-right mb-5">Main Balance : {balance}</p>
                        <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg shadow-md text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                            <tr className="text-lg font-medium text-gray-900">
                                <th scope="col" className="px-6 py-4">Account</th>
                                <th scope="col" className="px-6 py-4">Contact Name</th>
                                <th scope="col" className="px-6 py-4">Current Balance</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {
                                paymentData && paymentData.map( pay => (
                                    <tr className="hover:bg-gray-50" key={pay.id}>
                                        <td className="px-6 py-4">{
                                            `${pay.super_code ? pay.super_code : ""} 
                                                    ${pay.senior_code ? pay.super_code : ""} 
                                                    ${pay.master_code ? pay.super_code : ""} 
                                                    ${pay.agent_code ? pay.super_code : ""} 
                                                    ${pay.user_code ? pay.super_code : ""} 
                                                    `
                                        }</td>
                                        <td className="px-6 py-4">{pay.contact_name}</td>
                                        <td className="px-6 py-4">{pay.balance}</td>
                                        <td className="text-lg px-6 py-4">
                                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5" onClick={() => updateModalHandle(pay, balance)}></i>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
};

export default PaymentData;