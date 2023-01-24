import { Routes, Route} from "react-router-dom";
import NotFound from "../view/NotFound";
import ProfileView from "../view/Account/ProfileView";
import AgentView from "../view/Member/AgentView";
import MemberView from "../view/Member/MemberView";
import SubUserView from "../view/Member/SubUserView";
import LoginView from "../view/LoginView";
const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginView/>}/>
            {/*Start Account Route*/}
            <Route path="/profile" element={<ProfileView/>}/>
            {/*End Account Route*/}

            {/*Start Member Route*/}
            <Route path="/agent" element={<AgentView/>}/>
            <Route path="/member" element={<MemberView/>}/>
            <Route path="/subuser" element={<SubUserView/>}/>
            {/*End Member Route*/}

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
};

export default MainRouter;