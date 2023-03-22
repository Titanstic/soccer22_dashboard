import {useNavigate} from "react-router-dom";

const EachAgentData = ({userBackClickHandle, eachUser, updateModalHandle, updateActiveHandle, deleteModalHandle}) =>{
    // useNavigate
    const navigate = useNavigate();

    return(
        <div className="w-11/12 rounded-lg my-10 mx-auto">
            <div className="flex items-center">
                <button className="font-bold border border-gray-200 shadow-md rounded px-4 py-1 hover:bg-gray-50" onClick={userBackClickHandle}>Back</button>
                <span className="text-3xl font-bold ml-5">{eachUser[0].username}'s Each Data</span>
            </div>

            <div className="w-full rounded-lg border border-gray-200 shadow-md my-10 mx-auto">
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
                            eachUser ?
                                eachUser.map(u => (
                                    <tr className="hover:bg-gray-50" key={u.id}>
                                        <td className="px-6 py-4">{u.username}</td>
                                        <td className="px-6 py-4">{u.contact_name}</td>
                                        <td className="px-6 py-4">{u.balance}</td>
                                        <td className='px-6 py-2'>
                                            <button className={`w-20 ${u.active ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} shadow rounded text-white py-2`} onClick={() => updateActiveHandle(u)}>{u.active ? "Activate" : "Deactivate"}</button>
                                        </td>
                                        <td className="text-lg px-6 py-4">
                                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5" onClick={() => updateModalHandle(u)}></i>
                                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400 mr-5" onClick={() => deleteModalHandle(u.id)}></i>
                                            <i className="text-green-600 fa-solid fa-money-check-dollar cursor-pointer hover:text-green400" onClick={() => navigate("/quickpayment")}></i>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr><td>No Data</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default EachAgentData;