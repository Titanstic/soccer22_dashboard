import LayoutView from "../LayoutView";
import CreateSubUser from "../../component/member/subuser/CreateSubUser";
import UpdateSubUser from "../../component/member/subuser/UpdateSubUser";
import {useContext, useEffect, useState} from "react";
import NavContext from "../../context/NavContext";

const SubUserView = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    // useContext
    const {setNavActive, setMainNav} = useContext(NavContext);

    // Start useEffect
    useEffect(() => {
        setNavActive("subuser");
        setMainNav("member");
    })
    // End useEffect

    const addModalHandle = () => {
        setOpenCreate(!openCreate);
    };

    const updateModalHandle = () => {
        setOpenUpdate(!openUpdate)
    }


    return (
        <LayoutView>
            {/*Start Add SubUser Button*/}
            <div className="flex justify-between items-center mt-5 mx-5">
                <p className="text-3xl font-bold">Sub User List</p>
                <button className="bg-blue-500 text-white rounded shadow hover:bg-blue-400 px-4 py-3" onClick={addModalHandle}>Add Sub User</button>
            </div>
            {/*End Add SubUser Button*/}

            {/*Start SubUser Data*/}
            <div className="w-11/12 rounded-lg border border-gray-200 shadow-md mt-5 mx-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                    <tr className="text-lg font-medium text-gray-900">
                        <th scope="col" className="px-6 py-4">User Name</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">Min Khant</td>
                        <td className="text-lg px-6 py-4">
                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5" onClick={updateModalHandle}></i>
                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400"></i>
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">Min Khant</td>
                        <td className="text-lg px-6 py-4">
                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5"></i>
                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400"></i>
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">Min Khant</td>
                        <td className="text-lg px-6 py-4">
                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5"></i>
                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400"></i>
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">Min Khant</td>
                        <td className="text-lg px-6 py-4">
                            <i className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer hover:text-blue-400 mr-5"></i>
                            <i className="text-red-600 fa-solid fa-trash cursor-pointer hover:text-red-400"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            {/*End SubUser Data*/}

            {/*Start Add SubUser Modal*/}
            {
                openCreate && <CreateSubUser addModalHandle={addModalHandle}/>
            }
            {/*End Add SubUser Modal*/}

            {/*Start Update SubUser Modal*/}
            {
                openUpdate && <UpdateSubUser updateModalHandle={updateModalHandle}/>
            }
            {/*End Update SubUser Modal*/}
        </LayoutView>
    )
};

export default SubUserView;