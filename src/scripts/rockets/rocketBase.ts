import { RocketBaseI } from "./interfaces/rocketBaseI"

export abstract class RocketBase implements RocketBaseI{

    abstract name: string

    launch() {
        console.log(`The ${this.name} launched at ${Date()}`)
    }
}