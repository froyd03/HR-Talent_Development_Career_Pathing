import Header from "../components/Header"
import Navigation from "../components/Navigation"
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import '../../style/global.css'

export default function DevelopmentPlans(){
    return(
        <>
        <Header icon={<TrendingUpSharpIcon sx={{color: '#5765F3'}}/>} title="Development Plans"/>
        <Navigation index={3}/>
        <section>
            <h1>asasd</h1>
        </section>
        </>
    )
}