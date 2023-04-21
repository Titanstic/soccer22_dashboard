import {useContext, useEffect, useState} from "react";
import {eachInputValidation, inputErrorValidation} from "../../composable/match";
import {useLazyQuery, useMutation} from "@apollo/client";
import {getTeam, INSERT_FULL_MATCH, INSERT_HALF_MATCH} from "../../gql/match";
import AlertContext from "../../context/AlertContext";
import Select from "react-select/base";

const CreateMatch = ({addModalHandle, matchResult}) => {
    // useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [disable, setDisable] = useState({
        "halfScore" : true
    });
    const [form, setForm] = useState({
        homeTeam : "",
        awayTeam : "",
        league : "",
        link1 : "",
        link2 : "",
        link3 : "",
        link4 : "",
        link5 : "",
        rate1 : "",
        rate2 : "",
        matchTime: "",
        goPaung: "",
        match: "true",
        halfScore1: "",
        halfScore2: "",
        status: "false",
        live: "true"
    });
    // useContext
    const {showAlert} = useContext(AlertContext);
    // useLazyQuery
    const [loadTeam, resultTeam] = useLazyQuery(getTeam);

    // Start UseEffect
    // useEffect(() => {
    //     loadTeam();
    // })
    //
    // useEffect(() => {
    //     console.log(resultTeam);
    // }, [resultTeam])

    // have match 1, half score value to ""
    useEffect(() => {
        if(form.match === "true"){
            setForm({ ...form, "halfScore1": "", "halfScore2": ""});
        }
    }, [form.match])
    // End UseEffect

    // Start Mutation
    const [insertHalfMatch] = useMutation(INSERT_HALF_MATCH, {
        onError: (error) => {
            console.log("Insert Match", error);
            showAlert("Something wrong. Please Try again", true);
        },
        onCompleted: (result) => {
            showAlert("Create Match Successfully", false);
            addModalHandle();
            matchResult.refetch();
        }
    });

    const [insertFullMatch] = useMutation(INSERT_FULL_MATCH, {
        onError: (error) => {
            console.log("Insert Match", error);
            showAlert("Something wrong. Please Try again", true);
        },
        onCompleted: (result) => {
            showAlert("Create Match Successfully", false);
            addModalHandle();
            matchResult.refetch();
        }
    });
    // End Mutation

    // Start Function
    // control form input
    const inputHandle = (e, input) => {
        // validation input for rate1, rate2 and match
        let {eachDisable, eachError, status} = eachInputValidation(input, e, disable, error, form.status);
        setError(eachError);
        setDisable(eachDisable);

        setForm({...form, status, [input]: e.target.value});
        // to find error input
        if(error[input]){
            delete error[input];
            setError({...error});
        }
    };

    const halfScoreHandle = (e, input) => {
        if(isNaN(e.target.value)){
            setError({[input]: "Please Enter Number Only"});
        }else{
            delete error[input];
            setError({...error});
            setForm({...form, [input]: e.target.value});
        }
    };

    // Create Match Button Function
    const createMatch = () => {
        setLoading(true);
        // check input error
        const {errorDetail, errors} = inputErrorValidation(form);
        setError(errorDetail);

        if(!errors){
            try {
                if(!form.match){
                    insertHalfMatch({variables: form});
                }else{
                    insertFullMatch({variables: form});
                }
                setForm({
                    homeTeam : "",
                    awayTeam : "",
                    league : "",
                    link1 : "",
                    link2 : "",
                    link3 : "",
                    link4 : "",
                    link5 : "",
                    rate1 : "",
                    rate2 : "",
                    matchTime: "",
                    goPaung: "",
                    match: "true",
                    halfScore1: "",
                    halfScore2: "",
                    status: "false"
                });
                setDisable({
                    "halfScore" : true
                });
                setError({});
                matchResult.refetch();
            }catch (e){
                console.log("add Match Data", e.message);
            }
        }
        setLoading(false);
    };

    const cancelMatch = () => {
        setForm({
            homeTeam : "",
            awayTeam : "",
            league : "",
            link1 : "",
            link2 : "",
            link3 : "",
            link4 : "",
            link5 : "",
            rate1 : "",
            rate2 : "",
            matchTime: "",
            goPaung: "",
            match: "true",
            halfScore1: "",
            halfScore2: "",
            status: "false"
        });
        setDisable({
            "halfScore" : true
        });
        setError({});
        addModalHandle();
    }
    // End Function

    return(
        <div className="w-full sm:w-10/12 h-screen bg-gray-200 flex justify-center items-start bg-opacity-90 fixed top-0 overflow-y-auto py-5">
            <div className="w-11/12 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3">
                <div className="mx-2">
                    <p className={"text-xl sm:text-3xl font-bold"}>Create Match Form</p>
                </div>

                <hr className="my-5 "/>

                {/*Start Form*/}
                <div className="grid grid-cols-4 gap-7 mx-10 mb-5">
                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Home Team</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.homeTeam ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.homeTeam} onChange={(e) => inputHandle(e, "homeTeam")}/>
                        </div>
                        {
                            error.homeTeam && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.homeTeam}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Away Team</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.awayTeam ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.awayTeam} onChange={(e) => inputHandle(e, "awayTeam")}/>
                        </div>
                        {
                            error.awayTeam && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.awayTeam}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">League</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.league ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.league} onChange={(e) => inputHandle(e, "league")}/>
                        </div>
                        {
                            error.league && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.league}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Link 1</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link1 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.link1} onChange={(e) => inputHandle(e, "link1")}/>
                        </div>
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Link 2</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link2 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.link2} onChange={(e) => inputHandle(e, "link2")}/>
                        </div>
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Link 3</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link3 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.link3} onChange={(e) => inputHandle(e, "link3")}/>
                        </div>
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Link 4</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link4 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.link4} onChange={(e) => inputHandle(e, "link4")}/>
                        </div>
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Link 5</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link5 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.link5} onChange={(e) => inputHandle(e, "link5")}/>
                        </div>
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Rate 1</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.rate1 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.rate1} onChange={(e) => inputHandle(e, "rate1")} disabled={disable.rate1}/>
                        </div>
                        {
                            error.rate1 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.rate1}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Rate 2</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.rate2 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.rate2} onChange={(e) => inputHandle(e, "rate2")} disabled={disable.rate2}/>
                        </div>
                        {
                            error.rate2 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.rate2}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Go Paung</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.goPaung ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.goPaung} onChange={(e) => inputHandle(e, "goPaung")}/>
                        </div>
                        {
                            error.goPaung && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.goPaung}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Match</span>
                            <select className={`block w-full flex-1 rounded-none rounded-r-md border ${error.match ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base pl-3 py-3`} value={form.match} onChange={(e) => inputHandle(e, "match")}>
                                <option value="false">Half Match</option>
                                <option value="true">Full Match</option>
                            </select>
                        </div>
                        {
                            error.match && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.match}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Half Score 1</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.halfScore1 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base px-3`} value={form.halfScore1} onChange={(e) => halfScoreHandle(e, "halfScore1")} disabled={disable.halfScore}/>
                        </div>
                        {
                            error.halfScore1 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.halfScore1}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Half Score 2</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.halfScore2? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base px-3`} value={form.halfScore2} onChange={(e) => halfScoreHandle(e, "halfScore2")}  disabled={disable.halfScore}/>
                        </div>
                        {
                            error.halfScore2 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.halfScore2}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Match Time</span>
                            <input type="datetime-local" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.matchTime ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base px-3`} value={form.matchTime} onChange={(e) => inputHandle(e, "matchTime")}/>
                        </div>
                        {
                            error.matchTime && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.matchTime}</span></div>
                        }
                    </div>

                    {/*<div className="col-span-4 sm:col-span-2 relative">*/}
                    {/*    <div className="flex shadow rounded-md">*/}
                    {/*        <span className="w-24 sm:w-28 text-xs sm:text-base  inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-2 sm:pl-3 py-3 text-gray-500">Live</span>*/}
                    {/*        <input type="datetime-local" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.live ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base px-3`} value={form.live} onChange={(e) => inputHandle(e, "live")}/>*/}
                    {/*    </div>*/}
                    {/*    {*/}
                    {/*        error.live && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.live}</span></div>*/}
                    {/*    }*/}
                    {/*</div>*/}

                    <div className="col-span-4 sm:col-span-4 justify-self-end">
                        <button className="text-sm bg-red-500 text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3 sm:text-base" onClick={cancelMatch} disabled={loading}>Cancel</button>
                        <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-sm text-white rounded shadow hover:bg-blue-400 px-4 py-3  sm:text-base`} onClick={createMatch} disabled={loading}>{loading ? "loading ..." : "Create"}</button>
                    </div>
                </div>
                {/*End Form*/}
            </div>
        </div>
    )
};

export default CreateMatch;