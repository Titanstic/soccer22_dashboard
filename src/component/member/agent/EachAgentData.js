import {useMemo, useState} from "react";

const EachAgentData = ({userBackClickHandle, eachUser}) =>{
    // useState
    const [users, setUser] = useState([]);

    useMemo(() => {
        const result = eachUser.filter((u, index) => index !== 0);
        setUser(result);
    }, [eachUser])

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
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {
                            users.length > 0 ?
                                users.map(u => (
                                    <tr className="hover:bg-gray-50" key={u.id}>
                                        <td className="px-6 py-4">{u.username}</td>
                                        <td className="px-6 py-4">{u.contact_name}</td>
                                        <td className="px-6 py-4">{u.balance}</td>
                                        <td className='px-6 py-2'>
                                            <p className={`w-20 text-center ${u.active ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"} shadow rounded text-white py-2`}>{u.active ? "Activate" : "Deactivate"}</p>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td className="text-center px-6 py-4" colSpan="4">No Data</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default EachAgentData;