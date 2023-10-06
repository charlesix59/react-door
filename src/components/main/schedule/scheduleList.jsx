import {useContext, useEffect, useState} from "react";
import {dbContext, messageContext} from "../../../App";
import {deleteData, getDataByIndex} from "../../../utils/dbUtils";
import {Empty, List} from "antd";
import ScheduleItem from "./scheduleItem";
import DeleteBin from "./deleteBin";

/**
 * subcomponent in calendar, to show your schedule in specify day
 * @Param props date information
 * */
export function ScheduleList(props) {
    const db = useContext(dbContext)
    const message = useContext(messageContext)
    const [data, setData] = useState([])
    const [state, setState] = useState(false)

    useEffect(() => {
        getDataByIndex(db, "schedule", "date", props.date).then(e => {
            setData(e)
        })
    }, [db, props, state])

    if (!data || data.length === 0) {
        return <Empty/>
    }

    const onListItemClickHandler = function (e) {
        if (e.target.tagName === 'LI') {
            return;
        }
        props.setOpen(true)
        // todo: optimize this event part
        props.setId(parseInt(e.target.parentNode.parentNode.id))
    }

    /**
     * this function will pass to Child and called by it that will delete selected schedule item
     * @param index selected item index in array
     * @param id selected item id in db
     */
    const changeDate = function (index, id) {
        deleteData(db, "schedule", id).then(() => {
            setState(state => {
                return !state;
            });
            message.open({
                type: "success",
                content: "日程删除成功"
            })
        }).catch(e => {
            console.log(e)
            message.open({
                type: "error",
                content: "日程删除失败，请查看console"
            })
        })
    }

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                onClick={onListItemClickHandler}
                className={"schedule-list"}
                renderItem={(item, index) => (
                    <ScheduleItem key={item.id} item={item} index={index} changeData={changeDate}/>
                )}
            />
            <DeleteBin/>
        </>
    );
}

export default ScheduleList