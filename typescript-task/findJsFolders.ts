import path from 'path';
import FileSystem from "./intefaces/FileSystem";
import JsFolder from "./intefaces/JsFolder";
import { PathNotExistError } from "./errors/errors";

export default function findJsFolders(
  rootPaths: string[],
  fileSystem: FileSystem
): JsFolder[] {
  const results: JsFolder[] = [];
  rootPaths.forEach(root => {
    if (fileSystem.exists(root)) {
      traverse(root, fileSystem, results);
    } else {
      throw new PathNotExistError(root);
    }
  });

  return results;
}

function traverse(currentPath: string, fileSystem: FileSystem, results: JsFolder[]) {
  const content = fileSystem.getContent(currentPath);
  if (content.folders.length == 0 && content.files.length > 0) {
    const allJsFiles = content.files.every(file => file.endsWith('.js'));
    if (allJsFiles) {
      results.push({ path: currentPath, count: content.files.length });
    }
  }
  content.folders.forEach(folder => {
    traverse(path.join(currentPath, folder), fileSystem, results);
  });
}