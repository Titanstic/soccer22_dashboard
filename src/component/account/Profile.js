import {useContext, useEffect} from "react";
import AuthContext from "../../context/AuthContext";
import NavContext from "../../context/NavContext";

const Profile = () => {
    // useContext
    const {user} = useContext(AuthContext);
    const {setNavActive, setMainNav} = useContext(NavContext);

    useEffect(() => {
        setNavActive("user");
        setMainNav("account");
    })

    return (
        <div className="w-8/12 bg-white border shadow shadow-gray-200 rounded sm:rounded-lg my-10">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-xl font-medium leading-6 text-gray-900">Account - Profile</h3>
            </div>

            {
                user && <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-500">User Name</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{user.username}</dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-500">Cash Balance</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{user.balance}</dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-500">Account Balance</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{user.balance}</dd>
                        </div>
                    </dl>

                    <dl>
                        <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                            <dt className="text-sm font-medium text-gray-500">Members Balance</dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">{user.balance}</dd>
                        </div>
                    </dl>
                </div>
            }
        </div>
    )
};

export default Profile;