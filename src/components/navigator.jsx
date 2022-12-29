import {Row} from "antd";
import Favorite from "./favorite";

function Navigator(){
    return(
        <div className={"space-container"}>
            <Row justify="space-between">
                <Favorite/>
            </Row>
        </div>
    )
}
export default Navigator