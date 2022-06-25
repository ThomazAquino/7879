import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialAssetComponent } from './material-asset/material-asset.component';



@NgModule({
  declarations: [
    MaterialAssetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MaterialAssetComponent]
})
export class SharedModule { }
