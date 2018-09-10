import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { appState } from '../../models/app-state.model';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  @HostListener('keydown', ['$event'])
  onKeydown($event) {
    console.log('EV', $event)
  }

  constructor(private router: Router) { }

  ngOnInit() {
    // if (!appState.folderPath) { this.router.navigate(['/']); }
  }

}
