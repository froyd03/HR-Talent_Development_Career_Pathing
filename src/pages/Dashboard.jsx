import Header from "../components/Header"
import Navigation from "../components/Navigation"
import '../../style/global.css'
import '../../style/dashboard.css'
import { useState } from "react"
import * as React from "react";   
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";;
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ProgressBar from "../components/progressBar.jsx";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Dashboard(){

  const certificates = [
    "../../public/cert1.png",
    "../../public/cert2.png",
    "../../public/cert3.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === certificates.length - 1 ? 0 : prev + 1
    );
  };

  const handleDateClick = (info) => {
    alert("Date clicked: " + info.dateStr);
  };

  const [value, setValue] = React.useState(new Date());

  return (
    <>
      <Header icon={<HomeRoundedIcon sx={{color: '#5765F3'}}/>} title="Dashboard"/>
      <Navigation index={0}/>

      <section>
        <div className="main-container">
          <div className="content1">
            <div className="content-header">
              <h3>Course Progress</h3>
            </div>
            <ProgressBar 
                title="leadership 101" 
                progress={80}
              />
              <ProgressBar 
                title="Advance Data Science" 
                progress={60} 
              />
          </div>
          <div className="content2">
            <div className="content-header">
              <h3>Skill Badges</h3>
            </div>
            <div className="skillbadges">
              <WorkspacePremiumIcon sx={{color:'#FFD700'}}/>
              <span>Communication Skills</span>
            </div>
            <div className="skillbadges">
              <WorkspacePremiumIcon sx={{color:'#FFD700'}}/>
              <span>Java Fundamentals</span>
            </div>
            
          </div>
        </div>
        <div className="main-container">
          <div className="content1">
            <div className="content-header">
              <h3>Certifications Acquired</h3>
            </div>
            <div className="certificate-container">
              <div className="arrowBtn" onClick={prevSlide}>
                <ArrowBackIosNewIcon />
              </div>
              <div className="certificate-content">
                <img src={certificates[currentIndex]} width='100%' height='320px'/>
              </div>
              <div className="arrowBtn" onClick={nextSlide}>
                <ArrowForwardIosIcon />
              </div>
            </div>
            <div className="dot-container">
              {certificates.map((_, index) => (
                <div
                  key={index}
                  className="dot-indicator"
                  style={{backgroundColor: index === currentIndex ? "#5765F3" : "#C1C1C1"}}
                ></div>
              ))}
            </div>
          </div>
          <div className="content2">
            <div className="content-header">
              <h3>Upcomming Trainings</h3>
            </div>
            
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DateCalendar
                sx={{margin: "0", width: "100%", }}
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          
          </div>    
        </div>
        <div className="main-container">
          <div className="content-cover">
            <div className="content-header">
              <h3>Suggested Learning Paths</h3>
            </div>

            <div className="learning-card">
              <div className="card-content">
                <div className="card-count">1</div>
                <div className="card-description">
                  <h5>Title</h5>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia tempora voluptas velit, quod fuga eaque. Possimus soluta inventore sint nam quo? Consectetur eaque impedit quia aspernatur minima eius excepturi porro!</p>
                </div>
              </div>
              <div className="actionBtn">
                <label>Start Now</label>
                <ArrowForwardIosIcon />
              </div>
            </div>

            <div className="learning-card">
              <div className="card-content">
                <div className="card-count">2</div>
                <div className="card-description">
                  <h5>Title</h5>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia tempora voluptas velit, quod fuga eaque. Possimus soluta inventore sint nam quo? Consectetur eaque impedit quia aspernatur minima eius excepturi porro!</p>
                </div>
              </div>
              <div className="actionBtn">
                <label>Start Now</label>
                <ArrowForwardIosIcon />
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
}