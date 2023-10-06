import {Calendar, Col, Row, Button, Modal, TimePicker, Input} from "antd";
import {useContext, useEffect, useState} from "react";
import {dbContext, messageContext} from "../../../App";
import {getDataByKey, updateData} from "../../../utils/dbUtils";
import dayjs from "dayjs";
import ScheduleList from "./scheduleList";

/**
 * this was a Calendar
 * */
function Schedule() {
    // variables about Date
    let now = new Date();
    now = now.getFullYear() + "-" + ((now.getMonth() + 1) > 9 ? "" : "0") + (now.getMonth() + 1) + "-" + now.getDate();
    const [date, setDate] = useState(now)
    const [beginTime, setBeginTime] = useState(dayjs())
    const [endTime, setEndTime] = useState(dayjs())
    const [title, setTitle] = useState("")

    // variables about Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const format = 'HH:mm'
    const {RangePicker} = TimePicker;
    const [itemId, setItemId] = useState(undefined);

    //db
    const db = useContext(dbContext)
    // message
    const message = useContext(messageContext)

    // functions about Data
    const onPanelChange = (value) => {
        setDate(value.format('YYYY-MM-DD'))
    };
    const onSelect = (value) => {
        setDate(value.format('YYYY-MM-DD'))
    }

    /**
     * fetch schedule date from database
     */
    useEffect(() => {
        async function fetchData() {
            if (!itemId) {
                setBeginTime(dayjs());
                setEndTime(dayjs());
                setTitle('')
                return;
            }
            try {
                const data = await getDataByKey(db, 'schedule', itemId)
                setBeginTime(dayjs(data.beginTime.$d));
                setEndTime(dayjs(data.endTime.$d))
                setTitle(data.title)
            } catch (e) {
                message.open({
                    type: "error",
                    content: "数据库连接错误"
                })
            }
        }

        fetchData().then(r => r);
    }, [db, itemId, message])

    // function about model
    const showModel = () => {
        setOpen(true);
    }
    /**
     * when click confirm button, add schedule item into database
     */
    const handleOk = () => {
        let data = {
            "date": date,
            "beginTime": beginTime,
            "endTime": endTime,
            "title": title
        }
        setConfirmLoading(true);
        if (itemId) {
            data.id = itemId;
        }
        console.log(data)
        updateData(db, "schedule", data).then(() => {
                message.open({
                    type: "success",
                    content: "日程添加成功"
                })
                setConfirmLoading(false)
                setOpen(false)
                setItemId(void 0)
            }
        ).catch(e=>{
            console.log(e)
            message.open({
                type: "error",
                content: "日程写入失败，请查看console"
            })
        })
    }
    const handleCancel = () => {
        setOpen(false)
    }
    /**
     * handle time change event from range picker in model dialog
     * @param e event
     */
    const onTimeSelected = (e) => {
        setBeginTime(e[0])
        setEndTime(e[1])
    }
    const onTitleChanged = (e) => {
        setTitle(e.target.value)
    }


    return (
        <Row className={"space-container"}>
            <Col span={11}>
                <div className="calendar-demo">
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} onSelect={onSelect}/>
                </div>
            </Col>
            <Col offset={2} span={11} className={"schedule-item-container"}>
                <Button type={"primary"} onClick={showModel} className={"schedule-item-add-button"}>
                    添加日程
                </Button>
                <Modal
                    key={itemId}
                    title="设置日程"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>事件时间：</p>
                    <RangePicker format={format} onChange={onTimeSelected} value={[beginTime, endTime]}/>
                    <p>事件名称：</p>
                    <Input onChange={onTitleChanged} value={title}/>
                </Modal>
                <br/>
                <ScheduleList date={date} setOpen={setOpen} setId={setItemId}/>
            </Col>
        </Row>
    );
}

export default Schedule