import {useSelector} from "react-redux";
import {RootState} from "../store/state";

function Stats() {
    const score = useSelector((state: RootState) => state.score);
    const bestScore = useSelector((state: RootState) => state.bestScore);

    return (
        <div className="stats">
            <h1>Score: { score }</h1>
            <h2>Best score: { bestScore }</h2>
        </div>
    )
}

export default Stats;