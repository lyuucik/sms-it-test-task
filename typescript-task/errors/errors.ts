export class PathNotExistError extends Error {
	constructor(path: string) {
		super(`Path "${path}" does not exist`);
	}
}