import React from 'react';

import Course from './course';

import CourseStore from '../stores/course-store';
import * as CourseActions from '../actions/course-actions';

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chosen: CourseStore.getAllChosen() };
    }

    componentDidMount() {
        CourseStore.subscribe(this.updateChosenCourses, this);
    }

    componentWillUnmount() {
        CourseStore.unsubscribe(this.updateChosenCourses, this);
    }

    updateChosenCourses() {
        this.setState({ chosen: CourseStore.getAllChosen() });
    }

    addCourse(year, course) {
        CourseActions.chooseCourse(year, course);
    }

    render() {
        return (
            <div className="col-xs-3">
                <div className="panel panel-default">
                    <div className="panel-heading">{ this.props.name }</div>
                    { this.props.courses.map(function (course) {
                        var courseObj = CourseStore.findCourseByCode(course);
                        var isPicked = false;
                        for (var i = 0; i < this.state.chosen.length; i++) {
                            if (this.state.chosen[i].code == courseObj.code) {
                                isPicked = true;
                                break;
                            }
                        }

                        return <Course {...courseObj} key={course} addCourse={ this.addCourse } courseCode={course}
                                                      isPicked={isPicked}/>
                    }.bind(this))
                    }
                </div>
            </div>
        );
    }
}

export default CourseList;