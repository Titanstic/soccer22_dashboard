import {Link} from "react-router-dom";
import {useContext} from "react";
import NavContext from "../context/NavContext";

const NotFound = () =>{
    const {setNavActive} = useContext(NavContext);

    return(
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <p className="text-6xl text-red-500 font-extrabold mb-3">404 Not Found</p>
            <Link to="/" className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700" onClick={() => setNavActive('home')}>Go to Home Page</Link>
        </div>
    )
};

export default NotFound;