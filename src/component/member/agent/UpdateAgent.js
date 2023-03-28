import {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {UPDATE_USER_BY_PK} from "../../../gql/user";
import {updateCheckInputData} from "../../../composable/agent";
import AlertContext from "../../../context/AlertContext";

const UpdateAgent = ({updateModalHandle, eachUser, usersResult}) => {
    // useState
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(eachUser);
    const [error, setError] = useState({});
    // useContext
    const {showAlert} = useContext(AlertContext);

    // Start Mutation
    const [updateUserPk] = useMutation(UPDATE_USER_BY_PK, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: (result) => {
            showAlert("Update Successfully", false);
            setUser(null);
            usersResult.refetch();
        }
    })
    // End Mutation

    // Start Function
    const inputHandle = (e, input) => {
        setUser({...user, [input]: e.target.value});

        if(error[input]){
            delete error[input];
            setError(error);
        }
    }

    const updateUserData = () => {
        setLoading(true);
        let {errorExist, tempError} = updateCheckInputData(user.password);

        if(errorExist){
            setError(tempError);
        }else{
            try{
                updateUserPk({variables: {id: user.id, contact_name: user.contact_name, username: user.username}});
            }catch (e) {
                console.log("updateUserdata", e.message);
            }
            updateModalHandle(null);
        }

        setLoading(false);
    };
    // End Function

    return (
        <div className="w-full sm:w-10/12 h-full bg-gray-200 flex justify-center items-center bg-opacity-90 overflow-hidden absolute top-0">
            <div className="w-5/6 sm:w-1/3 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3">
                <div>
                    <p className="text-xl sm:text-3xl font-bold leading-4">Update Agent</p>
                </div>

                <hr className="my-5"/>

                {/*Start Update Form */}
                {
                    user &&
                    <div className="grid grid-cols-3 gap-7">
                        <div className="col-span-3 relative">
                            <div className="flex shadow rounded-md">
                                <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Password</span>
                                <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error.password ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={user.password} onChange={(e) => inputHandle(e, "password")} placeholder="Enter your password" />
                            </div>
                            {
                                error.password && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error.password}</span></div>
                            }
                        </div>

                        <div className="col-span-3 text-right">
                            <button className="bg-red-500 text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3" onClick={() => updateModalHandle(null)}>Cancel</button>
                            <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-white rounded shadow hover:bg-blue-400 px-4 py-3`} onClick={updateUserData} disabled={loading}>Update</button>
                        </div>
                    </div>
                }
                {/*End Update Form */}
            </div>
        </div>
    );
};

export default UpdateAgent;