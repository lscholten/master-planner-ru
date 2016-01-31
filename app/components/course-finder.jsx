import React from 'react';

import CourseList from './course-list';
import CourseStore from '../stores/course-store';

export default class CourseFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courses: []};
    }

    onChange(e) {
        if (e.target.value.length < 3) {
            this.setState({courses: []});
            return;
        }
        let searchString = e.target.value;
        let found = [];

        for (let key in CourseStore.courses) {
            var course = CourseStore.courses[key];
            if (course.name.toLowerCase().includes(searchString.toLowerCase())) {
                found.push(key);
            }
        }

        this.setState({courses: found});
    }

    splitCourses(n) {
        let a = this.state.courses;
        var len = a.length, out = [], i = 0;
        while (i < len) {
            var size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
        return out;
    }

    render() {
        let courses = this.splitCourses(4);

        return (
            <div className="row" style={{"marginBottom":"200px"}}>
                <div className="col-xs-12">
                    <h2>Course finder</h2>
                </div>
                <div className="col-xs-12" style={{ marginBottom: "20px" }}>
                    <div className="input-group">
                        <span className="input-group-addon">Search for course name</span>
                        <input type="text" className="form-control" onChange={ this.onChange.bind(this) }/>
                    </div>
                </div>
                {
                    courses.map((crs, i) => {
                        return <CourseList key={i} name="Results" courses={crs}/>
                    })
                }
            </div>
        );
    }
}