import { Component, OnInit } from '@angular/core';
import { toggleViewEvent } from '../../../../controllers/events';

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
      console.log('SUBSCRIBE', x);
      if (x.view === 'CREATE_ITEM') {
        this.itemName = x.params.initialName;
      }
    });
  }

}
