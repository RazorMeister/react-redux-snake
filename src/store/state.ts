import { randomPoint } from "../helpers/random";

export enum Direction {
    RIGHT = 1,
    LEFT = -1,
    UP = 2,
    DOWN = -2
}

export interface Snake {
    points: number[],
    head: number,
    tail: number
}

export enum FruitType {
    APPLE = 'apple',
    BLUEBERRY = 'blueberry'
}

export interface RootState {
    snake: Snake,
    moveDirection: Direction,
    lastMoveDirection: Direction,
    boardSize: number,
    gameOver: boolean,
    score: number,
    bestScore: number,
    fruitPosition: number,
    fruitType: FruitType,
    scored: boolean,
    pause: boolean
}

export function getInitialState() {
    const initialState: RootState = {
        boardSize: 20,
        moveDirection: Direction.RIGHT,
        snake: {
            points: [],
            head: 207,
            tail: 205
        },
        gameOver: false,
        score: 0,
        bestScore: 0,
        fruitPosition: randomPoint(20, [205, 206, 207]),
        fruitType: FruitType.APPLE,
        scored: false,
        pause: true,
        lastMoveDirection: Direction.RIGHT
    };

    initialState.snake.points = [
        205,
        206,
        207,
    ];

    return initialState;
}