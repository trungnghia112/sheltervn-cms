import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToLetterPipe } from '@shared/pipes/number-to-letter.pipe';

const pipesArr = [
  NumberToLetterPipe
];

@NgModule({
  declarations: [
    ...pipesArr
  ],
  exports: [
    ...pipesArr
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule {
}
