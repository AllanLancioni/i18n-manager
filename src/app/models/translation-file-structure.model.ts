import { flatten, set } from 'lodash';
import { languages } from './languages.model';

export interface Translation {
  key: string;
  value: string;
}

export class TranslationFileStructure {

  path: string = '';
  items: TranslationFileItem[] = [];

  constructor(
    content: object,
    path: string = '',
    language?: string,
    public parentStructureItem: TranslationFileItem = null
  ) {
    this.path = path;
    this.items = Object.keys(content).map(key => new TranslationFileItem(key, content[key], path, language));
  }

  static mergeStructureValues(structures: TranslationFileStructure[]): TranslationFileStructure {

    const
      firstStructure: TranslationFileStructure = structures.pop(),
      firstStructureItems: TranslationFileItem[] = firstStructure.deepIterator(y => y),
      valuableKeysByLanguage: TranslationFileItem[][] = structures.map(x => x.deepIterator(y => y))

    valuableKeysByLanguage.forEach(lang => {
      lang.forEach(x => {
        const equalInLanguage: TranslationFileItem = firstStructureItems.find(f => f.fullKey === x.fullKey);
        if (!equalInLanguage) {
          return firstStructure.addByFullKey(x.fullKey, x.values);
        }
        equalInLanguage.values.push(...x.values);
      });
    });

    firstStructure.toJSONMap();

    return firstStructure;
  }

  deepIterator(fn: Function, arrayMethod: string = 'map'): any[] {
    let response: any = this.items[arrayMethod](item => {
      if (item.nested) {
        return item.nested.deepIterator(fn, arrayMethod);
      }
      return fn(item);
    }) || null;

    if (response instanceof Array) {
      response = flatten(response);
    }
    return response;
  }

  addByFullKey(fullKey: string, values: Translation[] = null): TranslationFileItem {
    const
      pieces: string[] = fullKey.split(/\./g),
      // key = pieces[pieces.length - 1],
      firstKey = pieces[0],
      alreadyCreatedItem: TranslationFileItem = this.items.find(x => x.key === firstKey);

    if (alreadyCreatedItem) {

      if (pieces.length === 1) {
        delete alreadyCreatedItem.nested;
        alreadyCreatedItem.values = TranslationFileItem.defaultValue;
        return alreadyCreatedItem;
      } else {

        const piecesExceptFirst = pieces.filter((x, i) => i !== 0);

        if (alreadyCreatedItem.nested) {
          alreadyCreatedItem.nested.addByFullKey(piecesExceptFirst.join('.'));
        } else {
          alreadyCreatedItem.nested = new TranslationFileStructure(
            set({}, piecesExceptFirst.join('.'), null),
            `${this.path}.${firstKey}`,
            undefined,
            alreadyCreatedItem
          );
          delete alreadyCreatedItem.values;
        }

        return alreadyCreatedItem.nested.items.find(x => x.key === firstKey);
      }
    }

    const itemToAdd = new TranslationFileItem(firstKey, set({}, fullKey, values)[firstKey], this.path, null, this);

    this.items.push(itemToAdd);
    return itemToAdd;
  }

  toJSONMap(): Map<string, object> {
    const jsonByLanguages: Map<string, object> = new Map();
    languages.forEach(lang => {
      const json = this
        .deepIterator(x => ({ key: x.fullKey, value: (v => v ? v.value : '')(x.values.find(v => v.key === lang)) }))
        .reduce((ac, x) => set(ac, x.key, x.value), {});

      jsonByLanguages.set(lang, json);
    });
    return jsonByLanguages;
  }

}


export class TranslationFileItem {

  static get defaultValue() {
    return languages.map(lang => ({ key: lang, value: '' }));
  }

  key: string;
  fullKey: string;
  values?: Translation[];
  nested?: TranslationFileStructure;
  isOpen: boolean = true;
  deepth: number = 0;

  constructor(
    key: string,
    value: object | string | number | Translation[] = null,
    fullKey: string = null,
    language?: string,
    public parentStructure: TranslationFileStructure = null
  ) {
    this.key = key;
    this.fullKey = fullKey ? `${fullKey}.${key}` : key;
    this.deepth = fullKey ? this.fullKey.match(/\./g).length : 0;

    if (value === null) {
      this.values = TranslationFileItem.defaultValue;
    } else if (value instanceof Array && value.every(x => ['key', 'value'].every(y => typeof x[y] === 'string'))) {
      this.values = value.length > 0 ? value : TranslationFileItem.defaultValue;
    } else if (typeof value === 'object') {
      this.nested = new TranslationFileStructure(value, this.fullKey, language, this);
    } else {
      if (typeof value === 'number') {
        value = `${value}`;
      }
      this.values = language ? [{ key: language, value }] : TranslationFileItem.defaultValue;
    }
    return this;
  }


}
