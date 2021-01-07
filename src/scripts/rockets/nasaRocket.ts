import { NasaRocketI } from './interfaces/nasaRocketI';
import { RocketBase } from "./rocketBase"

export class NasaRocket extends RocketBase implements NasaRocketI {
    name: string = 'NASA'
}