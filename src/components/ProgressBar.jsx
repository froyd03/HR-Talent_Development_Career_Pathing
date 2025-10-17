import '../../style/global.css'

export default function ProgressBar(props){
    return(
        <div className="main-container-progressBar">
            <label>{props.title}</label>
            <div className="containerBar">
                <div className="progressBar">
                    <div className="gapBar" style={{width: `${props.progress}%`}}></div>
                </div>
                <p className="pStatus">{props.progress}%</p>
            </div>
        </div>
    )
}