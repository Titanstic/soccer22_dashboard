import {useMutation} from "@apollo/client";
import {GET_SLIP} from "../../gql/match";
import {useState} from "react";

const CalculateBetSlips = ({calBetSlipsModal, matchId, matchResult}) => {
    const [loading, setLoading] = useState(false);

    // Start Mutation
    const [getSlip] = useMutation(GET_SLIP, {
        onError: (error) => {
            console.log("Get Slip", "You Don't have no bet slip");
        },
        onCompleted: (result) => {
            console.log(result);
            calBetSlipsModal(null);
            matchResult.refetch();
        }
    })
    // End Mutation

    // Start Function
    const calculateBetSlips = () => {
        setLoading(true);
        if(matchId){
            console.log("work");
            try{
                getSlip({ variables: {matchId}});
            }catch (e) {
                console.log("calculate Bet slips", e.message);
            }
        }
        setLoading(false);
    };
    // End Function

    return (
        <div className="w-full sm:w-10/12 h-screen bg-gray-200 flex justify-center items-center bg-opacity-90 fixed top-0 overflow-y-auto py-5">
            <div className="w-6/12 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3">
                <div className="my-5 mx-5">
                    <p className={"text-3xl font-bold"}>Calculate Bet Slips for {matchId}</p>
                </div>

                <div className="grid grid-cols-4 gap-7 mx-5">
                    <div className="col-span-4 justify-self-end">
                        <button className={`${loading ? "bg-red-400" : "bg-red-500"} text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3`} onClick={() => calBetSlipsModal(null)} disabled={loading}>Cancel</button>
                        <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-white rounded shadow hover:bg-blue-400 px-4 py-3`} onClick={calculateBetSlips} disabled={loading}>{loading ? "loading ..." : "Calculate"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CalculateBetSlips