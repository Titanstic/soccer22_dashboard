import LayoutView from "../LayoutView";
import {useContext, useEffect} from "react";
import NavContext from "../../context/NavContext";
import MatchData from "../../component/match/MatchData";

const MatchListView = () => {
    const {setNavActive, setMainNav} = useContext(NavContext);

    // Start UseEffect
    // for nav link
    useEffect(() => {
        setNavActive("matchlist");
        setMainNav("matches");
    })
    // End UseEffect


    return (
        <LayoutView>
            {/*Start match List Data*/}
            <MatchData/>
            {/*End match List Data*/}
        </LayoutView>
    )
};

export default MatchListView;