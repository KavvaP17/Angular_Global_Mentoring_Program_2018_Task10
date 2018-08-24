import { Injectable } from '@angular/core';
import { Course } from '../../models/course.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private serverURl = 'http://localhost:3004/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {}

  getCoursesList(start = 0, count = 0, search = '') {
    let url = `${this.serverURl}courses`;
    if (start || count || search) {
      url += `?`;
      if (start || count) {
        url += `start=${start}&count=${count}`;
        if (search) {
          url += `&search=${search}`;
        }
      } else if (search) {
        url += `search=${search}`;
      }
    }
    return this.http.get(url);
  }

  createCourse(newCourse: Course) {
    const url = `${this.serverURl}courses`;
    return this.http.post(url, newCourse, this.httpOptions);
  }

  getCourseById(id) {
    const url = `${this.serverURl}courses/${id}`;
    return this.http.get(url);
  }

  updateCourse(course: Course) {
    const id = course.id;
    const url = `${this.serverURl}courses/${id}`;
    return this.http.put(url, course , this.httpOptions);
  }

  removeCourse(id: number) {
    const url = `${this.serverURl}courses/${id}`;
    return this.http.delete(url);
  }
}
