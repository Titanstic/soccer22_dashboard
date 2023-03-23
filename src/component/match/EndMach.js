import {useContext, useState} from "react";
import {inputEndMatchValidation} from "../../composable/match";
import {useMutation} from "@apollo/client";
import {UPDATE_SCORE_MATCH} from "../../gql/match";
import AlertContext from "../../context/AlertContext";

const EndMach = ({endModalHandle, matchId, matchResult}) => {
    // useState
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        "score1": "",
        "score2": ""
    });
    const [error, setError] = useState({});
    // useContext
    const {showAlert} = useContext(AlertContext);

    // Start Mutation
    const [updateScoreMatch] = useMutation(UPDATE_SCORE_MATCH, {
        onError: (error) => {
            console.log("Update Score Match", error);
        },
        onCompleted: (result) => {
            showAlert("Added Score Successfully", false);
            endModalHandle(null);
            matchResult.refetch();
        }
    });
    // End Mutation

    // Start Function
    const scoreHandle = (e, input) => {
        if(isNaN(e.target.value)){
            setError({[input]: "Please Enter Number Only"});
        }else{
            delete error[input];
            setError({...error});
            setForm({...form, [input]: e.target.value});
        }
    };

    const cancelEndMatch = () => {
        endModalHandle(null);
    };

    const endMatchHandle = () => {
        setLoading(true);
        // check input data
        const {errorDetail, errors} = inputEndMatchValidation(form);
        setError(errorDetail);

        if(!errors){
            try {
                updateScoreMatch({variables: { ...form, matchId }});
            }catch (e) {
                console.log("End Match", e.message);
            }
        }

        setLoading(false);
    }
    // End Function

    return (
        <div className="w-10/12 h-screen bg-gray-200 flex justify-center items-center bg-opacity-90 fixed top-0 overflow-y-auto py-5">
            <div className="w-11/12 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3">
                <div className="my-5 mx-5">
                    <p className={"text-3xl font-bold"}>End Match for {matchId}</p>
                </div>

                <div className="grid grid-cols-4 gap-7 mx-5 mb-5">
                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Score 1</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.score1 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.score1} onChange={(e) => scoreHandle(e, "score1")}/>
                        </div>
                        {
                            error.score1 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.score1}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Score 2</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.score2 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.score2} onChange={(e) => scoreHandle(e, "score2")}/>
                        </div>
                        {
                            error.score2 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.score2}</span></div>
                        }
                    </div>

                    <div className="col-span-4 justify-self-end">
                        <button className={`${loading ? "bg-red-400" : "bg-red-500"} text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3`} onClick={cancelEndMatch} disabled={loading}>Cancel</button>
                        <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-white rounded shadow hover:bg-blue-400 px-4 py-3`} onClick={endMatchHandle} disabled={loading}>{loading ? "loading ..." : "End Match"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EndMach;