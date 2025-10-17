import { useEffect, useState } from "react";
import "../../style/roles.css"
import { motion, AnimatePresence } from "framer-motion";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function RoleCard(props){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="role-content">
            <div className="role-title">
              <h4>{props.title}</h4>
              <label className="department-name">{props.department}</label>
            </div>
            <div className="dropBtn" onClick={() => setIsOpen(!isOpen)}>
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}>
                    <ArrowForwardIosIcon sx={{fontSize: "28px"}}/>
                </motion.div>
              
            </div>
            <p>{props.description} </p>
           <AnimatePresence>
                {isOpen && (
                <motion.div
                    className="main-competency"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="competency-container">
                        <div>
                            <h4>Unlock Skills</h4>
                            {props.skills.map((value, i) => 
                                <li key={i}>{value}</li>
                            )}
                        </div>
                        <div>
                            <h4>Behavior</h4>
                            {props.behavior.map((value, i) => 
                                <li key={i}>{value}</li>
                            )}
                        </div>
                        <div>
                            <h4>Knowledge</h4>
                            {props.knowledge.map((value, i) => 
                                <li key={i}>{value}</li>
                            )}
                        </div>
                        
                    </div>
                        <button className="selectBtn">Select</button>

                </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}