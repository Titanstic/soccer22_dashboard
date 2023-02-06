import {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {DELETE_USER_BY_PK} from "../../../gql/user";
import AlertContext from "../../../context/AlertContext";

const DeleteAgent = ({deleteModalHandle, userId, usersResult}) => {
    // useState
    const [id, setId] = useState(userId);
    // useContext
    const {showAlert} = useContext(AlertContext);

    // Start Mutation
    const [deleteUserPk] = useMutation(DELETE_USER_BY_PK, {
        onError: (error) => {
            console.log("deleteuserpk", error);
        },
        onCompleted: (result) => {
            showAlert("Delete Successfully", true);
            setId(null);
            usersResult.refetch();
        }
    })
    // End Mutation

    // Start Function
    const deleteUserData = () => {
        try{
            deleteUserPk({variables: {id}});
        }catch (e){
            console.log("deleteUserFun", e.message);
        }
        deleteModalHandle(null);
    }
    // End Function

    return (
        <div className="w-10/12 h-full bg-gray-200 flex justify-center items-center bg-opacity-90 overflow-hidden absolute top-0">
            <div className="w-2/5 bg-white rounded shadow shadow-gray-400 mx-auto">
                <div className="py-10 px-4">
                    <h1 className="text-2xl font-medium leading-6 text-gray-900 mb-3">Delete User Agent</h1>
                    <p className="text-lg text-gray-500">Are you sure you want to delete this agent?</p>
                </div>

                <div className="w-full bg-gray-200 flex justify-end py-3">
                    <button className="bg-white font-medium shadow border rounded mr-4 px-5 py-2 hover:bg-gray-50" onClick={() => deleteModalHandle(null)}>Cancel</button>
                    <button className="bg-red-600 text-white font-medium shadow border rounded mr-4 px-5 py-2 hover:bg-red-500" onClick={deleteUserData}>Delete</button>
                </div>
            </div>
        </div>
    )
};

export default DeleteAgent;