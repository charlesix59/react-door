import {useDrop} from "react-dnd";
import {ItemTypes} from "./draggableItems";

const DeleteBin = function (){
    const [{isOver},drop] = useDrop(()=>({
        accept:ItemTypes.SCHEDULE_ITEM,
        drop:()=>{
            console.log("I drop here!")
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))
    return(
        <div
            style={{
                left:"50%",
                transform:"translate(-50%,-50%)",
                width:"8rem",
                padding:"10px",
                background:isOver?"red":"grey",
                opacity:"0.7",
                position:"absolute",
                bottom:0
            }}
             ref={drop}
        >{isOver?"松开删除":"拖拽到此处删除"}</div>
    )
}
export default DeleteBin