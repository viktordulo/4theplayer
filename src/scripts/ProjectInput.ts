import { projectState } from "./app.js";
import { Component } from "./Component.js";
import { Validatable, validate } from "./Validation.js";

/** Class which is used for inputs. */
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

    /** The title input.  */
    titleInputElement: HTMLInputElement;


    /** The description input. */
    descriptionInputElement: HTMLInputElement;


    /** The people input. */
    peopleInputElement: HTMLInputElement;


    constructor() {

        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

        this.configure();
    }


    /** Receive the inputs when button pressed. */
    configure(): void {
        this.element.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const userInputs = this.gatherUserInput();
            if (Array.isArray(userInputs)) {
                const [title, descr, people] = userInputs;
                projectState.addProject(title, descr, people);
                this.clearInputs();
            }
        });
    }


    renderContent(): void {};


    /** Gather the inputs values. */
    private gatherUserInput(): [string, string, number] | void {
        const titleInput = this.titleInputElement.value;
        const descriptionInput = this.descriptionInputElement.value;
        const peopleInput = this.peopleInputElement.value;

        const titleValidate: Validatable = {
            value: titleInput,
            required: true
        }

        const descriptionValidate: Validatable = {
            value: descriptionInput,
            required: true,
            minLength: 5,
            maxLength: 100
        }

        const peopleValidate: Validatable = {
            value: +peopleInput,
            required: true,
            min: 1,
            max: 10
        }

        if (validate(titleValidate) && validate(descriptionValidate) && validate(peopleValidate)) {
            return [titleInput, descriptionInput, +peopleInput];
        } else {
            alert('Invalid inputs. Try again!');
        }
    }


    /** Clearing input fields. */
    private clearInputs(): void {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

}