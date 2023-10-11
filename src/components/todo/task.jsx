import {List, Radio, Tag} from "antd";
import React,{useContext, useEffect, useState} from "react";
import {deleteData, getDataByIndex} from "../../utils/dbUtils";
import {dbContext} from "../../App";

/**
 * this function will show your target
 *  */
function Task({count}) {
    const db = useContext(dbContext)
    const [data, setData] = useState([])
    // read  longtime task
    useEffect(() => {
        new Promise((resolve, reject) => {
            if (db) {
                resolve()
            } else {
                reject()
            }
        }).then(() => {
            getDataByIndex(db, "task", "type", "task").then(e => {
                setData(e)
            })
        }).catch(e => {
            console.error(e)
        })
    }, [db, count])
    const selectHandler = (e) => {
        const arr = JSON.parse(JSON.stringify(data));
        arr.splice(parseInt(e.target.name), 1);
        setData(arr);
        deleteData(db, "task", parseInt(e.target.id)).then().catch(e => {
            console.log(e)
        })
    }
    return (
        <List
            onChange={selectHandler}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, key) => (
                <List.Item key={item.id}>
                    <Radio id={item.id} name={key}></Radio>
                    <List.Item.Meta
                        title={<span>{item.title}</span>}
                        description={item.description}
                    />
                    <Tag color="#2db7f5">截止至{item.endTime.substring(0, 10)}</Tag>
                </List.Item>
            )}
        />
    )
}

export default React.memo(Task)