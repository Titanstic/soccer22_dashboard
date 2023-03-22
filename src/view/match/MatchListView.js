import LayoutView from "../LayoutView";
import {useContext, useEffect, useState} from "react";
import NavContext from "../../context/NavContext";
import MatchData from "../../component/match/MatchData";
import CreateMatch from "../../component/match/CreateMatch";
import {useLazyQuery} from "@apollo/client";
import {MATCH} from "../../gql/match";
import EndMach from "../../component/match/EndMach";
import CreateSecondMatch from "../../component/match/CreateSecondMatch";

const MatchListView = () => {
    // useState
    const [openCreate, setOpenCreate] = useState(false);
    const [openCreateSecond, setOpenCreateSecond] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [matchId, setMatchId] = useState(null);
    const [matchData, setMatchData] = useState(null);
    // useContext
    const {setNavActive, setMainNav} = useContext(NavContext);
    // useLazyQuery
    const [loadMatch, matchResult] = useLazyQuery(MATCH);

    // Start UseEffect
    // for nav link
    useEffect(() => {
        setNavActive("matchlist");
        setMainNav("matches");
    })
    // End UseEffect

    // Start Function
    const addModalHandle = () => {
        setOpenCreate(!openCreate);
    }

    const addSecondModalHandle = (data) => {
        setOpenCreateSecond(!openCreateSecond);
        setMatchData(data);
    }

    const endModalHandle = (id) => {
        setMatchId(id);
        setOpenEnd(!openEnd);
    }
    // End Function

    return (
        <LayoutView>
            {/*Start match List Data*/}
            <MatchData addModalHandle={addModalHandle} addSecondModalHandle={addSecondModalHandle} endModalHandle={endModalHandle} loadMatch={loadMatch} matchResult={matchResult}/>
            {/*End match List Data*/}

            {/*Start Create Match Data*/}
            {
                openCreate && <CreateMatch  addModalHandle={addModalHandle} matchResult={matchResult}/>
            }
            {/*End Create Match Data*/}

            {/*Start Create Second */}
            {
                openCreateSecond && <CreateSecondMatch addSecondModalHandle={addSecondModalHandle} matchData={matchData} matchResult={matchResult}/>
            }
            {/*End Create Second */}

            {/*Start End Match Data*/}
            {
                openEnd && <EndMach endModalHandle={endModalHandle} matchId={matchId} matchResult={matchResult}/>
            }
            {/*End Match Data*/}
        </LayoutView>
    )
};

export default MatchListView;