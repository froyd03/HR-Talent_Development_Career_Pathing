import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CloseIcon from '@mui/icons-material/Close';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import "../../style/navigation.css"

export default function Navigation(props){

  const navigationBtn = [
        {
            btnName:'Dashboard', 
            path: '/dashboard',
            btnIcon: <HomeRoundedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Job Roles', 
            path: '/roles',
            btnIcon:  <LocalLibraryRoundedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Courses', 
            path: '/courses',
            btnIcon: <SchoolRoundedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Development Plans', 
            path: '/developmentPlans',
            btnIcon: <TrendingUpSharpIcon sx={{fontSize: 22}}/>
        }
    ]

    const activePageRef = useRef([]);
    const [clickedIndex, setClickedIndex] = useState(0);

    useEffect(() => {
        handleActiveBtn(clickedIndex);
    }, [clickedIndex])
    
    function handleActiveBtn(index){
        activePageRef.current.forEach(element => {
            if(element.classList.contains('active')){
                element.classList.remove('active')
            }
        })
        setClickedIndex(index);
        activePageRef.current[props.index].classList.add('active');
    }

    const closeIconRef = useRef();
    function handleClose(){
        closeIconRef.current.classList.remove('sideBarActive');
    }

    return (
       <nav ref={closeIconRef}>
            <div className="close" onClick={handleClose}>
                <CloseIcon />
            </div>
           <div className="nav-header">
                <h5>Quick links</h5>
           </div>

           {navigationBtn.map((item, index) => 
                <Link key={index} to={item.path} onClick={() => handleActiveBtn(index)}>
                    <div    className='navBtn'
                            onClick={handleClose}
                            ref={(el) => activePageRef.current[index] = el}>
                            {item.btnIcon}
                            <span>{item.btnName}</span>
                    </div>
                </Link>
            )}
           
        </nav>   
    )
}