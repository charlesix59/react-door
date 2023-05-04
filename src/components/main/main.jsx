import Clock from 'react-live-clock';
import MultiSearch from "./search/multiSearch";
import Schedule from "./schedule/schedule";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function Main(){
    return(
        <div style={{textAlign:"center"}}>
            <p style={{fontSize:"7rem",color:"silver",margin:0,padding:0}}>
                <Clock format={'HH:mm:ss'} ticking={true}/>
            </p>
            <MultiSearch/>
            <DndProvider backend={HTML5Backend}>
                <Schedule/>
            </DndProvider>
        </div>
    )
}
export default Main;