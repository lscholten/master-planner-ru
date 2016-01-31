import React from 'react';

import CourseStore from '../stores/course-store';

export default class Requirement extends React.Component {
    render() {
        return <div className="row">
            <div className="col-xs-3"><em>{ this.props.description }</em>&nbsp;</div>
            <div className="col-xs-1">({ this.props.fulfilled }/{ this.props.ec} ec)</div>
            <div className="col-xs-8">
                {
                    this.props.courseGroups.length > 0 ?
                        <span>
                            Pick from: [
                            {
                                this.props.courseGroups.map(function (cg) {
                                    return this.props.program.courseGroups[cg].name + ", ";
                                }.bind(this))
                            }
                            ]
                        </span>
                        : ""
                }
            </div>
        </div>
    }
}