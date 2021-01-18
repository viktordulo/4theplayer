import { projectState } from "./app.js";

/** Class which displays the list of the projects and their content. */
export class ProjectList {

    /** The template element which we want to display. */
    templateElement: HTMLTemplateElement;


    /** The element which appends the template. */
    hostElement: HTMLDivElement;


    /** Element which is inserted into @see hostElement */
    element: HTMLElement;


    assignedProjects: any[] = [];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-list');
        this.hostElement = <HTMLDivElement>document.getElementById('app');

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLElement>importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }


    private renderProjects(): void {
        const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`);
        for (const project of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            listEl.appendChild(listItem);
        }
    }


    private renderContent(): void {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }


    /** Displays the template. */
    private attach(): void {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}