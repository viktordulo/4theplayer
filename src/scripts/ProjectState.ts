import { Project, ProjectStatus } from "./Project.js";
import { State } from "./State.js";


// Custom type for listener functions.
export type Listener<T> = (items: T[]) => void;


/** The class which control the projects (adding, listening for changes). */
export class ProjectState extends State<Project> {

    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance(): ProjectState {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }


    /** Adding a new project to the app. */
    addProject(title: string, description: string, numOfPeople: number): void {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}