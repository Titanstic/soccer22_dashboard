import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import Loading from "../../Loading";

const AgentData = ({updateModalHandle, updateActiveHandle, deleteModalHandle, loadUsers, usersResult}) => {
    // useState
    const [usersData, setUsersData] = useState([]);
    const [count ,setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    // useContext
    const {user, where, decodeToken} = useContext(AuthContext);

    // Start UseEffect
    useEffect(() => {
        setLoading(true);

        if(where){
            loadUsers({ variables: { limit, offset, where: {_and: where } }});
        }
    }, [user, offset])

    useEffect(() => {
        if(usersResult.data){
            setTotalCount(usersResult.data.users_aggregate.aggregate.count);
            setCount(Math.ceil(usersResult.data.users_aggregate.aggregate.count / limit));

            // to remove login user account from show users data table
            const result = usersResult.data.users.filter(u => u.id !== decodeToken.userID);
            console.log(result);
            setUsersData(result);
            setLoading(false);
        }
    }, [usersResult]);
    // End UseEffect

    // Start Function
    const paginateButton = (state) => {
        if(state === "next"){
            setOffset(offset + limit);
            setPage(page + 1);
        }else{
            setOffset(offset - limit);
            setPage(page - 1);
        }
    };
    // End Function

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
                                <th scope="col" className="px-6 py-4">Active</th>
                                <th scope="col" className="px-6 py-4">Action</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {
                                    usersData.length > 0 ?
                                        usersData.map( userData => (
                                            <tr className="hover:bg-gray-50" key={userData.id}>
                                                <td className="px-6 py-4">{userData.username}</td>
                                                <td className="px-6 py-4">{
                                                    `${userData.super_code ? userData.super_code : ""} 
                                                    ${userData.senior_code ? userData.senior_code : ""} 
                                                    ${userData.master_code ? userData.master_code : ""} 
                                                    ${userData.agent_code ? userData.agent_code : ""} 
                                                    ${userData.user_code ? userData.user_code : ""} 
                                                    `
                                                }</td>
                                                <td className="px-6 py-4">{userData.contact_name}</td>
                                                <td className="px-6 py-4">{userData.balance}</td>
                                                <td className='px-6 py-2'>
                                                    <button className={`w-20 ${userData.active ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} shadow rounded text-white py-2`} onClick={() => updateActiveHandle(userData)}>{userData.active ? "Activate" : "Deactivate"}</button>
                                                </td>
                                                <td className="text-lg px-6 py-4">
                                                    <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5" onClick={() => updateModalHandle(userData)}></i>
                                                    <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400" onClick={() => deleteModalHandle(userData.id)}></i>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4" colSpan="6">No History</td>
                                        </tr>
                                }
                            </tbody>
                        </table>

                        {
                            count > 1 && <div className="text-sm border-t flex justify-between items-center py-2">
                                <p className="ml-5">Showing <span className="font-bold">{page}</span> to <span className="font-bold">{count}</span> page  {totalCount} results</p>

                                <div className="mr-5">
                                    <button className={`${page === 1 ? "bg-gray-200" : "bg-white hover:bg-gray-50"} font-bold border rounded shadow mr-5 px-3 py-2`} onClick={() => paginateButton("prev")} disabled={page === 1 ? true : false}>Previous</button>
                                    <button className={`${page < count ? "bg-white hover:bg-gray-50" : "bg-gray-200"} font-bold border rounded shadow mr-5 px-3 py-2`} onClick={() => paginateButton("next")} disabled={page < count ? false : true}>Next</button>
                                </div>
                            </div>
                        }
                    </div>
            }
        </>
    )
};

export default AgentData;