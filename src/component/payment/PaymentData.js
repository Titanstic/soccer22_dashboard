import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import Loading from "../Loading";
import {getReceiverCode, getUpperCode} from "../../composable/payment";
import AlertContext from "../../context/AlertContext";

const PaymentData = ({updateModalHandle, deductAllModal, loadPayment, resultPayment, loadUpperAcc, resultUpperAcc}) => {
    // useState
    const [paymentData, setPaymentData] = useState(null);
    const [upperAccount, setUpperAccount] = useState(null);
    const [transferUpper, setTransferUpper] = useState(false);
    const [count ,setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [balance, setBalance] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    // useContext
    const {user, where, decodeToken, upperWhere} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);

    // Start UseEffect
    useEffect(() => {
        setLoading(true);
        if(where){
            loadPayment({ variables: { limit, offset, where: {_and: where}} })
        }
    }, [user, offset])

    useEffect(() => {
        if(resultPayment.data){
            setTotalCount(resultPayment.data.users_aggregate.aggregate.count);
            setCount(Math.ceil(resultPayment.data.users_aggregate.aggregate.count / limit));

            const result = resultPayment.data.users.filter(u => u.id !== decodeToken.userID ? u : setBalance(u.balance) );

            setPaymentData(result);
            setLoading(false);
        }
    }, [resultPayment])

    useEffect(() => {
        if(upperWhere){
            loadUpperAcc({variables: {where: {_and: upperWhere}} });
        }
    }, [loadUpperAcc])

    useEffect(() => {
        if(resultUpperAcc.data){
            setUpperAccount(resultUpperAcc.data.users[0]);
        }
    }, [resultUpperAcc]);

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

    const balanceDeposit = () => {
        const {upperCode, transfer} = getUpperCode(upperAccount, user);
        let upperBalance = upperAccount.balance;

        if(transfer){
            updateModalHandle(upperCode, upperBalance, balance, "upper", "transfer");
        }else{
            showAlert("You don't have permission this upper account", true);
        }
    };

    const balanceDeduct = (data) => {
        if(data.active){
            const {receiverCode, transfer} = getReceiverCode(data, user);
            let receiverBalance = data.balance;

            if(transfer){
                updateModalHandle(receiverCode, receiverBalance, balance, "lower", "deduct");
            }else{
                showAlert("You don't have permission this lower account", true);
            }
        }else{
            showAlert("This account is not active", true);
        }
    };

    const balanceDeductAll = (data) => {
        if(data.active){
            const {receiverCode, transfer} = getReceiverCode(data, user);
            let receiverBalance = data.balance;

            if(transfer){
                deductAllModal(receiverCode, receiverBalance);
            }else{
                showAlert("You don't have permission this lower account", true);
            }
        }else{
            showAlert("This account is not active", true);
        }
    }

    const paginateButton = (state) => {
        if(state === "next"){
            setOffset(offset + limit);
            setPage(page + 1);
        }else{
            setOffset(offset - limit);
            setPage(page - 1);
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
                            <div className="text-white">
                                <button className="bg-green-500 rounded border shadow mr-5 px-3 py-2 hover:bg-green-600" onClick={() => setTransferUpper(false)}>Transfer to lower account</button>
                                {
                                    upperAccount &&
                                        upperAccount.id !== user.id &&
                                            <button  className="bg-red-500 rounded border shadow px-3 py-2 hover:bg-red-600" onClick={() => setTransferUpper(true)}>Transfer to upper account</button>
                                }
                            </div>

                            <p className="text-xl font-bold">Main Balance : {balance}</p>
                        </div>

                        <div className="w-11/12 border border-gray-200 rounded-lg shadow-md mt-5 mb-10 mx-auto">
                            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                <thead className="bg-gray-50">
                                <tr className="text-lg font-medium text-gray-900">
                                    <th scope="col" className="px-6 py-4">Account</th>
                                    <th scope="col" className="px-6 py-4">Contact Name</th>
                                    <th scope="col" className="px-6 py-4">Current Balance</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {
                                    transferUpper ?
                                        upperAccount && <tr className="hover:bg-gray-50" key={upperAccount.id}>
                                            <td className="px-6 py-4">{
                                                `${upperAccount.super_code ? upperAccount.super_code : ""} 
                                                    ${upperAccount.senior_code ? upperAccount.senior_code : ""} 
                                                    ${upperAccount.master_code ? upperAccount.master_code : ""} 
                                                    ${upperAccount.agent_code ? upperAccount.agent_code : ""} 
                                                    ${upperAccount.user_code ? upperAccount.user_code : ""} 
                                                    `
                                            }</td>
                                            <td className="px-6 py-4">{upperAccount.contact_name}</td>
                                            <td className="px-6 py-4">{upperAccount.balance}</td>
                                            <td className="text-lg px-6 py-4">
                                                <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5" onClick={balanceDeposit}></i>
                                            </td>
                                        </tr>
                                        :
                                        paymentData && paymentData.map( pay => (
                                            <tr className="hover:bg-gray-50" key={pay.id}>
                                                <td className="px-6 py-4">{
                                                    `${pay.super_code ? pay.super_code : ""} 
                                                    ${pay.senior_code ? pay.senior_code : ""} 
                                                    ${pay.master_code ? pay.master_code : ""} 
                                                    ${pay.agent_code ? pay.agent_code : ""} 
                                                    ${pay.user_code ? pay.user_code : ""} 
                                                    `
                                                }</td>
                                                <td className="px-6 py-4">{pay.contact_name}</td>
                                                <td className="px-6 py-4">{pay.balance}</td>
                                                <td className="px-6 py-3">
                                                    <button className="bg-blue-600 text-white border shadow rounded px-3 py-1 cursor-pointer hover:bg-blue-400 mr-5" onClick={() => balanceWithDraw(pay)}>Transfer</button>
                                                    <button className="bg-red-600 text-white border shadow rounded px-3 py-1 cursor-pointer hover:bg-red-400 mr-5" onClick={() => balanceDeduct(pay)}>Deduct</button>
                                                    <button className="bg-red-600 text-white border shadow rounded px-3 py-1 cursor-pointer hover:bg-red-400 mr-5" onClick={() => balanceDeductAll(pay)}>Deduct All</button>
                                                </td>
                                            </tr>
                                        ))
                                }
                                </tbody>
                            </table>

                            {
                                !transferUpper && count > 1 && <div className="text-sm border-t flex justify-between items-center py-2">
                                    <p className="ml-5">Showing <span className="font-bold">{page}</span> to <span className="font-bold">{count}</span> page  {totalCount} results</p>

                                    <div className="mr-5">
                                        <button className={`${page === 1 ? "bg-gray-200" : "bg-white hover:bg-gray-50"} font-bold border rounded shadow mr-5 px-3 py-2`} onClick={() => paginateButton("prev")} disabled={page === 1 ? true : false}>Previous</button>
                                        <button className={`${page < count ? "bg-white hover:bg-gray-50" : "bg-gray-200"} font-bold border rounded shadow mr-5 px-3 py-2`} onClick={() => paginateButton("next")} disabled={page < count ? false : true}>Next</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </>
            }
        </>
    )
};

export default PaymentData;