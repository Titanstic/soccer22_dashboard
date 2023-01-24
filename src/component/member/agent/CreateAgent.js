const CreateAgent = ({addModalHandle}) => {
    return (
        <div className="w-full h-full bg-gray-200 flex justify-center items-center bg-opacity-90 absolute top-0">
            <div className="w-11/12 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3">
                <div>
                    <p className="text-3xl font-bold leading-4">Create Agent</p>
                </div>

                <hr className="my-5"/>

                {/*Start Add Form */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 shadow sm:col-span-2">
                        <div className="flex rounded-md mt-1">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">UserName</span>
                            <input type="text" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3" placeholder="Enter your username" />
                        </div>
                    </div>

                    <div className="col-span-3 shadow sm:col-span-2">
                        <div className="flex rounded-md shadow-sm mt-1">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">NickName</span>
                            <input type="text" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3" placeholder="Enter your NickName" />
                        </div>
                    </div>

                    <div className="col-span-3 shadow sm:col-span-2">
                        <div className="flex rounded-md shadow-sm mt-1">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Contact</span>
                            <input type="text" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3" placeholder="Enter your Contact" />
                        </div>
                    </div>

                    <div className="col-span-3 shadow sm:col-span-2">
                        <div className="flex rounded-md shadow-sm mt-1">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Currency</span>
                            <input type="text" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3" placeholder="Enter your Currency" />
                        </div>
                    </div>

                    <div className="col-span-3 shadow sm:col-span-2">
                        <div className="flex rounded-md shadow-sm mt-1">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Balance</span>
                            <input type="text" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3" placeholder="Enter your Balance" />
                        </div>
                    </div>

                    <div className="col-span-3 text-right sm:col-span-2">
                        <button className="bg-red-500 text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3" onClick={addModalHandle}>Cancel</button>
                        <button className="bg-blue-500 text-white rounded shadow hover:bg-blue-400 px-4 py-3" onClick={() => console.log("add agent")}>Create</button>
                    </div>
                </div>
                {/*End Add Form */}
            </div>
        </div>
    )
};

export default CreateAgent;