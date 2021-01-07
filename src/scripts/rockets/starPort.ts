import { NasaRocket } from './nasaRocket';
import { MilitaryRocket } from './militaryRocket';
import { SpaceXRocket } from './spaceXRocket';
import { RocketBase } from './rocketBase';


export class StarPort {
    getAllRockets() {
        const rockets: Array<RocketBase> = []
        let num: number
        for (let i = 0; i < 10; i++) {
            num = Math.floor(Math.random() * (3 - 1 + 1)) + 1
            // console.log(num);
            
            switch (num) {
                case 1:
                    rockets[i] = new SpaceXRocket()
                    break
                case 2:
                    rockets[i] = new MilitaryRocket()
                    break
                case 3:
                    rockets[i] = new NasaRocket()
                    break
                default:
                    break
            }
        }
        return rockets
    }
}