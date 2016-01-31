import React from 'react';

import Requirement from './requirement';
import CourseList from './course-list';
import RequirementList from './requirement-list';

import CourseStore from '../stores/course-store';

const StudyProgram = (props) => (
    <div className="row">
        <div className="col-xs-12">
            <h2>{ props.program.name }</h2>
        </div>
        <RequirementList program={ props.program } />
        {
            Object.keys(props.program.courseGroups).map(function (key) {
                var group = props.program.courseGroups[key];
                return <CourseList key={key} name={group.name} courses={group.courses}/>
            }.bind(this))
        }
    </div>
);

export default StudyProgram;