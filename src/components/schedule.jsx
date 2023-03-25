import {Calendar, Col, Row, Badge, Card, Empty, Button, Modal, TimePicker, Input} from "antd";
import request from "../utils/request";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

/* this was a Calendar
* */
function Schedule(){
    // variables about Date
    let now = new Date();
    now = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    const [date,setDate] = useState(now)

    // variables about Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const format = 'HH:mm'
    const { RangePicker } = TimePicker;

    // functions about Data
    const onPanelChange = (value, mode) => {
        // console.log(value.format('YYYY-MM-DD'), mode);
        setDate(value.format('YYYY-MM-DD'))
    };
    const onSelect = (value) => {
        // console.log(value.format('YYYY-MM-DD'))
        setDate(value.format('YYYY-MM-DD'))
    }

    //functions about Model
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
    const onTimeSelected = (e) =>{
        console.log(e)
        // todo: handel date data
    }
    const onTitleChanged = (e) =>{
        console.log(e)
        //todo: handel event title
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

/* subcomponent in calendar, to show your schedule in specify day
* @props: date information
* */
function GetSchedule(props) {
    // console.log(props.date)
    const {isLoading, error, data} = useQuery({
        queryKey: ["repoData",props.date],
        queryFn: () =>
            request
                .get("/schedule/"+props.date)
                .then((res) => {
                    // console.log(res.data)
                    return res.data
                }),
        refetchOnWindowFocus:false,
        refetchOnMount:true,
    });

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    // console.log(data)

    if(!data||data.length===0){
        return <Empty/>
    }

    return (
        <div>
            <Badge.Ribbon text={props.date}>
                <Card size="small">
                    {data[0].title}
                </Card>
            </Badge.Ribbon>
        </div>
    );
}