import {useLazyQuery} from "@apollo/client";
import {MATCH} from "../../gql/match";
import {useEffect, useState} from "react";

const MatchData = () => {
    // useState
    const [matchList, setMatchList] = useState(null);
    const [offset, setOffset] = useState(0);
    // useLazyQuery
    const [loadMatch, matchResult] = useLazyQuery(MATCH);

    // Start useEffect
    // to get match list
    useEffect(() => {
        loadMatch({variables: {offset}});
    }, [offset])

    useEffect(() => {
        console.log(matchResult);
    }, [matchResult])

    // End useEffect

    return(
        <>
            <div className="m-5">
                <h1 className="text-3xl font-bold">Match List</h1>
            </div>

            {/*Start Match List Table*/}
            <div className="w-11/12 rounded-lg border border-gray-200 shadow-md mx-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                    <tr className="text-lg font-medium text-gray-900">
                        <th scope="col" className="px-6 py-4">ID</th>
                        <th scope="col" className="px-6 py-4">Home Team</th>
                        <th scope="col" className="px-6 py-4">Away Team</th>
                        <th scope="col" className="px-6 py-4">Active</th>
                        <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    </tbody>
                </table>
                {/*End Match List Table*/}
            </div>
        </>
    );
};

export default MatchData;