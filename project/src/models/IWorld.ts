export interface IWorld {
    name: string;
    periods: { rotation: number, orbital: number };
    diameter: number;
    climate: string;
    gravity: number;
    terrain: string;
    surfaceWater: string;
    population: string;
}
