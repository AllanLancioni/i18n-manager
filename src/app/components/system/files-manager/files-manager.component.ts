import { Component, OnInit } from '@angular/core';
import { appState } from '../../../models/app-state.model';
import { TranslationFileItem } from '../../../models/translation-file-structure.model';

@Component({
  selector: 'app-files-manager',
  templateUrl: './files-manager.component.html',
  styleUrls: ['./files-manager.component.scss']
})
export class FilesManagerComponent implements OnInit {

  appState = appState;

  constructor() { }

  ngOnInit() {}

  openItem(item: TranslationFileItem) {
    appState.actualItemToEdit = item;
  }

}
