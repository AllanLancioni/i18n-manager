import { Component, OnInit } from '@angular/core';
import { appState } from '../../../models/app-state.model';
import { getFolderPath } from '../../../controllers/dialogs';
import { toggleViewEvent, appStateView } from '../../../controllers/events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appState = appState;

  constructor() { }

  ngOnInit() {
  }

  async saveJSONFiles() {
    console.log('SAVE', await this.appState.save());
  }

  addTranslation() {
    appState.actualView = { view: appStateView.CREATE_ITEM, params: { initialName: 'aaa' }};
  }

  async getFolderPath() {
    await getFolderPath();
  }
}
