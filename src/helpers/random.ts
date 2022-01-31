import {FruitType} from "../store/state";

const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPoint(boardSize: number, withoutPoints: number[]) {
    const rndArr = [];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const num = i + boardSize * j;
            if (!withoutPoints.includes(num)) {
                rndArr.push(num);
            }
        }
    }

    return rndArr[getRandomIntInclusive(0, rndArr.length - 1)];
}

export function randomFruit(): FruitType {
    const rnd = getRandomIntInclusive(0, 100);
    return rnd < 20 ? FruitType.BLUEBERRY : FruitType.APPLE;
}