import React from 'react';
import StudyProgram from './study-program';

const StudyProgramList = (props) => (
        <div>
            {props.programs.map(function (studyProgram) {
                return <StudyProgram program={studyProgram} key={studyProgram.name} />
            }.bind(this))
            }
        </div>
);

export default StudyProgramList;