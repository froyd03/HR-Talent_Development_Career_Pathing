import '../../style/header.css'
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useRef, useState, useEffect } from "react";

export default function Header(props){

    const inputRef = useRef(); // Reference for input
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        
        const handleWindowResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            setSearchVisible(false); //Reset search bar when resizing
        };

        const handleDocumentClick = (event) => {

            if (!activeSettingsRef.current.contains(event.target)) {
                SetActiveSetting(false);
            }

            const Navigation = document.querySelector('nav');
            if(!Navigation.contains(event.target)){
                Navigation.classList.remove('sideBarActive');
            }
        };

        document.addEventListener("click", handleDocumentClick);
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
            document.removeEventListener("click", handleDocumentClick);
        }
    }, []);

    useEffect(() => {
        if (searchVisible) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [searchVisible]);

    const activeSettingsRef = useRef();
    const [activeSetting, SetActiveSetting] = useState(false);

    function handleToggleSettings(event){
        document.querySelector('nav').classList.remove("sideBarActive");
        SetActiveSetting(a => !a);
        event.stopPropagation();
    }

    function toggleMenu(event){
        document.querySelector('nav').classList.toggle("sideBarActive");
        SetActiveSetting(false);
        event.stopPropagation();
    }

    function logOut(){
        
    }


    return (
         <>
        <header>
            <div className="menu-btn" onClick={toggleMenu}>
                <MenuOutlinedIcon />
            </div>
            <div className='header-title'>
                {props.icon}
                <h4>{props.title}</h4>
            </div>
            
            
            <div className="footer">
                <div className="links"><p>Home</p></div>
                <div className="links"><p>Courses</p></div>
                <div className="links"><p>Certificates</p></div>
                
                <div className="" ref={activeSettingsRef}>
                   <div className="notif-icon" onClick={handleToggleSettings}>
                        {activeSetting ? < PersonIcon sx={{color:'var(--secondaryTextColor)'}}/>  : 
                        <Person2OutlinedIcon sx={{color:'var(--secondaryTextColor)'}}/>}
                    </div>
                   {activeSetting && <div className="settings-container">
                        <h3>Account</h3>
                        <div className="setting-items">
                            <Person2OutlinedIcon />
                            <span className='settingBtn'>Profile</span>
                        </div>
                        <div className="setting-items" >
                            <SettingsOutlinedIcon/>
                            <span className='settingBtn'>Settings</span>
                        </div>
                        <div className="setting-items" onClick={logOut}>
                            <LogoutIcon/>
                            <span onClick={logOut} className='settingBtn'>Log out</span>
                        </div>
                    </div>}
                </div>
            </div>
        </header>
        </>
    )
}