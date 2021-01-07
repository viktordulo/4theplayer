interface Visible extends Touchable {
    color: string;
    height: number;
    width: number;
    alive: boolean;
}

type Touchable = {
    weight: number;
}

class Cat implements Visible{
    color = 'black';
    height = 40;
    width = 20;
    alive = true;
    weight = 10;
}

class Human {
    constructor(public age: number, protected skin: string = 'white') {
    }
}

class Person extends Human {
    constructor(protected name: string) {
        super(25);
    }
    greeting(): void {
        console.log('Hello, my name is ' + this.name);
    }
}

class Man extends Person {
    height: number = 182;
}

const citizen = new Man('Victor');
citizen.greeting();
console.log(`I'm ${citizen.age} year old. My dick is ${citizen.height} cm`);