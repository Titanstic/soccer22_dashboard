import {Link} from "react-router-dom";
import {useContext} from "react";
import {openDropDown} from "../../composable/layout";
import NavContext from "../../context/NavContext";

const Nav = () => {
    // useContext
    const {navActive, setNavActive, mainNav, setMainNav} = useContext(NavContext);

    // Start Function
    const navLinkHandle = (nav, main) => {
        setNavActive(nav);
        setMainNav(main);
    };
    // End Function

    return (
        <div className="w-80 h-screen bg-gray-800 text-white shadow-2xl shadow-gray-300">
            <h1 className="text-4xl font-bold text-center py-5">Soccer 22</h1>

            <hr className="mb-3"/>

            {/*start nav item*/}
            <div className="w-52 text-base font-medium mt-5 mx-auto">
                <Link to="/" className={`w-full inline-block rounded-md hover:bg-gray-700 mb-3 py-3 ${navActive === 'home' && "bg-gray-900"}`} onClick={() => navLinkHandle("home", "")}>
                    <i className="fa-solid fa-house mx-4"></i> Home
                </Link>

                {/*start account dropdown*/}
                <button type="button" id="accountDropdownButton" className="w-full rounded-md inline-flex items-center justify-between hover:bg-gray-700 focus:outline-none py-3 " aria-expanded="true" aria-haspopup="true" onClick={() => openDropDown("accountDropdown")}>
                    <span><i className="fa-solid fa-user-gear mx-4"></i> Account</span>
                    <svg className="w-4 h-4 mx-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="accountDropdown" className={`${mainNav !== "account" && "hidden"} rounded-md focus:outline-line mb-3`} role="menu" aria-orientation="vertical" aria-labelledby="accountDropdownButton">
                    <div className="" role="none">
                        <Link to="/profile" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'user' && "bg-gray-900"}`} onClick={() => navLinkHandle("user", "account")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-user mx-4"></i> Profile</Link>
                    </div>
                </div>
                {/*end account dropdown*/}

                {/*start member dropdown*/}
                <button type="button" id="memberDropdownButton" className="w-full rounded-md inline-flex items-center hover:bg-gray-700 focus:outline-none py-3 " aria-expanded="true" aria-haspopup="true" onClick={() => openDropDown("memberDropdown")}>
                    <i className="fa-solid fa-users-gear mx-4"></i> <span className="text-start">Member Management</span>
                    <svg className="w-4 h-4 mx-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="memberDropdown" className={`${mainNav !== "member" && "hidden"} rounded-md focus:outline-line mb-3`} role="menu" aria-orientation="vertical" aria-labelledby="memberDropdownButton">
                    <div role="none">
                        <Link to="/agent" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'agent' && "bg-gray-900"}`} onClick={() => navLinkHandle("agent", "member")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-person-shelter mx-4"></i> Agent</Link>
                        <Link to="/member" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'member' && "bg-gray-900"}`} onClick={() => navLinkHandle("member", "member")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-users mx-4"></i> Member</Link>
                        <Link to="/subuser" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'subuser' && "bg-gray-900"}`} onClick={() => navLinkHandle("subuser", "member")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-user-group mx-4"></i> Sub User</Link>
                    </div>
                </div>
                {/*end member dropdown*/}
            </div>
            {/*end nav item*/}
        </div>
    )
};

export default Nav;