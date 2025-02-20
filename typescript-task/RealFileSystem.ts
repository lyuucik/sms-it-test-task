import FileSystem from "./FileSystem";

export default class RealFileSystem implements FileSystem {
  exists(filePath: string): boolean {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      console.error(`Ошибка при проверке существования пути: ${filePath}`, error);
      return false;
    }
  }

  getContent(dirPath: string): { folders: string[]; files: string[] } {
    if (!this.exists(dirPath)) {
      throw new Error(`Папка не существует: ${dirPath}`);
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