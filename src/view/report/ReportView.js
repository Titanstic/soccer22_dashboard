import LayoutView from "../LayoutView";
import {useEffect, useContext, useState} from "react";
import AuthContext from "../../context/AuthContext";
import {getCurrentDate} from "../../composable/payment";
import {useLazyQuery} from "@apollo/client";
import {COMMISION_HISTORY} from "../../gql/report";
import {filterComision} from "../../composable/report";


const ReportView = () => {
    // useState
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [user, setUser] = useState(null);
    const [betSlip, setBetSlip] = useState(null);
    // useContext
    const {where} = useContext(AuthContext);
    // useLazyQuery
    const [loadComHistory, resultComHistory] = useLazyQuery(COMMISION_HISTORY);

    // Start UseEffect
    useEffect(() => {
            // setNavActive("history");
            // setMainNav("payment");
            setLoading(true);

            // to get Current Date
            const {currentDate, createdDate, updatedDate} = getCurrentDate();
            setFromDate(currentDate);
            setToDate(currentDate);
            setStartDate(createdDate);
            setEndDate(updatedDate);

            if(where){
                setUser(where);
            }
    }, [where])

    // --- start to get bet slip
    useEffect(() => {
        if(user){
            loadComHistory({variables: {user}});
        }
    }, [user, fromDate, toDate])

    useEffect(() => {
        if(resultComHistory.data){
            let comisionHistorys = resultComHistory.data.commision_history;
            let {newComisionHistorys} = filterComision(comisionHistorys);

            let newGroups = [];
            newComisionHistorys.forEach(each => {
                if(newGroups.length > 0){
                    newGroups.forEach(group => {
                        if(group.user.id === each[1].user.id){
                            // console.log({...group, "bet_slip": {...group.bet_slip, "balance": 500}});
                            let balance = group.bet_slip.balance + each[1].bet_slip.balance;
                            const target = Object.assign(group, balance);
                            // group.bet_slip.balance =  group.bet_slip.balance + each[1].bet_slip.balance;
                        }else{
                            newGroups.push(each[1]);
                        }
                    })
                }else{
                    newGroups.push(each[1]);
                }
            });

            console.log(newGroups);

            setLoading(false);
            setBetSlip(newComisionHistorys);
        }
    }, [resultComHistory])

    // --- end to get bet slip

    // End UseEffect


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
        // setPaymentHistory(null);
    };

    const toDateHandle = (e) => {
        setToDate(e.target.value);
        setEndDate(`${e.target.value}T24:00:00+00:00`);
        // setPaymentHistory(null);
    }
    // End Function

    return (
        <LayoutView>
            <div className="w-full my-10 mx-auto md:w-11/12">
                <div className="flex justify-between items-center ml-5 mb-10 md:ml-0">
                    <div>
                        <div className="md:inline-block mb-2 md:mb-0 ">
                            <label htmlFor="fromDate" className="font-bold mr-3">From :</label>
                            <input type="date" id="fromDate" className="border px-4 py-2 mr-5" value={fromDate} onChange={fromDateHandle}/>
                        </div>

                        <div  className="md:inline-block">
                            <label htmlFor="toDate" className="font-bold mr-8 md:mr-2">To :</label>
                            <input type="date" id="toDate" className="border px-4 py-2" value={toDate} onChange={toDateHandle} min={fromDate}/>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 shadow-md mx-2 sm:mx-0">
                    {/*Start Payment History Data*/}
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                            <tr className="text-lg font-medium text-gray-900">
                                <th scope="col" className="px-6 py-4">Account</th>
                                <th scope="col" className="px-6 py-4">Amount</th>
                                <th scope="col" className="text-center px-6 py-4" colSpan="3">Member</th>
                                <th scope="col" className="text-center px-6 py-4" colSpan="3">Company</th>
                            </tr>
                            <tr>
                                <th scope="col" className="px-6 py-1"></th>
                                <th scope="col" className="px-6 py-1"></th>
                                <th scope="col" className="px-6 py-1">W/L</th>
                                <th scope="col" className="px-6 py-1">Com</th>
                                <th scope="col" className="px-6 py-1">W/L + Com</th>
                                <th scope="col" className="px-6 py-1">W/L</th>
                                <th scope="col" className="px-6 py-1">Com</th>
                                <th scope="col" className="px-6 py-1">W/L + Com</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {
                            loading ?
                                <tr>
                                    <td className="text-center text-red-600 px-6 py-4" colSpan="8">Loading ...</td>
                                </tr>
                                :
                                betSlip &&
                                    betSlip.length > 0 ?
                                        betSlip.map(slip => (
                                            <tr className="hover:bg-gray-50" key={slip[1].id}>
                                                <td className="px-6 py-4"><span className="text-blue-700 hover:text-blue-400 cursor-pointer" onClick={() => {console.log("work")}}>{slip[1].user.username}</span></td>
                                                <td className="px-6 py-4">{slip[1].bet_slip.balance}</td>
                                                <td className="px-6 py-4">{slip[1].bet_slip.win_lose_cash}</td>
                                                <td className="px-6 py-4">{slip[1].actual_commision}</td>
                                                <td className="px-6 py-4">{slip[1].bet_slip.win_lose_cash + slip[1].actual_commision}</td>
                                                <td className="px-6 py-4">{slip[1].bet_slip.win_lose_cash}</td>
                                                <td className="px-6 py-4">{slip[1].actual_commision}</td>
                                                <td className="px-6 py-4">{slip[1].bet_slip.win_lose_cash + slip[1].actual_commision}</td>
                                            </tr>
                                        ))
                                    :
                                    <tr>
                                        <td className="text-center text-red-600 px-6 py-4" colSpan="8">No Data</td>
                                    </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutView>
    )
};

export default ReportView;