import {AxiosError} from "axios";
import {Char} from "../Char";
import {IActionResult} from "./IActionResult";

export class CharActionResult implements IActionResult<Char, AxiosError> {
    isSuccess: boolean;
    error: AxiosError | null;
    message: string | null;
    result: Char | null = null;
}
