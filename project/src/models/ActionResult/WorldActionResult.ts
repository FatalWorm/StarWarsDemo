import {AxiosError} from "axios";
import {World} from "../World";
import {IActionResult} from "./IActionResult";

export class WorldActionResult implements IActionResult<World, AxiosError>{
    public error: AxiosError | null;
    public isSuccess: boolean;
    public message: string | null;
    public result: World | null;
}
