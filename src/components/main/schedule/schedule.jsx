import {Calendar, Col, Row, Empty, Button, Modal, TimePicker, Input, List} from "antd";
import {useContext, useEffect, useState} from "react";
import {dbContext} from "../../../App";
import {deleteData, getDataByIndex, getDataByKey, updateData} from "../../../utils/dbUtils";
import ScheduleItem from "./scheduleItem";
import DeleteBin from "./deleteBin";
import dayjs from "dayjs";

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

    // functions about Data
    const onPanelChange = (value) => {
        setDate(value.format('YYYY-MM-DD'))
    };
    const onSelect = (value) => {
        setDate(value.format('YYYY-MM-DD'))
    }

    //functions about Model
    useEffect( () => {
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
            }catch (e){
                console.log(e);
            }
        }
        fetchData().then(r => r);
    },[db, itemId])
    const showModel = () => {
        setOpen(true);
    }
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
                setConfirmLoading(false)
                setOpen(false)
                setItemId(void 0)
            }
        )
    }
    const handleCancel = () => {
        setOpen(false)
    }
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
            <Col offset={2} span={11} style={{display: "relative"}}>
                <Button type={"primary"} onClick={showModel}>
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
                    <RangePicker format={format} onChange={onTimeSelected} value={[beginTime,endTime]}/>
                    <p>事件名称：</p>
                    <Input onChange={onTitleChanged} value={title}/>
                </Modal>
                <br/>
                <GetSchedule date={date} setOpen={setOpen} setId={setItemId}/>
            </Col>
        </Row>
    );
}

export default Schedule

/**
 * subcomponent in calendar, to show your schedule in specify day
 * @Param props: date information
 * */
function GetSchedule(props) {
    const db = useContext(dbContext)
    const [data, setData] = useState([])
    const [state, setState] = useState(false)

    useEffect(() => {
        new Promise((resolve, reject) => {
            if (db)
                resolve()
            else
                reject()
        }).then(() => {
            getDataByIndex(db, "schedule", "date", props.date).then(e => {
                setData(e)
            })
        }).catch(e => {
            console.error(e)
        })
    }, [db, props, state])

    if (!data || data.length === 0) {
        return <Empty/>
    }

    const onListItemClickHandler = function (e) {
        if(e.target.tagName==='LI') {
            return;
        }
        props.setOpen(true)
        props.setId(parseInt(e.target.parentNode.parentNode.id))
    }

    const changeDate = function (index, id) {
        deleteData(db, "schedule", id).then(() => {
            setState(state => {
                return !state;
            });
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                onClick={onListItemClickHandler}
                style={{overflowY: "scroll", height: '60%'}}
                renderItem={(item, index) => (
                    <ScheduleItem key={item.id} item={item} index={index} changeData={changeDate}/>
                )}
            />
            <DeleteBin/>
        </>
    );
}