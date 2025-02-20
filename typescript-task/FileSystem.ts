export default interface FileSystem {
  exists(path: string): boolean;
  getContent(path: string): { folders: string[]; files: string[] };
}