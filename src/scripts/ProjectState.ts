/** The class which control the projects (adding, listening for changes). */
export class ProjectState {
    private listeners: Function[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor() {}

    static getInstance(): ProjectState {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }


    /** Adding a new project to the app. */
    addProject(title: string, description: string, numOfPeople: number): void {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice(-1));
        }
    }


    addListener(listenerFn: Function): void {
        this.listeners.push(listenerFn);
    }
}