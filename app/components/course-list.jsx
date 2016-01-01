import React from 'react';

import Course from './course';

const CourseList = (props) => (
    <div className="col-xs-3">
        <div className="panel panel-default">
            <div className="panel-heading">{ props.name }</div>
            { props.courses.map(function (course) {
                var courseObj = props.courseRepo[course];
                var isPicked = false;
                for (var i = 0; i < props.picked.length; i++) {
                    if (props.picked[i].code == courseObj.code) {
                        isPicked = true;
                        break;
                    }
                }

                return <Course {...courseObj} key={course} addCourse={props.addCourse} courseCode={course}
                                              isPicked={isPicked}/>
            }.bind(this))
            }
        </div>
    </div>
);

export default CourseList;