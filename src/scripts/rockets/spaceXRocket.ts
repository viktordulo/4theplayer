import { SpaceXRocketI } from "./interfaces/spaceXRocketI"
import { RocketBase } from "./rocketBase"

export class SpaceXRocket extends RocketBase implements SpaceXRocketI {
    name: string = 'SpaceX'
}