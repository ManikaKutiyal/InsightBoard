export function generateTasks(prompt) {
return [
"Design UI",
"Build components",
"Implement Kanban board",
"Test and deploy",
];
}


export function sprintPlan() {
return `Day 1: Design UI\nDay 2: Development\nDay 3: Testing & deploy`;
}


export function summarize(tasks) {
const total = tasks.length;
const done = tasks.filter(t => t.status === "done").length;
return `You have ${total} tasks. ${done} completed. Project is ${Math.round((done / total) * 100)}% done.`;
}