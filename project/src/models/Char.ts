import {IChar} from "./IChar";
import {CharData} from "./CharData";

export class Char implements IChar {
    public id: number;
    public name: string;
    public isFavorite: boolean;
    public imageUrl: string;
    public homeWorld: string;

    constructor(data: CharData) {
        this.id = this.getId(data.url);
        this.name = data.name;
        this.isFavorite = data.isFavorite;
        this.imageUrl = `https://starwars-visualguide.com/assets/img/characters/${this.id}.jpg`;
        this.homeWorld = data.homeworld;
    }

    private getId = (url: string): number => {
        const arr = url.split("/");
        return parseInt(arr[arr.length - 2]);
    };
}
