import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrefDirective } from './href.directive';

const sharedAppArr = [
  HrefDirective
];

@NgModule({
  declarations: [
    ...sharedAppArr
  ],
  exports: [
    ...sharedAppArr
  ],
  imports: [
    CommonModule
  ]
})
export class SharedAppModule {
}
