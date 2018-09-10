import { remote } from 'electron';
import { TranslationFile } from './translation-file.model';
import { TranslationFileItem } from './translation-file-structure.model';
import { languages } from './languages.model';
import { toggleViewEvent } from '../controllers/events';
import * as fs from 'fs';

class AppState {

  static instance: AppState = AppState.instance || new AppState();

  public folderPath: string = null;
  public activeTranslationStructure: TranslationFile;
  public actualItemToEdit: TranslationFileItem = null;
  public actualView: 'TRANSLATE_PANEL' | 'CREATE_ITEM' = 'TRANSLATE_PANEL';
  public readonly languages: string[] = languages;

  constructor() {
    const that = this;
    remote.globalShortcut.register('CmdOrCtrl+N', () => {
      this.actualView = 'CREATE_ITEM';
      console.log(this === that, this.actualView)
      toggleViewEvent.emit({ view: this.actualView, params: { initialName: 'aaa', that: this }})
    })
  }

  async getFilesInFolder() {
    try {
      const files = fs.readdirSync(this.folderPath).filter(x => /.+\.json$/.test(x));
      this.languages.push(...files.map(x => x.split('.json')[0]));
      this.activeTranslationStructure = TranslationFile.openTranslationFile(files, this.folderPath, this);
      console.log(this.activeTranslationStructure);
      return files;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

}

export const appState = AppState.instance;
