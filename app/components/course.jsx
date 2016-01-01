import React from 'react';
import ReactDOM from 'react-dom';

import Dragula from 'dragula';

export default class Course extends React.Component {
    setupDragging() {
        var container = ReactDOM.findDOMNode(this);
        var dropYear1 = document.getElementById('year-1');
        var dropYear2 = document.getElementById('year-2');
        var tmpthis = this;
        var drag = Dragula([container, dropYear1, dropYear2], {
            copy: true,
            moves: function (el, source, handle) {
                return !tmpthis.props.isPicked;
            },
            accepts: function (src, dest) {
                return dest != container && (dest == dropYear1 || dest == dropYear2);
            }
        });

        drag.on('drop', function (drake, target) {
            if (target == dropYear1) {
                this.props.addCourse(1, this.props.courseCode);
            } else if (target == dropYear2) {
                this.props.addCourse(2, this.props.courseCode);
            }
            drake.remove();
        }.bind(this));
    }

    componentDidMount() {
        if (this.props.removalMode == undefined) {
            this.setupDragging();
        }
    }

    removeCourse(event) {
        this.props.removeCourse(this.props.code);
    }

    render () {
        let liClass = "list-group-item";
        if (this.props.isPicked) {
            liClass += " list-group-item-success";
        }

        return <li className={ liClass }>
            <div className="row">
                <div className="col-xs-9">
                    <b>{ this.props.shortName != undefined ? this.props.shortName : this.props.name }</b> <br />
                    <em> Semester { this.props.semester } </em>
                </div>
                <div className="col-xs-3">
                    { this.props.ec } EC
                    {
                        (this.props.removalMode) ?
                            <span className="glyphicon glyphicon-remove"
                                  onClick={ this.removeCourse.bind(this) }></span>
                            : ""
                    }
                </div>
            </div>
        </li>;
    }
}