var Application = React.createClass({
    getInitialState: function() {
        return { screen: "program-selection", programRepo: [], programs: [], courses: {"y1": [], "y2": []}, courseRepo: {}};
    },
    componentDidMount: function() {
        $.ajax({
            url: "data/programs.json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({programRepo: data});
            }.bind(this)
        });
        $.ajax({
            url: "data/courses.json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({courseRepo: data})
            }.bind(this)
        });
    },
    selectPrograms: function(programs) {
        checkedSorted = [];
        this.state.programRepo.forEach(function(item) {
            if (programs.indexOf(item) > -1) {
                checkedSorted.push(item);
            }
        });

        this.setState({
            screen: "planner",
            programs: checkedSorted
        });
    },
    backToProgramSelection: function() {
        this.setState({
            screen: "program-selection"
        });
    },
    updateCourses: function(courses) {
        this.setState({"courses": courses});
    },
    render: function() {
        if (this.state.screen == "program-selection") {
            return <ProgramSelection
                programRepo={this.state.programRepo}
                selectPrograms={this.selectPrograms}
                selectedPrograms={this.state.programs}
                />;
        } else if (this.state.screen == "planner") {
            return <Planner
                courses={ this.state.courses }
                programs={ this.state.programs }
                backToProgramSelection={this.backToProgramSelection}
                updateCourses={this.updateCourses}
                courseRepo={this.state.courseRepo}
                programRepo={this.state.programRepo}
                />
        }
        return "Error";
    }
});

var ProgramSelection = React.createClass({
    getInitialState: function() {
        return {
            "selectedPrograms": this.props.selectedPrograms
        };
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.props.selectPrograms(this.state.selectedPrograms);
    },
    onChange: function(e) {
        target = e.target;
        checked = this.state.selectedPrograms;
        program = this.props.programRepo[parseInt(target.value)];
        if (checked.indexOf(program) > -1) {
            checked.splice(checked.indexOf(program), 1);
        } else {
            checked.push(program);
        }
        this.setState({"selectedPrograms": checked});
    },
    render: function() {
        return <div className="row">
            <div className="col-xs-12">
                <h2>First select programs from the list of possible programs.</h2>
                <form onSubmit={this.onSubmit}>
                    {
                        this.props.programRepo.map(function(program, i) {
                            return <div className="checkBox" key={program.name}>
                                <label>
                                    <input ref={program.name} type="checkbox" value={i}
                                           checked={this.state.selectedPrograms.indexOf(program) > -1}
                                           onChange={this.onChange}
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
});

var Planner = React.createClass({
    addCourse: function (year, course) {
        year1 = this.props.courses.y1;
        year2 = this.props.courses.y2;
        if (year == 1) {
            year1 = year1.concat([this.props.courseRepo[course]]);
        } else {
            year2 = year2.concat([this.props.courseRepo[course]]);
        }
        this.props.updateCourses({"y1": year1, "y2": year2});
    },
    removeCourse: function (coursecode) {
        year1 = this.props.courses.y1.filter(function (course) {
            return course.code != coursecode
        });
        year2 = this.props.courses.y2.filter(function (course) {
            return course.code != coursecode
        });
        this.props.updateCourses({"y1": year1, "y2": year2});
    },
    render: function () {
        pickedCourses = this.props.courses.y1.concat(this.props.courses.y2);
        return <div>
            <button className="btn" onClick={ this.props.backToProgramSelection }>
                Back to program selection
            </button>
            <SemesterList coursesPicked={this.props.courses} courseRepo={this.props.courseRepo}
                          removeCourse={ this.removeCourse }/>
            <StudyProgramList programs={this.props.programs} repos={{programRepo: this.props.programRepo, courseRepo: this.props.courseRepo}} addCourse={ this.addCourse }
                              picked={pickedCourses}/>
        </div>;
    }
});

var SemesterList = React.createClass({
    getSemesterCourses: function (year, semester) {
        return this.props.coursesPicked[year].filter(function (el) {
            return el.semester == semester;
        }.bind(semester));
    },
    getTotalEcs: function () {
        return this.props.coursesPicked.y1.reduce(function (carry, add) {
                return carry + add.ec
            }, 0) + this.props.coursesPicked.y2.reduce(function (carry, add) {
                return carry + add.ec
            }, 0);
    },
    render: function () {
        var y1s1 = this.getSemesterCourses("y1", 1);
        var y1s2 = this.getSemesterCourses("y1", 2);
        var y2s1 = this.getSemesterCourses("y2", 1);
        var y2s2 = this.getSemesterCourses("y2", 2);

        return <div className="row">
            <div className="col-xs-12">
                <h4>My master program</h4>
                <em>Total: { this.getTotalEcs() } ec</em>
            </div>
            <Semester year={1} semester={1} courses={y1s1} removeCourse={this.props.removeCourse}/>
            <Semester year={1} semester={2} courses={y1s2} removeCourse={this.props.removeCourse}/>
            <Semester year={2} semester={1} courses={y2s1} removeCourse={this.props.removeCourse}/>
            <Semester year={2} semester={2} courses={y2s2} removeCourse={this.props.removeCourse}/>
        </div>;
    }
});

var Semester = React.createClass({
    render: function () {
        var totalEc = this.props.courses.reduce(function (total, el) {
            return total + el.ec;
        }, 0);

        return <div className="col-xs-3">
            <div className="panel panel-default">
                <div className="panel-heading">
                    Year { this.props.year } semester {this.props.semester}
                    <div className="badge pull-right">{ totalEc }</div>
                </div>
                { this.props.courses.map(function (course) {
                    return <Course {...course} key={course.code} removalMode={true}
                                               removeCourse={this.props.removeCourse}/>
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
                                     addCourse={ this.props.addCourse } picked={this.props.picked}/>
            }.bind(this))
            }
        </div>;
    }
});

var StudyProgram = React.createClass({
    render: function () {
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
});

var CourseList = React.createClass({
    render: function () {
        return <div className="col-xs-3">
            <div className="panel panel-default">
                <div className="panel-heading">{ this.props.name }</div>
                { this.props.courses.map(function (course) {
                    var courseObj = this.props.courseRepo[course];
                    var isPicked = false;
                    for (var i = 0; i < this.props.picked.length; i++) {
                        if (this.props.picked[i].code == courseObj.code) {
                            isPicked = true;
                            break;
                        }
                    }

                    return <Course {...courseObj} key={course} addCourse={this.props.addCourse} courseCode={course}
                                                  isPicked={isPicked}/>
                }.bind(this))
                }
            </div>
        </div>;
    }
});

var Course = React.createClass({
    setupDragging: function () {
        var container = React.findDOMNode(this);
        var dropYear1 = document.getElementById('year-1');
        var dropYear2 = document.getElementById('year-2');
        var tmpthis = this;
        var drag = dragula([container, dropYear1, dropYear2], {
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
    },
    componentDidMount: function () {
        if (this.props.removalMode == undefined) {
            this.setupDragging();
        }
    },
    removeCourse: function (event) {
        this.props.removeCourse(this.props.code);
    },
    render: function () {
        liClass = "list-group-item";
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
                                  onClick={ this.removeCourse }></span>
                            : ""
                    }
                </div>
            </div>
        </li>;
    }
});

var Requirement = React.createClass({
    calcFulfilledEcs: function () {
        filteredPicked = this.props.picked.filter(function (course) {
            for (var i = 0; i < this.props.courseGroups.length; i++) {
                courses = this.props.program.courseGroups[this.props.courseGroups[i]].courses;
                for (var j = 0; j < courses.length; j++) {
                    if (courses[j] == course.code) {
                        return true;
                    }
                }
            }
            return false;
        }.bind(this));

        return filteredPicked.reduce(function (carry, elt) {
            return carry + elt.ec;
        }, 0);
    },
    render: function () {
        currentEc = this.calcFulfilledEcs();

        return <div className="row">
            <div className="col-xs-3"><em>{ this.props.description }</em>&nbsp;</div>
            <div className="col-xs-1">({currentEc}/{ this.props.ec} ec)</div>
            <div className="col-xs-8">
                Pick from: [
                {
                    this.props.courseGroups.map(function (cg) {
                        return this.props.program.courseGroups[cg].name + ", ";
                    }.bind(this))
                }
                ]
            </div>
        </div>
    }
});