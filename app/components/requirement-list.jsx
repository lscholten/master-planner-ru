import React from 'react';

import Requirement from './requirement';

import CourseStore from '../stores/course-store';

export default class RequirementList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chosenCourses: CourseStore.getAllChosen() };
    }

    componentDidMount() {
        CourseStore.subscribe(this.updateChosenCourses, this);
    }

    componentWillUnmount() {
        CourseStore.unsubscribe(this.updateChosenCourses, this);
    }

    updateChosenCourses() {
        this.setState({ chosenCourses: CourseStore.getAllChosen() });
    }

    calculateEcsForRequirements() {
        let assignedCourses = {};

        this.props.program.requirements.forEach(requirement => {
            assignedCourses[requirement.description] = 0;
        });

        let complexityRequirements = this.props.program.requirements.slice();

        for (let course of this.state.chosenCourses) {
            for (let req of complexityRequirements) {
                if (req.forbiddenCourseGroups != undefined) {
                    let forbidden = false;
                    for (let courseGroup of req.forbiddenCourseGroups) {
                        let courses = this.props.program.courseGroups[courseGroup].courses;
                        for (let grpCourse of courses) {
                            if (grpCourse == course.code) {
                                forbidden = true;
                            }
                        }
                    }
                    if (forbidden) {
                        continue;
                    }
                }

                if (req.courseGroups.length == 0) {
                    assignedCourses[req.description] += course.ec;
                    break;
                }

                if (assignedCourses[req.description] + course.ec > req.ec) {
                    continue;
                }

                let assigned = false;

                for (let courseGroup of req.courseGroups) {
                    let courses = this.props.program.courseGroups[courseGroup].courses;
                    for (let grpCourse of courses) {
                        if (grpCourse == course.code) {
                            assignedCourses[req.description] += course.ec;
                            assigned = true;
                        }
                    }
                }

                if (assigned) {
                    break;
                }
            }
        }

        return assignedCourses;
    }

    render() {
        let requirementEcs = this.calculateEcsForRequirements();
        return (
            <div className="col-xs-12">
                <b>Requirements</b> ({ CourseStore.getTotalEcs() } / { this.props.program.ec } ec)<br />
                {
                    this.props.program.requirements.map(function (requirement, i) {
                        return <Requirement {...requirement} program={ this.props.program } key={i}
                                                             fulfilled={ requirementEcs[requirement.description] }/>
                    }.bind(this))
                }
            </div>
        );
    }
}