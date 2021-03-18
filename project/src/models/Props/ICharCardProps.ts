import {HTMLAttributes} from "react";
import {Char} from "../Char";

export interface ICharCardProps extends HTMLAttributes<HTMLDivElement>{
    char: Char
}
