import React from 'react';

import SemesterList from './semester-list';
import StudyProgramList from './study-program-list';

import CourseStore from '../stores/course-store';
import ProgramStore from '../stores/program-store';
import * as CourseActions from '../actions/course-actions';

export default class Planner extends React.Component {
    
    addCourse(year, course) {
        CourseActions.chooseCourse(year, course);
    }

    removeCourse(course) {
        CourseActions.discardCourse(course);
    }

    render() {
        var pickedCourses = CourseStore.chosen.y1.concat(CourseStore.chosen.y2);
        return <div>
            <button className="btn" onClick={ this.props.backToProgramSelection }>
                Back to program selection
            </button>
            <SemesterList coursesPicked={CourseStore.chosen} courseRepo={CourseStore.courses}
                          removeCourse={ this.removeCourse.bind(this) }/>
            <StudyProgramList programs={ProgramStore.selected} repos={{programRepo: ProgramStore.programs, courseRepo: CourseStore.courses}} addCourse={ this.addCourse.bind(this) }
                              picked={pickedCourses}/>
        </div>;
    }
}