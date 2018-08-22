export interface CourseInterface {
  id: number;
  title: string;
  creation: number | string;
  duration: number;
  description: string;
  topRated: boolean;
  authors: Array<Object>;
}
