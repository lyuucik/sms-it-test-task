import fs from "fs";
import FileSystem from "./intefaces/FileSystem";
import path from "path";
import { PathNotExistError } from "./errors/errors";

export default class RealFileSystem implements FileSystem {
  exists(filePath: string): boolean {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      return false;
    }
  }

  getContent(dirPath: string): { folders: string[]; files: string[] } {
    if (!this.exists(dirPath)) {
      throw new PathNotExistError(`${dirPath}`);
    }

    try {
      const items = fs.readdirSync(dirPath);
      const folders: string[] = [];
      const files: string[] = [];

      items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          folders.push(item);
        } else if (stat.isFile()) {
          files.push(item);
        }
      });

      return { folders, files };
    } catch (error) {
      console.error(`Ошибка при чтении папки: ${dirPath}`, error);
      return { folders: [], files: [] };
    }
  }
}