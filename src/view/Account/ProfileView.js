import LayoutView from "../LayoutView";

const ProfileView = () => {

    return (
        <LayoutView>
            <div className="w-full">
                {/*Start User's ProfileView Data*/}
                <div className="w-11/12 bg-white shadow sm:rounded-lg mt-5 mx-auto">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-xl font-medium leading-6 text-gray-900">Account - Profile</h3>
                    </div>
                    
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                <dt className="text-sm font-medium text-gray-500">User Name</dt>
                                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">Min Khant</dd>
                            </div>
                        </dl>
                        
                        <dl>
                            <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                <dt className="text-sm font-medium text-gray-500">Cash Balance</dt>
                                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">0.00</dd>
                            </div>
                        </dl>

                        <dl>
                            <div className="bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                <dt className="text-sm font-medium text-gray-500">Account Balance</dt>
                                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">0.00</dd>
                            </div>
                        </dl>

                        <dl>
                            <div className="bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 px-4 py-5">
                                <dt className="text-sm font-medium text-gray-500">Members Balance</dt>
                                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0 mt-1">0.00</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                {/*End User's ProfileView Data*/}
            </div>
        </LayoutView>
    )
};

export default ProfileView;