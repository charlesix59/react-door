import {Button, DatePicker, Divider, Input, Modal, Select} from "antd";
import Daily from "./daily";
import Task from "./task";
import {useContext, useState} from "react";
import {dbContext} from "../../App";
import {addData} from "../../utils/dbUtils.ts";

function Todo(){
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isModeTask, setIsModeTask] = useState(true);

    const db = useContext(dbContext)
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [endTime,setEndTime] = useState()

    const showModel = () =>{
        setOpen(true);
    }
    const handleOk = () =>{
        setConfirmLoading(true);
        addData(db,"task",{
            "type":isModeTask?"task":"daily",
            "title":title,
            "description":description,
            "endTime":endTime
        }).then(()=>{
                setConfirmLoading(false)
            }
        )
        setConfirmLoading(false);
        setOpen(false)
    }
    const handleCancel = () =>{
        setOpen(false)
    }
    const onModeChanged = (e)=>{
        if(e==="task"){
            setIsModeTask(true)
        }
        else{
            setIsModeTask(false)
        }
    }
    const onDateChanged = (e)=>{
        setEndTime(e?.toString())
    }
    const onTitleChanged = (e)=>{
        setTitle(e.target.value)
    }
    const onDescChanged = (e)=>{
        setDescription(e.target.value)
    }

    return(
        <div>
            <Button type={"primary"}
                    style={{width:"80%",display:"block",margin:"10%"}}
                    onClick={showModel}
            >添加任务</Button>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>事件类型：</p>
                <Select
                    defaultValue="task"
                    onChange={onModeChanged}
                    options={[
                        { value: 'task', label: '世界任务' },
                        { value: 'daily', label: '日常任务' },
                    ]}
                />
                <p>事件名称：</p>
                <Input onChange={onTitleChanged}/>
                <p>事件描述：</p>
                <Input onChange={onDescChanged}/>
                <p>截止日期：</p>
                <DatePicker onChange={onDateChanged} disabled={!isModeTask}/>
            </Modal>
            <Divider orientation="left">世界任务</Divider>
            <Task/>
            <Divider orientation="left">每日委托</Divider>
            <Daily/>
        </div>
    )
}
export default Todo