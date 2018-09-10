import { Component, OnInit } from '@angular/core';
import { toggleViewEvent, appStateView } from '../../../../controllers/events';
import { appState } from '../../../../models/app-state.model';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  itemName: string = '';

  constructor() { }

  ngOnInit() {
    toggleViewEvent.subscribe(x => {
      if (x.view === 'CREATE_ITEM') {
        this.itemName = x.params.initialName;
      }
    });
  }

  createItem() {
    if (!this.itemName) {
      return;
    }

    appState.actualItemToEdit = appState.activeTranslationStructure.addByFullKey(this.itemName);
    appState.actualView = appStateView.TRANSLATE_PANEL;

  }

}
