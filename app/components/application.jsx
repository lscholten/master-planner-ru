import React from 'react';
import jQuery from 'jquery';

import ProgramSelection from './program-selection';
import Planner from './planner';
import CourseStore from '../stores/course-store';
import * as CourseActions from '../actions/course-actions';
import ProgramStore from '../stores/program-store';
import * as ProgramActions from '../actions/program-actions';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "program-selection",
            programRepo: ProgramStore.programs,
            programs: [],
            courses: {"y1": [], "y2": []},
            courseRepo: CourseStore.courses
        };
    }

    componentDidMount() {
        CourseStore.subscribe(this.updateCourseRepo.bind(this));
        CourseActions.loadCourses();
        ProgramStore.subscribe(this.updateProgramRepo.bind(this));
        ProgramActions.loadPrograms();
    }

    componentWillUnmount() {
        CourseStore.unsubscribe(this.updateCourseRepo.bind(this));
        ProgramStore.unsubscribe(this.updateProgramRepo.bind(this));
    }

    updateCourseRepo() {
        this.setState({ courseRepo: CourseStore.courses })
    }

    updateProgramRepo() {
        this.setState({ programRepo: ProgramStore.programs });
    }

    selectPrograms(programs) {
        var checkedSorted = [];
        this.state.programRepo.forEach(function(item) {
            if (programs.indexOf(item) > -1) {
                checkedSorted.push(item);
            }
        });

        this.setState({
            screen: "planner",
            programs: checkedSorted
        });
    }

    backToProgramSelection() {
        this.setState({
            screen: "program-selection"
        });
    }

    updateCourses(courses) {
        this.setState({"courses": courses});
    }

    render() {
        if (this.state.screen == "program-selection") {
            return <ProgramSelection
                programRepo={this.state.programRepo}
                selectPrograms={this.selectPrograms.bind(this)}
                selectedPrograms={this.state.programs}
                />;
        } else if (this.state.screen == "planner") {
            return <Planner
                courses={ this.state.courses }
                programs={ this.state.programs }
                backToProgramSelection={this.backToProgramSelection.bind(this)}
                updateCourses={this.updateCourses.bind(this)}
                courseRepo={this.state.courseRepo}
                programRepo={this.state.programRepo}
                />
        }
        return "Error";
    }
}