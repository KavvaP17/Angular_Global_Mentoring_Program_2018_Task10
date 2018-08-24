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
    case CoursesActionTypes.ADD_COURSE: {
      return {...state, loading: true};
    }
    case CoursesActionTypes.ADD_COURSES_SUCCESS: {
      return {...state};
    }
    case CoursesActionTypes.ADD_COURSES_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case CoursesActionTypes.UPDATE_COURSE: {
      return {...state, loading: true};
    }
    case CoursesActionTypes.UPDATE_COURSE_SUCCESS: {
      return {...state, loading: false};
    }
    case CoursesActionTypes.UPDATE_COURSE_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case CoursesActionTypes.DELETE_COURSE: {
      return {...state,  loading: true};
    }
    case CoursesActionTypes.DELETE_COURSE_SUCCESS: {
      const data = [...(<Array<Course>>action.payload.courses)];
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
        page: action.payload.page,
        length: action.payload.length
      };
    }
    case CoursesActionTypes.DELETE_COURSE_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
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
      };
    }
    default:
      return state;
  }
}
