import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<Course>, serchValue: string): Array<Course> {
    if (serchValue) {
      const foundValues = value.filter((item) => {
        if ((item.title.toLowerCase()).indexOf(serchValue.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      });
      return foundValues;
    }
    return value;
  }
}
