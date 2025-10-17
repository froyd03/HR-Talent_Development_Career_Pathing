import Header from "../components/Header"
import Navigation from "../components/Navigation"
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded'
import ProgressBar from "../components/progressBar";
import '../../style/global.css'
import '../../style/roles.css'
import EastIcon from '@mui/icons-material/East';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RoleCard from "../components/RoleCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Roles(){

    const competencies = [
      {
        competencyName: "Unlock Skills", 
        competency: ["react", "node", "REST"]
      },
      {
        competencyName: "Learnings", 
        competency: ["analytical Thinking", "Team collaboration"]
      },
      {
        competencyName: "About this course", 
        competency: ["7 Training Sessions", "5 seminars"]
      }
    ]

    function handleShowCompetencies(){
      
    }
    
    const [rolesData, setRolesData] = useState([])
    useEffect(() => {
      axios.get('http://localhost/talent&career/adminBackend/pages/getJobRoles.php')
          .then(response => setRolesData(response.data))
          .catch(error => consple.logg(error))
    }, [])

    return (
      <>
      <Header icon={<LocalLibraryRoundedIcon sx={{color: '#5765F3'}}/>} title="Job Roles"/>
      <Navigation index={1}/>

      <section>
        <div className="overview-container">
          <div className="current-role">
            <h3>Current Job Role</h3>
            <div className="job-content">
              <WorkIcon />
              <label>Junior Web Developer</label>    
            </div>
            
          </div>
          <EastIcon sx={{fontSize: "40px"}}/>
          <div className="next-role">
            <h3>Target Role</h3>
            <div className="job-content">
              <WorkOutlineIcon />
              <label>Junior Web Developer</label>
            </div>
            <ProgressBar progress={30} />
          </div>
          <div className="skills-role">
            <h3>Required Skills</h3>
            <div className="job-content">
              <ul>
                <li>React JS</li>
                <li>Node JS</li>
                <li>REST API</li>
                <li>Advance Database</li>
                <li>Node JS</li>
                <li>REST API</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="txt-line">
          <h3>Available Job Roles</h3>
        </div>
        
        <div className="role-main-container">
          <div className="roles-actions">
            <div className="input">
              <input type="text" placeholder="Search Role" />
              <SearchIcon />
            </div>
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
          </div>
          {rolesData && rolesData.map((roles, index) => 
            <RoleCard
              key={index} 
              title={roles.role_name}
              department={roles.department}
              description={roles.description}
              skills={roles.skills}
              behavior={roles.behavior}
              knowledge={roles.knowldge}
            />
          )}
          <RoleCard 
            title="Web Developer"
            department="IT Department"
            competencyData={competencies}
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, nostrum perspiciatis ipsa quaerat eaque laborum tenetur doloribus aspernatur exercitationem debitis consequuntur odit inventore iure, mollitia laboriosam, quis quod a quam."
            btnName="Select"
          />
          <RoleCard 
            title="Web Developer"
            department="IT Department"
            competencyData={competencies}
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, nostrum perspiciatis ipsa quaerat eaque laborum tenetur doloribus aspernatur exercitationem debitis consequuntur odit inventore iure, mollitia laboriosam, quis quod a quam."
            btnName="Select"
          />

        </div>
      </section>
      </>
    )
}