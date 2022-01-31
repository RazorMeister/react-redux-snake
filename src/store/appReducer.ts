import {randomFruit, randomPoint} from "../helpers/random";
import {Direction, FruitType, getInitialState, RootState} from "./state";

export const initialState: RootState = getInitialState();

const getNewState = (state: RootState, direction: any = null) => {
    let pointOffset: number = 0;

    // Game over
    if (state.gameOver) return state;

    // Change direction on key press
    if (direction !== null) {
        if (state.moveDirection + direction === 0) return {
            ...state,
            pause: false
        };

        return {
            ...state,
            pause: false,
            moveDirection: direction
        }
    }

    // Game paused
    if (state.pause) return state;

    if (state.moveDirection + state.lastMoveDirection === 0)
        state.moveDirection = state.lastMoveDirection;

    switch (state.moveDirection) {
        case Direction.RIGHT:
            pointOffset = 1;
            break;
        case Direction.LEFT:
            pointOffset = -1;
            break;
        case Direction.UP:
            pointOffset = -state.boardSize;
            break;
        case Direction.DOWN:
            pointOffset = state.boardSize;
            break;
    }

    const newHead = state.snake.head + pointOffset;

    const oldHeadX: number = state.snake.head - (Math.floor(state.snake.head / state.boardSize) * state.boardSize);
    let scored = state.scored;

    const newPoints = [...state.snake.points];

    newPoints.push(newHead);

    // Snake bites wall or himself
    if (
        newHead < 0 // wall up
        || newHead > (state.boardSize - 1) + (state.boardSize - 1) * state.boardSize // wall down
        || (Math.abs(state.moveDirection) === 1 && (
            oldHeadX + pointOffset >= state.boardSize // wall right
            || oldHeadX + pointOffset < 0 // wall left
        ))
        || (newPoints.slice(0, -1).find((point: number) => point === newHead))
    ) {
        return {
            ...state,
            bestScore: state.score > state.bestScore ? state.score : state.bestScore,
            gameOver: true
        }
    }

    if (!scored)
        newPoints.shift();

    let score = state.score;
    let fruitPos = state.fruitPosition;
    let fruitType: FruitType = state.fruitType;

    if (newHead === fruitPos) {
        score += (fruitType === FruitType.BLUEBERRY ? 2 : 1);
        fruitPos = randomPoint(state.boardSize, [fruitPos, ...newPoints, state.snake.tail]);
        fruitType = randomFruit();
        scored = true;
    } else
        scored = false;

    return {
        ...state,
        score: score,
        fruitPosition: fruitPos,
        fruitType: fruitType,
        scored: scored,
        lastMoveDirection: state.moveDirection,
        snake: {
            points: [...newPoints],
            head: newHead,
            tail: newPoints[0]
        }
    };
}

export default function appReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case 'snake/move':
            return getNewState(state, action.payload);
        case 'snake/tick':
            return getNewState(state);
        case 'snake/reset':
            return {
                ...getInitialState(),
                bestScore: state.bestScore
            }
        default:
            return state;
    }
}