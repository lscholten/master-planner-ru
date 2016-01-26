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
        this.state = { screen: "program-selection" };
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

    continueToCourseSelection(e) {
        e.preventDefault();
        this.setState({
            screen: "planner"
        });
    }

    backToProgramSelection() {
        this.setState({
            screen: "program-selection"
        });
    }

    render() {
        if (this.state.screen == "program-selection") {
            return <ProgramSelection
                continueToCourseSelection={ this.continueToCourseSelection.bind(this) }
                />;
        } else if (this.state.screen == "planner") {
            return <Planner
                backToProgramSelection={ this.backToProgramSelection.bind(this) }
                />
        }
        return "Error";
    }
}