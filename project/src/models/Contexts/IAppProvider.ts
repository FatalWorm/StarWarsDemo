import {CharList} from "./CharList";
import {CharSelectedList} from "./CharSelectedList";

export interface IAppProvider {
    charList: CharList;
    charSelectedList: CharSelectedList;
}
