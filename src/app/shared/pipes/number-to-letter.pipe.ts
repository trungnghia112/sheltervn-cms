import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToLetter'
})
export class NumberToLetterPipe implements PipeTransform {
  alphabet: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  transform(value: any, ...args: unknown[]): unknown {
    // return char(value + 64);
    return this.alphabet.charAt(value);
  }

}
