import { TranslationFile } from './translation-file.model';
import { TranslationFileItem } from './translation-file-structure.model';
import { languages } from './languages.model';
import { appStateView , toggleViewEvent} from '../controllers/events';
import { remote } from 'electron';
import { promisify } from 'util';
import * as fs from 'fs';

const writeFile = promisify(fs.writeFile);

class AppState {

  static instance: AppState = new AppState();

  public folderPath: string = null;
  public activeTranslationStructure: TranslationFile;
  public actualItemToEdit: TranslationFileItem = null;
  public readonly languages: string[] = languages;
  private _actualView: appStateView = appStateView.TRANSLATE_PANEL;

  get actualView() {
    return this._actualView;
  }
  set actualView(newView: appStateView | { view: appStateView, params?: any }) {
    if (typeof newView !== 'object') {
      newView = { view: newView };
    }

    switch (newView.view) {
      case appStateView.CREATE_ITEM:
        this.actualItemToEdit = null;
        break;
    }

    this._actualView = newView.view;
    toggleViewEvent.emit(newView);
  }

  constructor() {
    /*
    remote.globalShortcut.register('CmdOrCtrl+N', () => {
      this.actualView = 'CREATE_ITEM';
      console.log(this === that, this.actualView)
      toggleViewEvent.emit({ view: this.actualView, params: { initialName: 'aaa', that: this }})
    })
    */
  }

  async getFilesInFolder() {
    try {
      const files = fs.readdirSync(this.folderPath).filter(x => /.+\.json$/.test(x));
      this.languages.push(...files.map(x => x.split('.json')[0]));
      this.activeTranslationStructure = TranslationFile.openTranslationFile(files, this.folderPath, this);
      // console.log(this.activeTranslationStructure);
      return files;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async save() {

    try {

      const files: Map<string, object> = this.activeTranslationStructure.structure.toJSONMap();
      const path = await remote.dialog.showOpenDialog({
        title: 'Save JSON files',
        defaultPath: this.folderPath,
        properties: ['openDirectory']
      });

      if (!path) {
        return;
      }

      const promises = [];
      for (const [key, value] of Array.from(files)) {
        const stringValue = JSON.stringify(value, null, 2);
        promises.push(new Promise((res, rej) => {
          fs.writeFile(`${path}/${key}.json`, JSON.stringify(value, null, 2), err => {
            if (err) { return rej(err); }
            console.log('save!');
            res({key, stringValue});
          });
        }));
      }

      return await Promise.all(promises);

    } catch (e) {
      console.error(e);
      return null;
    }
  }

}

export const appState = AppState.instance;
