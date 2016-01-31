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

    render() {
        return (
            <div className="col-xs-12">
                <b>Requirements</b> ({ CourseStore.getTotalEcs() } / { this.props.program.ec } ec)<br />
                {
                    this.props.program.requirements.map(function (requirement, i) {
                        return <Requirement {...requirement} program={ this.props.program } key={i} chosenCourses={ this.state.chosenCourses } />
                    }.bind(this))
                }
            </div>
        );
    }
}