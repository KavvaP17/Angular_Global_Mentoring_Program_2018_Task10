import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course.model';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(value: Array<Course>): Array<Course> {
    const orderedCourseArray = value.sort((a, b) => {
      return +a.creation - (+b.creation);
    });
    return orderedCourseArray;
  }

}
