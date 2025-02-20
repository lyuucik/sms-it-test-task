import FileSystem from './intefaces/FileSystem';
import findJsFolders from './findJsFolders';
import RealFileSystem from './RealFileSystem';
import splitIntoChunks from './splitIntoChunks';

const fileSystem: FileSystem = new RealFileSystem();
const folders = findJsFolders(['example/A', 'example/B'], fileSystem);
const N = 2;
const chunks = splitIntoChunks(folders, N);

console.log(chunks);


