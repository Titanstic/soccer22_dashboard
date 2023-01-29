import { Routes, Route} from "react-router-dom";
import NotFound from "../view/NotFound";
import ProfileView from "../view/account/ProfileView";
import AgentView from "../view/member/AgentView";
import SubUserView from "../view/member/SubUserView";
import LoginView from "../view/LoginView";
import PaymentView from "../view/payment/PaymentView";
const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginView/>}/>
            {/*Start account Route*/}
            <Route path="/profile" element={<ProfileView/>}/>
            {/*End account Route*/}

            {/*Start member Route*/}
            <Route path="/agent" element={<AgentView/>}/>
            <Route path="/subuser" element={<SubUserView/>}/>
            {/*End member Route*/}

            {/*Start Payment Route*/}
            <Route path="/quickpayment" element={<PaymentView/>}/>
            {/*End Payment Route*/}

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
};

export default MainRouter;