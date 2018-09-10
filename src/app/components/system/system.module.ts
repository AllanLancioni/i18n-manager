import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FilesManagerComponent } from './files-manager/files-manager.component';
import { TranslatePanelComponent } from './workarea/translate-panel/translate-panel.component';
import { WorkareaComponent } from './workarea/workarea.component';
import { CreateItemComponent } from './workarea/create-item/create-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [SystemComponent, HeaderComponent, FilesManagerComponent, TranslatePanelComponent, WorkareaComponent, CreateItemComponent]
})
export class SystemModule { }
