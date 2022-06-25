import { Component, OnInit } from '@angular/core';
import { MaterialAsset } from '../shared/material-asset/material-asset.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  materialAssets: MaterialAsset[] = [];

  constructor() { }

  ngOnInit(): void {
    this.materialAssets = [
      {
        label: 'Platinum',
        value: '£23.398',
        colorClass: 'gray-500'
      },
      {
        label: 'Gold',
        value: '£42.042',
        colorClass: 'gray-500'
      },
    ]
  }

}
