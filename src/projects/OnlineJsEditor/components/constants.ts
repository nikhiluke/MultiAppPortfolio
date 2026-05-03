import { FileData } from "./types";

export const INITIAL_FILES: FileData[] = [
	{
		id: "1",
		name: "main.js",
		content: `
// Welcome to Online JS Editor by Nikhil Uke!

console.log("Hello, developer!");

const users = [
  { id: 1, name: "Nikhil Uke", role: "Developer" },
];

console.table(users);

function greet(name) {
  return "Hello " + name;
}

console.log(greet("Nikhil"));`,
	},
	{
		id: "2",
		name: "utils.js",
		content: `		
// Utility functions
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

console.info("Utils loaded!");`,
	},
];
