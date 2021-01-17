class ProjectList {

    /** The template element which we want to display. */
    templateElement: HTMLTemplateElement;


    /** The element which appends the template. */
    hostElement: HTMLDivElement;


    /** Element which is inserted into @see hostElement */
    element: HTMLElement;

    constructor(private type: 'active' | 'finished') {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-list');
        this.hostElement = <HTMLDivElement>document.getElementById('app');

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLElement>importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;

        this.attach();
        this.renderContent();
    }


    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }


    /** Displays the template. */
    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}

class ProjectInput {

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
    private configure() {
        this.element.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const userInputs = this.gatherUserInput();
            if (Array.isArray(userInputs)) {
                const [title, descr, people] = userInputs;
                console.log(title, descr, people);
                this.clearInputs();
            }
        });
    }


    /** Clearing input fields. */
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }


    /** Displays the template. */
    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');


//#region Validation

interface Validatable {
    value: string | number,
    required?: boolean,
    maxLength?: number,
    minLength?: number,
    max?: number,
    min?: number
}

function validate(someInput: Validatable): boolean {
    let isValid = true;
    if (someInput.required) {
        isValid = isValid && someInput.value.toString().trim().length !== 0;
    }
    if (someInput.maxLength && typeof someInput.value === 'string') {
        isValid = isValid && someInput.value.trim().length <= someInput.maxLength;
    }
    if (someInput.minLength && typeof someInput.value === 'string') {
        isValid = isValid && someInput.value.trim().length >= someInput.minLength;
    }
    if (someInput.max && typeof someInput.value === 'number') {
        isValid = isValid && someInput.value <= someInput.max;
    }
    if (someInput.min && typeof someInput.value === 'number') {
        isValid = isValid && someInput.value >= someInput.min;
    }

    return isValid;
}

//#endregion