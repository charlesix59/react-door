import Clock from 'react-live-clock';
import MultiSearch from "./multiSearch";
import Schedule from "./schedule";

function Main(){
    return(
        <div style={{textAlign:"center"}}>
            <p style={{fontSize:"7rem",color:"silver",margin:0,padding:0}}>
                <Clock format={'HH:mm:ss'} ticking={true}/>
            </p>
            <MultiSearch/>
            <Schedule/>
        </div>
    )
}
export default Main;