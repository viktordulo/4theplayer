import { Project, ProjectStatus } from './Project.js';
import { projectState } from "./app.js";
import { Component } from './Component.js';

/** Class which displays the list of the projects and their content. */
export class ProjectList extends Component<HTMLDivElement, HTMLElement> {

    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {

        super('project-list', 'app', false, `${type}-projects`);

        this.configure();
        this.renderContent();
    }


    configure(): void {
        projectState.addListener((projects: Project[]) => {
            const relevantProjects: Project[] = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }


    renderContent(): void {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }


    private renderProjects(): void {
        const listEl: HTMLUListElement = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const project of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            listEl.appendChild(listItem);
        }
    }

}