import React from 'react';
import jQuery from 'jquery';

import ProgramSelection from './program-selection';
import Planner from './planner';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "program-selection",
            programRepo: [],
            programs: [],
            courses: {"y1": [], "y2": []}, courseRepo: {}
        };
    }

    componentDidMount() {
        jQuery.ajax({
            url: "data/programs.json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({programRepo: data});
            }.bind(this)
        });
        jQuery.ajax({
            url: "data/courses.json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({courseRepo: data})
            }.bind(this)
        });
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