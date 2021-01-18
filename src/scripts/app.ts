import { ProjectInput } from "./ProjectInput.js";
import { ProjectList } from "./ProjectList.js";
import { ProjectState } from "./ProjectState.js";

export const projectState = ProjectState.getInstance();
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');