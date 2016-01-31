import React from 'react';
import Course from './course';

export default class Semester extends React.Component {
    render() {
        var totalEc = this.props.courses.reduce(function (total, el) {
            return total + el.ec;
        }, 0);

        return <div className="col-xs-3">
            <div className="panel panel-default">
                <div className="panel-heading">
                    Year { this.props.year } semester {this.props.semester}
                    <div className="badge pull-right">{ totalEc }</div>
                </div>
                { this.props.courses.map(function (course) {
                    return <Course {...course} key={course.code} removalMode={true} />
                }.bind(this))
                }
            </div>
        </div>;
    }
}