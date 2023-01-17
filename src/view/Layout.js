import {Link} from "react-router-dom";
import {useContext} from "react";
import NavContext from "../context/NavContext";

const Layout = ({children}) => {
    const {navActive, setNavActive} = useContext(NavContext);

    return (
        <div className="h-screen">
            <div className="flex">
                <div className="w-64 h-screen bg-gray-800 text-white shadow-2xl shadow-gray-300">
                    <h1 className="text-4xl font-bold text-center py-5">Soccer 22</h1>

                    <hr className="mb-3"/>

                    <div className="w-44 text-xl font-medium mt-5 mx-auto">
                        <Link to="/" className={`w-full inline-block rounded-md hover:bg-gray-700 mb-3 py-3 ${navActive === 'home' && "bg-gray-900"}`} onClick={() => setNavActive('home')}>
                            <i className="fa-solid fa-house mx-4"></i> Home
                        </Link>

                        <Link to="/user" className="w-full inline-block rounded-md hover:bg-gray-700 mb-3 py-2" onClick={() => setNavActive('user')}>
                            <i className="fa-solid fa-user mx-4"></i> User
                        </Link>
                    </div>
                </div>

                <div className="w-full">
                    <div className="w-full flex justify-between shadow py-5 pl-3">
                        <p className="text-md font-bold">Hi, Min Khant</p>

                        <div className="mr-5">
                            <Link to="/" className=" text-lg bg-blue-500 text-white font-bold shadow rounded hover:bg-blue-400 px-5 py-2">
                                <i className="fa-solid fa-right-to-bracket mr-2"></i> Logout
                            </Link>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;

