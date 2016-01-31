import React from 'react';
import jQuery from 'jquery';

import ProgramSelection from './program-selection';
import Planner from './planner';
import * as CourseActions from '../actions/course-actions';
import * as ProgramActions from '../actions/program-actions';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = { screen: "program-selection" };
    }

    componentDidMount() {
        CourseActions.loadCourses();
        ProgramActions.loadPrograms();
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
            return <ProgramSelection continueToCourseSelection={ this.continueToCourseSelection.bind(this) }/>;
        } else if (this.state.screen == "planner") {
            return <Planner backToProgramSelection={ this.backToProgramSelection.bind(this) }/>
        }
        return "Error";
    }
}