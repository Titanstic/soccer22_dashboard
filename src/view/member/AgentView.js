import LayoutView from "../LayoutView";
import {useContext, useEffect, useState} from "react";
import CreateAgent from "../../component/member/agent/CreateAgent";
import UpdateAgent from "../../component/member/agent/UpdateAgent";
import AgentData from "../../component/member/agent/AgentData";
import {useLazyQuery} from "@apollo/client";
import {USERS} from "../../gql/user";
import DeleteAgent from "../../component/member/agent/DeleteAgent";
import NavContext from "../../context/NavContext";
import UpdateAgentActive from "../../component/member/agent/UpdateAgentActive";
import AgentDetails from "../../component/member/agent/AgentDetails";

const AgentView = () => {
    // useState
    const [eachUser, setEachUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openActive, setOpenActive] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    // useLazyQuery
    const [loadUsers, usersResult] = useLazyQuery(USERS);
    // useContext
    const {setNavActive, setMainNav} = useContext(NavContext);

    // Start useEffect
    useEffect(() => {
        setNavActive("agent");
        setMainNav("member");
    })
    // End useEffect

    // Start Function
    // - open or close for Create Component
    const addModalHandle = () => {
        setOpenCreate(!openCreate);
    };

    // - open or close for Update Component
    const updateModalHandle = (eachUser) =>{
        setOpenUpdate(!openUpdate);
        setEachUser(eachUser);
    };

    const updateActiveHandle = (eachUser) => {
        setOpenActive(!openActive);
        setEachUser(eachUser);
    }

    const checkUserDetail = (eachUser) => {
        setEachUser(eachUser);
        setOpenDetail(!openDetail);
    }
    // End Function

    return (
        <LayoutView>
            {/*Start Agent Data*/}
            <AgentData addModalHandle={addModalHandle} updateModalHandle={updateModalHandle} updateActiveHandle={updateActiveHandle} checkUserDetail={checkUserDetail} loadUsers={loadUsers} usersResult={usersResult}/>
            {/*End Agent Data*/}

            {/*Start Add Agent Modal*/}
            {
                openCreate && <CreateAgent addModalHandle={addModalHandle} usersResult={usersResult}/>
            }
            {/*End Add Agent Modal*/}

            {/*Start Update Agent Modal*/}
            {
                openUpdate && <UpdateAgent updateModalHandle={updateModalHandle} eachUser={eachUser} usersResult={usersResult}/>
            }
            {/*End Update Agent Modal*/}

            {/*Start Update Active Modal*/}
            {
                openActive && <UpdateAgentActive updateActiveHandle={updateActiveHandle} eachUser={eachUser} usersResult={usersResult}/>
            }
            {/*End Update Active Modal*/}

            {/*Start Agent Detail Modal*/}
            {
                openDetail && <AgentDetails checkUserDetail={checkUserDetail} eachUser={eachUser} usersResult={usersResult}/>
            }
            {/*End Agent Detail Modal*/}
        </LayoutView>
    )
};

export default AgentView;