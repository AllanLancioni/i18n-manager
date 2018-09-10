import { Component, OnInit } from '@angular/core';
import { appState } from '../../../models/app-state.model';
import { getFolderPath } from '../../../controllers/dialogs';

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

  async getFolderPath() {
    await getFolderPath();
  }
}
