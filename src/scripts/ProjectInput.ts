import { projectState } from "./app.js";
import { Validatable, validate } from "./Validation.js";

/** Class which is used for inputs. */
export class ProjectInput {

    /** The template element which we want to display. */
    templateElement: HTMLTemplateElement;


    /** The element which appends the template. */
    hostElement: HTMLDivElement;


    /** Element which is inserted into @see hostElement */
    element: HTMLFormElement;


    /** The title input.  */
    titleInputElement: HTMLInputElement;


    /** The description input. */
    descriptionInputElement: HTMLInputElement;


    /** The people input. */
    peopleInputElement: HTMLInputElement;


    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input');
        this.hostElement = <HTMLDivElement>document.getElementById('app');

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLFormElement>importedNode.firstElementChild;
        this.element.id = 'user-input';

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

        this.configure();
        this.attach();
    }


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


    /** Receive the inputs when button pressed. */
    private configure(): void {
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


    /** Clearing input fields. */
    private clearInputs(): void {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }


    /** Displays the template. */
    private attach(): void {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}