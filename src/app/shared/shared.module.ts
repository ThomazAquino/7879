import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { MaterialAssetComponent } from './material-asset/material-asset.component';



@NgModule({
  declarations: [
    MaterialAssetComponent,
    BannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MaterialAssetComponent, BannerComponent]
})
export class SharedModule { }
