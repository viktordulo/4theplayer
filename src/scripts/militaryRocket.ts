import { MilitaryRocketI } from './interfaces/militaryRocketI';
import { RocketBase } from "./rocketBase"

export class MilitaryRocket extends RocketBase implements MilitaryRocketI {
    name: string = 'TOP SECRET'
    launch() {
        console.log('TOP SECRET')
    }
}