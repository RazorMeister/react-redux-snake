import {useDispatch, useSelector} from "react-redux";
import Cell from "./Cell";
import {useCallback, useEffect} from "react";
import {move, reset, tick} from "../store/actionCreators";
import Stats from "./Stats";
import {Direction, RootState} from "../store/state";

const ARROW_RIGHT = 39;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

function Board() {
    const boardSize = useSelector((state: RootState) => state.boardSize);
    const gameOver = useSelector((state: RootState) => state.gameOver);
    const pause = useSelector((state: RootState) => state.pause);
    const dispatch = useDispatch();

    const handleKeyPress = useCallback((event: any) => {
        switch (event.keyCode) {
            case ARROW_RIGHT:
                dispatch(move(Direction.RIGHT));
                break;
            case ARROW_LEFT:
                dispatch(move(Direction.LEFT));
                break;
            case ARROW_UP:
                dispatch(move(Direction.UP));
                break;
            case ARROW_DOWN:
                dispatch(move(Direction.DOWN));
                break;
            default:
                break;
        }
    }, [dispatch]);

    useEffect(() => document.addEventListener("keydown", handleKeyPress), [handleKeyPress]);
    useEffect((): any => setInterval(() => dispatch(tick()), 150), [dispatch]);

    const renderRow = (rowNumber: number) => {
        return Array.from({length: boardSize}, (x, i) => i).map(index => {
            return (
                <Cell X={rowNumber} Y={index} key={`${rowNumber}-${index}`}/>
            )
        })
    }

    const renderCells = () => {
        return Array.from({length: boardSize}, (x, i) => i).map(index => {
          return (
              <div className="row" key={index}>
                  { renderRow(index) }
              </div>
          )
        })
    };

    return (
        <div className="board-wrapper" >
            <div className="board-title">
                <h1>Redux Snake Game</h1>
                <h4 className={`pause-info ${pause ? "" : "hide"}`}>Press any arrow to begin</h4>
            </div>
            <div className="board">
                { renderCells() }
            </div>

            <Stats/>

            {
                gameOver &&
                <div className="game-over-modal">
                    <div className="game-over-modal-content">
                        <h1>GAME OVER</h1>
                        <button onClick={() => dispatch(reset())}>Play again</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Board;