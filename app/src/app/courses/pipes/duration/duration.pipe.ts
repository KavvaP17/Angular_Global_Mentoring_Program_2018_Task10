import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  constructor(private number: DecimalPipe) {}

  transform(value: any, args?: any): any {
    const h = ~~(value / 60);
    // const hh = this.number.transform(h, '2.0-0');
    const mm = this.number.transform(value - h * 60, '2.0-0');
    return h > 0 ? `${h}h ${mm}min` : `${mm}min`;
  }

}
