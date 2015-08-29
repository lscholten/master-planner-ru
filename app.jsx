var Application = React.createClass({
    getInitialState: function () {
        return {courseRepo: [], programRepo: []};
    },
    componentDidMount: function () {
        $.ajax({
            url: "programs.json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({programRepo: data});
            }.bind(this)
        });
        $.ajax({
            url: "courses.json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({courseRepo: data})
            }.bind(this)
        });
    },
    render: function () {
        return <div>
            <SemesterList />
            <StudyProgramList programs={this.state.programRepo} repos={this.state}/>
        </div>;
    }
});

var SemesterList = React.createClass({
    render: function () {
        return <div className="row">
            <Semester />
            <Semester />
            <Semester />
            <Semester />
        </div>;
    }
});

var Semester = React.createClass({
    render: function () {
        return <div className="col-xs-3">
            <div className="panel panel-default">
                <div className="panel-heading">
                    asdf
                </div>
                <div className="panel-content">
                    asdf
                </div>
            </div>
        </div>;
    }
});

var StudyProgramList = React.createClass({
    render: function () {
        return <div>
            { this.props.programs.map(function (studyProgram) {
                return <StudyProgram program={studyProgram} key={studyProgram.name} repos={this.props.repos}/>
            }.bind(this))
            }
        </div>;
    }
});

var StudyProgram = React.createClass({
    render: function () {
        return <div className="row">
            <div className="col-xs-12">
                <h2>{ this.props.program.name }</h2>
            </div>
            <CourseList name="Required courses" courses={ this.props.program.trackBasis }
                        courseRepo={ this.props.repos.courseRepo }/>
            { //this.props.program.trackElectiveGroups.map(function (group) {
                //    return <CourseList name={group.groupName} courses={group.courses}/>
                //})
            }
        </div>;
    }
});

var CourseList = React.createClass({
    render: function () {
        return <div className="col-xs-4">
            <div className="panel panel-default">
                <div className="panel-heading">{ this.props.name }</div>
                { this.props.courses.map(function (course) {
                    var courseObj = this.props.courseRepo[course];
                    return <Course {...courseObj} />
                }.bind(this))
                }
            </div>
        </div>;
    }
});

var Course = React.createClass({
    render: function () {
        return <li className="list-group-item">
            <div className="row">
                <div className="col-xs-8">
                    <b>{ this.props.name }</b> <br />
                    <em> Semester { this.props.semester } </em>
                </div>
                <div className="col-xs-3">
                    { this.props.ec } EC
                </div>
            </div>

        </li>;
    }
});