import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import EachAgentData from "./EachAgentData";
import {filterUser} from "../../../composable/agent";

const AgentData = ({addModalHandle, updateModalHandle, updateActiveHandle, checkUserDetail, loadUsers, usersResult}) => {
    // useState
    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const [eachUser, setEachUser] = useState(null);
    const [showEachUser, setShowEachUser] = useState(false);
    // useContext
    const {where, whereArr, decodeToken} = useContext(AuthContext);
    // useNavigate
    const navigate = useNavigate();

    // Start UseEffect
    useEffect(() => {
        setLoading(true);
        if(where){
            loadUsers({ variables: { where: {_and: where } }});
        }
    }, [where])

    // initial function for filter user
    useEffect(() => {
        if(usersResult.data){
            // to remove login user account from show users data table
            const result = usersResult.data.users.filter(u => u.id !== decodeToken.userID);

            // to check filter User
            const filteredUser = filterUser(result, whereArr);
            setUsersData(filteredUser);
            setLoading(false);
        }
    }, [usersResult]);
    // End UseEffect

    // Start Function
    const userClickHandle = (e, data) => {
        if(e.target.className === "px-6 py-4"){
            setShowEachUser(!showEachUser);
            setEachUser(data);
        }
    };

    const userBackClickHandle = () => {
        setShowEachUser(!showEachUser);
        setEachUser(null);
    }
    // End Function

    return(
        <>
            {
                showEachUser ?
                    <EachAgentData userBackClickHandle={userBackClickHandle} eachUser={eachUser}/>
                    :
                    <>
                        {/*// Start Add Agent Button*/}
                        {
                            whereArr &&
                                <div className="flex justify-between items-center mt-5 mx-5">
                                    <p className="text-2xl md:text-3xl font-bold">
                                        {whereArr.length === 0 && "Super Account List"}
                                        {whereArr.length === 1 && "Senior Account List"}
                                        {whereArr.length === 2 && "Master Account List"}
                                        {whereArr.length === 3 && "Agent Account List"}
                                        {whereArr.length === 4 && "User Account List"}
                                    </p>
                                    <button className="text-sm bg-blue-500 text-white rounded shadow hover:bg-blue-400 px-4 py-3 md:text-base" onClick={addModalHandle}>
                                        Add {whereArr.length === 0 && "Super"} {whereArr.length === 1 && "Senior"} {whereArr.length === 2 && "Master"} {whereArr.length === 3 && "Agent"} {whereArr.length === 4 && "User"}
                                    </button>
                                </div>
                        }
                        {/*// End Add Agent Button*/}

                        <div className="w-full rounded-lg border border-gray-200 shadow-md my-10 overflow-y-auto md:w-11/12 md:mx-auto">
                            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                <thead className="bg-gray-50">
                                    <tr className="text-lg font-medium text-gray-900">
                                        <th scope="col" className="px-6 py-4">User Name</th>
                                        <th scope="col" className="px-6 py-4">Contact Name</th>
                                        <th scope="col" className="px-6 py-4">Balance</th>
                                        <th scope="col" className="px-6 py-4">Active</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                    {
                                        !loading ?
                                            usersData ?
                                                usersData.map( userData => (
                                                    <tr className="hover:bg-gray-50" key={userData[0].id} onClick={(e) => userClickHandle(e, userData)}>
                                                        <td className="px-6 py-4">{userData[0].username}</td>
                                                        <td className="px-6 py-4">{userData[0].contact_name}</td>
                                                        <td className="px-6 py-4">{userData[0].balance}</td>
                                                        <td className='px-6 py-4'>
                                                            <button className={`w-20 ${userData[0].active ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} shadow rounded text-white py-2`} onClick={() => updateActiveHandle(userData[0])}>{userData[0].active ? "Activate" : "Deactivate"}</button>
                                                        </td>
                                                        <td className="text-lg px-6 py-2">
                                                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-4" onClick={() => updateModalHandle(userData[0])}></i>
                                                            <i className="text-green-600 fa-solid fa-money-check-dollar cursor-pointer hover:text-green-400 mr-4" onClick={() => navigate("/quickpayment")}></i>
                                                            <i className="text-gray-600 fa-solid fa-circle-info cursor-pointer hover:text-gray-400" onClick={() => checkUserDetail(userData[0])}></i>
                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                <tr className="hover:bg-gray-50">
                                                    <td className="text-center px-6 py-4" colSpan="6">No Data</td>
                                                </tr>
                                            :
                                            <tr>
                                                <td className="text-center px-6 py-4" colSpan="6">Loading</td>
                                            </tr>
                                    }
                            </tbody>
                            </table>
                        </div>
                    </>
            }
        </>
    )
};

export default AgentData;