import {IWorld} from "./IWorld";
import {WorldData} from "./WorldData";

export class World implements IWorld{
    public climate: string;
    public diameter: number;
    public gravity: number;
    public name: string;
    public periods: { rotation: number; orbital: number };
    public population: string;
    public surfaceWater: string;
    public terrain: string;

    constructor(data: WorldData) {
        this.climate = data.climate;
        this.diameter = parseInt(data.diameter);
        this.gravity = parseInt(data.gravity);
        this.name = data.name;
        this.periods = {
            orbital: parseInt(data.orbital_period),
            rotation: parseInt(data.rotation_period)
        };
        this.population = data.population;
        this.surfaceWater = data.surface_water;
        this.terrain = data.terrain;
    }
}
