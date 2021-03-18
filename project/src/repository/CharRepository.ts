import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import FavoritesRepository from "./FavoritesRepository";
import {CharActionResult} from "../models/ActionResult/CharActionResult";
import {Char} from "../models/Char";
import {CharData} from "../models/CharData";
import {WorldData} from "../models/WorldData";
import {World} from "../models/World";
import {WorldActionResult} from "../models/ActionResult/WorldActionResult";
import {FavoritesActionResult} from "../models/ActionResult/FavoritesActionResult";

const favoritesRepository = new FavoritesRepository();

export class CharRepository {
    public instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: "https://swapi.dev/api/",
            timeout: 1000
        });
    }

    public getWorld = async (url: string): Promise<WorldActionResult> => {
        return await axios.get(url)
            .then((response: AxiosResponse) => {
                const actionResult = new WorldActionResult();
                const data: WorldData = response.data;

                if (data) {
                    actionResult.isSuccess = true;
                    actionResult.result = new World(data);
                } else {
                    actionResult.isSuccess = false;
                    actionResult.message = "Не удалось получить модель данных персонажа.";
                }

                return actionResult;
            })
            .catch((error: AxiosError) => {
                const actionResult = new WorldActionResult();
                actionResult.isSuccess = false;
                actionResult.message = error.message;
                actionResult.error = error;
                return actionResult;
            });
    };

    public getFavorites = async (): Promise<FavoritesActionResult> => {
        const actionResult = new FavoritesActionResult();
        const favorites = favoritesRepository.favorites;

        for (const name of favorites) {
            const response = await this.getCharByName(name);
            if (response.isSuccess)
                actionResult.result.push(response.result);
        }

        actionResult.isSuccess = true;
        return actionResult;
    };

    public getCharByName = async (name: string): Promise<CharActionResult> => {
        return await this.instance
            .get(`people/?search=${name}`)
            .then((response: AxiosResponse) => {
                const actionResult = new CharActionResult();
                const charDataset: CharData[] = response.data.results;

                if (charDataset.length > 0) {
                    const favorites: string[] = favoritesRepository.favorites;
                    const charData: CharData = charDataset[0];
                    actionResult.isSuccess = true;
                    actionResult.result = this.parseCharDataToChar(charData, favorites);
                    console.info(`Load ${name} data: Success`);
                } else {
                    actionResult.isSuccess = false;
                    actionResult.result = null;
                    actionResult.message = "Character not found.";
                    console.error(`Failed to load ${name} data. Error: ${actionResult.message}`);
                }

                return actionResult;
            })
            .catch((error: AxiosError) => {
                const actionResult = new CharActionResult();
                actionResult.isSuccess = false;
                actionResult.message = error.message;
                actionResult.error = error;
                console.error(`Failed to load ${name} data. Error: ${actionResult.message}`);
                return actionResult;
            });
    };

    public getCharsByPage = async (pageNumber: number): Promise<Array<Char>> => {
        //todo ActionResult
        return await this.instance
            .get(`people/?page=${pageNumber}`)
            .then((response: AxiosResponse) => {
                const charDataset: CharData[] = response.data.results;
                const favorites: Array<string> = favoritesRepository.favorites;
                return charDataset.map((charData: CharData) => this.parseCharDataToChar(charData, favorites));
            })
            .catch((error: AxiosError) => {
                console.log(error);
                return [];
            });
    };

    private parseCharDataToChar = (charData: CharData, favorites: Array<string>): Char => {
        charData.isFavorite = favorites.some(person => person === charData.name);
        return new Char(charData);
    };
}

export default CharRepository;
