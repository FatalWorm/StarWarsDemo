import {Char} from "../Char";
import {Dispatch} from "react";
import {IState} from "./IState";

export class CharSelectedList implements IState<Char> {
    set: Dispatch<Char[]>;
    value: Char[];

    constructor(hook: [Char[], Dispatch<Char[]>]) {
        this.value = hook[0];
        this.set = hook[1];
    }
}
