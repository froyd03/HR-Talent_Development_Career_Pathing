import Header from "../components/Header"
import Navigation from "../components/Navigation"
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function Certificates(){

    return (
      <>
      <Header icon={<WorkspacePremiumIcon sx={{color: '#5765F3'}} /> } title="Certificates"/>
      <Navigation index={3}/>
      </>
    )
}