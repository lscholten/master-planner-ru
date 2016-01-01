import React from 'react';

import Semester from './semester';

export default class SemesterList extends React.Component {
    getSemesterCourses(year, semester) {
        return this.props.coursesPicked[year].filter(function (el) {
            return el.semester == semester;
        }.bind(semester));
    }

    getTotalEcs() {
        return this.props.coursesPicked.y1.reduce(function (carry, add) {
                return carry + add.ec
            }, 0) + this.props.coursesPicked.y2.reduce(function (carry, add) {
                return carry + add.ec
            }, 0);
    }

    render() {
        var y1s1 = this.getSemesterCourses("y1", 1);
        var y1s2 = this.getSemesterCourses("y1", 2);
        var y2s1 = this.getSemesterCourses("y2", 1);
        var y2s2 = this.getSemesterCourses("y2", 2);

        return <div className="row">
            <div className="col-xs-12">
                <h4>My master program</h4>
                <em>Total: { this.getTotalEcs() } ec</em>
            </div>
            <Semester year={1} semester={1} courses={y1s1} removeCourse={this.props.removeCourse}/>
            <Semester year={1} semester={2} courses={y1s2} removeCourse={this.props.removeCourse}/>
            <Semester year={2} semester={1} courses={y2s1} removeCourse={this.props.removeCourse}/>
            <Semester year={2} semester={2} courses={y2s2} removeCourse={this.props.removeCourse}/>
        </div>;
    }
}