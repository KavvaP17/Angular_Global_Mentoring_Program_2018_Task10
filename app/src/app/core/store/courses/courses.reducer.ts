import { CoursesActionTypes, CoursesActions } from './courses.actions';
import { CoursesState, initialCourseState} from './courses.state';
import { Course } from '../../../courses/models/course.model';

export function coursesReducer(state = initialCourseState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.GET_COURSES: {
      return {...state, loading: true};
    }
    case CoursesActionTypes.GET_COURSES_SUCCESS: {
      const data = [...(<Array<Course>>action.payload.courses)];
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
        length: action.payload.length
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
    case CoursesActionTypes.PAGINATION: {
      return {
        ...state,
        page: action.payload.pageIndex,
        pageSize: action.payload.pageSize,
        length: action.payload.length
      };
    }
    case CoursesActionTypes.SEARCH: {
      if (action.payload === state.search) {
        return state;
      } 
      return {
        ...state,
        page: 0,
        search: action.payload
      }
    }
    default:
      console.log('Default reducer!!!');
      return state;
  }
}
