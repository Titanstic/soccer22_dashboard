import LayoutView from "../LayoutView";
import {useContext, useEffect, useState} from "react";
import NavContext from "../../context/NavContext";
import MatchData from "../../component/match/MatchData";
import CreateMatch from "../../component/match/CreateMatch";
import {useLazyQuery} from "@apollo/client";
import {MATCH} from "../../gql/match";
import EndMach from "../../component/match/EndMach";
import CreateSecondMatch from "../../component/match/CreateSecondMatch";
import CalculateBetSlips from "../../component/match/CalculateBetSlips";

const MatchListView = () => {
    // useState
    const [openCreate, setOpenCreate] = useState(false);
    const [openCreateSecond, setOpenCreateSecond] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [openCalBet, setOpenCalBet] = useState(false);
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

    const calBetSlipsModal = (id) => {
        setMatchId(id);
        setOpenCalBet(!openCalBet);
    }
    // End Function

    return (
        <LayoutView>
            {/*Start match List Data*/}
            <MatchData addModalHandle={addModalHandle} addSecondModalHandle={addSecondModalHandle} endModalHandle={endModalHandle} calBetSlipsModal={calBetSlipsModal} loadMatch={loadMatch} matchResult={matchResult}/>
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

            {/*Start End Match*/}
            {
                openEnd && <EndMach endModalHandle={endModalHandle} matchId={matchId} matchResult={matchResult}/>
            }
            {/*End Match*/}

            {
                openCalBet && <CalculateBetSlips calBetSlipsModal={calBetSlipsModal} matchId={matchId} matchResult={matchResult}/>
            }
        </LayoutView>
    )
};

export default MatchListView;