import ISwapiCharacterData from "./ISwapiCharacterData";

export interface ICharData extends ISwapiCharacterData {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    films: Array<any>;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: Array<any>;
    starships: Array<any>;
    url: string;
    vehicles: Array<any>;
    isFavorite: boolean;    // is in the favorites list or not
}
