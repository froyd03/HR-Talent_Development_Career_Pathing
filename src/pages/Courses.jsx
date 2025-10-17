import Header from "../components/Header"
import Navigation from "../components/Navigation"
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SyncIcon from '@mui/icons-material/Sync';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CourseCard from "../components/CourseCard.jsx";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import axios from "axios";
import { useEffect, useState } from "react";
import '../../style/global.css'
import '../../style/courses.css'

export default function Courses(){

    const [isShowStarred, setShowStarred] = useState(false);
    const [isArchiveActive, setArchiveActive] = useState(false);

    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
      axios.get('http://localhost/talent&career/adminBackend/pages/courses.php')
        .then(response => setCourseData(response?.data.data))
        .catch(error => console.log(error));
    }, [])

    const [isShowForm, setShowForm] = useState(false);
    function handleEnrollBtn(courseToEnroll){
      setShowForm(!isShowForm);
    }

    return (
      <>
        <Header icon={<SchoolRoundedIcon sx={{color: '#5765F3'}}/>} title="Courses"/>
        <Navigation index={2}/>
        <section>
          <div className="overview-container">
            <div className="row">
              <div className="row-header">
                <FormatListBulletedIcon sx={{color: "#3BB2E1"}}/>
                <h3>Enrolled Courses</h3>
              </div>
              <div style={{backgroundColor: "#3BB2E1"}} className="row-count">
                <label>8</label>
              </div>
            </div>
            <div className="row">
              <div className="row-header">
                <SyncIcon sx={{color: "#FECB16"}}/>
                <h3>In-Progress</h3>
              </div>
              <div style={{backgroundColor: "#FECB16"}} className="row-count">
                <label>8</label>
              </div>
            </div>
            <div className="row">
              <div className="row-header">
                <TaskAltOutlinedIcon sx={{color: "#49D866"}}/>
                <h3>Finished</h3>
              </div>
              <div style={{backgroundColor: "#49D866"}} className="row-count">
                <label>8</label>
              </div>
            </div>
          </div>
          <div className="txt-line">
            <h3>Enrolled Courses</h3>
          </div>
          <div className="course-actions">
            <div className="filter">
              <TuneIcon />
              <select name="cars" id="cars">
                <option autoFocus>Filter by:</option>
                <option value="sample1">sample2</option>
                <option value="sample1">sample3</option>
                <option value="sample1">sample4</option>
                <option value="sample1">sample5</option>
              </select>
            </div>
            <div className="action-footer">
              {isArchiveActive ? 
                <ArchiveIcon onClick={() => setArchiveActive(false)}/> 
                :<ArchiveOutlinedIcon onClick={() => setArchiveActive(true)}/>
              }
              {isShowStarred ? 
                  <StarIcon onClick={() => setShowStarred(false)}/>
                : <StarBorderPurple500OutlinedIcon onClick={() => setShowStarred(true)}/>
              }
            </div>
          </div>
          <div className="courseCard-container">
            <div className="row">
              <div className="arrowBtn">
                <ArrowBackIosNewIcon />
              </div>
            </div>
            <div className="cards-container">
              <CourseCard 
                courseTitle="Data Analyst"
                courseProgress={20}
                mainColor="#5AC7F9"
                subColor="#CCEBF6"
              />
              <CourseCard 
                courseTitle="Agile Project Development"
                courseProgress={60}
                mainColor="#5AC7F9"
                subColor="#CCEBF6"
              />
              <CourseCard 
                courseTitle="Javascript Basics"
                courseProgress={20}
                mainColor="#49D866"
                subColor="#C4F2CD"
              />
            </div>
            <div className="row">
              <div className="arrowBtn">
                <ArrowForwardIosIcon />
              </div>
            </div>
          </div>
          <div className="txt-line">
            <h3>Available Courses</h3>
          </div>
          
          <div className="tblContainer">
            <div className="roles-actions">
              <div className="input">
                <input type="text" placeholder="Search Courses" />
                <SearchIcon />
              </div>
              <div className="filter">
              <TuneIcon />
              <select name="cars" id="cars">
                <option autoFocus>Filter by:</option>
                <option value="sample1">Operations managers</option>
                <option value="sample1">Drivers</option>
                <option value="sample1">sample4</option>
                <option value="sample1">sample5</option>
              </select>
            </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Description</th>
                  <th>Format</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courseData && courseData.map((course, index) =>
                  <tr key={index}>
                    <td className="tdCourse">{course.course_name}</td>
                    <td className="tdDepartment">{course.department}</td>
                    <td className="tdDescription">{course.description}</td>
                    <td>{course.format}</td>
                    <td className="tdActions">
                      <RemoveRedEyeOutlinedIcon />
                      <button onClick={() => handleEnrollBtn(index)} className="selectBtn">Enroll</button>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
            
          </div>
        </section>
        {isShowForm && <div className="modal">
            <div className="modal-form">
              
            </div>
        </div>}
      </>
    )
}