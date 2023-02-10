import LayoutView from "../LayoutView";
import {useContext, useEffect, useState} from "react";
import Loading from "../../component/Loading";
import AuthContext from "../../context/AuthContext";
import PaymentGqlContext from "../../context/PaymentGqlContext";
import NavContext from "../../context/NavContext";
import {useLazyQuery} from "@apollo/client";
import {ALL_USER} from "../../gql/user";
import {filterTransferUsers, getCurrentDate} from "../../composable/payment";
import {EACH_USER_PAYMENT_HISTORY} from "../../gql/payment";

const PaymentHistoryView = () => {
    // useState
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [loading, setLoading] = useState(false);
    const [allUser, setAllUser] = useState(null);
    const [selectUser, setSelectUser] = useState(null);
    const [selectEachUser, setSelectEachUser] = useState(false);
    const [selectEachData, setSelectEachData] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([]);
    // useLazyQuery
    const [loadUsers, usersResult] = useLazyQuery(ALL_USER);
    const [loadEachHistory, eachHistoryResult] = useLazyQuery(EACH_USER_PAYMENT_HISTORY);
    // useContext
    const {user, where, whereArr}  = useContext(AuthContext);
    const {loadHistory, resultHistory} = useContext(PaymentGqlContext);
    const {setNavActive, setMainNav} = useContext(NavContext);

    // Start useEffect
    // to get user data for select box
    useEffect(() => {
        if(user) {
            setLoading(true);
            setNavActive("history");
            setMainNav("payment");

            // to get Current Date
            const {currentDate, createdDate, updatedDate} = getCurrentDate();
            setFromDate(currentDate);
            setToDate(currentDate);
            setStartDate(createdDate);
            setEndDate(updatedDate);

            setSelectUser(user.id);
            loadUsers({ variables: { where: {_and: where} } });
        }
    }, [user])

    useEffect(() => {
        if(usersResult.data){
            let filterUser = filterTransferUsers(usersResult.data.users, whereArr)
            setAllUser(filterUser);
        }
    }, [usersResult])


    useEffect(() => {
        setLoading(true);
        if(selectUser && !selectEachUser){
            loadHistory({variables: { startDate, endDate, userId: selectUser}});
        }

        if(selectUser && selectEachUser){
            loadEachHistory({variables: {fromDate: startDate, toDate: endDate, loginId: user.id, selectId: selectUser}});
        }
    }, [selectUser, fromDate, toDate])

    useEffect(() => {
        if(resultHistory.data){
            setPaymentHistory(resultHistory.data.balance_transfer_history);
            setLoading(false);
        }
    }, [resultHistory]);

    useEffect(() => {
        if(eachHistoryResult.data){
            setPaymentHistory(eachHistoryResult.data.balance_transfer_history);
            setLoading(false);
        }
    }, [eachHistoryResult])
    // End useEffect

    // Start Function
    const fromDateHandle = (e) => {
        let selectDate = new Date(e.target.value),
            getToDate = new Date(toDate);

        // to modify "to date" less than "from date"
        if(getToDate < selectDate){
            setToDate(e.target.value);
            setEndDate(`${e.target.value}T00:00:00+00:00`);
        }

        setFromDate(e.target.value);
        setStartDate(`${e.target.value}T00:00:00+00:00`);
    };

    const toDateHandle = (e) => {
        setToDate(e.target.value);
        setEndDate(`${e.target.value}T24:00:00+00:00`);
    }

    // select box for change user
    const changeUser = (e) => {
        setSelectEachUser(true);
        setSelectUser(Number(e.target.value));
    };
    // End Function

    return (
        <LayoutView>
            {
                loading ?
                    <Loading/>
                    :
                    <div className="w-11/12 my-10 mx-auto">
                        <div className="flex justify-between items-center mb-10">
                            <select className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer mr-5" onChange={changeUser} name="" id="">
                                <option value="0" selected disabled>Please Choose User</option>
                                {
                                    allUser && allUser.map((u) => (
                                        <option key={u.id} value={`${u.id}`}>{u.username}</option>
                                    ))
                                }
                            </select>

                            <div className="">
                                <label htmlFor="fromDate" className="font-bold mr-2">From :</label>
                                <input type="date" id="fromDate" className="border px-4 py-2 mr-5" value={fromDate} onChange={fromDateHandle}/>

                                <label htmlFor="toDate" className="font-bold mr-2">To :</label>
                                <input type="date" id="toDate" className="border px-4 py-2" value={toDate} onChange={toDateHandle} min={fromDate}/>
                            </div>
                        </div>
                        
                        <div className="rounded-lg border border-gray-200 shadow-md">
                            {/*Start Payment History Data*/}
                            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                <thead className="bg-gray-50">
                                <tr className="text-lg font-medium text-gray-900">
                                    <th scope="col" className="px-6 py-4">Id</th>
                                    <th scope="col" className="px-6 py-4">Sender Name</th>
                                    <th scope="col" className="px-6 py-4">Receiver Name</th>
                                    <th scope="col" className="px-6 py-4">In</th>
                                    <th scope="col" className="px-6 py-4">Out</th>
                                    <th scope="col" className="px-6 py-4">Older Coin</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Time</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {
                                    paymentHistory.length > 0 ?
                                        paymentHistory.map(payment => (
                                            <tr className="hover:bg-gray-50" key={payment.id}>
                                                <td className="px-6 py-4">{payment.id}</td>
                                                <td className="px-6 py-4">{payment.userBySenderId.username}</td>
                                                <td className="px-6 py-4">{payment.user.username}</td>
                                                <td className="text-green-500 font-bold px-6 py-4">{payment.receiver_id === user.id ? payment.transfer_amount : "0"} </td>
                                                <td className="text-red-500 font-bold px-6 py-4">{payment.sender_id === user.id ? payment.transfer_amount : "0"}</td>
                                                <td className="px-6 py-4">{ }</td>
                                                <td className="px-6 py-4">{new Date(payment.created_at).toISOString().split("T")[0]}</td>
                                                <td className="px-6 py-4">{new Date(payment.created_at).toISOString().split("T")[1].split(".")[0]}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td className="text-center px-6 py-4" colSpan="6">No History</td>
                                        </tr>
                                }
                                </tbody>
                            </table>
                            {/*End Payment History Data*/}
                        </div>
                    </div>
            }
        </LayoutView>
    )
};

export default PaymentHistoryView;