import FileSystem from './intefaces/FileSystem';
import findJsFolders from './findJsFolders';
import MockFileSystem from './MockFileSystem';
import splitIntoChunks from './splitIntoChunks';

const fileSystem: FileSystem = new MockFileSystem();
const folders = findJsFolders(['A', 'B'], fileSystem);
const N = 2;
const chunks = splitIntoChunks(folders, N);

console.log(chunks);



