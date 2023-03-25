import {Button, DatePicker, Divider, Input, Modal, Select} from "antd";
import Daily from "./daily";
import Task from "./task";
import {useState} from "react";

function Todo(){
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isModeTask, setIsModeTask] = useState(true);

    const showModel = () =>{
        setOpen(true);
    }
    const handleOk = () =>{
        setConfirmLoading(true);
        //todo: loading data form somewhere
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
        //todo: handel modeChange
    }
    const onDateChanged = (e)=>{
        console.log(e)
        //todo: handel date
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
                <Input/>
                <p>事件描述：</p>
                <Input/>
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