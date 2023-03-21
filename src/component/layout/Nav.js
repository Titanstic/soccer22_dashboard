import {Link} from "react-router-dom";
import {useContext} from "react";
import {openDropDown} from "../../composable/layout";
import NavContext from "../../context/NavContext";
import AuthContext from "../../context/AuthContext";

const Nav = () => {
    // useContext
    const {navActive, setNavActive, mainNav, setMainNav} = useContext(NavContext);
    const {whereArr} = useContext(AuthContext);

    // Start Function
    const navLinkHandle = (nav, main) => {
        setNavActive(nav);
        setMainNav(main);
    };
    // End Function

    return (
        <div className="w-2/12 h-screen bg-gray-800 text-white shadow-2xl shadow-gray-300">
            <h1 className="text-4xl font-bold text-center py-5">Soccer 22</h1>

            <hr className="mb-3"/>

            {/*start nav item*/}
            <div className="w-11/12 text-base font-medium mt-5 mx-auto">
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
                <button type="button" id="memberDropdownButton" className="w-full rounded-md inline-flex justify-between items-center hover:bg-gray-700 focus:outline-none py-3 " aria-expanded="true" aria-haspopup="true" onClick={() => openDropDown("memberDropdown")}>
                    <i className="fa-solid fa-users-gear mx-4"></i><span className="text-start"> Member Management</span>
                    <svg className="w-4 h-4 mx-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="memberDropdown" className={`${mainNav !== "member" && "hidden"} rounded-md focus:outline-line mb-3`} role="menu" aria-orientation="vertical" aria-labelledby="memberDropdownButton">
                    <div role="none">
                        <Link to="/agent" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'agent' && "bg-gray-900"}`} onClick={() => navLinkHandle("agent", "member")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-person-shelter mx-4"></i>
                            {whereArr.length === 0 && "Super Acc"}
                            {whereArr.length === 1 && "Senior Acc"}
                            {whereArr.length === 2 && "Master Acc"}
                            {whereArr.length === 3 && "Agent Acc"}
                            {whereArr.length === 4 && "User Acc"}
                        </Link>
                        <Link to="/subuser" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'subuser' && "bg-gray-900"}`} onClick={() => navLinkHandle("subuser", "member")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-user-group mx-4"></i> Sub User</Link>
                    </div>
                </div>
                {/*end member dropdown*/}

                {/*start payment dropdown*/}
                <button type="button" id="paymentDropdownButton" className="w-full rounded-md inline-flex items-center justify-between hover:bg-gray-700 focus:outline-none py-3 " aria-expanded="true" aria-haspopup="true" onClick={() => openDropDown("paymentDropdown")}>
                    <span><i className="fa-sharp fa-solid fa-credit-card mx-4"></i> Payment</span>
                    <svg className="w-4 h-4 mx-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="paymentDropdown" className={`${mainNav !== "payment" && "hidden"} rounded-md focus:outline-line mb-3`} role="menu" aria-orientation="vertical" aria-labelledby="accountDropdownButton">
                    <div className="" role="none">
                        <Link to="/quickpayment" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'quick' && "bg-gray-900"}`} onClick={() => navLinkHandle("quick", "payment")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-money-bill-transfer mx-4"></i> Quick Payment</Link>
                    </div>
                    <div className="" role="none">
                        <Link to="/paymenthistory" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'history' && "bg-gray-900"}`} onClick={() => navLinkHandle("history", "payment")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-landmark mx-4"></i> Payment History</Link>
                    </div>
                </div>
                {/*end payment dropdown*/}

                {/*start match */}
                <button type="button" id="matchDropdownButton" className="w-full rounded-md inline-flex justify-between items-center hover:bg-gray-700 focus:outline-none py-3 " aria-expanded="true" aria-haspopup="true" onClick={() => openDropDown("matchDropdown")}>
                    <i className="fa-regular fa-futbol mx-4"></i><span className="text-start"> Match Management</span>
                    <svg className="w-4 h-4 mx-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="matchDropdown" className={`${mainNav !== "matches" && "hidden"} rounded-md focus:outline-line mb-3`} role="menu" aria-orientation="vertical" aria-labelledby="matchDropdownButton">
                    <div className="" role="none">
                        <Link to="/matchlist" id="menu-item-0" className={`w-full inline-block rounded-md hover:bg-gray-700 pl-5 py-2 ${navActive === 'matchlist' && "bg-gray-900"}`} onClick={() => navLinkHandle("matchlist", "matches")} role="menuitem" tabIndex="-1"><i className="fa-solid fa-list mx-4"></i> Match List</Link>
                    </div>
                </div>
                {/*end match */}

            </div>
            {/*end nav item*/}
        </div>
    )
};

export default Nav;