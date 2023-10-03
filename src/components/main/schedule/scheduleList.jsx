import {useContext, useEffect, useState} from "react";
import {dbContext} from "../../../App";
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
    const [data, setData] = useState([])
    const [state, setState] = useState(false)

    useEffect(() => {
        new Promise((resolve, reject) => {
            if (db)
                { resolve() }
            else
                { reject() }
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