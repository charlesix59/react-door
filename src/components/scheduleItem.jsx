import {List} from "antd";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./draggableItems";

const ScheduleItem = function (props){
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.SCHEDULE_ITEM,
        end:(draggedItem, monitor)=>{
            if (monitor.didDrop()){
                props.changeData(props.index,props.item.id)
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    return(
        <>
            <List.Item id={props.index} ref={drag} style={{opacity: isDragging ? 0.5 : 1}}>
                <List.Item.Meta
                    id={props.item.id}
                    title={props.item.title}
                    description={props.item.date}
                />
            </List.Item>
        </>
    )
}
export default ScheduleItem
