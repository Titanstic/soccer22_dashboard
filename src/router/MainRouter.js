import { Routes, Route} from "react-router-dom";
import NotFound from "../view/NotFound";
import ProfileView from "../view/account/ProfileView";
import AgentView from "../view/member/AgentView";
import SubUserView from "../view/member/SubUserView";
import LoginView from "../view/LoginView";
import PaymentView from "../view/payment/PaymentView";
import PaymentHistoryView from "../view/payment/PaymentHistoryView";
import MatchListView from "../view/match/MatchListView";
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
            <Route path="/paymenthistory" element={<PaymentHistoryView/>}/>
            {/*End Payment Route*/}

            {/*Start Management match*/}
            <Route path="/matchlist" element={<MatchListView/>}/>
            {/*End Management match*/}

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
};

export default MainRouter;