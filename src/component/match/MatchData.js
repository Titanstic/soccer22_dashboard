import {useEffect, useState} from "react";

const MatchData = ({addModalHandle, addSecondModalHandle, endModalHandle, calBetSlipsModal, loadMatch, matchResult}) => {
    // useState
    const [matchList, setMatchList] = useState([]);
    const [count ,setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);

    // Start useEffect
    // to get match list
    useEffect(() => {
        loadMatch({variables: {offset}});
    }, [offset])

    useEffect(() => {
        if(matchResult.data){
            setTotalCount(matchResult.data.match_aggregate.aggregate.count);
            setCount(Math.ceil(matchResult.data.match_aggregate.aggregate.count / 10));
            setMatchList(matchResult.data.match);
        }
    }, [matchResult])
    // End useEffect

    // Start Function
    // For pagination
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

    return(
        <>
            <div className="flex justify-between items-center mt-5 mx-5">
                <p className="text-3xl font-bold">Match List</p>

                <button className="bg-blue-500 text-white rounded shadow hover:bg-blue-400 px-4 py-3" onClick={addModalHandle}>Create Match</button>
            </div>

            {/*Start Match List Table*/}
            <div className="w-full  rounded-lg border border-gray-200 shadow-md my-5 overflow-y-auto sm:w-11/12 sm:mx-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                    <tr className="text-lg font-medium text-gray-900">
                        <th scope="col" className="px-6 py-4">ID</th>
                        <th scope="col" className="px-6 py-4">Home Team</th>
                        <th scope="col" className="px-6 py-4">Away Team</th>
                        <th scope="col" className="px-6 py-4">Rate 1</th>
                        <th scope="col" className="px-6 py-4">Rate 2</th>
                        <th scope="col" className="px-6 py-4">Go Paung</th>
                        <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {
                        matchList.length > 0 ?
                            matchList.map(match => (
                                <tr className="hover:bg-gray-50" key={match.id}>
                                    <td className="px-6 py-4">{match.id}</td>
                                    <td className="px-6 py-4">{match.home_team}</td>
                                    <td className="px-6 py-4">{match.away_team}</td>
                                    <td className="px-6 py-4">{match.rate_1 ? match.rate_1 : "-"}</td>
                                    <td className="px-6 py-4">{match.rate_2 ? match.rate_2 : "-"}</td>
                                    <td className="px-6 py-4">{match.goal_paung}</td>
                                    <td className='flex px-6 py-4'>
                                        {
                                            !match.score_1 &&
                                                !match.score_2 ?
                                                    <button className={`w-20 shadow bg-red-500 rounded text-white mr-4 py-2 hover:bg-red-400`} onClick={() => endModalHandle(match.id)}>End Match</button>
                                                :
                                                    <p className={`w-20 text-center shadow bg-blue-400 rounded mr-4 text-white py-2`}>Finish</p>
                                        }
                                        {
                                            match.score_1 ?
                                                (match.bet_slips.length > 0 && !match.bet_slips[0].status_slip) ?
                                                        <button className={`w-20 text-center shadow bg-blue-500 rounded text-white mr-4 py-2 hover:bg-blue-400`} onClick={() => calBetSlipsModal(match.id)}>Calc Bet Slip</button>
                                                        :
                                                        <button className={`w-20 text-center shadow bg-red-400 rounded text-white mr-4 py-2 hover:bg-red-400`} disabled>No Bet Slip</button>
                                                :
                                                <button className={`w-20 text-center shadow bg-blue-400 rounded text-white mr-4 py-2 hover:bg-blue-400`} disabled>Calc Bet Slip</button>
                                        }

                                        {
                                            match.status === "false" && <button className={`shadow bg-blue-500 rounded text-white mr-4 px-3 py-2 hover:bg-blue-400`} onClick={() => addSecondModalHandle(match)}>Create Second</button>
                                        }
                                    </td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td className="text-center px-6 py-4" colSpan="6">No Data</td>
                            </tr>
                    }
                    </tbody>
                </table>
                {/*End Match List Table*/}

                {/*Start Pagination*/}
                {
                    count > 1 && <div className="text-sm border-t flex justify-between items-center py-2">
                        <p className="ml-5">Showing <span className="font-bold">{page}</span> to <span className="font-bold">{count}</span> page  {totalCount} results</p>
                        <div className="mr-5">
                            <button className={`${page === 1 ? "bg-gray-200" : "bg-white hover:bg-gray-50"} font-bold border rounded shadow mr-5 px-3 py-2`} onClick={() => paginateButton("prev")} disabled={page === 1 ? true : false}>Previous</button>
                            <button className={`${page < count ? "bg-white hover:bg-gray-50" : "bg-gray-200"} font-bold border rounded shadow mr-5 px-3 py-2`} onClick={() => paginateButton("next")} disabled={page < count ? false : true}>Next</button>
                        </div>
                    </div>
                }
                {/*End Pagination*/}
            </div>
        </>
    );
};

export default MatchData;