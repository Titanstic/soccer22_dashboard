import LayoutView from "../LayoutView";
import {useEffect, useContext, useState} from "react";
import AuthContext from "../../context/AuthContext";
import {getCurrentDate} from "../../composable/payment";
import {useLazyQuery} from "@apollo/client";
import {COMMISION_HISTORY} from "../../gql/report";
import {filterComision, filterEachUser, filterGroupComision} from "../../composable/report";
import NavContext from "../../context/NavContext";

const ReportView = () => {
    // useContext
    const {where, whereArr} = useContext(AuthContext);
    const {setNavActive, setMainNav} = useContext(NavContext);
    // useState
    const [loading, setLoading] = useState(false);
    const [showEachUser, setShowEachUser] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [key, setKey] = useState(1);

    const [user, setUser] = useState(null);
    const [totalCompany, setTotalCompany] = useState(null);
    const [betSlip, setBetSlip] = useState(null);
    const [comision, setComision] = useState(null);
    const [total, setTotal] = useState(null);
    // useLazyQuery
    const [loadComHistory, resultComHistory] = useLazyQuery(COMMISION_HISTORY);

    // Start UseEffect
    useEffect(() => {
            setNavActive("report");
            setMainNav("reports");
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
            loadComHistory({variables: {user, startDate, endDate}});
        }
    }, [user, fromDate, toDate])

    useEffect(() => {
        if(resultComHistory.data){
            let comisionHistorys = resultComHistory.data.commision_history;
            let {newComisionHistorys} = filterComision(comisionHistorys, whereArr);
            let {newGroups,totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose, newCompanyGroups, totalNewCompanyComission, totalNewCompanyBalance, totalNewCompanyWinLose} = filterGroupComision(newComisionHistorys, key);

            setComision(newComisionHistorys);
            setTotalCompany(newCompanyGroups);
            setBetSlip(newGroups);

            if(newGroups.length > 0){
                setTotal({totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose, totalNewCompanyComission, totalNewCompanyBalance, totalNewCompanyWinLose});
            }else{
                setKey(1);
                setTotal(null);
            }
            setLoading(resultComHistory.loading);
        }
    }, [resultComHistory])
    // --- end to get bet slip

    // End UseEffect

    // Start Function
    const fromDateHandle = (e) => {
        let selectDate = new Date(e.target.value),
            getToDate = new Date(toDate);

        setLoading(true);
        setTotal(null);
        // to modify "to date" less than "from date"
        if(getToDate < selectDate){
            setToDate(e.target.value);
            setEndDate(`${e.target.value}T24:00:00+00:00`);
        }

        setFromDate(e.target.value);
        setStartDate(`${e.target.value}T00:00:00+00:00`);
    };

    const toDateHandle = (e) => {
        setLoading(true);
        
        setToDate(e.target.value);
        setEndDate(`${e.target.value}T24:00:00+00:00`);
    }

    const backDetailMemberBtn = () => {
        const backIndex = key - 1 ;

        if(backIndex >= 1) {
            setKey(backIndex);
            const {
                newGroups,
                totalNewGroupComission,
                totalNewGroupBalance,
                totalNewGroupWinLose,
                newCompanyGroups,
                totalNewCompanyComission,
                totalNewCompanyBalance,
                totalNewCompanyWinLose
            } = filterGroupComision(comision, backIndex);
            setShowEachUser(false);
            setTotalCompany(newCompanyGroups);
            setBetSlip(newGroups);
            setTotal({
                totalNewGroupComission,
                totalNewGroupBalance,
                totalNewGroupWinLose,
                totalNewCompanyComission,
                totalNewCompanyBalance,
                totalNewCompanyWinLose
            });
        }
    }

    const detailMember = (currentIndex, userId) => {
        setKey(currentIndex + 1);

        if(key + whereArr.length < 5){
            const {newGroups,totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose, newCompanyGroups, totalNewCompanyComission, totalNewCompanyBalance, totalNewCompanyWinLose} = filterGroupComision(comision, currentIndex + 1);

            setShowEachUser(false);
            setTotalCompany(newCompanyGroups);
            setBetSlip(newGroups);
            setTotal({totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose, totalNewCompanyComission, totalNewCompanyBalance, totalNewCompanyWinLose});
        }else{
            const {eachUserGroup, totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose,} = filterEachUser(comision, userId);
            setTotal({totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose});
            setShowEachUser(true);
            setBetSlip(eachUserGroup);
        }
    }
    // End Function

    return (
        <LayoutView>
            <div className="w-full my-10 mx-auto md:w-11/12">
                <div className="flex justify-between items-center ml-5 mb-10 md:ml-0">
                    {/*Start Back Btn*/}
                            <div>
                                <button className={`${key > 1 ? "visible" : "invisible"} font-bold border border-gray-200 shadow-md rounded px-4 py-1 hover:bg-gray-50`} onClick={backDetailMemberBtn}>Back</button>
                            </div>
                    {/*End Back Btn*/}

                    {/*Start Control Date*/}
                    <div className="justify-self-end">
                        <div className="md:inline-block mb-2 md:mb-0 ">
                            <label htmlFor="fromDate" className="font-bold mr-3">From :</label>
                            <input type="date" id="fromDate" className="border px-4 py-2 mr-5" value={fromDate} onChange={fromDateHandle}/>
                        </div>

                        <div  className="md:inline-block">
                            <label htmlFor="toDate" className="font-bold mr-8 md:mr-2">To :</label>
                            <input type="date" id="toDate" className="border px-4 py-2" value={toDate} onChange={toDateHandle} min={fromDate}/>
                        </div>
                    </div>
                    {/*End Control Date*/}
                </div>

                <div className="rounded-lg border border-gray-200 shadow-md mx-2 sm:mx-0">
                    {/*Start Payment History Data*/}
                        {
                            showEachUser ?
                                // Stat Each User Data Report
                                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50">
                                    <tr className="text-lg font-medium text-gray-900">
                                        <th scope="col" className="px-4 py-4">Account</th>
                                        <th scope="col" className="px-4 py-4">Date</th>
                                        <th scope="col" className="px-4 py-4">Event</th>
                                        <th scope="col" className="text-center px-4 py-4">Detail</th>
                                        <th scope="col" className="px-4 py-1">W/L</th>
                                        <th scope="col" className="px-4 py-1">Com</th>
                                        <th scope="col" className="px-4 py-1">W/L + Com</th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                    {
                                        betSlip &&
                                        betSlip.length > 0 ?
                                            betSlip.map(slip => (
                                                <tr className="hover:bg-gray-50" key={slip.id}>
                                                    <td className="px-4 py-4"><span>{slip.user.username}</span></td>
                                                    <td className="px-4 py-4">
                                                        {new Date(slip.created_at).toISOString().split("T")[0]}
                                                        <br/>
                                                        {new Date(slip.created_at).toISOString().split("T")[1]}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className="font-bold">{slip.bet_slip.match.home_team} </span>
                                                        <span className="text-sm">vs</span>
                                                        <span className="font-bold"> {slip.bet_slip.match.away_team} </span>
                                                        <span className="">
                                                        {
                                                            slip.bet_slip.match.half_score_1
                                                                ?
                                                                `(${slip.bet_slip.match.half_score_1} - ${slip.bet_slip.match.half_score_2})`
                                                                :
                                                                `(${slip.bet_slip.match.score_1} - ${slip.bet_slip.match.score_2})`
                                                        }
                                                    </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        {
                                                            slip.bet_slip.bet_team ?
                                                                `Body ${slip.bet_slip.body} (${slip.bet_slip.bet_team})`
                                                                :
                                                                `${slip.bet_slip.over_under} (${slip.bet_slip.goal_paung})`
                                                        }
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        {
                                                            Math.sign(slip.bet_slip.win_lose_cash) === -1 ?
                                                                slip.bet_slip.win_lose_cash * 0.95
                                                                :
                                                                slip.bet_slip.win_lose_cash
                                                        }
                                                    </td>
                                                    <td className="px-4 py-4">{slip.percent_commision === 0 ? slip.percent_commision : slip.percent_commision/100}</td>
                                                    <td className="px-4 py-4">
                                                        {
                                                            slip.percent_commision === 0 ?
                                                                slip.bet_slip.win_lose_cash * 0.95
                                                                :
                                                                (slip.bet_slip.win_lose_cash * (0.95 + slip.percent_commision/100)).toFixed(2)
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td className="text-center text-red-600 px-4 py-4" colSpan="8">No Data</td>
                                            </tr>
                                    }

                                    {
                                        total &&
                                        <tr className="font-bold">
                                            <td className="text-center px-4 py-4" colSpan="4">Total</td>
                                            <td className="px-4 py-4">{(total.totalNewGroupWinLose * 0.95).toFixed(2)}</td>
                                            <td className="px-4 py-4">{total.totalNewGroupWinLose * total.totalNewGroupComission.toFixed(3) / 100}</td>
                                            <td className="px-4 py-4">{(total.totalNewGroupWinLose * (0.95 + total.totalNewGroupComission.toFixed(3) / 100)).toFixed(2)}</td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                                // End Each User Data Report
                                :
                                // Stat All User Data Report
                                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50">
                                    <tr className="text-lg font-medium text-gray-900">
                                        <th scope="col" className="px-4 py-4">Account</th>
                                        <th scope="col" className="px-4 py-4">Amount</th>
                                        <th scope="col" className="text-center px-4 py-4" colSpan="3">Member</th>
                                        <th scope="col" className="text-center px-4 py-4" colSpan="3">Company</th>
                                    </tr>
                                    <tr>
                                        <th scope="col" className="px-4 py-1"></th>
                                        <th scope="col" className="px-4 py-1"></th>
                                        <th scope="col" className="px-4 py-1">W/L</th>
                                        <th scope="col" className="px-4 py-1">Com</th>
                                        <th scope="col" className="px-4 py-1">W/L + Com</th>
                                        <th scope="col" className="px-4 py-1">W/L</th>
                                        <th scope="col" className="px-4 py-1">Com</th>
                                        <th scope="col" className="px-4 py-1">W/L + Com</th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                    {
                                        loading ?
                                            <tr>
                                                <td className="text-center text-red-600 px-4 py-4" colSpan="8">Loading ...</td>
                                            </tr>
                                            :
                                            betSlip &&
                                            betSlip.length > 0 ?
                                                betSlip.map((slip, slipkey) => (
                                                    <tr className="hover:bg-gray-50" key={slip.id}>
                                                        <td className="px-4 py-4"><span className="text-blue-700 hover:text-blue-400 cursor-pointer" onClick={() => detailMember(key, slip.user.id)}>{slip.user.username}</span></td>
                                                        <td className="px-4 py-4">{slip.bet_slip.balance}</td>
                                                        <td className="px-4 py-4">
                                                            {
                                                                Math.sign(slip.bet_slip.win_lose_cash) === -1 ?
                                                                    slip.bet_slip.win_lose_cash
                                                                    :
                                                                    (slip.bet_slip.win_lose_cash * 0.95).toFixed(2)

                                                            }
                                                        </td>
                                                        <td className="px-4 py-4">{slip.percent_commision === 0 ? slip.bet_slip.win_lose_cash * slip.percent_commision.toFixed(3) : slip.bet_slip.win_lose_cash * (slip.percent_commision.toFixed(3)/100)}</td>
                                                        <td className="px-4 py-4">
                                                            {
                                                                slip.percent_commision === 0 ?
                                                                    (slip.bet_slip.win_lose_cash * 0.95).toFixed(2)
                                                                    :
                                                                    (slip.bet_slip.win_lose_cash * (0.95 + slip.percent_commision/100)).toFixed(2)
                                                            }
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            {
                                                                Math.sign(totalCompany[slipkey].bet_slip.win_lose_cash) === -1 ?
                                                                    totalCompany[slipkey].bet_slip.win_lose_cash
                                                                    :
                                                                    (totalCompany[slipkey].bet_slip.win_lose_cash * 0.95).toFixed(2)
                                                            }
                                                        </td>
                                                        <td className="px-4 py-4">{totalCompany[slipkey].bet_slip.win_lose_cash * (totalCompany[slipkey].percent_commision.toFixed(3) / 100)}</td>
                                                        <td className="px-4 py-4">
                                                            {
                                                                Math.sign(totalCompany[slipkey].bet_slip.win_lose_cash) === -1 ?
                                                                    (totalCompany[slipkey].bet_slip.win_lose_cash * (totalCompany[slipkey].percent_commision.toFixed(3)/100)).toFixed(2)
                                                                    :
                                                                    (totalCompany[slipkey].bet_slip.win_lose_cash * (0.95 + totalCompany[slipkey].percent_commision.toFixed(3)/100)).toFixed(2)
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td className="text-center text-red-600 px-4 py-4" colSpan="8">No Data</td>
                                                </tr>
                                    }
                                    {
                                        total &&
                                        <tr className="font-bold">
                                            <td className="px-4 py-4">Total</td>
                                            <td className="px-4 py-4">{total.totalNewGroupBalance}</td>
                                            <td className="px-4 py-4">{(total.totalNewGroupWinLose * 0.95).toFixed(2)}</td>
                                            <td className="px-4 py-4">{total.totalNewGroupWinLose * (total.totalNewGroupComission.toFixed(3) / 100)}</td>
                                            <td className="px-4 py-4">{(total.totalNewGroupWinLose * (0.95 + total.totalNewGroupComission.toFixed(3) / 100)).toFixed(2)}</td>
                                            <td className="px-4 py-4">{(total.totalNewCompanyWinLose * 0.95).toFixed(2)}</td>
                                            <td className="px-4 py-4">{total.totalNewCompanyWinLose * total.totalNewCompanyComission.toFixed(3) / 100}</td>
                                            <td className="px-4 py-4">{(total.totalNewCompanyWinLose * (0.95 + total.totalNewCompanyComission.toFixed(3) / 100)).toFixed(2)}</td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                                // End All User Data Report
                        }
                </div>
            </div>
        </LayoutView>
    )
};

export default ReportView;