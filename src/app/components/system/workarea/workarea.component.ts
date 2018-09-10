import { Component, OnInit } from '@angular/core';
import { appState } from "../../../models/app-state.model";

@Component({
  selector: 'app-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.scss']
})
export class WorkareaComponent implements OnInit {

  appState = appState;

  constructor() { }

  ngOnInit() {
  }

}
