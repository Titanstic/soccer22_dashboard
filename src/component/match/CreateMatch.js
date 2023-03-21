import {useContext, useEffect, useState} from "react";
import {inputErrorValidation} from "../../composable/match";
import {useMutation} from "@apollo/client";
import {INSERT_FULL_MATCH, INSERT_HALF_MATCH} from "../../gql/match";
import AlertContext from "../../context/AlertContext";

const CreateMatch = ({addModalHandle, matchResult}) => {
    // useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [disable, setDisable] = useState({});
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
        match: "false",
        halfScore1: "",
        halfScore2: ""
    });
    // useContext
    const {showAlert} = useContext(AlertContext);

    // Start UseEffect
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
        },
        onCompleted: (result) => {
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
                match: "false",
                halfScore1: "",
                halfScore2: ""
            });
            showAlert("Create Match Successfully", false);
            addModalHandle();
        }
    });

    const [insertFullMatch] = useMutation(INSERT_FULL_MATCH, {
        onError: (error) => {
            console.log("Insert Match", error);
        },
        onCompleted: (result) => {
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
                match: "false",
                halfScore1: "",
                halfScore2: ""
            });
            showAlert("Create Match Successfully", false);
            addModalHandle();
        }
    });

    // End Mutation

    // Start Function
    // control form input
    const inputHandle = (e, input) => {
        // for rate1 control
        if(input === "rate1"){
            setDisable({...disable, "rate2": true});
            delete error["rate2"];
            setError({...error});
        }
        if(input === "rate1" && e.target.value === ""){
            delete disable["rate2"];
            setDisable({...disable});
        }

        // for rate2 control
        if(input === "rate2"){
            setDisable({...disable, "rate1": true});
            delete error["rate1"];
            setError({...error});
        }
        if(input === "rate2" && e.target.value === ""){
            delete disable["rate1"];
            setDisable({...disable});
        }

        // for match control
        if(input === "match" && e.target.value === "true"){
            setDisable({...disable, "halfScore": true});
            delete error["halfScore1"];
            delete error["halfScore2"];
            setError({...error});
        }
        if(input === "match" && e.target.value === "false"){
            delete disable["halfScore"];
            setDisable({...disable});
        }

        setForm({...form, [input]: e.target.value});
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

    // Create Match Button Fuction
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
            goPaung: ""
        });
        setError({});
        addModalHandle();
    }
    // End Function

    return(
        <div className="w-10/12 h-screen bg-gray-200 flex justify-center items-start bg-opacity-90 fixed top-0 overflow-y-auto py-5">
            <div className="w-11/12 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3">
                <div className="my-5 mx-5">
                    <p className={"text-3xl font-bold"}>Create Match Form</p>
                </div>

                {/*Start Form*/}
                <div className="grid grid-cols-4 gap-7 mx-10 mb-5">
                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Home Team</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.homeTeam ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.homeTeam} onChange={(e) => inputHandle(e, "homeTeam")}/>
                        </div>
                        {
                            error.homeTeam && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.homeTeam}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Away Team</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.awayTeam ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.awayTeam} onChange={(e) => inputHandle(e, "awayTeam")}/>
                        </div>
                        {
                            error.awayTeam && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.awayTeam}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">League</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.league ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.league} onChange={(e) => inputHandle(e, "league")}/>
                        </div>
                        {
                            error.league && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.league}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Link 1</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link1 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.link1} onChange={(e) => inputHandle(e, "link1")}/>
                        </div>
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Link 2</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link2 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.link2} onChange={(e) => inputHandle(e, "link2")}/>
                        </div>
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Link 3</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link3 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.link3} onChange={(e) => inputHandle(e, "link3")}/>
                        </div>
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Link 4</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link4 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.link4} onChange={(e) => inputHandle(e, "link4")}/>
                        </div>
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Link 5</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.link5 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.link5} onChange={(e) => inputHandle(e, "link5")}/>
                        </div>
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Rate 1</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.rate1 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.rate1} onChange={(e) => inputHandle(e, "rate1")} disabled={disable.rate1}/>
                        </div>
                        {
                            error.rate1 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.rate1}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Rate 2</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.rate2 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.rate2} onChange={(e) => inputHandle(e, "rate2")} disabled={disable.rate2}/>
                        </div>
                        {
                            error.rate2 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.rate2}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Go Paung</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.goPaung ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.goPaung} onChange={(e) => inputHandle(e, "goPaung")}/>
                        </div>
                        {
                            error.goPaung && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.goPaung}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Match</span>
                            <select className={`block w-full flex-1 rounded-none rounded-r-md border ${error.match ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={form.match} onChange={(e) => inputHandle(e, "match")}>
                                <option value="false">Half Match</option>
                                <option value="true">Full Match</option>
                            </select>
                        </div>
                        {
                            error.match && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.match}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Half Score 1</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.halfScore1 ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3`} value={form.halfScore1} onChange={(e) => halfScoreHandle(e, "halfScore1")} disabled={disable.halfScore}/>
                        </div>
                        {
                            error.halfScore1 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.halfScore1}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Half Score 2</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.halfScore2? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3`} value={form.halfScore2} onChange={(e) => halfScoreHandle(e, "halfScore2")}  disabled={disable.halfScore}/>
                        </div>
                        {
                            error.halfScore2 && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.halfScore2}</span></div>
                        }
                    </div>

                    <div className="col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Match Time</span>
                            <input type="datetime-local" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.matchTime ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3`} value={form.matchTime} onChange={(e) => inputHandle(e, "matchTime")}/>
                        </div>
                        {
                            error.matchTime && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.matchTime}</span></div>
                        }
                    </div>

                    <div className="col-span-2 justify-self-end">
                        <button className="bg-red-500 text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3" onClick={cancelMatch} disabled={loading}>Cancel</button>
                        <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-white rounded shadow hover:bg-blue-400 px-4 py-3`} onClick={createMatch} disabled={loading}>{loading ? "loading ..." : "Create"}</button>
                    </div>
                </div>
                {/*End Form*/}
            </div>
        </div>
    )
};

export default CreateMatch;