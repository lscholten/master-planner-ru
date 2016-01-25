import { Dispatcher } from "flux";
import AppDispatcher from '../core/app-dispatcher';
import Store from '../core/store';

/**
 * Struct for all possible course action types
 */
export const CourseActionTypes = {
    SET_COURSES: "course_set_courses",
    CHOOSE_COURSE: "course_choose_course",
    DISCARD_COURSE: "course_discard_course"
};

/**
 * Class definition for the Course store
 */
class CourseStoreClass extends Store {
    constructor() {
        super();
        this.courses = {};
        this.chosenCourses = [];
    }
}

const CourseStore = new CourseStoreClass();

/**
 * Register handlers that update the state of the store
 * given an action.
 */
CourseStore.dispatchToken = AppDispatcher.register(
    action => {
        if (action.type == CourseActionTypes.SET_COURSES) {
            CourseStore.courses = action.courses;
            CourseStore.emitChange();
        }
    }
);

export default CourseStore;