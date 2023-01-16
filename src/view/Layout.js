import {Link} from "react-router-dom";
import {useContext} from "react";
import NavContext from "../context/NavContext";

const Layout = ({children}) => {
    const {navActive, setNavActive} = useContext(NavContext);

    return (
        <div className="h-screen">
            <div className="flex">
                <div className="w-56 h-screen bg-teal-600 text-white shadow-2xl">
                    <h1 className="text-4xl font-bold text-center py-3">Soccer 22</h1>

                    <hr/>

                    <div className="w-24 text-xl mt-5 mx-auto">
                        <Link to="/" className={`block mb-3 ${navActive === 'home' && "bg-blue-400"}`} onClick={() => setNavActive('home')}>Home</Link>
                        <Link to="/user" className="block mb-3">User</Link>
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

