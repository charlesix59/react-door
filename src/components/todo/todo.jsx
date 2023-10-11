import {Button, DatePicker, Divider, Input, Modal, Select} from "antd";
import Daily from "./daily";
import Task from "./task";
import {useContext, useState} from "react";
import {dbContext, messageContext} from "../../App";
import {addData} from "../../utils/dbUtils";

/**
 * this component contain the tow sub to-do component and add new to-do
 * @return {JSX.Element}
 * @constructor
 */
function Todo() {
    // state about task type in model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    // ture means it's task(world task), false means it's daily task
    const [isModeTask, setIsModeTask] = useState(true);

    const db = useContext(dbContext)
    const message = useContext(messageContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [endTime, setEndTime] = useState()
    const [dailyCount, setDailyCount] = useState(0)
    const [worldCount, setWorldCount] = useState(0)

    const showModel = () => {
        setOpen(true);
    }
    const handleOk = () => {
        if (!title || !description || (!endTime && isModeTask)) {
            message.open({
                type: "error",
                content: "所有字段都为必填，不能为空"
            })
            return
        }
        setConfirmLoading(true);
        addData(db, "task", {
            "type": isModeTask ? "task" : "daily",
            "title": title,
            "description": description,
            "endTime": endTime
        }).then(() => {
            message.open({
                type: "success",
                content: "添加任务成功"
            }).then(r => r)
            // change count to rerender sub
            if (isModeTask) {
                setWorldCount(c => c + 1)
            } else {
                setDailyCount(c => c + 1)
            }
        }).catch(res => {
            console.log(res)
            message.open({
                type: "error",
                content: "添加任务失败，请查看console"
            }).then(r => r)
        }).finally(() => {
            setConfirmLoading(false);
            setOpen(false)
        })

    }
    const handleCancel = () => {
        setOpen(false)
    }
    const onModeChanged = (e) => {
        if (e === "task") {
            setIsModeTask(true)
        } else {
            setIsModeTask(false)
        }
    }
    const onDateChanged = (e) => {
        setEndTime(e?.toString())
    }
    const onTitleChanged = (e) => {
        setTitle(e.target.value)
    }
    const onDescChanged = (e) => {
        setDescription(e.target.value)
    }

    return (
        <div>
            <Button type={"primary"}
                    style={{width: "80%", display: "block", margin: "10%"}}
                    onClick={showModel}
            >添加任务</Button>
            <Modal
                title="添加任务"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                // we use XOR option to judge if dailyCount or worldCount was changed
                // only when db operations successfully, the two state will change
                // SO, if add Data successfully, init the state, otherwise keep the state
                key={dailyCount^worldCount}
            >
                <p>事件类型：</p>
                <Select
                    defaultValue="task"
                    onChange={onModeChanged}
                    options={[
                        {value: 'task', label: '世界任务'},
                        {value: 'daily', label: '日常任务'},
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
            <Task count={worldCount}/>
            <Divider orientation="left">每日委托</Divider>
            <Daily count={dailyCount}/>
        </div>
    )
}

export default Todo