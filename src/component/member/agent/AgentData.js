import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import EachAgentData from "./EachAgentData";

const AgentData = ({addModalHandle, updateModalHandle, updateActiveHandle, deleteModalHandle, loadUsers, usersResult}) => {
    // useState
    const [usersData, setUsersData] = useState(null);
    const [eachUser, setEachUser] = useState(null);
    const [showEachUser, setShowEachUser] = useState(false);
    // useContext
    const {where, whereArr, decodeToken} = useContext(AuthContext);
    // useNavigate
    const navigate = useNavigate();

    // Start UseEffect
    useEffect(() => {
        if(where){
            loadUsers({ variables: { where: {_and: where } }});
        }
    }, [where])

    useEffect(() => {
        if(usersResult.data){
            // to remove login user account from show users data table
            const result = usersResult.data.users.filter(u => u.id !== decodeToken.userID);

            let filterUser = [];
            result.forEach(r => {
                let key = `${r.super_code ? r.super_code : ""}${r.senior_code ? " "+r.senior_code : ""}${r.master_code ? " "+r.master_code : ""}${r.agent_code ? " "+r.agent_code : ""}${r.user_code ? " "+r.user_code : ""}`;
                let keyArr = key.split(" ");

                if(keyArr.length > whereArr.length + 1){
                    filterUser.forEach(f => {
                        let objectKey = f[0]["objectKey"];
                        let objectKeyArr = objectKey.split(" ");

                         if(keyArr[keyArr.length - 2] === objectKeyArr[objectKeyArr.length - 1]){
                            f.push(r);
                         }
                    })
                } else{
                    r = {...r, "objectKey": key};
                    filterUser.push([r]);
                }
            });
            setUsersData(filterUser);
        }
    }, [usersResult]);
    // End UseEffect

    // Start Function
    const userClickHandle = (data) => {
        console.log(data);
        setShowEachUser(!showEachUser);
        setEachUser(data);
    }
    // End Function

    return(
        <>
            {
                showEachUser ?
                    <EachAgentData userClickHandle={userClickHandle} eachUser={eachUser} updateModalHandle={updateModalHandle} updateActiveHandle={updateActiveHandle} deleteModalHandle={deleteModalHandle}/>
                    :
                    <>
                        {/*// Start Add Agent Button*/}
                        {
                            whereArr &&
                                <div className="flex justify-between items-center mt-5 mx-5">
                                    <p className="text-3xl font-bold">
                                        {whereArr.length === 0 && "Super Account List"}
                                        {whereArr.length === 1 && "Senior Account List"}
                                        {whereArr.length === 2 && "Master Account List"}
                                        {whereArr.length === 3 && "Agent Account List"}
                                        {whereArr.length === 4 && "User Account List"}
                                    </p>
                                    <button className="bg-blue-500 text-white rounded shadow hover:bg-blue-400 px-4 py-3" onClick={addModalHandle}>
                                        Add {whereArr.length === 0 && "Super"} {whereArr.length === 1 && "Senior"} {whereArr.length === 2 && "Master"} {whereArr.length === 3 && "Agent"} {whereArr.length === 4 && "User"}
                                    </button>
                                </div>
                        }
                        {/*// End Add Agent Button*/}

                        <div className="w-11/12 rounded-lg border border-gray-200 shadow-md my-10 mx-auto">
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
                                        usersData ?
                                            usersData.length > 0 ?
                                                usersData.map( userData => (
                                                    <tr className="hover:bg-gray-50" key={userData[0].id} onClick={() => userClickHandle(userData)}>
                                                        <td className="px-6 py-4">{userData[0].username}</td>
                                                        <td className="px-6 py-4">{userData[0].contact_name}</td>
                                                        <td className="px-6 py-4">{userData[0].balance}</td>
                                                        <td className='px-6 py-2'>
                                                            <button className={`w-20 ${userData[0].active ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} shadow rounded text-white py-2`} onClick={() => updateActiveHandle(userData)}>{userData[0].active ? "Activate" : "Deactivate"}</button>
                                                        </td>
                                                        <td className="text-lg px-6 py-4">
                                                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5" onClick={() => updateModalHandle(userData[0])}></i>
                                                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400 mr-5" onClick={() => deleteModalHandle(userData[0].id)}></i>
                                                            <i className="text-green-600 fa-solid fa-money-check-dollar cursor-pointer hover:text-green400" onClick={() => navigate("/quickpayment")}></i>
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