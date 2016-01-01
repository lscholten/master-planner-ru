import React from 'react';

export default class Requirement extends React.Component {
    calcFulfilledEcs() {
        let filteredPicked = this.props.picked.filter(function (course) {
            for (var i = 0; i < this.props.courseGroups.length; i++) {
                let courses = this.props.program.courseGroups[this.props.courseGroups[i]].courses;
                for (var j = 0; j < courses.length; j++) {
                    if (courses[j] == course.code) {
                        return true;
                    }
                }
            }
            return false;
        }.bind(this));

        return filteredPicked.reduce(function (carry, elt) {
            return carry + elt.ec;
        }, 0);
    }
    render() {
        let currentEc = this.calcFulfilledEcs();

        return <div className="row">
            <div className="col-xs-3"><em>{ this.props.description }</em>&nbsp;</div>
            <div className="col-xs-1">({currentEc}/{ this.props.ec} ec)</div>
            <div className="col-xs-8">
                Pick from: [
                {
                    this.props.courseGroups.map(function (cg) {
                        return this.props.program.courseGroups[cg].name + ", ";
                    }.bind(this))
                }
                ]
            </div>
        </div>
    }
}