import {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {INSERT_USER} from "../../../gql/user";
import {checkInputData} from "../../../composable/agent";
import AuthContext from "../../../context/AuthContext";
import AlertContext from "../../../context/AlertContext";

const CreateAgent = ({addModalHandle, usersResult}) => {
    // useState
    let [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [error, setError] = useState({});
    // useContext
    const {allUsersResult, whereArr, singleBet, maxBet} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);

    // Start Mutation
    const [insertUser] = useMutation(INSERT_USER, {
        onError: (error) => {
            console.log("insertUser", error);
        },
        onCompleted: (result) => {
            console.log(result);
            addModalHandle();
            showAlert("Create Successfully", false);
            usersResult.refetch();
            allUsersResult.refetch();
        }
    })
    // End Mutation

    const inputHandle = (e, input) => {
        setUserData({...userData, [input]: e.target.value});

        if(error[input]){
            delete error[input];
            setError(error);
        }
    }

    const addAgentData = () => {
        setLoading(true);

        let {errorExist, tempError} = checkInputData(userData.username, userData.contactName, userData.password, userData.commission, userData.maxBet);
        if(errorExist){
            setError(tempError);
        }else{
            try{
                insertUser({variables: userData});
            }catch (e) {
                console.log("addAgentData", e.message);
            }
        }
        setLoading(false);
    };

    return (
        <div className="w-full sm:w-10/12 h-screen bg-gray-200 flex justify-center items-center bg-opacity-90 fixed top-0">
            <div className="w-10/12 bg-white rounded shadow shadow-gray-400 mx-auto py-10 px-4">
                <div>
                    <p className="text-3xl font-bold leading-4">
                        Create
                        {whereArr.length === 0 && " Super"}
                        {whereArr.length === 1 && " Senior"}
                        {whereArr.length === 2 && " Master"}
                        {whereArr.length === 3 && " Agent"}
                        {whereArr.length === 4 && " User"}
                    </p>
                </div>

                <hr className="my-5"/>

                {/*Start Add Form */}
                <div className="grid grid-cols-4 gap-9">

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">UserName</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.username ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={userData.username} onChange={(e) => inputHandle(e, "username")} placeholder="Enter your username" />
                        </div>
                        {
                            error.username && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.username}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md shadow-sm">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Contact</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.contactName ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={userData.contactName} onChange={(e) => inputHandle(e, "contactName")} placeholder="Enter your Contact" />
                        </div>
                        {
                            error.contact_name && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.contact_name}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md shadow-sm">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Commission</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.commission ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={userData.commission} onChange={(e) => inputHandle(e, "commission")} placeholder="Enter your Commission" />
                        </div>
                        {
                            error.commission && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.commission}</span></div>
                        }
                        <span className="absolute top-full left-1 text-sm text-gray-500">max Commission : {singleBet}</span>
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md shadow-sm">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Max Bet</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.maxBet ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={userData.maxBet} onChange={(e) => inputHandle(e, "maxBet")} placeholder="Enter your Max Bet" />
                        </div>
                        {
                            error.maxBet && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.maxBet}</span></div>
                        }
                        <span className="absolute top-full left-1 text-sm text-gray-500">max Bet : {maxBet}</span>
                    </div>

                    <div className="col-span-4 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md shadow-sm">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Password</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.password ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={userData.password} onChange={(e) => inputHandle(e, "password")} placeholder="Enter your Contact" />
                        </div>
                        {
                            error.password && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.password}</span></div>
                        }
                    </div>

                    <div className="col-span-4 sm:col-span-2 justify-self-end">
                        <button className="bg-red-500 text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3" onClick={addModalHandle} disabled={loading}>Cancel</button>
                        <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-white rounded shadow hover:bg-blue-400 px-4 py-3`} onClick={addAgentData} disabled={loading}>Create</button>
                    </div>
                </div>
                {/*End Add Form */}
            </div>
        </div>
    )
};

export default CreateAgent;