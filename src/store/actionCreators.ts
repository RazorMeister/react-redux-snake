import {Direction} from "./state";

export function move(direction: Direction) {
    return {
        type: "snake/move",
        payload: direction
    }
}

export function tick(payload: any = null) {
    return {
        type: "snake/tick",
        payload: payload
    }
}

export function reset(payload: any = null) {
    return {
        type: "snake/reset",
        payload: payload
    }
}