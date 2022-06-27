import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { MaterialAssetComponent } from './material-asset/material-asset.component';
import { PortfolioGraphComponent } from './portfolio-graph/portfolio-graph.component';



@NgModule({
  declarations: [
    MaterialAssetComponent,
    BannerComponent,
    PortfolioGraphComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [MaterialAssetComponent, BannerComponent, PortfolioGraphComponent]
})
export class SharedModule { }
