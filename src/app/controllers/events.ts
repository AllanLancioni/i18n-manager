import { EventEmitter } from '@angular/core';

export enum appStateView {
  TRANSLATE_PANEL = 'TRANSLATE_PANEL',
  CREATE_ITEM = 'CREATE_ITEM',
}

export const toggleViewEvent: EventEmitter<{view: appStateView, params?: object}> = new EventEmitter();
