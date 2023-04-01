import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import {accountCount} from "../../composable/user";

const Profile = () => {
    // useState
    const [accCount, setAccCount] = useState({});
    const [accountBalance, setAccountBalance] = useState(null);
    const [cashBalance, setCashBalance] = useState(null);
    const [memberBalance, setMemberBalance] = useState(null);
    // useContext
    const {user, where, whereArr, loadAllUsers, allUsersResult} = useContext(AuthContext);

    useEffect(() => {
        if(where){
            loadAllUsers({variables: {where: {_and: where }}})
        }
    }, [where])

    useEffect(() => {
        if(allUsersResult.data){
            console.log(allUsersResult.data.users);
            let {superAcc, seniorAcc, masterAcc, agentAcc, userAcc, totalBalance} = accountCount(allUsersResult.data.users);
            setAccCount({superAcc, seniorAcc, masterAcc, agentAcc, userAcc});
            setCashBalance(user.balance);
            setAccountBalance(totalBalance);
            setMemberBalance(totalBalance - user.balance);
         }
    }, [allUsersResult])

    return (
        <div className="w-10/12 md:w-8/12 bg-white border shadow shadow-gray-200 rounded md:rounded-lg my-10">
            <div className="px-4 py-5 md:px-6">
                <h3 className="text-xl font-medium leading-6 text-gray-900">Account - Profile</h3>
            </div>

            {
                user &&
                    <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-500">User Name</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{user.username}</dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-500">Cash Balance</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{cashBalance}</dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-500">Account Balance</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{accountBalance}</dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-500">Members Balance</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{memberBalance}</dd>
                        </div>
                    </dl>

                    {
                        whereArr.length === 0 &&
                            <dl>
                                <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                    <dt className="text-sm font-medium text-gray-500">Super Account</dt>
                                    <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{accCount.superAcc}</dd>
                                </div>
                            </dl>
                    }

                    {
                        whereArr.length === 1 &&
                            <dl>
                                <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                    <dt className="text-sm font-medium text-gray-500">Senior Account</dt>
                                    <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{accCount.seniorAcc}</dd>
                                </div>
                            </dl>
                    }

                    {
                        whereArr.length === 2 &&
                            <dl>
                                <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                    <dt className="text-sm font-medium text-gray-500">Master Account</dt>
                                    <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{accCount.masterAcc}</dd>
                                </div>
                            </dl>
                    }

                    {
                        whereArr.length === 3 &&
                            <dl>
                                <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                    <dt className="text-sm font-medium text-gray-500">Agent Account</dt>
                                    <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{accCount.agentAcc}</dd>
                                </div>
                            </dl>
                    }

                    {
                        whereArr.length === 4 &&
                            <dl>
                                <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                    <dt className="text-sm font-medium text-gray-500">User Account</dt>
                                    <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{accCount.userAcc}</dd>
                                </div>
                            </dl>
                    }

                        <dl>
                            <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                <dt className="text-sm font-medium text-gray-500">Total Member Account</dt>
                                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">0</dd>
                            </div>
                        </dl>
                </div>
            }
        </div>
    )
};

export default Profile;