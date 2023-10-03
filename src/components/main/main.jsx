import Clock from 'react-live-clock';
import MultiSearch from "./search/multiSearch";
import Schedule from "./schedule/schedule";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import "./main.css"

function Main(){
    return(
        <div className={"main-container"}>
            <p className={"clock-container"}>
                <Clock format={'HH:mm:ss'} ticking={true}/>
            </p>
            <MultiSearch/>
            <div className={"schedule-container"}>
                <DndProvider backend={HTML5Backend}>
                    <Schedule/>
                </DndProvider>
            </div>
        </div>
    )
}
export default Main;