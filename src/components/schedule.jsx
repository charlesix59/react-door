import {Calendar, Col, Row, Empty, Button, Modal, TimePicker, Input, List} from "antd";
import {useContext, useEffect, useState} from "react";
import {dbContext} from "../App";
import {addData, getDataByIndex} from "../utils/dbUtils";

/**
* this was a Calendar
* */
function Schedule(){
    // variables about Date
    let now = new Date();
    now = now.getFullYear()+"-"+((now.getMonth()+1)>9?"":"0")+(now.getMonth()+1)+"-"+now.getDate();
    const [date,setDate] = useState(now)
    const [beginTime,setBeginTime] = useState(now)
    const [endTime,setEndTime] = useState(now)
    const [title,setTitle] = useState("")

    // variables about Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const format = 'HH:mm'
    const { RangePicker } = TimePicker;

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
    const showModel = () =>{
        setOpen(true);
    }
    const handleOk = () =>{
        setConfirmLoading(true);
        addData(db,"schedule",{
            "date":date,
            "beginTime":beginTime,
            "endTime":endTime,
            "title":title
        }).then((e)=>{
                console.log(e)
                setConfirmLoading(false)
                setOpen(false)
            }
        )
    }
    const handleCancel = () =>{
        setOpen(false)
    }
    const onTimeSelected = (e) =>{
        setBeginTime(e[0])
        setEndTime(e[1])
    }
    const onTitleChanged = (e) =>{
        setTitle(e.target.value)
    }


    return (
        <Row className={"space-container"}>
            <Col span={11}>
                <div className="calendar-demo">
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} onSelect={onSelect}/>
                </div>
            </Col>
            <Col offset={2} span={11}>
                <Button type={"primary"} onClick={showModel}>
                    添加日程
                </Button>
                <Modal
                    title="Title"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>事件时间：</p>
                    <RangePicker format={format} onChange={onTimeSelected}/>
                    <p>事件名称：</p>
                    <Input onChange={onTitleChanged}/>
                </Modal>
                <br/>
                <GetSchedule date={date}/>
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
    const [data,setData] = useState([])

    useEffect(()=>{
        new Promise((resolve, reject) => {
            if (db)
                resolve()
            else
                reject()
        }).then(()=>{
            getDataByIndex(db,"schedule","date",props.date).then(e=>{
                setData(e)
            })
        }).catch(e=>{console.error(e)})
    },[db,props])

    if(!data||data.length===0){
        return <Empty/>
    }

    const onListItemClickHandler = function(e){
        console.log(e.target.parentNode.parentNode.id)
    }

    // console.log(data)

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            onClick={onListItemClickHandler}
            renderItem={(item, index) => (
                <List.Item id={index}>
                    <List.Item.Meta
                        id={item.id}
                        title={item.title}
                        description={item.date}
                    />
                </List.Item>
            )}
        />
    );
}