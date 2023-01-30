import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import LoadingContext from "../../../context/LoadingContext";
import Loading from "../../Loading";

const AgentData = ({updateModalHandle, deleteModalHandle, loadUsers, usersResult}) => {
    // useState
    const [usersData, setUsersData] = useState(null);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    // useContext
    const {user, where, decodeToken} = useContext(AuthContext);
    const {loading, setLoading} = useContext(LoadingContext);


    // Start UseEffect
    useEffect(() => {
        setLoading(true);

        if(where){
            loadUsers({ variables: { limit, offset, where: {_and: where } }});
        }
    }, [user])

    useEffect(() => {
        if(usersResult.data){
            console.log(usersResult.data);
            // to remover login user account from show users data table
            const result = usersResult.data.users.filter(u => u.id !== decodeToken.userID);

            setUsersData(result);
            setLoading(false);
        }
    }, [usersResult]);
    // End UseEffect

    return(
        <>
            {
                loading ?
                    <Loading/>
                    :
                    <div className="w-11/12 rounded-lg border border-gray-200 shadow-md my-10 mx-auto">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                            <tr className="text-lg font-medium text-gray-900">
                                <th scope="col" className="px-6 py-4">User Name</th>
                                <th scope="col" className="px-6 py-4">Nick Name</th>
                                <th scope="col" className="px-6 py-4">Contact Name</th>
                                <th scope="col" className="px-6 py-4">Balance</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {
                                    usersData &&
                                        usersData.map( userData => (
                                            <tr className="hover:bg-gray-50" key={userData.id}>
                                                <td className="px-6 py-4">{userData.username}</td>
                                                <td className="px-6 py-4">{
                                                    `${userData.super_code ? userData.super_code : ""} 
                                                    ${userData.senior_code ? userData.super_code : ""} 
                                                    ${userData.master_code ? userData.super_code : ""} 
                                                    ${userData.agent_code ? userData.super_code : ""} 
                                                    ${userData.user_code ? userData.super_code : ""} 
                                                    `
                                                }</td>
                                                <td className="px-6 py-4">{userData.contact_name}</td>
                                                <td className="px-6 py-4">{userData.balance}</td>
                                                <td className="text-lg px-6 py-4">
                                                    <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5" onClick={() => updateModalHandle(userData)}></i>
                                                    <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400" onClick={() => deleteModalHandle(userData.id)}></i>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
};

export default AgentData;