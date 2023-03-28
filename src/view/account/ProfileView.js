import LayoutView from "../LayoutView";
import Profile from "../../component/account/Profile";
import {useContext, useEffect} from "react";
import NavContext from "../../context/NavContext";

const ProfileView = () => {
    // useContext
    const {setNavActive, setMainNav} = useContext(NavContext);

    useEffect(() => {
        setNavActive("user");
        setMainNav("account");
    })

    return (
        <LayoutView>
            <div className="w-full flex justify-center items-center overflow-auto">
                {/*Start User's ProfileView Data*/}
                <Profile/>
                {/*End User's ProfileView Data*/}
            </div>
        </LayoutView>
    )
};

export default ProfileView;