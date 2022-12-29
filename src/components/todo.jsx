import {Divider} from "antd";
import Daily from "./daily";
import Task from "./task";

function Todo(){
    return(
        <div>
            <Divider orientation="left">世界任务</Divider>
            <Task/>
            <Divider orientation="left">每日委托</Divider>
            <Daily/>
        </div>
    )
}
export default Todo