import {IActionResult} from "./IActionResult";
import {Char} from "../Char";
import {AxiosError} from "axios";

export class FavoritesActionResult implements IActionResult<Char[], AxiosError>{
    error: AxiosError | null;
    isSuccess: boolean;
    message: string | null;
    result: Char[] | null = [];

}
