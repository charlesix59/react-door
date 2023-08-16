import Clock from 'react-live-clock';
import MultiSearch from "./search/multiSearch";
import Schedule from "./schedule/schedule";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function Main(){
    return(
        <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <p style={{fontSize:"7rem",color:"silver",textAlign:"center",margin:"0 auto"}}>
                <Clock format={'HH:mm:ss'} ticking={true}/>
            </p>
            <MultiSearch/>
            <div style={{flexGrow:1,justifyContent:"center",display:"flex",justifySelf:"center",alignItems:"center"}}>
                <DndProvider backend={HTML5Backend}>
                    <Schedule/>
                </DndProvider>
            </div>
        </div>
    )
}
export default Main;