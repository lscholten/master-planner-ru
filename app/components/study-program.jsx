import React from 'react';

import Requirement from './requirement';
import CourseList from './course-list';

export default class StudyProgram extends React.Component {
    render() {
        var totalEc = this.props.picked.reduce(function (total, el) {
            return total + el.ec;
        }, 0);

        return <div className="row">
            <div className="col-xs-12">
                <h2>{ this.props.program.name }</h2>
            </div>
            <div className="col-xs-12">
                <b>Requirements</b> ({totalEc} / {this.props.program.ec} ec)<br />
                {
                    this.props.program.requirements.map(function (requirement, i) {
                        return <Requirement {...requirement} program={this.props.program} picked={this.props.picked} key={i}/>
                    }.bind(this))
                }
            </div>
            {
                Object.keys(this.props.program.courseGroups).map(function (key) {
                    var group = this.props.program.courseGroups[key];
                    return <CourseList key={key} name={group.name} courses={group.courses}
                                       courseRepo={ this.props.repos.courseRepo} addCourse={ this.props.addCourse }
                                       picked={ this.props.picked }/>
                }.bind(this))
            }
        </div>;
    }
}