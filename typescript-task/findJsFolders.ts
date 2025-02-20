import path from "path";
import FileSystem from "./FileSystem";
import JsFolder from "./JsFolder";

export default function findJsFolders(
  rootPaths: string[],
  fileSystem: FileSystem
): JsFolder[] {
  const results: JsFolder[] = [];

  function traverse(currentPath: string) {
    try {
      const content = fileSystem.getContent(currentPath);

      if (content.files.length > 0) {
        const jsCount = content.files.filter(f => f.endsWith('.js')).length;
        if (jsCount > 0) {
          results.push({ path: currentPath, count: jsCount });
        }
      } else {
        content.folders.forEach(folder => {
          traverse(path.join(currentPath, folder));
        });
      }
    } catch (error) {
      console.error(`Ошибка при обходе папки: ${currentPath}`, error);
    }
  }

  rootPaths.forEach(root => {
    if (fileSystem.exists(root)) {
      traverse(root);
    } else {
      console.error(`Корневая папка не существует: ${root}`);
    }
  });

  return results;
}