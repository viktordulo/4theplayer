import { RocketBase } from './rocketBase'
import {StarPort} from './starPort'

let starPort = new StarPort()

const rockets: RocketBase[] = starPort.getAllRockets()
let i: number = 1
// for (const rocket of rockets) {
//     console.log(`Prepare to the next launch ${i}:`)
//     rocket.launch()
//     i++
// }