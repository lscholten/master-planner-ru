import React from 'react';

export default class ProgramSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedPrograms: this.props.selectedPrograms }
    }

    onSubmit (e) {
        e.preventDefault();
        this.props.selectPrograms(this.state.selectedPrograms);
    }

    onChange (e) {
        var target = e.target;
        var checked = this.state.selectedPrograms;
        var program = this.props.programRepo[parseInt(target.value)];
        if (checked.indexOf(program) > -1) {
            checked.splice(checked.indexOf(program), 1);
        } else {
            checked.push(program);
        }
        this.setState({"selectedPrograms": checked});
    }

    render () {
        return <div className="row">
            <div className="col-xs-12">
                <h2>First select programs from the list of possible programs.</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    {
                        this.props.programRepo.map(function(program, i) {
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