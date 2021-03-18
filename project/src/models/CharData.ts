import {ICharData} from "./ICharData";

export class CharData implements ICharData {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    films: Array<any>;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    isFavorite: boolean;
    mass: string;
    name: string;
    skin_color: string;
    species: Array<any>;
    starships: Array<any>;
    url: string;
    vehicles: Array<any>;
}
