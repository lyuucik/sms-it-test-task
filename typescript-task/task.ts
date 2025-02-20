import FileSystem from './FileSystem';
import findJsFolders from './findJsFolders';
import MockFileSystem from './MockFileSystem';
import RealFileSystem from './RealFileSystem';
import splitIntoChunks from './splitIntoChunks';

const data = {
  'A': { folders: ['A1-1', 'A1-2', 'A1-3'], files: [] },
  'A/A1-1': { folders: ['A2-1'], files: [] },
  'A/A1-1/A2-1': { folders: [], files: ['file1.txt', 'file2.js'] },
  'A/A1-2': { folders: [], files: ['file3.js', 'file4.js', 'file5.js'] },
  'A/A1-3': { folders: [], files: ['readme.txt'] },
  'B': { folders: ['B1-2', 'B1-3', 'B1-4'], files: [] },
  'B/B1-2': { folders: [], files: ['file11.js', 'file12.js', 'file13.js'] },
  'B/B1-3': { folders: [], files: ['file15.js'] },
  'B/B1-4': { folders: [], files: ['file8.js', 'readme.txt'] },
};

const mockFileSystem = new MockFileSystem(data);
const realFileSystem = new RealFileSystem();
const folders = findJsFolders(['A', 'B'], mockFileSystem);
const N = 2;
const chunks = splitIntoChunks(folders, N);



