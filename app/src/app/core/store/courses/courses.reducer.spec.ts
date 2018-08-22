import { coursesReducer } from './courses.reducer';
import { initialCourseState } from './courses.state';


describe('Courses Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = coursesReducer(initialCourseState, action);

      expect(result).toBe(initialCourseState);
    });
  });
});
