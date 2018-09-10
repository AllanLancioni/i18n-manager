import { Component, OnInit, Input } from '@angular/core';
import { TranslationFileStructure } from "../../../../models/translation-file-structure.model";
import { appState } from "../../../../models/app-state.model";
import { toggleViewEvent } from '../../../../controllers/events';

@Component({
  selector: 'app-translate-panel',
  templateUrl: './translate-panel.component.html',
  styleUrls: ['./translate-panel.component.scss']
})
export class TranslatePanelComponent implements OnInit {

  appState = appState;

  constructor() { }

  ngOnInit() {
    toggleViewEvent.subscribe(x => {
      console.log('SUBSCRIBE', x, this.appState === x.that);
    });
  }


}
