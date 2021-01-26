
// Component Base class

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {

    /** The template element which we want to display. */
    templateElement: HTMLTemplateElement;


    /** The element which appends the template. */
    hostElement: T;


    /** Element which is inserted into @see hostElement */
    element: U;


    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);
        this.hostElement = <T>document.getElementById(hostElementId);

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <U>importedNode.firstElementChild;

        if (newElementId) this.element.id = newElementId;

        this.attach(insertAtStart);
    }


    /** Displays the template. */
    private attach(insertAtStart: boolean): void {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}