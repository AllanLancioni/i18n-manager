import { EventEmitter } from '@angular/core';

export const toggleViewEvent: EventEmitter<{view: string, params?: object}> = new EventEmitter();
