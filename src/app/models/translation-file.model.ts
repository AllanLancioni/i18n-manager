import { TranslationFileStructure, TranslationFileItem } from './translation-file-structure.model';
import { flatten, uniq } from 'lodash';
import { languages } from './languages.model';
import * as fs from 'fs';

export class TranslationFile {

  public sortLanguagesFunction: Function = (a, b) => a > b ? 1 : (a < b ? -1: 0);

  private _structure: TranslationFileStructure;

  get structure () { return this._structure };

  constructor(structures: TranslationFileStructure | TranslationFileStructure[]) {
    if (!(structures instanceof Array)) {
      structures = [structures];
    }

    this._structure = TranslationFileStructure.mergeStructureValues(structures);
    this.structure.deepIterator(x => languages.forEach(l => {
      if (!x.values.find(v => v.key === l)) {
        x.values.push({key: l, value: ''});
      }
    }), 'forEach');

    return this;
  }

  static openTranslationFile(fileNames: string[], filePath: string, appState): TranslationFile {

    const structures: TranslationFileStructure[] = [];
    for (let fileName of fileNames) {
      try {
        let file: any = fs.readFileSync(`${ filePath }/${ fileName }`, 'utf8');
        if (file && typeof file === 'string') {
          file = JSON.parse(file);
        }
        structures.push(new TranslationFileStructure(file, '',  fileName.split('.json')[0]));
      } catch(e) {
        console.error(e);
        return null;
      }
    }
    return new TranslationFile(structures).sortLanguages();
  }

  addByFullKey(fullKey: string): TranslationFileItem {
    const item = this.structure.addByFullKey(fullKey);
    this.sortLanguages();
    return item;
  }

  sortLanguages(): TranslationFile {
    this.structure.deepIterator(x => x.values.sort((a, b) => this.sortLanguagesFunction(a.key, b.key)), 'forEach')
    return this;
  }

}
