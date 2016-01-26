import React from 'react';

import ProgramStore from '../stores/program-store';
import * as ProgramActions from '../actions/program-actions';

export default class ProgramSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedPrograms: ProgramStore.selected };
    }

    compomentDidMount () {
        ProgramStore.subscribe(this.updateSelection.bind(this));
    }

    componentWillUnmount() {
        ProgramStore.unsubscribe(this.updateSelection.bind(this));
    }

    updateSelection () {
        this.setState({ selectedPrograms: ProgramStore.selected });
    }

    onSubmit (e) {
        e.preventDefault();
        this.props.selectPrograms(this.state.selectedPrograms);
    }

    onChange (e) {
        var program = ProgramStore.programs[parseInt(e.target.value)];
        ProgramActions.toggleSelection(program);
    }

    render () {
        return <div className="row">
            <div className="col-xs-12">
                <h2>First select programs from the list of possible programs.</h2>
                <form onSubmit={ this.props.continueToCourseSelection }>
                    {
                        ProgramStore.programs.map(function(program, i) {
                            return <div className="checkBox" key={program.name}>
                                <label>
                                    <input ref={program.name} type="checkbox" value={i}
                                           checked={this.state.selectedPrograms.indexOf(program) > -1}
                                           onChange={this.onChange.bind(this)}
                                    />
                                    { program.name }
                                </label>
                            </div>;
                        }.bind(this))
                    }
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    }
}