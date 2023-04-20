import {useContext, useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import {MAX_BET_TRANSFER, SINGLE_BET_TRANSFER} from "../../../gql/user";
import AuthContext from "../../../context/AuthContext";
import AlertContext from "../../../context/AlertContext";

const AgentDetails = ({checkUserDetail, eachUser, usersResult}) => {
    // useContext
    const {user, singleBet, maxBet} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);
    // useState
    const [eachSingleBet, setEachSingleBet] = useState(eachUser.single_bet);
    const [eachMaxSingleBet, setEachMaxSingleBet] = useState(eachUser.max_bet);
    const [singleBetBtn, setsingleBetBtn] = useState(true);
    const [maxBetBtn, setMaxBetBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    // useRef

    // Start Mutation
    const [singleBetTransfer] = useMutation(SINGLE_BET_TRANSFER, {
        onError: (error) => {
            console.log("singleBetTransfer", error);
            setEachSingleBet(eachUser.single_bet);
            showAlert("Single Bet Transfer Failed", true);
        },
        onCompleted: (result) => {
            console.log(result);
            showAlert("Single Bet Transfer Successfully", false);
            usersResult.refetch();
        }
    });

    const [maxBetTransfer] = useMutation(MAX_BET_TRANSFER, {
        onError: (error) => {
            console.log("maxBetTransfer", error);
            setEachMaxSingleBet(eachUser.max_bet);
            showAlert("Max Bet Transfer Failed", true);
        },
        onCompleted: (result) => {
            console.log(result);
            showAlert("Max Bet Transfer Successfully", false);
            usersResult.refetch();
        }
    });
    // End Mutation

    // Start Function
    const singleBetInput = (e) => {
        if(!isNaN(e.target.value)){
            setEachSingleBet(e.target.value)
        }
    };

    const maxBetInput = (e) => {
        if(!isNaN(e.target.value)){
            setEachMaxSingleBet(e.target.value)
        }
    }
    const editSingleBtn = (e) => {
        if(e.target.innerText === "edit"){
            document.getElementById("comision").focus();
        }

        if(e.target.innerText === "confirm" && eachSingleBet !== singleBet){
            setLoading(true);
            try{
                singleBetTransfer({variables: {"_commision": eachMaxSingleBet, "_receiverid": eachUser.id, "_senderid": user.id}});
            }catch (e) {
                console.log(e.message);
            }
            setLoading(false);
        }
        setsingleBetBtn(!singleBetBtn);
        setMaxBetBtn(true);
    };

    const editMaxBtn = (e) => {
        if(e.target.innerText === "edit"){
            document.getElementById("maxBet").focus();
        }

        if(e.target.innerText === "confirm" && eachMaxSingleBet !== maxBet){
            setLoading(true);
            try{
                maxBetTransfer({variables: {"_maxbet": eachMaxSingleBet, "_receiverid": eachUser.id, "_senderid": user.id}});
            }catch (e) {
                console.log(e.message);
            }
            setLoading(false);
        }
        setsingleBetBtn(true);
        setMaxBetBtn(!maxBetBtn);
    };
    // End Function

    return (
        <div className="w-full md:w-10/12 h-screen bg-gray-200 flex justify-center items-center bg-opacity-90 fixed top-0 overflow-y-auto py-5">
            <div className="w-10/12 md:w-9/12 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3">
                <div className="flex justify-between items-center mb-5 mx-2 sm:mx-5">
                    <p className={"text-xl md:text-3xl font-bold"}>User Detail for {eachUser.contact_name}</p>
                    <i className="text-xl md:text-3xl text-gray-900 fa-solid fa-xmark cursor-pointer hover:text-gray-600" onClick={() => checkUserDetail(null)}></i>
                </div>

                {/*Start User Detail Info*/}
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-green-100 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-600">User Name</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{eachUser.username}</dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-green-100 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-600">Account Balance</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{eachUser.balance}</dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-green-100 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-600">Commission</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 flex sm:mt-0 mt-1">
                                <div className="relative">
                                    <input type="text" id="comision" className={`border px-4 py-1 mr-2`} value={eachSingleBet} onChange={singleBetInput}  disabled={singleBetBtn}/>
                                    <span className="text-gray-500 absolute left-2 top-full">Max Commission = {singleBet}</span>
                                </div>
                                <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-white px-4 py-1 mr-2 hover:bg-blue-400`} onClick={editSingleBtn} disabled={loading}>{singleBetBtn ? "edit" : "confirm"}</button>
                                {
                                    !singleBetBtn && <button className={`bg-red-500 text-white px-4 py-1 hover:bg-red-400`} onClick={() => setsingleBetBtn(!singleBetBtn)} disabled={loading}>Cancel</button>
                                }
                            </dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-green-100 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-600">Max Single Bet</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 flex sm:mt-0 mt-1">
                                <div className="relative">
                                    <input type="text" id="maxBet" className={`border px-4 py-1 mr-2`} value={eachMaxSingleBet} onChange={maxBetInput}  disabled={maxBetBtn}/>
                                    <span className="text-gray-500 absolute left-2 top-full">Max Single Bet = {maxBet}</span>
                                </div>
                                <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-white px-4 py-1 mr-2 hover:bg-blue-400`} onClick={editMaxBtn} disabled={loading}>{maxBetBtn ? "edit" : "confirm"}</button>
                                {
                                    !maxBetBtn && <button className={`bg-red-500 text-white px-4 py-1 hover:bg-red-400`} onClick={() => setMaxBetBtn(!maxBetBtn)} disabled={loading}>Cancel</button>
                                }
                            </dd>
                        </div>
                    </dl>
                </div>
                {/*End User Detail Info*/}
            </div>
        </div>
    )
};

export default AgentDetails;