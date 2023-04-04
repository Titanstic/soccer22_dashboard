import {useContext, useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import {SINGLE_BET_TRANSFER} from "../../../gql/user";
import AuthContext from "../../../context/AuthContext";
import AlertContext from "../../../context/AlertContext";

const AgentDetails = ({checkUserDetail, eachUser, usersResult}) => {
    console.log(eachUser);
    // useContext
    const {user, singleBet} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);
    // useState
    const [eachSingleBet, setEachSingleBet] = useState(singleBet);
    const [singleBetBtn, setsingleBetBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    // useRef
    const singleBetElement = useRef();

    // Start Mutation
    const [singleBetTransfer] = useMutation(SINGLE_BET_TRANSFER, {
        onError: (error) => {
            console.log("singleBetTransfer", error);
            showAlert("Single Bet Transfer Failed", true);
            // setSingleBet(eachUser.single_bet);
        },
        onCompleted: (result) => {
            console.log(result);
            showAlert("Single Bet Transfer Successfully", false);
            usersResult.refetch();
        }
    })

    // Start Function
    const editSingleBtn = (e) => {
        if(e.target.innerText === "edit"){
            singleBetElement.current.focus();
        }
        if(e.target.innerText === "confirm" && eachUser.single_bet !== singleBet){
            setLoading(true);
            try{
                singleBetTransfer({variables: {"_commision": singleBet, "_receiverid": eachUser.id, "_senderid": user.id}});
            }catch (e) {
                console.log(e.message);
            }
            setLoading(false);
        }
        setsingleBetBtn(!singleBetBtn);
    }

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
                                    <input type="text" className={`border px-4 py-1 mr-2`} value={eachSingleBet} ref={singleBetElement} onChange={(e) => setEachSingleBet(e.target.value)}  disabled={singleBetBtn}/>
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
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{eachUser.max_bet}</dd>
                        </div>
                    </dl>
                </div>
                {/*End User Detail Info*/}
            </div>
        </div>
    )
};

export default AgentDetails;