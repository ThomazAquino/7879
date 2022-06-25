import { Component, Input } from '@angular/core';

export interface MaterialAsset {
  label: string,
  value: string,
  colorClass: string,
}

@Component({
  selector: 'app-material-asset',
  template:`
    <div class="flex">
      <div [class]="'p-1 bg-' + materialAsset.colorClass">{{ materialAsset.label }}</div>
      <div [class]="'py-1 px-2 border border-' +materialAsset.colorClass">{{ materialAsset.value }}</div>
    </div>
  `,
})
export class MaterialAssetComponent {
  @Input() materialAsset!: MaterialAsset;

  constructor() { }
}
