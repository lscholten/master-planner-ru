import React from 'react';

import SemesterList from './semester-list';
import StudyProgramList from './study-program-list';

import ProgramStore from '../stores/program-store';


const Planner = (props) => (
    <div>
        <button className="btn" onClick={ props.backToProgramSelection }>
            Back to program selection
        </button>
        <SemesterList />
        <StudyProgramList programs={ ProgramStore.selected } />
    </div>
);

export default Planner;