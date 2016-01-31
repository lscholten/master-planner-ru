import React from 'react';

import Semester from './semester';

import CourseStore from '../stores/course-store';

export default class SemesterList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            y1s1: CourseStore.getChosenForSemester("y1", 1),
            y1s2: CourseStore.getChosenForSemester("y1", 2),
            y2s1: CourseStore.getChosenForSemester("y2", 1),
            y2s2: CourseStore.getChosenForSemester("y2", 2)
        }
    }

    componentDidMount() {
        CourseStore.subscribe(this.updateChosenCourses, this);
    }

    componentWillUnmount() {
        CourseStore.unsubscribe(this.updateChosenCourses, this);
    }

    updateChosenCourses() {
        this.setState({
            y1s1: CourseStore.getChosenForSemester("y1", 1),
            y1s2: CourseStore.getChosenForSemester("y1", 2),
            y2s1: CourseStore.getChosenForSemester("y2", 1),
            y2s2: CourseStore.getChosenForSemester("y2", 2)
        });
    }

    render() {
        return <div className="row">
            <div className="col-xs-12">
                <h4>My master program</h4>
                <em>Total: { CourseStore.getTotalEcs() } ec</em>
            </div>
            <Semester year={1} semester={1} courses={this.state.y1s1} />
            <Semester year={1} semester={2} courses={this.state.y1s2} />
            <Semester year={2} semester={1} courses={this.state.y2s1} />
            <Semester year={2} semester={2} courses={this.state.y2s2} />
        </div>;
    }
}