import { CoursesActionTypes, CoursesActions } from './courses.actions';
import { CoursesState, initialCourseState} from './courses.state';
import { Course } from '../../../courses/models/course.model';

export function coursesReducer(state = initialCourseState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.GET_COURSES: {
      return {...state, loading: true};
    }
    case CoursesActionTypes.GET_COURSES_SUCCESS: {
      const data = [...(<Array<Course>>action.payload)];
      return {
        ...state,
        data,
        loading: false,
        loaded: true
      };
    }
    case CoursesActionTypes.GET_COURSES_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case CoursesActionTypes.GET_COURSE: {
      console.log(CoursesActionTypes.GET_COURSE);
      return {...state};
    }
    case CoursesActionTypes.ADD_COURSE: {
      console.log(CoursesActionTypes.ADD_COURSE);
      return {...state};
    }
    case CoursesActionTypes.UPDATE_COURSE: {
      console.log(CoursesActionTypes.UPDATE_COURSE);
      return {...state};
    }
    case CoursesActionTypes.DELETE_COURSE: {
      console.log(CoursesActionTypes.DELETE_COURSE);
      return {...state};
    }
    default:
      console.log('Default reducer!!!');
      return state;
  }
}
