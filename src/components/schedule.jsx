import {Calendar, Col, Row, Badge, Card, Empty} from "antd";
import request from "../utils/request";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

function Schedule(){
    let now = new Date();
    now = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    const [date,setDate] = useState(now)
    const onPanelChange = (value, mode) => {
        // console.log(value.format('YYYY-MM-DD'), mode);
        setDate(value.format('YYYY-MM-DD'))
    };
    const onSelect = (value) => {
        // console.log(value.format('YYYY-MM-DD'))
        setDate(value.format('YYYY-MM-DD'))
    }
    return (
        <Row className={"space-container"}>
            <Col span={11}>
                <div className="calendar-demo">
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} onSelect={onSelect}/>
                </div>
            </Col>
            <Col offset={2} span={11}>
                <GetSchedule date={date}/>
            </Col>
        </Row>
    );
}
export default Schedule

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
            <Badge.Ribbon text="2022-12-31">
                <Card size="small">
                    {data[0].title}
                </Card>
            </Badge.Ribbon>
        </div>
    );
}