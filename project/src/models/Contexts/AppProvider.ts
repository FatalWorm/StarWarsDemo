import {IAppProvider} from "./IAppProvider";
import {CharList} from "./CharList";
import {CharSelectedList} from "./CharSelectedList";
import {Char} from "../Char";
import {Dispatch} from "react";

const defaultHook: [Char[], Dispatch<Char[]>] = [[], (): void => {
    throw Error("You forget AppContextProvider");
}];

export class AppProvider implements IAppProvider {
    charList: CharList;
    charSelectedList: CharSelectedList;

    constructor(
        charList: CharList = new CharList(defaultHook),
        charSelectedList: CharSelectedList = new CharSelectedList(defaultHook)
    ) {
        this.charList = charList;
        this.charSelectedList = charSelectedList;
    }
}
