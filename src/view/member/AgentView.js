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
import AuthContext from "../../context/AuthContext";

const AgentView = () => {
    // useState
    const [eachUser, setEachUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openActive, setOpenActive] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    // useLazyQuery
    const [loadUsers, usersResult] = useLazyQuery(USERS);
    // useContext
    const {whereArr} = useContext(AuthContext);
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

    const deleteModalHandle = (id) => {
        setOpenDelete(!openDelete);
        setUserId(id);
    }
    // End Function

    return (
        <LayoutView>
            {/*// Start Add Agent Button*/}
            {
                whereArr &&
                    <div className="flex justify-between items-center mt-5 mx-5">
                        <p className="text-3xl font-bold">
                            {whereArr.length === 0 && "Super Account List"}
                            {whereArr.length === 1 && "Senior Account List"}
                            {whereArr.length === 2 && "Master Account List"}
                            {whereArr.length === 3 && "Agent Account List"}
                            {whereArr.length === 4 && "User Account List"}
                        </p>
                        <button className="bg-blue-500 text-white rounded shadow hover:bg-blue-400 px-4 py-3" onClick={addModalHandle}>
                            Add {whereArr.length === 0 && "Super"} {whereArr.length === 1 && "Senior"} {whereArr.length === 2 && "Master"} {whereArr.length === 3 && "Agent"} {whereArr.length === 4 && "User"}
                        </button>
                    </div>
            }
            {/*// End Add Agent Button*/}

            {/*Start Agent Data*/}
            <AgentData updateModalHandle={updateModalHandle} updateActiveHandle={updateActiveHandle} deleteModalHandle={deleteModalHandle} loadUsers={loadUsers} usersResult={usersResult}/>
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


            {/*Start Delete Agent Modal*/}
            {
                openDelete &&  <DeleteAgent deleteModalHandle={deleteModalHandle} userId={userId} usersResult={usersResult}/>
            }
            {/*End Delete Agent Modal*/}
        </LayoutView>
    )
};

export default AgentView;