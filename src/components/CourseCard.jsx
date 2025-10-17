import '../../style/global.css'
import '../../style/courses.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProgressBar from "../components/ProgressBar.jsx"

export default function CourseCard(props){
    return(
        <div style={{backgroundColor: `${props.subColor}`}} className="sub-box">
            <div style={{backgroundColor: `${props.mainColor}`}} className="main-box">
                <div className="header-course">
                    <h4>{props.courseTitle}</h4>
                    <MoreVertIcon />
                </div>
                <div className="footer-box">
                    <p>8 Modules</p>
                    <p>12 Training Sessions</p>
                    <ProgressBar progress={props.courseProgress}/>
                </div>
            </div>
            <span className="btnStatus">
                <p>Continue</p>
                <ArrowForwardIosIcon sx={{color: "#0000006a"}} />
            </span>
        </div>
    )
}