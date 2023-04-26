const EachUserReport = ({betSlip, total}) => {
    return (
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
                                        <>
                                            {`${slip.bet_slip.bet_team}( ${slip.bet_slip.balance} )`}
                                            <br/>
                                            {`${slip.bet_slip.bet_team}( ${slip.bet_slip.body} )`}
                                        </>
                                        :
                                        <>
                                            {`${slip.bet_slip.over_under}(${slip.bet_slip.balance})`}
                                            <br/>
                                            {`goul-paung(${slip.bet_slip.goal_paung})`}
                                        </>
                                }
                            </td>
                            <td className="px-4 py-4">
                                {
                                    Math.sign(slip.bet_slip.win_lose_cash) === -1 ?
                                        <span className="text-red-500">{slip.bet_slip.win_lose_cash.toFixed(2)}</span>
                                        :
                                        (slip.bet_slip.win_lose_cash * 0.95).toFixed(2)
                                }
                            </td>
                            <td className="px-4 py-4">{Math.abs(slip.bet_slip.win_lose_cash.toFixed(2) * (slip.percent_commision).toFixed(3)/100).toFixed(2)}</td>
                            <td className="px-4 py-4">
                                {
                                    Math.sign(slip.bet_slip.win_lose_cash) === -1 ?
                                        <span className="text-red-500">{(slip.bet_slip.win_lose_cash - (slip.bet_slip.win_lose_cash * Math.abs(slip.percent_commision).toFixed(3)/100)).toFixed(2)}</span>
                                    :
                                        (slip.bet_slip.win_lose_cash * (0.95 + slip.percent_commision.toFixed(3)/100)).toFixed(2)
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
                    <td className="px-4 py-4">
                        {
                            Math.sign(total.totalNewGroupWinLose) === -1 ?
                                <span className="text-red-500">{total.totalNewGroupWinLose.toFixed(2)}</span>
                                :
                                total.totalNewGroupWinLose.toFixed(2)
                        }
                    </td>
                    <td className="px-4 py-4">{total.totalNewGroupComission.toFixed(2)}</td>
                    <td className="px-4 py-4">
                        {
                            Math.sign(total.totalNewGroupWinLose) === -1 ?
                                <span className="text-red-500">-{(Math.abs(total.totalNewGroupWinLose).toFixed(2) - total.totalNewGroupComission.toFixed(2)).toFixed(2)}</span>
                            :
                                (total.totalNewGroupWinLose + total.totalNewGroupComission).toFixed(2)
                        }
                    </td>
                </tr>
            }
            </tbody>
        </table>
    )
};

export default EachUserReport;