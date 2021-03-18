import {Dispatch} from "react";

export interface IState<T> {
    value: T[];
    set: Dispatch<T[]>;
}
