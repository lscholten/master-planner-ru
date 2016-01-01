import React from 'react';

import SemesterList from './semester-list';
import StudyProgramList from './study-program-list';

export default class Planner extends React.Component {
    addCourse(year, course) {
        var year1 = this.props.courses.y1;
        var year2 = this.props.courses.y2;
        if (year == 1) {
            year1 = year1.concat([this.props.courseRepo[course]]);
        } else {
            year2 = year2.concat([this.props.courseRepo[course]]);
        }
        this.props.updateCourses({"y1": year1, "y2": year2});
    }

    removeCourse(coursecode) {
        var year1 = this.props.courses.y1.filter(function (course) {
            return course.code != coursecode
        });
        var year2 = this.props.courses.y2.filter(function (course) {
            return course.code != coursecode
        });
        this.props.updateCourses({"y1": year1, "y2": year2});
    }

    render() {
        var pickedCourses = this.props.courses.y1.concat(this.props.courses.y2);
        return <div>
            <button className="btn" onClick={ this.props.backToProgramSelection }>
                Back to program selection
            </button>
            <SemesterList coursesPicked={this.props.courses} courseRepo={this.props.courseRepo}
                          removeCourse={ this.removeCourse.bind(this) }/>
            <StudyProgramList programs={this.props.programs} repos={{programRepo: this.props.programRepo, courseRepo: this.props.courseRepo}} addCourse={ this.addCourse.bind(this) }
                              picked={pickedCourses}/>
        </div>;
    }
}