import jQuery from 'jquery';

import AppDispatcher from '../core/app-dispatcher';
import { CourseActionTypes } from '../stores/course-store';

export function loadCourses() {
    jQuery.ajax({
        url: "data/courses.json",
        dataType: 'json',
        cache: false,
        success: (data) => {
            AppDispatcher.dispatch({
                type: CourseActionTypes.SET_COURSES,
                courses: data
            });
        }
    });
}
