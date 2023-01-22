import {useState} from "react";
import Layout from "../Layout";
import CreateMember from "../../component/member/memberlist/CreateMember";
import UpdateMember from "../../component/member/memberlist/UpdateMember";

const MemberView = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const addModalHandle = () => {
        setOpenCreate(!openCreate);
    };

    const updateModalHandle = () =>{
        setOpenUpdate(!openUpdate);
    }

    return (
        <Layout>
            {/*Start Add Member Button*/}
            <div className="flex justify-between items-center mt-5 mx-5">
                <p className="text-3xl font-bold">Member List</p>
                <button className="bg-blue-500 text-white rounded shadow hover:bg-blue-400 px-4 py-3" onClick={addModalHandle}>Add Member</button>
            </div>
            {/*End Add Member Button*/}

            {/*Start Member Data*/}
            <div className="w-11/12 rounded-lg border border-gray-200 shadow-md mt-5 mx-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                    <tr className="text-lg font-medium text-gray-900">
                        <th scope="col" className="px-6 py-4">User Name</th>
                        <th scope="col" className="px-6 py-4">Nick Name</th>
                        <th scope="col" className="px-6 py-4">Contact</th>
                        <th scope="col" className="px-6 py-4">Currency</th>
                        <th scope="col" className="px-6 py-4">Balance</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">Min Khant</td>
                        <td className="px-6 py-4">Titanstic</td>
                        <td className="px-6 py-4">09770393327</td>
                        <td className="px-6 py-4">MMK</td>
                        <td className="px-6 py-4">5000</td>
                        <td className="text-lg px-6 py-4">
                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5" onClick={updateModalHandle}></i>
                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400"></i>
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">Min Khant</td>
                        <td className="px-6 py-4">Titanstic</td>
                        <td className="px-6 py-4">09770393327</td>
                        <td className="px-6 py-4">MMK</td>
                        <td className="px-6 py-4">5000</td>
                        <td className="text-lg px-6 py-4">
                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5"></i>
                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400"></i>
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">Min Khant</td>
                        <td className="px-6 py-4">Titanstic</td>
                        <td className="px-6 py-4">09770393327</td>
                        <td className="px-6 py-4">MMK</td>
                        <td className="px-6 py-4">5000</td>
                        <td className="text-lg px-6 py-4">
                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5"></i>
                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400"></i>
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">Min Khant</td>
                        <td className="px-6 py-4">Titanstic</td>
                        <td className="px-6 py-4">09770393327</td>
                        <td className="px-6 py-4">MMK</td>
                        <td className="px-6 py-4">5000</td>
                        <td className="text-lg px-6 py-4">
                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5"></i>
                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            {/*End Member Data*/}

            {/*Start Add Member Modal*/}
            {
                openCreate && <CreateMember addModalHandle={addModalHandle}/>
            }
            {/*End Add Member Modal*/}

            {/*Start Update Member Modal*/}
            {
                openUpdate && <UpdateMember updateModalHandle={updateModalHandle}/>
            }
            {/*End Update Member Modal*/}
        </Layout>
    )
};
export default MemberView;