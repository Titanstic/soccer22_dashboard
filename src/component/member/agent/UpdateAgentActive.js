import {useContext, useState} from "react";
import AlertContext from "../../../context/AlertContext";
import {useMutation} from "@apollo/client";
import {ACCOUNT_SUSPEND} from "../../../gql/user";

const UpdateAgentActive = ({updateActiveHandle, eachUser, usersResult}) => {
    // useState
    const [user, setUser] = useState(eachUser);
    const [loading, setLoading] = useState(false);
    // useContext
    const {showAlert} = useContext(AlertContext);

    // Start Mutation
    const [accountSuspend] = useMutation(ACCOUNT_SUSPEND, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: (result) => {
            console.log(result);
            showAlert("Update Active", false);
            setUser(null);
            updateActiveHandle(null);
            usersResult.refetch();
        }
    })
    // End Mutation

    // Start Function
    const updateUserActive = () => {
        try{
            accountSuspend({variables: {suspendid: user.id}});
        }catch (e) {
            console.log(e.message);
        }
    }
    // End Function
    console.log(eachUser);

    return (
        <div className="w-10/12 h-full bg-gray-200 flex justify-center items-center bg-opacity-90 overflow-hidden absolute top-0">
            <div className="w-2/5 bg-white rounded shadow shadow-gray-400 mx-auto">
                <div className="py-10 px-4">
                    <h1 className="text-2xl font-medium leading-6 text-gray-900 mb-3">Update Agent Active</h1>
                    <p className="text-lg text-gray-500">Are you sure you want to {user.active ? "deactivate" : "activate"} this agent?</p>
                </div>

                <div className="w-full bg-gray-200 flex justify-end py-3">
                    <button className="bg-white font-medium shadow border rounded mr-4 px-5 py-2 hover:bg-gray-50" onClick={() => updateActiveHandle(null)}>Cancel</button>
                    <button className="bg-red-600 text-white font-medium shadow border rounded mr-4 px-5 py-2 hover:bg-red-500" onClick={updateUserActive}>Confirm</button>
                </div>
            </div>
        </div>
    )
};

export default UpdateAgentActive;