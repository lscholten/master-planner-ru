var Application = React.createClass({
    getInitialState: function () {
        return {courseRepo: [], programRepo: [], courses: {"y1": [], "y2": []}};
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
    addCourse: function (year, course) {
        year1 = this.state.courses.y1;
        year2 = this.state.courses.y2;
        if (year == 1){
            year1 = year1.concat([this.state.courseRepo[course]]);
        } else {
            year2 = year2.concat([this.state.courseRepo[course]]);
        }
        this.setState({courses:{"y1": year1, "y2": year2}});
    },
    render: function () {
        return <div>
            <SemesterList coursesPicked={this.state.courses} courseRepo={this.state.courseRepo}  />
            <StudyProgramList programs={this.state.programRepo} repos={this.state} addCourse={ this.addCourse }/>
        </div>;
    }
});

var SemesterList = React.createClass({
    render: function () {
        var y1s1 = this.props.coursesPicked.y1.filter(function(el) {
            return el.semester == 1;
        });
        var y1s2 = this.props.coursesPicked.y1.filter(function(el) {
            return el.semester == 2;
        }) ;
        var y2s1 = this.props.coursesPicked.y2.filter(function(el) {
            return el.semester == 1;
        });
        var y2s2 = this.props.coursesPicked.y2.filter(function(el) {
            return el.semester == 2;
        });

        return <div className="row">
            <Semester year={1} semester={1} courses={y1s1} courseRepo={this.props.courseRepo} />
            <Semester year={1} semester={2} courses={y1s2} courseRepo={this.props.courseRepo} />
            <Semester year={2} semester={1} courses={y2s1} courseRepo={this.props.courseRepo} />
            <Semester year={2} semester={2} courses={y2s2} courseRepo={this.props.courseRepo} />
        </div>;
    }
});

var Semester = React.createClass({
    render: function () {
        var totalEc = this.props.courses.reduce(function(total, el) {
           return total += el.ec;
        }, 0);

        return <div className="col-xs-3">
            <div className="panel panel-default">
                <div className="panel-heading">
                    Year { this.props.year } semester {this.props.semester}
                    <div className="badge pull-right">{ totalEc }</div>
                </div>
                { this.props.courses.map(function (course) {
                    return <Course {...course} key={course.code} disableDragging={true} />
                }.bind(this))
                }
            </div>
        </div>;
    }
});

var StudyProgramList = React.createClass({
    render: function () {
        return <div>
            { this.props.programs.map(function (studyProgram) {
                return <StudyProgram program={studyProgram} key={studyProgram.name} repos={this.props.repos}
                                     addCourse={ this.props.addCourse }/>
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
                        courseRepo={ this.props.repos.courseRepo } addCourse={ this.props.addCourse }/>
            { this.props.program.trackElectiveGroups.map(function (group) {
                return <CourseList name={group.groupName} courses={group.courses}
                                   courseRepo={ this.props.repos.courseRepo} addCourse={ this.props.addCourse }/>
            }.bind(this))
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

                    return <Course {...courseObj} key={course} addCourse={this.props.addCourse} courseCode={course} />
                }.bind(this))
                }
            </div>
        </div>;
    }
});

var Course = React.createClass({
    componentDidMount: function () {
        if (this.props.disableDragging != undefined) {
            return;
        }

        var container = React.findDOMNode(this);
        var dropYear1 = document.getElementById('year-1');
        var dropYear2 = document.getElementById('year-2');
        var drag = dragula([container, dropYear1, dropYear2], {
            copy: true,
            accepts: function (src, dest) {
                return dest != container;
            }
        });

        drag.on('drop', function (drake, target, src) {
            if (target == dropYear1) {
                this.props.addCourse(1, this.props.courseCode);
            } else {
                this.props.addCourse(2, this.props.courseCode);
            }
            drake.remove();
        }.bind(this));
    },
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