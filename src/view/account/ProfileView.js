import LayoutView from "../LayoutView";
import Profile from "../../component/account/Profile";

const ProfileView = () => {

    return (
        <LayoutView>
            <div className="w-full flex justify-center items-center">
                {/*Start User's ProfileView Data*/}
                <Profile/>
                {/*End User's ProfileView Data*/}
            </div>
        </LayoutView>
    )
};

export default ProfileView;