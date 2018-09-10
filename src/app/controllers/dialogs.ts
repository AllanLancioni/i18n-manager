import { remote } from 'electron';
import { appState } from '../models/app-state.model';

export async function getFolderPath() {
  return new Promise(async (res, rej) => {
    const paths = remote.dialog.showOpenDialog({properties: ['openDirectory']});
    if (paths instanceof Array && typeof paths[0] === 'string') {
      appState.folderPath = paths[0]
      res(await appState.getFilesInFolder());
    }
  }).catch(e => e);
}
