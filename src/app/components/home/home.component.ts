import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appState } from '../../models/app-state.model';
import { remote } from 'electron';
import { getFolderPath } from '../../controllers/dialogs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  folderPath: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  async getFolderPath() {
    await getFolderPath();
    this.router.navigate(['./system']);
  }

}
