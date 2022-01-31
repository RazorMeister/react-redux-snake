import {useSelector} from "react-redux";
import {RootState} from "../store/state";

interface CellProps {
    X: number,
    Y: number
}

function Cell(props: CellProps) {
    const snakePoints = useSelector((state: RootState) => state.snake.points);
    const snakeHead = useSelector((state: RootState) => state.snake.head);
    const fruitPos = useSelector((state: RootState) => state.fruitPosition);
    const fruitType = useSelector((state: RootState) => state.fruitType);
    const boardSize = useSelector((state: RootState) => state.boardSize)

    const isSnake = () => snakePoints.some((index: number) => index === props.X + boardSize * props.Y);
    const isSnakeHead = () => snakeHead === props.X + boardSize * props.Y;
    const isFruit = () => fruitPos === props.X + boardSize * props.Y;

    const getClasses = () => {
        const classes = ['cell--content'];
        if (isSnake()) classes.push('snake');
        if (isSnakeHead()) classes.push('snake--head');
        if (isFruit()) classes.push(fruitType);

        return classes.join(' ');
    }

    return (
        <div className={`cell`}>
            <div className={getClasses()}/>
        </div>
    )
}

export default Cell;