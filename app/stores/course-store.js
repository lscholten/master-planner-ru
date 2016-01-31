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
        this.chosen = {"y1": [], "y2": []};
    }

    getChosenForSemester(year, semester) {
        return this.chosen[year].filter(function (el) {
            return el.semester == semester;
        }.bind(semester));
    }

    getTotalEcs() {
        const chosen = this.getAllChosen();
        return chosen.reduce((total, el) => { return total + el.ec }, 0);
    }

    getAllChosen() {
        return this.chosen.y1.concat(this.chosen.y2);
    }

    findCourseByCode(code) {
        return this.courses[code];
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
        }
        if (action.type == CourseActionTypes.CHOOSE_COURSE) {
            if (action.year == 1) {
                CourseStore.chosen.y1 = CourseStore.chosen.y1.concat([CourseStore.courses[action.course]]);
            } else {
                CourseStore.chosen.y2 = CourseStore.chosen.y2.concat([CourseStore.courses[action.course]]);
            }
        }
        if (action.type == CourseActionTypes.DISCARD_COURSE) {
            var year1 = CourseStore.chosen.y1.filter(function (course) {
                return course.code != action.course
            });
            var year2 = CourseStore.chosen.y2.filter(function (course) {
                return course.code != action.course
            });
            CourseStore.chosen.y1 = year1;
            CourseStore.chosen.y2 = year2;
        }
        CourseStore.emitChange();
    }
);

export default CourseStore;