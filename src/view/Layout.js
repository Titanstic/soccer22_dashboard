import {Link} from "react-router-dom";
import {useContext} from "react";
import NavContext from "../context/NavContext";

const Layout = ({children}) => {
    const {navActive, setNavActive} = useContext(NavContext);

    return (
        <div className="h-screen">
            <div className="flex">
                <div className="w-56 h-screen bg-teal-500 text-white shadow-2xl shadow-gray-500">
                    <h1 className="text-4xl font-bold text-center py-3">Soccer 22</h1>

                    <hr/>

                    <div className="w-24 text-xl mt-5 mx-auto">
                        <Link to="/" className={`inline-block rounded-md mb-3 px-4 py-2 ${navActive === 'home' && "bg-gray-500"}`} onClick={() => setNavActive('home')}>Home</Link>
                        <Link to="/user" className="inline-block mb-3 px-4 py-2" onClick={() => setNavActive('user')}>User</Link>
                    </div>
                </div>

                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;

