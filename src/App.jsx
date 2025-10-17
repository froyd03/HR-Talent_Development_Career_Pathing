import Dashboard from './pages/Dashboard.jsx'
import Courses from './pages/Courses.jsx'
import Roles from './pages/Roles.jsx'
import Certificates from './pages/Certificates.jsx'
import Login from './pages/Login.jsx';
import DevelopmentPlans from './pages/DevelopmentPlans.jsx'
import { HashRouter, Routes, Route } from 'react-router-dom'

export default function App(){
    return (
        <HashRouter>
            <Routes>
                <Route 
                    path='/' 
                    element={
                        <Login />
                    }
                />
                <Route 
                    path='/dashboard' 
                    element={
                        <Dashboard />
                    }
                />
                <Route 
                    path='/roles'
                    element={
                        <Roles />   
                    }
                />
                <Route
                    path='/courses'
                    element={
                        <Courses/>
                    }
                />
                
                
                <Route
                    path='/developmentPlans'
                    element={
                        <DevelopmentPlans />
                    }
                />

            </Routes>
        </HashRouter>
    )
}