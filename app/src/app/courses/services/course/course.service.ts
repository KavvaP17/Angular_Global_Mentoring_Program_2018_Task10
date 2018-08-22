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

  createCourse(title: string, creation: number | string, duration: number, description: string) {
    const url = `${this.serverURl}courses`;
    const id = Date.now();
    const newCourse = new Course(id, title, creation, duration, description, false, []);
    return this.http.post(url, newCourse, this.httpOptions);
  }

  getCourseById(id) {
    const url = `${this.serverURl}courses/${id}`;
    return this.http.get(url);
  }

  updateCourse(id: number, title: string, creation: number, duration: number, description: string, topRated: boolean) {
    const course = new Course(id, title, creation, duration, description, topRated, []);
    const url = `${this.serverURl}courses/${id}`;
    return this.http.put(url, course , this.httpOptions);
  }

  removeCourse(id: number) {
    const url = `${this.serverURl}courses/${id}`;
    return this.http.delete(url);
  }
}
